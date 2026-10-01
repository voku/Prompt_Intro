import React, { useEffect, useState } from 'react';

export const Box: React.FC<React.PropsWithChildren<{ className?: string; style?: React.CSSProperties }>> = ({ className = '', style, children }) => (
  <div style={style} className={`border-2 border-indigo-800 bg-slate-950/90 p-4 shadow-[5px_5px_0_#020617] ${className}`}>{children}</div>
);

export const Label: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = '', children }) => (
  <div className={`pixel-font uppercase tracking-wider ${className}`}>{children}</div>
);

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Counts up 0…steps-1 every `ms`; with reduced motion it jumps straight to the end. */
export const useSequence = (steps: number, ms: number, startDelay = 0): number => {
  const [step, setStep] = useState(() => (prefersReducedMotion() ? steps - 1 : 0));
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let current = 0;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        current += 1;
        setStep(current);
        if (current >= steps - 1) window.clearInterval(interval);
      }, ms);
    }, startDelay);
    return () => { window.clearTimeout(start); window.clearInterval(interval); };
  }, [steps, ms, startDelay]);
  return step;
};

/** Types `text` character by character once `active` is true. */
export const useTypewriter = (text: string, active: boolean, msPerChar = 28): string => {
  const [count, setCount] = useState(() => (prefersReducedMotion() ? text.length : 0));
  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) { setCount(text.length); return; }
    setCount(0);
    const interval = window.setInterval(() => {
      setCount((c) => {
        if (c >= text.length) { window.clearInterval(interval); return c; }
        return c + 1;
      });
    }, msPerChar);
    return () => window.clearInterval(interval);
  }, [text, active, msPerChar]);
  return text.slice(0, count);
};

/** Delay helper for inline staggered CSS animations. */
export const delay = (seconds: number): React.CSSProperties => ({ animationDelay: `${seconds}s` });
