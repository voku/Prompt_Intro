import React from 'react';
import { BadgeCheck, Building2, FileText, ShieldCheck, UserCheck } from 'lucide-react';
import { Lang } from '../../types';
import { Label, useSequence } from './shared';

const GATES = [
  { icon: Building2, de: ['Dienst freigegeben?', 'Firmen-Account, nicht privat'], en: ['Approved service?', 'Company account, not private'] },
  { icon: ShieldCheck, de: ['Daten zulässig?', 'Personenbezug & Geheimnisse nur, wo erlaubt'], en: ['Data permitted?', 'Personal data & secrets only where allowed'] },
  { icon: UserCheck, de: ['Mensch prüft?', 'Die Verantwortung bleibt bei uns'], en: ['Human checks?', 'Responsibility stays with us'] },
];

/** A document travels through three gates; each lights up as it passes. */
const ComplianceGatesVisual: React.FC<{ lang: Lang }> = ({ lang }) => {
  const de = lang === 'de';
  const step = useSequence(GATES.length + 2, 900, 500);
  const position = Math.min(step, GATES.length + 1);
  return (
    <div className="space-y-6">
      <div className="relative">
        {/* track */}
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-slate-800" />
        <div className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-700" style={{ width: `${(position / (GATES.length + 1)) * 100}%` }} />
        <div className="relative grid grid-cols-[auto_1fr_1fr_1fr_auto] items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center border-2 border-cyan-400 bg-cyan-950 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,.4)]"><FileText size={30} /></div>
          {GATES.map((gate, i) => {
            const passed = position > i;
            const Icon = gate.icon;
            const [q, hint] = de ? gate.de : gate.en;
            return (
              <div key={q} className={`relative mx-auto flex min-h-[11.5rem] w-full max-w-[16rem] flex-col items-center justify-center border-2 px-3 py-4 text-center transition-all duration-500 ${passed ? 'border-emerald-400 bg-emerald-950/70 shadow-[0_0_30px_-6px_rgba(52,211,153,.6)]' : 'border-slate-600 bg-slate-950'}`}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${passed ? 'bg-emerald-500 text-emerald-950' : 'bg-slate-800 text-slate-400'} transition-colors duration-500`}>
                  {passed ? <BadgeCheck size={26} /> : <Icon size={24} />}
                </div>
                <div className="mt-3 text-lg font-bold leading-tight text-white">{q}</div>
                <div className="mt-1 text-xs text-slate-400">{hint}</div>
                <span className="pixel-font absolute -top-3 bg-slate-950 px-2 text-slate-400">{String(i + 1).padStart(2, '0')}</span>
              </div>
            );
          })}
          <div className={`flex h-16 w-16 items-center justify-center border-2 transition-all duration-500 ${position > GATES.length ? 'border-emerald-400 bg-emerald-500 text-emerald-950' : 'border-slate-700 bg-slate-900 text-slate-600'}`}><BadgeCheck size={30} /></div>
        </div>
      </div>
      <div className={`text-center transition-opacity duration-500 ${position > GATES.length ? 'opacity-100' : 'opacity-0'}`}>
        <Label className="text-emerald-300">{de ? 'Erst dann: einfügen' : 'Only then: paste'}</Label>
      </div>
    </div>
  );
};

export default ComplianceGatesVisual;
