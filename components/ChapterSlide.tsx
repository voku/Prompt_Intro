import React from 'react';
import { Check } from 'lucide-react';
import { resolveIcon } from '../iconUtils';
import { IconName, Lang } from '../types';

interface ChapterSlideProps {
  chapter: number;
  icon?: IconName;
  title: string;
  subtitle?: string;
  lang: Lang;
}

/** The thread of the whole talk: every slide belongs to one of these four steps. */
const SPINE: { de: [string, string]; en: [string, string] }[] = [
  { de: ['Verstehen', 'Wie das Modell tickt'], en: ['Understand', 'How the model works'] },
  { de: ['Führen', 'Briefing & Werkzeuge'], en: ['Guide', 'Briefing & tools'] },
  { de: ['Prüfen', 'Belege statt Bauchgefühl'], en: ['Verify', 'Evidence over gut feeling'] },
  { de: ['Wiederverwenden', 'Vorlagen & Regeln'], en: ['Reuse', 'Templates & rules'] },
];

const ChapterSlide: React.FC<ChapterSlideProps> = ({ chapter, icon, title, subtitle, lang }) => {
  const de = lang === 'de';
  const Icon = resolveIcon(icon);

  return (
    <div className="flex min-h-full flex-col justify-between gap-10 animate-fadeIn">
      <div className="pixel-font text-fuchsia-400">{de ? "KAPITEL" : "CHAPTER"} {chapter} / {SPINE.length}</div>

      <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr]">
        <svg aria-hidden viewBox="0 0 300 220" className="h-36 w-auto select-none overflow-visible md:h-56" style={{ filter: 'drop-shadow(0 0 30px rgba(217,70,239,.45))' }}>
          <text
            x="0"
            y="190"
            className="display"
            fontSize="230"
            fontWeight="700"
            fill="transparent"
            stroke="url(#chapterStroke)"
            strokeWidth="2.5"
            style={{ strokeDasharray: 1400, strokeDashoffset: 1400, animation: 'drawStroke 2.2s cubic-bezier(.4,0,.2,1) .1s forwards' }}
          >
            {String(chapter).padStart(2, '0')}
          </text>
          <defs>
            <linearGradient id="chapterStroke" x1="0" x2="1">
              <stop offset="0%" stopColor="#f0abfc" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
        <div>
          <div className="mb-4 flex h-16 w-16 items-center justify-center border border-cyan-300/50 bg-gradient-to-br from-cyan-950/60 to-indigo-950 text-cyan-300 shadow-[0_0_28px_rgba(34,211,238,.3)]"><Icon size={32} /></div>
          <h2 className="text-gradient text-balance text-5xl font-bold uppercase leading-[.95] tracking-[-.03em] md:text-7xl xl:text-[6.5rem]">{title}</h2>
          {subtitle && <p className="lead-rule mt-8 max-w-3xl pl-5 text-xl font-medium leading-relaxed text-cyan-100/90 md:text-3xl">{subtitle}</p>}
        </div>
      </div>

      <ol className="stagger grid gap-3 md:grid-cols-4" aria-label={de ? 'Roter Faden' : 'Thread of the talk'}>
        {SPINE.map((step, index) => {
          const [name, desc] = de ? step.de : step.en;
          const done = index + 1 < chapter;
          const current = index + 1 === chapter;
          return (
            <li
              key={name}
              aria-current={current ? 'step' : undefined}
              className={`relative border px-4 py-4 ${current ? 'border-fuchsia-400/70 bg-gradient-to-br from-fuchsia-950/60 to-indigo-950/60 shadow-[0_0_34px_-6px_rgba(217,70,239,.55)]' : done ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-slate-700/70 bg-slate-950/50 opacity-60'}`}
            >
              <div className="flex items-center justify-between">
                <span className={`pixel-font ${current ? 'text-fuchsia-300' : done ? 'text-emerald-300' : 'text-slate-500'}`}>{String(index + 1).padStart(2, '0')}</span>
                {done && <Check size={18} className="text-emerald-300" />}
                {current && <span className="pixel-pulse h-2.5 w-2.5 bg-fuchsia-300" />}
              </div>
              <div className={`mt-2 text-xl font-bold leading-tight md:text-2xl ${current ? 'text-white' : done ? 'text-emerald-100' : 'text-slate-400'}`}>{name}</div>
              <div className="mt-1 text-sm text-slate-400">{desc}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ChapterSlide;
