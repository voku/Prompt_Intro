import React from 'react';
import { ArrowRight, Database, MessageSquareText, Scale, User } from 'lucide-react';
import { Lang } from '../../types';
import { Label, useSequence } from './shared';

const STAGES = [
  { icon: User, tone: 'border-slate-500 bg-slate-900/80 text-slate-100', de: ['Mensch', 'Frage in Alltagssprache', 'Text'], en: ['Human', 'Question in plain language', 'Text'] },
  { icon: MessageSquareText, tone: 'border-cyan-500 bg-cyan-950/50 text-cyan-100', de: ['LLM', 'Schnittstelle: versteht & formuliert', 'Text ↔ Struktur'], en: ['LLM', 'Interface: understands & phrases', 'Text ↔ structure'] },
  { icon: Scale, tone: 'border-amber-400 bg-amber-950/40 text-amber-100', de: ['System One', 'Entscheidung aus festen Optionen', 'Ja 0,93 · Nein 0,07'], en: ['System One', 'Decision from fixed options', 'Yes 0.93 · No 0.07'] },
  { icon: Database, tone: 'border-emerald-400 bg-emerald-950/40 text-emerald-100', de: ['Code + SQL', 'Regeln, Summen, Schreiben', 'Immer dasselbe Ergebnis'], en: ['Code + SQL', 'Rules, sums, writes', 'Same result every time'] },
];

/** Left to right: the LLM talks to people, deterministic code does the work. Below: the same job, two ways. */
const DecisionStackVisual: React.FC<{ lang: Lang }> = ({ lang }) => {
  const de = lang === 'de';
  const step = useSequence(STAGES.length + 2, 800, 400);
  const racing = step >= STAGES.length;

  return (
    <div className="space-y-5">
      <div className="grid items-stretch gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
        {STAGES.map((stage, i) => {
          const [name, desc, out] = de ? stage.de : stage.en;
          const Icon = stage.icon;
          const shown = step >= i;
          const arrow = i < STAGES.length - 1 && (
            <div className={`hidden items-center text-fuchsia-300 transition-opacity duration-500 md:flex ${step > i ? 'opacity-100' : 'opacity-0'}`}><ArrowRight size={22} /></div>
          );
          return (
            <React.Fragment key={name}>
              <div className={`relative flex flex-col justify-between border-2 p-4 transition-all duration-500 ${stage.tone} ${shown ? 'opacity-100' : 'translate-y-2 opacity-0'}`}>
                <div className="flex items-center justify-between">
                  <span className="pixel-font text-xs opacity-80">{String(i + 1).padStart(2, '0')}</span>
                  <Icon size={24} />
                </div>
                <div className="mt-3 text-2xl font-bold leading-tight text-white">{name}</div>
                <div className="mt-1 text-sm opacity-90">{desc}</div>
                <div className="mt-3 border-t border-current/30 pt-2 font-mono text-xs opacity-80">{out}</div>
                {i === 2 && <span className="pixel-font absolute -top-3 right-2 bg-amber-400 px-2 py-0.5 text-slate-950">{de ? 'NEU' : 'NEW'}</span>}
              </div>
              {arrow}
            </React.Fragment>
          );
        })}
      </div>

      <div className={`grid gap-3 transition-opacity duration-700 md:grid-cols-2 ${racing ? 'opacity-100' : 'opacity-0'}`}>
        <div className="border border-rose-600/60 bg-rose-950/20 p-4">
          <div className="flex items-baseline justify-between gap-2">
            <Label className="text-rose-300">{de ? 'LLM pro Datensatz' : 'LLM per record'}</Label>
            <span className="font-mono text-xs text-rose-200">{de ? 'Sekunden · Token-Kosten · kann abweichen' : 'seconds · token cost · may vary'}</span>
          </div>
          <div className="mt-3 h-4 bg-slate-800">{racing && <div className="h-full bg-rose-400" style={{ width: '4%', transition: 'width 6s linear' }} />}</div>
          <div className="mt-3 font-mono text-sm text-slate-300">{de ? '„Ist Bestellung 4711 bezahlt?“ … ×100.000' : '“Is order 4711 paid?” … ×100,000'}</div>
        </div>
        <div className="border border-emerald-500/60 bg-emerald-950/20 p-4">
          <div className="flex items-baseline justify-between gap-2">
            <Label className="text-emerald-300">SQL</Label>
            <span className="font-mono text-xs text-emerald-200">{de ? 'Millisekunden · fast gratis · immer gleich' : 'milliseconds · nearly free · always the same'}</span>
          </div>
          <div className="mt-3 h-4 bg-slate-800">{racing && <div className="bar-grow h-full bg-emerald-400" style={{ animationDuration: '.5s' }} />}</div>
          <div className="mt-3 font-mono text-sm text-emerald-100">SELECT count(*) FROM orders WHERE paid = false;</div>
        </div>
      </div>

      <div className="text-xs text-slate-500">
        {de
          ? 'Illustration, keine Messung. „System One“ = Begriff von TypeSafe AI (Jev, Sept. 2026) – sehr neu, Herstellerangaben; schwach bei Zahlen und Daten.'
          : 'Illustration, not a benchmark. “System One” = term by TypeSafe AI (Jev, Sept. 2026) – very new, vendor claims; weak with numbers and dates.'}
      </div>
    </div>
  );
};

export default DecisionStackVisual;
