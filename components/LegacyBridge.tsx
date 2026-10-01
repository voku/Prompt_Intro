import React from 'react';
import { ArrowRight, Bot, FileSearch, Hammer, MessageSquareText, ShieldCheck, Wrench } from 'lucide-react';
import { Lang, VisualKind } from '../types';

interface LegacyBridgeProps {
  kind: Extract<VisualKind, 'legacy-recap' | 'legacy-timejump'>;
  lang: Lang;
}

const oldGif = (name: string): string => `https://raw.githubusercontent.com/voku/LLM/main/images/reactions/${name}`;

type Tone = 'cyan' | 'fuchsia' | 'amber' | 'emerald';

const TONES: Record<Tone, { box: string; badge: string; label: string }> = {
  cyan: { box: 'border-cyan-500/40 bg-cyan-950/25 hover:border-cyan-300/80', badge: 'border-cyan-400/50 bg-cyan-900/40 text-cyan-300', label: 'text-cyan-300' },
  fuchsia: { box: 'border-fuchsia-500/40 bg-fuchsia-950/25 hover:border-fuchsia-300/80', badge: 'border-fuchsia-400/50 bg-fuchsia-900/40 text-fuchsia-300', label: 'text-fuchsia-300' },
  amber: { box: 'border-amber-500/40 bg-amber-950/25 hover:border-amber-300/80', badge: 'border-amber-400/50 bg-amber-900/40 text-amber-300', label: 'text-amber-300' },
  emerald: { box: 'border-emerald-500/40 bg-emerald-950/25 hover:border-emerald-300/80', badge: 'border-emerald-400/50 bg-emerald-900/40 text-emerald-300', label: 'text-emerald-300' },
};

const FactCard: React.FC<{ tone: Tone; icon: React.ReactNode; title: string; text: string }> = ({ tone, icon, title, text }) => (
  <div className={`flex items-center gap-4 border px-4 py-4 transition-colors md:px-5 ${TONES[tone].box}`}>
    <div className={`flex h-12 w-12 shrink-0 items-center justify-center border ${TONES[tone].badge}`}>{icon}</div>
    <div className="min-w-0">
      <div className="text-lg font-bold leading-tight text-white">{title}</div>
      <div className="mt-1 text-sm leading-snug text-slate-400">{text}</div>
    </div>
  </div>
);

/** GIF card with a legible caption: image on top, dark gradient + text below. */
const GifCard: React.FC<{ src: string; alt: string; tone: Tone; tag: string; title: string; sub?: string; big?: boolean; className?: string }> = ({ src, alt, tone, tag, title, sub, big, className = '' }) => (
  <div className={`group relative isolate min-h-[260px] overflow-hidden border bg-gradient-to-br from-indigo-950 to-black ${TONES[tone].box} ${className}`}>
    <img src={src} alt={alt} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050816] via-[#050816]/55 to-transparent" />
    <div className="flex h-full min-h-[inherit] flex-col justify-end p-5 md:p-6">
      <span className={`pixel-font mb-3 w-fit border px-2 py-1 backdrop-blur ${TONES[tone].badge}`}>{tag}</span>
      <div className={`font-bold leading-[1.05] tracking-tight text-white ${big ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>{title}</div>
      {sub && <div className="mt-2 text-sm text-slate-300">{sub}</div>}
    </div>
  </div>
);

const LegacyBridge: React.FC<LegacyBridgeProps> = ({ kind, lang }) => {
  const de = lang === 'de';

  if (kind === 'legacy-recap') {
    return (
      <div className="stagger grid h-full gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <GifCard
          src={oldGif('tumblr_inline_mmrb6wlC0g1qz4rgp.gif')}
          alt={de ? 'Reaction-GIF aus der früheren LLM-Präsentation' : 'Reaction GIF from the previous LLM presentation'}
          tone="fuchsia"
          tag="RECALL // OLD DECK"
          title={de ? '„Willkommen in der Welt der LLMs!“' : '“Welcome to the world of LLMs!”'}
          sub={de ? 'Ja, genau die Präsentation.' : 'Yes, that presentation.'}
          big
          className="min-h-[300px]"
        />
        <div className="grid grid-rows-3 gap-3">
          <FactCard tone="cyan" icon={<MessageSquareText size={24} />} title={de ? 'Sprache rein, Sprache raus' : 'Language in, language out'} text={de ? 'Zusammenfassen, Übersetzen, Schreiben.' : 'Summarise, translate, write.'} />
          <FactCard tone="fuchsia" icon={<Bot size={24} />} title={de ? 'Muster statt Nachschlagewerk' : 'Patterns, not a lookup table'} text={de ? 'Kontext verstehen und plausibel fortsetzen.' : 'Understand context and continue plausibly.'} />
          <FactCard tone="amber" icon={<FileSearch size={24} />} title={de ? 'Damals schon wichtig' : 'Already important then'} text={de ? 'Quellen prüfen. Nicht jede Antwort glauben.' : 'Check sources. Do not trust every answer.'} />
        </div>
      </div>
    );
  }

  return (
    <div className="stagger grid h-full grid-rows-[1fr_auto] gap-5">
      <div className="grid min-h-[300px] gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        <GifCard src={oldGif('tumblr_mej27iJ3rC1qdpvjdo1_500.gif')} alt="" tone="cyan" tag={de ? 'DAMALS // CHATBOT' : 'THEN // CHATBOT'} title={de ? 'Antworten erzeugen' : 'Generate answers'} />
        <div className="flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-fuchsia-400/60 bg-fuchsia-950/60 text-fuchsia-300 shadow-[0_0_24px_rgba(217,70,239,.4)]"><ArrowRight className="rotate-90 md:rotate-0" size={24} /></div>
        </div>
        <GifCard src={oldGif('tumblr_n7vqltNUdZ1qequb0o6_250.gif')} alt="" tone="amber" tag={de ? 'HEUTE // AGENTISCH' : 'NOW // AGENTIC'} title={de ? 'Arbeit ausführen' : 'Execute work'} />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <FactCard tone="cyan" icon={<Wrench size={22} />} title="Tools" text="Web · Files · APIs" />
        <FactCard tone="fuchsia" icon={<Hammer size={22} />} title={de ? 'Aktionen' : 'Actions'} text={de ? 'Code · Tickets · Daten' : 'Code · Tickets · Data'} />
        <FactCard tone="emerald" icon={<ShieldCheck size={22} />} title={de ? 'Neue Frage' : 'New question'} text={de ? 'Wie kontrollieren wir das?' : 'How do we control it?'} />
      </div>
    </div>
  );
};

export default LegacyBridge;
