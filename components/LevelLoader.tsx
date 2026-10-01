import React, { useEffect, useState } from 'react';
import { prefersReducedMotion } from './visuals/shared';

/** "Level 2 // loading …" that actually loads – and then waits for the presenter. */
const LevelLoader: React.FC<{ lang: 'de' | 'en' }> = ({ lang }) => {
  const de = lang === 'de';
  const [pct, setPct] = useState(() => (prefersReducedMotion() ? 100 : 0));
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number): void => {
      // ease-out over ~3.5 s, with a little stall at 87 % for drama
      const t = Math.min(1, (now - start) / 3500);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(t < 0.7 ? eased * 87 / 0.973 : 87 + (t - 0.7) / 0.3 * 13));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  const done = pct >= 100;
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className={`pixel-font ${done ? 'text-emerald-300' : 'text-fuchsia-300'}`}>
          {done ? (de ? 'LEVEL 2 // BEREIT' : 'LEVEL 2 // READY') : (de ? 'LEVEL 2 // LÄDT …' : 'LEVEL 2 // LOADING …')}
        </span>
        <span className="font-mono text-sm tabular-nums text-slate-300">{Math.min(pct, 100)}%</span>
      </div>
      <div className="mt-3 h-3 border border-slate-600 bg-slate-950 p-[2px]">
        <div className={`h-full transition-colors ${done ? 'bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,.7)]' : 'bg-gradient-to-r from-fuchsia-500 to-cyan-300'}`} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
      <div className={`pixel-font mt-3 text-right text-cyan-300 transition-opacity duration-500 ${done ? 'pixel-pulse opacity-100' : 'opacity-0'}`}>{de ? 'Drück → zum Starten' : 'Press → to start'}</div>
    </div>
  );
};

export default LevelLoader;
