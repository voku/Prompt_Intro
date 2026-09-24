import React, { useState } from 'react';
import { Check, ClipboardList, Copy, FileSpreadsheet, Mail, PlaneTakeoff, Presentation, Send } from 'lucide-react';
import { Lang } from '../types';

interface DeskTakeawaysProps {
  lang: Lang;
}

interface DeskRecipe {
  id: string;
  icon: React.FC<{ size?: number; className?: string }>;
  tone: string;
  /** Recipe ID in agent-recall-compiler's operating-prompts.json this card is adapted from. */
  source: string;
  situationDE: string;
  situationEN: string;
  promptDE: string;
  promptEN: string;
}

const DESK_RECIPES: DeskRecipe[] = [
  {
    id: 'mail',
    icon: Mail,
    tone: 'border-cyan-700 text-cyan-300',
    source: 'discovery-first',
    situationDE: 'Knifflige Mail beantworten',
    situationEN: 'Answering a tricky email',
    promptDE: 'Bevor du antwortest: Liste auf, was im Verlauf belegt ist, was du nur annimmst und was fehlt. Zum Fehlenden stellst du mir Rückfragen.',
    promptEN: 'Before you answer: list what the thread actually proves, what you are only assuming and what is missing. Ask me about the missing parts.',
  },
  {
    id: 'excel',
    icon: FileSpreadsheet,
    tone: 'border-emerald-700 text-emerald-300',
    source: 'reproduce-before-fix',
    situationDE: 'Excel-Formel rechnet falsch',
    situationEN: 'Spreadsheet formula is wrong',
    promptDE: 'Rechne die Formel erst an drei Beispielzeilen von Hand nach und zeig, wo das Ergebnis abweicht. Noch nichts umbauen.',
    promptEN: 'First recalculate the formula by hand for three sample rows and show where the result differs. Do not rebuild anything yet.',
  },
  {
    id: 'concept',
    icon: Presentation,
    tone: 'border-fuchsia-700 text-fuchsia-300',
    source: 'adversarial-review',
    situationDE: 'Konzept oder Folien prüfen',
    situationEN: 'Reviewing a concept or deck',
    promptDE: 'Versuch auf drei verschiedene Arten, mein Konzept zu widerlegen – jeweils mit Begründung. Hält kein Einwand, sag das. Keine Kritik erfinden.',
    promptEN: 'Try three different ways to disprove my concept, each with reasoning. If no objection holds, say so. Do not invent criticism.',
  },
  {
    id: 'decision',
    icon: Send,
    tone: 'border-amber-700 text-amber-300',
    source: 'missingness-audit',
    situationDE: 'Vor dem Abschicken',
    situationEN: 'Before hitting send',
    promptDE: 'Was fehlt, damit der Empfänger das entscheiden kann? Nur Lücken, die zu genau diesem Fall gehören – keine allgemeine Checkliste.',
    promptEN: 'What is missing for the recipient to decide this? Only gaps that belong to this exact case – no generic checklist.',
  },
  {
    id: 'vacation',
    icon: PlaneTakeoff,
    tone: 'border-indigo-600 text-indigo-300',
    source: 'production-ready-handoff',
    situationDE: 'Übergabe vor dem Urlaub',
    situationEN: 'Handoff before vacation',
    promptDE: 'Schreib eine Übergabe für jemanden ohne Vorwissen: Stand, was schon verworfen ist, offene Punkte, wer entscheidet, nächster Schritt.',
    promptEN: 'Write a handoff for someone with no background: status, what was already ruled out, open items, who decides, next step.',
  },
  {
    id: 'report',
    icon: ClipboardList,
    tone: 'border-rose-700 text-rose-300',
    source: 'evidence-report',
    situationDE: 'Ergebnis melden',
    situationEN: 'Reporting a result',
    promptDE: 'Trenne sauber: erledigt und geprüft · erledigt, aber ungeprüft · offen. Keine Erfolgsmeldung ohne Beleg.',
    promptEN: 'Separate clearly: done and checked · done but unchecked · open. No success claim without evidence.',
  },
];

const DeskTakeaways: React.FC<DeskTakeawaysProps> = ({ lang }) => {
  const de = lang === 'de';
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = (id: string, prompt: string): void => {
    void navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId((current) => current === id ? null : current), 1400);
  };

  return (
    <div className="space-y-3">
      <div className="pixel-font text-[8px] uppercase tracking-wider text-fuchsia-300">
        {de ? 'SECHS SÄTZE FÜR DEN SCHREIBTISCH · KLICKEN ZUM KOPIEREN' : 'SIX SENTENCES FOR YOUR DESK · CLICK TO COPY'}
      </div>
      <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {DESK_RECIPES.map(({ id, icon: Icon, tone, situationDE, situationEN, promptDE, promptEN }, index) => {
          const prompt = de ? promptDE : promptEN;
          const copied = copiedId === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => copy(id, prompt)}
              style={{ animation: `fadeIn .35s steps(6,end) ${0.15 + index * 0.18}s both` }}
              className={`retro-button group flex flex-col border-2 bg-slate-950/90 p-4 text-left transition hover:bg-slate-900 ${tone}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2"><Icon size={20} /><span className="text-sm font-black text-white">{de ? situationDE : situationEN}</span></div>
                {copied ? <Check size={16} className="text-emerald-300" /> : <Copy size={16} className="text-slate-600 group-hover:text-slate-300" />}
              </div>
              <div className="mt-3 flex-grow text-sm leading-relaxed text-slate-200">{de ? '„' : '“'}{prompt}{de ? '“' : '”'}</div>
              {copied && <div className="mt-3 font-mono text-[10px] text-emerald-400">{de ? 'kopiert' : 'copied'}</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DeskTakeaways;
