import React from 'react';
import { Lang } from '../types';

const COLORS = ['bg-slate-400', 'bg-cyan-400', 'bg-violet-400', 'bg-fuchsia-400'];

/** Mini version of the guidance staircase: where on the stairs this example sits. */
const StepIndicator: React.FC<{ step: number; lang: Lang }> = ({ step, lang }) => (
  <div className="hidden shrink-0 items-end gap-3 md:flex" aria-label={`${lang === 'de' ? 'Stufe' : 'Step'} ${step}/4`}>
    <div className="flex items-end gap-1">
      {[1, 2, 3, 4].map((n) => (
        <span
          key={n}
          className={`w-5 transition-all ${n === step ? `${COLORS[n - 1]} shadow-[0_0_14px_rgba(217,70,239,.6)]` : n < step ? 'bg-slate-600' : 'bg-slate-800'}`}
          style={{ height: 10 + n * 9 }}
        />
      ))}
    </div>
    <div className="pixel-font text-slate-300">{lang === 'de' ? 'Stufe' : 'Step'} {step}/4</div>
  </div>
);

export default StepIndicator;
