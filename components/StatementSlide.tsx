import React from 'react';
import { Bot, FileQuestion, User } from 'lucide-react';
import { resolveIcon } from '../iconUtils';
import { IconName, Lang } from '../types';
import { Label, useSequence, useTypewriter } from './visuals/shared';

interface StatementSlideProps {
  icon?: IconName;
  kicker: string;
  statement: string;
  points: string[];
  lang: Lang;
}

/** One big sentence on the left, a chat that proves it on the right. */
const StatementSlide: React.FC<StatementSlideProps> = ({ icon, kicker, statement, points, lang }) => {
  const de = lang === 'de';
  const Icon = resolveIcon(icon);
  const step = useSequence(4, 900, 400);
  const answer = de
    ? 'Laut § 7 Abs. 2 der Betriebsvereinbarung dürfen Mitarbeitende bis zu drei Tage pro Woche mobil arbeiten.'
    : 'According to § 7(2) of the works agreement, staff may work remotely up to three days a week.';
  const typed = useTypewriter(answer, step >= 1, 22);
  const done = typed.length === answer.length;

  return (
    <div className="grid min-h-full items-center gap-10 animate-fadeIn lg:grid-cols-[1.15fr_.85fr]">
      <div>
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center border border-amber-400/60 bg-amber-950/50 text-amber-300"><Icon size={24} /></div>
          <span className="pixel-font text-amber-300">{kicker}</span>
        </div>
        <h2 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl xl:text-7xl">
          {statement}
        </h2>
        <ol className="stagger mt-10 grid gap-3">
          {points.map((p, i) => (
            <li key={p} className="flex items-baseline gap-4 text-lg text-slate-200 md:text-xl">
              <span className="pixel-font text-fuchsia-300">{String(i + 1).padStart(2, '0')}</span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-4">
        <div className="flex items-start justify-end gap-3">
          <div className="rounded-2xl rounded-tr-sm border border-slate-600 bg-slate-800/80 px-4 py-3 text-lg text-white">{de ? 'Was steht in unserer Betriebsvereinbarung zum Homeoffice?' : 'What does our works agreement say about remote work?'}</div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-700 text-slate-200"><User size={18} /></div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fuchsia-800 text-fuchsia-100"><Bot size={18} /></div>
          <div className={`min-h-[6rem] rounded-2xl rounded-tl-sm border border-fuchsia-600/60 bg-fuchsia-950/40 px-4 py-3 text-lg text-white ${step >= 1 && !done ? 'caret' : ''}`}>{typed}</div>
        </div>

        <div className={`grid gap-3 transition-opacity duration-700 ${done ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <div className="mb-1 flex justify-between"><Label className="text-fuchsia-300">{de ? 'Wie sicher es klingt' : 'How sure it sounds'}</Label><span className="font-mono text-sm text-fuchsia-200">100%</span></div>
            <div className="h-4 bg-slate-800">{done && <div className="bar-grow h-full w-full bg-gradient-to-r from-fuchsia-500 to-pink-400" />}</div>
          </div>
          <div>
            <div className="mb-1 flex justify-between"><Label className="text-amber-300">{de ? 'Was belegt ist' : 'What is proven'}</Label><span className="font-mono text-sm text-amber-200">0%</span></div>
            <div className="h-4 bg-slate-800" />
          </div>
          <div className="flex items-center gap-2 border-l-4 border-amber-500 bg-amber-950/30 px-3 py-2 text-amber-100">
            <FileQuestion size={18} className="shrink-0" />
            <span className="font-semibold">{de ? 'Das Dokument wurde nie hochgeladen.' : 'The document was never uploaded.'}</span>
          </div>
          <div className="text-xs text-slate-500">{de ? 'Illustration – so klingt es typischerweise.' : 'Illustration – this is what it typically sounds like.'}</div>
        </div>
      </div>
    </div>
  );
};

export default StatementSlide;
