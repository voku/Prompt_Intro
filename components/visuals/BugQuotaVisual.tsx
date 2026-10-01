import React from 'react';
import { CheckCircle2, ClipboardList, FlaskConical, PackagePlus, TriangleAlert } from 'lucide-react';
import { Lang } from '../../types';
import { Label, useSequence } from './shared';

/** Left: an order for three risks always gets filled. Right: three falsification attempts may end differently. */
const BugQuotaVisual: React.FC<{ lang: Lang }> = ({ lang }) => {
  const de = lang === 'de';
  const step = useSequence(5, 800, 600);

  const quota = de
    ? [
        { text: 'DB-Migration sperrt die Tabelle', real: true },
        { text: 'Rollback nicht getestet', real: true },
        { text: '„Allgemein: Doku könnte besser sein“', real: false },
      ]
    : [
        { text: 'DB migration locks the table', real: true },
        { text: 'Rollback not tested', real: true },
        { text: '“In general: docs could be better”', real: false },
      ];

  const attempts = de
    ? [
        { hyp: 'Migration sperrt Tabelle?', result: 'Beleg: Lock bei 1,2 Mio. Zeilen', found: true },
        { hyp: 'Rollback-Skript fehlt?', result: 'Skript da, Dry-Run grün', found: false },
        { hyp: 'Cache wird nicht geleert?', result: 'Deploy leert Cache, geprüft', found: false },
      ]
    : [
        { hyp: 'Migration locks table?', result: 'Evidence: lock at 1.2M rows', found: true },
        { hyp: 'Rollback script missing?', result: 'Script present, dry run green', found: false },
        { hyp: 'Cache not invalidated?', result: 'Deploy clears cache, checked', found: false },
      ];

  return (
    <div className="space-y-3">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="border-2 border-amber-600/70 bg-amber-950/15 p-4">
          <div className="flex items-center gap-2"><ClipboardList size={20} className="text-amber-300" /><Label className="text-amber-300">{de ? 'Bestellung' : 'Order'}</Label></div>
          <div className="mt-2 font-mono text-base text-white">{de ? '„Nenn mir die 3 größten Risiken.“' : '“Give me the 3 biggest risks.”'}</div>
          <div className="mt-4 space-y-2">
            {quota.map((item, i) => (
              <div key={item.text} className={`flex min-h-[3rem] items-center gap-3 border-2 border-dashed px-3 py-2 transition-all duration-500 ${step > i ? (item.real ? 'border-solid border-amber-500 bg-amber-950/40' : 'border-solid border-slate-500 bg-slate-800/60') : 'border-slate-700'}`}>
                <span className="pixel-font text-amber-300">{i + 1}</span>
                {step > i && (
                  <span className={`anim-pop flex-1 text-sm font-semibold ${item.real ? 'text-white' : 'italic text-slate-400'}`}>{item.text}</span>
                )}
                {step > i && !item.real && (
                  <span className="anim-stamp flex items-center gap-1 border-2 border-rose-500 px-2 py-0.5 text-xs font-black uppercase text-rose-300" style={{ animationDelay: '.4s' }}><PackagePlus size={13} />{de ? 'aufgefüllt' : 'filler'}</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 text-sm text-amber-200/80">{de ? 'Drei bestellt – drei geliefert. Immer.' : 'Three ordered – three delivered. Always.'}</div>
        </div>

        <div className="border-2 border-emerald-600/70 bg-emerald-950/15 p-4">
          <div className="flex items-center gap-2"><FlaskConical size={20} className="text-emerald-300" /><Label className="text-emerald-300">{de ? 'Prüfauftrag' : 'Review order'}</Label></div>
          <div className="mt-2 font-mono text-base text-white">{de ? '„Versuch den Plan 3× zu widerlegen.“' : '“Try to disprove the plan 3 times.”'}</div>
          <div className="mt-4 space-y-2">
            {attempts.map((a, i) => (
              <div key={a.hyp} className={`grid min-h-[3rem] grid-cols-[1fr_auto] items-center gap-3 border px-3 py-2 transition-all duration-500 ${step > i + 1 ? 'opacity-100' : 'opacity-0'} ${a.found ? 'border-amber-500 bg-amber-950/30' : 'border-emerald-700 bg-emerald-950/30'}`}>
                <div>
                  <div className="text-sm font-semibold text-white">{a.hyp}</div>
                  <div className="text-xs text-slate-400">{a.result}</div>
                </div>
                <span className={`flex items-center gap-1 text-xs font-black uppercase ${a.found ? 'text-amber-300' : 'text-emerald-300'}`}>
                  {a.found ? <TriangleAlert size={14} /> : <CheckCircle2 size={14} />}
                  {a.found ? (de ? 'Fund' : 'Finding') : (de ? 'widerlegt' : 'disproved')}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-sm text-emerald-200/80">{de ? '1 echter Fund, 2 sauber widerlegt – ehrliches Ergebnis.' : '1 real finding, 2 cleanly disproved – an honest result.'}</div>
        </div>
      </div>
      <div className="text-xs text-slate-500">{de ? 'Beispielhafter Change-Review.' : 'Illustrative change review.'}</div>
    </div>
  );
};

export default BugQuotaVisual;
