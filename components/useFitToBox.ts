import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

const MIN_ZOOM = 0.55;

/**
 * Shrinks the slide content with CSS `zoom` until it fits its box, so a slide that
 * is laid out for 1920×1080 still fits a 1366×768 projector without scrolling.
 * Re-fits on resize, on reveal changes and whenever the content itself grows
 * (typewriter text, reveals, expanding panels).
 */
export const useFitToBox = <T extends HTMLElement>(deps: unknown[]) => {
  const ref = useRef<T>(null);
  const frame = useRef(0);

  const fit = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    // Layout height of the content, ignoring transforms: entrance animations translate
    // elements and would otherwise inflate scrollHeight for a moment.
    const contentHeight = (): number => Array.from(el.children).reduce((max, child) => {
      const c = child as HTMLElement;
      return Math.max(max, c.offsetTop - el.offsetTop + c.offsetHeight);
    }, 0);
    const fits = (zoom: number): boolean => {
      el.style.zoom = String(zoom);
      return contentHeight() <= el.clientHeight + 2;
    };
    if (fits(1)) { el.style.zoom = ''; return; }
    // Zooming out also widens the text measure, so the best zoom is found by search, not by ratio.
    let lo = MIN_ZOOM;
    let hi = 1;
    for (let i = 0; i < 7; i += 1) {
      const mid = (lo + hi) / 2;
      if (fits(mid)) lo = mid; else hi = mid;
    }
    el.style.zoom = String(Math.floor(lo * 1000) / 1000);
  }, []);

  const schedule = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(fit);
  }, [fit]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(fit, deps);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(schedule);
    Array.from(el.children).forEach((child) => observer.observe(child));
    window.addEventListener('resize', schedule);
    return () => { observer.disconnect(); window.removeEventListener('resize', schedule); cancelAnimationFrame(frame.current); };
  }, [schedule]);

  return ref;
};
