import React from 'react';
import { Lang } from '../types';

interface EndSlideProps {
  title: string;
  subtitle?: string;
  points: string[];
  lang: Lang;
  step?: number;
}

const EndSlide: React.FC<EndSlideProps> = ({ title, subtitle, points, lang, step = 0 }) => {
  const de = lang === 'de';
  return (
    <div className="flex min-h-full flex-col justify-center gap-8 animate-fadeIn">
      <div>
        <div className="pixel-font mb-3 text-emerald-300">{de ? 'Fazit // Level geschafft' : 'Summary // Level cleared'}</div>
        <h2 className="text-balance text-4xl font-bold tracking-tight text-white md:text-6xl">{title}</h2>
        {subtitle && <p className="lead-rule mt-5 pl-5 text-xl text-cyan-100/90 md:text-2xl">{subtitle}</p>}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {points.map((p, i) => (
          <div key={p} className={`${step > i ? 'animate-slideUp' : 'invisible'} relative flex flex-col justify-between overflow-hidden border border-indigo-500/40 bg-gradient-to-br from-indigo-950/70 to-slate-950 p-6`}>
            <span aria-hidden className="display pointer-events-none absolute -right-2 -top-6 text-[8rem] font-bold leading-none text-transparent" style={{ WebkitTextStroke: '2px rgba(129,140,248,.35)' }}>{i + 1}</span>
            <span className="pixel-font text-fuchsia-300">{String(i + 1).padStart(2, '0')}</span>
            <p className="relative mt-10 text-xl font-semibold leading-snug text-white md:text-2xl">{p}</p>
          </div>
        ))}
      </div>

      <div className="pixel-font text-center text-emerald-300">{de ? 'Ende // Vielen Dank // Fragen & Diskussion' : 'End // Thank you // Questions & discussion'}</div>
    </div>
  );
};

export default EndSlide;
