import React from 'react';
import { ArrowRight, Bot, FileSearch, Hammer, MessageSquareText, ShieldCheck, Wrench } from 'lucide-react';
import { Lang, VisualKind } from '../types';

interface LegacyBridgeProps {
  kind: Extract<VisualKind, 'legacy-recap' | 'legacy-timejump'>;
  lang: Lang;
}

const oldGif = (name: string): string => `https://raw.githubusercontent.com/voku/LLM/main/images/reactions/${name}`;

const LegacyBridge: React.FC<LegacyBridgeProps> = ({ kind, lang }) => {
  const de = lang === 'de';

  if (kind === 'legacy-recap') {
    return (
      <div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr] lg:items-stretch">
        <div className="relative min-h-[370px] overflow-hidden border-2 border-fuchsia-700 bg-black shadow-[7px_7px_0_#020617]">
          <img
            src={oldGif('tumblr_inline_mmrb6wlC0g1qz4rgp.gif')}
            alt={de ? 'Reaction-GIF aus der früheren LLM-Präsentation' : 'Reaction GIF from the previous LLM presentation'}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="pixel-font text-[8px] text-fuchsia-300">RECALL // OLD DECK</div>
            <div className="mt-3 text-3xl font-black uppercase text-white">{de ? '„Willkommen in der Welt der LLMs!“' : '“Welcome to the world of LLMs!”'}</div>
            <div className="mt-2 text-sm text-slate-300">{de ? 'Ja, genau die Präsentation.' : 'Yes, that presentation.'}</div>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="border-2 border-cyan-800 bg-cyan-950/20 p-4"><MessageSquareText className="text-cyan-300" size={25} /><div className="mt-3 font-black text-white">{de ? 'Sprache rein, Sprache raus' : 'Language in, language out'}</div><div className="mt-1 text-sm text-slate-400">{de ? 'Zusammenfassen, Übersetzen, Schreiben.' : 'Summarise, translate, write.'}</div></div>
          <div className="border-2 border-fuchsia-800 bg-fuchsia-950/20 p-4"><Bot className="text-fuchsia-300" size={25} /><div className="mt-3 font-black text-white">{de ? 'Muster statt Nachschlagewerk' : 'Patterns, not a lookup table'}</div><div className="mt-1 text-sm text-slate-400">{de ? 'Kontext verstehen und plausibel fortsetzen.' : 'Understand context and continue plausibly.'}</div></div>
          <div className="border-2 border-amber-800 bg-amber-950/20 p-4"><FileSearch className="text-amber-300" size={25} /><div className="mt-3 font-black text-white">{de ? 'Damals schon wichtig' : 'Already important then'}</div><div className="mt-1 text-sm text-slate-400">{de ? 'Quellen prüfen. Nicht jede Antwort glauben.' : 'Check sources. Do not trust every answer.'}</div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="relative min-h-[260px] overflow-hidden border-2 border-indigo-700 bg-black">
          <img src={oldGif('tumblr_mej27iJ3rC1qdpvjdo1_500.gif')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-65" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-x-0 bottom-0 p-4"><div className="pixel-font text-[8px] text-cyan-300">{de ? 'DAMALS // CHATBOT' : 'THEN // CHATBOT'}</div><div className="mt-2 text-2xl font-black text-white">{de ? 'Antworten erzeugen' : 'Generate answers'}</div></div>
        </div>
        <ArrowRight className="mx-auto rotate-90 text-fuchsia-400 md:rotate-0" size={36} />
        <div className="relative min-h-[260px] overflow-hidden border-2 border-amber-700 bg-black">
          <img src={oldGif('tumblr_n7vqltNUdZ1qequb0o6_250.gif')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-x-0 bottom-0 p-4"><div className="pixel-font text-[8px] text-amber-300">{de ? 'HEUTE // AGENTISCH' : 'NOW // AGENTIC'}</div><div className="mt-2 text-2xl font-black text-white">{de ? 'Arbeit ausführen' : 'Execute work'}</div></div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="border border-cyan-800 bg-cyan-950/15 px-4 py-3"><Wrench className="text-cyan-300" size={20} /><strong className="mt-2 block text-white">Tools</strong><span className="text-xs text-slate-400">Web · Files · APIs</span></div>
        <div className="border border-fuchsia-800 bg-fuchsia-950/15 px-4 py-3"><Hammer className="text-fuchsia-300" size={20} /><strong className="mt-2 block text-white">{de ? 'Aktionen' : 'Actions'}</strong><span className="text-xs text-slate-400">Code · Tickets · Daten</span></div>
        <div className="border border-emerald-800 bg-emerald-950/15 px-4 py-3"><ShieldCheck className="text-emerald-300" size={20} /><strong className="mt-2 block text-white">{de ? 'Neue Frage' : 'New question'}</strong><span className="text-xs text-slate-400">{de ? 'Wie kontrollieren wir das?' : 'How do we control it?'}</span></div>
      </div>

      <div className="border-l-4 border-emerald-500 bg-emerald-950/20 px-4 py-3 text-lg font-bold text-emerald-100">
        {de ? 'Mehr Fähigkeiten machen ein LLM nützlicher. Sie machen seine Aussagen nicht automatisch wahr.' : 'More capabilities make an LLM more useful. They do not automatically make its claims true.'}
      </div>
    </div>
  );
};

export default LegacyBridge;
