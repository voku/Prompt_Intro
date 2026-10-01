import React from 'react';
import { MessageSquare, ListOrdered, UserCog, Wrench, ArrowUpRight } from 'lucide-react';
import { Lang } from '../../types';
import { Label } from './shared';

const STEPS = [
  { icon: MessageSquare, tone: 'border-slate-500 from-slate-800/80 to-slate-900/80 text-slate-200', badge: 'bg-slate-700 text-slate-100', de: ['Direkt fragen', '„Anderes Wort für ‚schnell‘?“'], en: ['Just ask', '“Another word for ‘fast’?”'] },
  { icon: UserCog, tone: 'border-cyan-500 from-cyan-900/60 to-cyan-950/80 text-cyan-100', badge: 'bg-cyan-600 text-cyan-50', de: ['Rolle, Kontext, Ziel', 'Mail an die Kommune'], en: ['Role, context, goal', 'Email to the council'] },
  { icon: ListOrdered, tone: 'border-violet-500 from-violet-900/60 to-violet-950/80 text-violet-100', badge: 'bg-violet-600 text-violet-50', de: ['Struktur vorgeben', 'Wartungsplan, Protokoll'], en: ['Give structure', 'Maintenance plan, minutes'] },
  { icon: Wrench, tone: 'border-fuchsia-400 from-fuchsia-800/60 to-fuchsia-950/80 text-fuchsia-50', badge: 'bg-fuchsia-500 text-white', de: ['Werkzeuge & Prüfung', 'Rechnen, Fakten, Quellen'], en: ['Tools & checks', 'Calculations, facts, sources'] },
];

/** A staircase: each step is taller, the top one glows. */
const GuidanceLadderVisual: React.FC<{ lang: Lang }> = ({ lang }) => {
  const de = lang === 'de';
  return (
    <div className="relative">
      <div className="flex items-end gap-3" style={{ minHeight: 360 }}>
        {STEPS.map((step, i) => {
          const [name, example] = de ? step.de : step.en;
          const Icon = step.icon;
          return (
            <div
              key={name}
              className={`anim-rise relative flex flex-1 flex-col justify-between border-2 bg-gradient-to-b p-4 ${step.tone} ${i === 3 ? 'shadow-[0_0_40px_-6px_rgba(217,70,239,.6)]' : ''}`}
              style={{ height: 150 + i * 70, animationDelay: `${0.15 + i * 0.18}s` }}
            >
              <div className="flex items-center justify-between">
                <span className={`pixel-font px-2 py-1 ${step.badge}`}>{String(i + 1).padStart(2, '0')}</span>
                <Icon size={26} />
              </div>
              <div>
                <div className="text-xl font-bold leading-tight text-white md:text-2xl">{name}</div>
                <div className="mt-1 text-sm opacity-80">{example}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 border-t border-slate-700 pt-3">
        <Label className="text-slate-400">{de ? 'Wenig hängt dran' : 'Little at stake'}</Label>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-slate-600 via-violet-500 to-fuchsia-400" />
        <div className="flex items-center gap-1 text-fuchsia-300"><Label className="text-fuchsia-300">{de ? 'Ergebnis muss halten' : 'Result must hold'}</Label><ArrowUpRight size={16} /></div>
      </div>
    </div>
  );
};

export default GuidanceLadderVisual;
