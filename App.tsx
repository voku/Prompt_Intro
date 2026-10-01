import React, { useEffect, useRef, useState } from 'react';
import { BrainCircuit, ChevronLeft, ChevronRight, Clock, Github, LayoutGrid, Maximize, Presentation, X } from 'lucide-react';
import SlideLayout from './components/SlideLayout';
import { SLIDES } from './constants';
import { INTRO_SLIDES } from './introSlides';
import { Lang, SlideType } from './types';
import { resolveIcon } from './iconUtils';

const ALL_SLIDES = [...INTRO_SLIDES, ...SLIDES];

/** `#vorlagen` → slide with that anchor, `#12` → slide 12; anything else → first slide. */
const slideIndexFromHash = (hash: string): number => {
  const key = decodeURIComponent(hash.replace(/^#/, ''));
  if (!key) return 0;
  const byAnchor = ALL_SLIDES.findIndex((slide) => slide.anchor === key);
  if (byAnchor >= 0) return byAnchor;
  const n = Number(key);
  return Number.isInteger(n) && n >= 1 && n <= ALL_SLIDES.length ? n - 1 : 0;
};

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(() => slideIndexFromHash(window.location.hash));
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isRevealVisible, setIsRevealVisible] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [lang, setLang] = useState<Lang>('de');
  const [isPresenting, setIsPresenting] = useState(() => new URLSearchParams(window.location.search).has('present'));
  const [isChromeVisible, setIsChromeVisible] = useState(true);
  const [isCursorHidden, setIsCursorHidden] = useState(false);
  const [showPresentHint, setShowPresentHint] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number } | null>(null);
  const slides = ALL_SLIDES;
  const safeSlideCount = Math.max(slides.length, 1);
  const safeCurrentSlideIndex = Math.min(currentSlideIndex, safeSlideCount - 1);
  const currentSlide = slides[safeCurrentSlideIndex];
  const hasCurrentReveal = Boolean(currentSlide?.punchline);
  const progress = slides.length > 0 ? ((safeCurrentSlideIndex + 1) / slides.length) * 100 : 0;
  const nextSlide = (): void => {
    if (hasCurrentReveal && !isRevealVisible) {
      setIsRevealVisible(true);
      return;
    }
    if (safeCurrentSlideIndex < slides.length - 1) {
      setIsRevealVisible(false);
      setCurrentSlideIndex((v) => v + 1);
    }
  };
  const prevSlide = (): void => {
    if (hasCurrentReveal && isRevealVisible) {
      setIsRevealVisible(false);
      return;
    }
    if (safeCurrentSlideIndex > 0) {
      setIsRevealVisible(false);
      setCurrentSlideIndex((v) => v - 1);
    }
  };
  const handleTouchStart = (event: React.TouchEvent<HTMLElement>): void => { if (isGridOpen || event.touches.length !== 1) { touchStartRef.current = null; touchEndRef.current = null; return; } const t = event.touches[0]; touchStartRef.current = { x: t.clientX, y: t.clientY }; touchEndRef.current = null; };
  const handleTouchMove = (event: React.TouchEvent<HTMLElement>): void => { if (!touchStartRef.current || event.touches.length !== 1) return; const t = event.touches[0]; touchEndRef.current = { x: t.clientX, y: t.clientY }; };
  const handleTouchEnd = (): void => { if (!touchStartRef.current || !touchEndRef.current) { touchStartRef.current = null; touchEndRef.current = null; return; } const dx = touchEndRef.current.x - touchStartRef.current.x; const dy = touchEndRef.current.y - touchStartRef.current.y; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) dx < 0 ? nextSlide() : prevSlide(); touchStartRef.current = null; touchEndRef.current = null; };
  const toggleFullscreen = (): void => { if (!document.fullscreenElement) { void document.documentElement.requestFullscreen(); return; } if (document.exitFullscreen) void document.exitFullscreen(); };
  useEffect(() => { const interval = window.setInterval(() => setElapsedSeconds((s) => s + 1), 1000); return () => window.clearInterval(interval); }, []);
  // Without header/footer there is room: scale rem-based type up a notch on large screens.
  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = isPresenting && window.innerWidth >= 1600 ? '112.5%' : '';
    return () => { root.style.fontSize = ''; };
  }, [isPresenting]);
  useEffect(() => {
    if (!isPresenting) { setIsChromeVisible(true); setIsCursorHidden(false); return; }
    setIsChromeVisible(false);
    setShowPresentHint(true);
    const hintTimer = window.setTimeout(() => setShowPresentHint(false), 4000);
    let cursorTimer = window.setTimeout(() => setIsCursorHidden(true), 2500);
    const onMove = (event: MouseEvent): void => {
      // Controls slide in only when the pointer touches the top or bottom edge.
      setIsChromeVisible(event.clientY < 64 || event.clientY > window.innerHeight - 84);
      setIsCursorHidden(false);
      window.clearTimeout(cursorTimer);
      cursorTimer = window.setTimeout(() => setIsCursorHidden(true), 2500);
    };
    window.addEventListener('mousemove', onMove);
    return () => { window.removeEventListener('mousemove', onMove); window.clearTimeout(hintTimer); window.clearTimeout(cursorTimer); };
  }, [isPresenting]);
  // Keep the address bar in sync so every slide can be linked (and the QR code can point at the templates).
  useEffect(() => {
    const slide = slides[safeCurrentSlideIndex];
    const hash = `#${slide?.anchor ?? safeCurrentSlideIndex + 1}`;
    if (window.location.hash !== hash) window.history.replaceState(null, '', hash);
  }, [safeCurrentSlideIndex, slides]);
  useEffect(() => {
    const onHash = (): void => { setCurrentSlideIndex(slideIndexFromHash(window.location.hash)); setIsRevealVisible(false); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useEffect(() => { setCurrentSlideIndex((i) => Math.min(i, Math.max(slides.length - 1, 0))); }, [slides.length]);
  useEffect(() => { const handleKeyDown = (event: KeyboardEvent): void => { const tag = document.activeElement?.tagName.toLowerCase(); if (tag === 'input' || tag === 'textarea') return; if (event.key === 'ArrowRight') nextSlide(); if (event.key === 'ArrowLeft') prevSlide(); if (event.key === ' ' && !isGridOpen) { event.preventDefault(); nextSlide(); } if ((event.key === 'p' || event.key === 'P') && !event.metaKey && !event.ctrlKey) setIsPresenting((v) => !v); if (event.key === 'Escape') { if (isGridOpen) setIsGridOpen(false); else if (isPresenting) setIsPresenting(false); } }; window.addEventListener('keydown', handleKeyDown); return () => window.removeEventListener('keydown', handleKeyDown); }, [currentSlideIndex, isGridOpen, isRevealVisible, isPresenting, slides.length]);
  const formatTime = (seconds: number): string => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  const prevLabel = lang === 'de' ? 'ZURÜCK' : 'BACK';
  const nextLabel = lang === 'de' ? 'WEITER' : 'NEXT';
  const overviewLabel = lang === 'de' ? 'ÜBERSICHT' : 'OVERVIEW';
  const presentLabel = lang === 'de' ? 'PRÄSENTATIONSMODUS (P)' : 'PRESENTATION MODE (P)';
  const fullscreenLabel = lang === 'de' ? 'VOLLBILD' : 'FULLSCREEN';
  const slideLabel = lang === 'de' ? 'FOLIE' : 'STAGE';
  const progressLabel = lang === 'de' ? 'FORTSCHRITT' : 'PROGRESS';
  const deckTitle = 'PROMPT ENGINEERING IN DER PRAXIS';

  const segmentTitle = (slide: (typeof slides)[number]): string => (lang === 'de' && slide.titleDE ? slide.titleDE : slide.title);

  return (
    <div className={`retro-stage relative flex h-screen flex-col overflow-hidden text-slate-100 selection:bg-fuchsia-500 selection:text-white ${isPresenting && isCursorHidden ? 'cursor-none' : ''}`}>
      <header className={`z-50 bg-[#070a19]/90 backdrop-blur-md transition-transform duration-300 border-b border-indigo-500/25 px-4 py-2.5 md:px-7 ${isPresenting ? 'absolute inset-x-0 top-0 shadow-2xl ' + (isChromeVisible ? 'translate-y-0' : '-translate-y-full') : 'relative'}`}>
        <div className="mx-auto flex max-w-[1560px] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-cyan-400/40 bg-gradient-to-br from-indigo-950 to-fuchsia-950/60 text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,.25)]"><BrainCircuit size={21} /></div>
            <div className="hidden md:block"><div className="pixel-font text-fuchsia-400">PROMPT // AI QUEST</div><div className="display truncate text-sm font-bold tracking-[.14em] text-white">{deckTitle}</div></div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden items-center gap-3 font-mono text-xs text-cyan-300 xl:flex"><span className="tracking-widest text-rose-400">♥♥♥</span><span className="text-slate-500">XP</span><div className="h-2.5 w-28 overflow-hidden border border-slate-600 bg-slate-950"><div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-300 transition-all duration-500" style={{ width: `${progress}%` }} /></div></div>
            <div className="hidden items-center gap-2 border-l border-indigo-500/25 pl-3 font-mono text-xs tabular-nums text-slate-400 sm:flex"><Clock size={14} />{formatTime(elapsedSeconds)}</div>
            <span className="pixel-font hidden rounded-sm border border-amber-400/30 bg-amber-950/20 px-2 py-1 tabular-nums text-amber-300 sm:inline">{String(safeCurrentSlideIndex + 1).padStart(2, '0')}/{String(slides.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => setLang((v) => v === 'en' ? 'de' : 'en')} aria-label="Language" className="retro-button bg-slate-900/80 px-3 py-2 font-mono text-xs font-bold text-cyan-300">{lang === 'en' ? 'DE' : 'EN'}</button>
            <button type="button" onClick={() => setIsGridOpen((v) => !v)} className="retro-button bg-slate-900/80 p-2 text-fuchsia-300" title={overviewLabel} aria-label={overviewLabel}>{isGridOpen ? <X size={19} /> : <LayoutGrid size={19} />}</button>
            <button type="button" onClick={() => setIsPresenting(true)} className="retro-button bg-slate-900/80 p-2 text-amber-300" title={presentLabel} aria-label={presentLabel}><Presentation size={19} /></button>
            <button type="button" onClick={toggleFullscreen} className="retro-button bg-slate-900/80 p-2 text-cyan-300" title={fullscreenLabel} aria-label={fullscreenLabel}><Maximize size={19} /></button>
            <a href="https://github.com/voku/Prompt_Intro" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="retro-button hidden bg-slate-900/80 p-2 text-slate-300 md:block"><Github size={19} /></a>
          </div>
        </div>
      </header>

      <main className={`relative z-10 flex min-h-0 flex-1 justify-center ${isPresenting ? "p-2 md:p-4" : "px-3 py-3 md:px-7 md:py-5"}`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div className={`flex min-h-0 w-full ${isPresenting ? "max-w-none" : "max-w-[1560px]"} justify-center transition-opacity duration-200 ${isGridOpen ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
          {currentSlide && <SlideLayout key={safeCurrentSlideIndex} data={currentSlide} isActive={!isGridOpen} isRevealed={isRevealVisible} lang={lang} />}
        </div>
        {isGridOpen && <div className="absolute inset-0 z-40 overflow-y-auto bg-[#050816]/95 p-6 backdrop-blur-sm animate-fadeIn"><div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{slides.map((slide, index) => { const Icon = resolveIcon(slide.icon); const title = segmentTitle(slide); return <button key={slide.id} type="button" onClick={() => { setCurrentSlideIndex(index); setIsRevealVisible(false); setIsGridOpen(false); }} className={`retro-panel group relative flex min-h-44 flex-col items-start p-5 text-left transition ${safeCurrentSlideIndex === index ? 'bg-indigo-950 text-white' : 'bg-slate-950/90 text-slate-400 hover:bg-slate-900 hover:text-white'}`}><div className="mb-4 border border-indigo-700 bg-slate-900 p-2 text-cyan-300"><Icon size={22} /></div><span className="pixel-font mb-3 text-fuchsia-400">{slideLabel} {String(index + 1).padStart(2, '0')}</span><h3 className="font-bold leading-tight">{title}</h3>{safeCurrentSlideIndex === index && <span className="pixel-pulse absolute right-3 top-3 h-2 w-2 bg-emerald-400" />}</button>; })}</div></div>}
      </main>

      <footer className={`z-50 bg-[#070a19]/90 backdrop-blur-md transition-transform duration-300 border-t border-indigo-500/25 px-3 py-3 md:px-7 ${isPresenting ? 'absolute inset-x-0 bottom-0 shadow-2xl ' + (isChromeVisible ? 'translate-y-0' : 'translate-y-full') : 'relative'}`}>
        <div className="mx-auto flex max-w-[1560px] items-center justify-between gap-3 md:gap-6">
          <button type="button" onClick={prevSlide} disabled={safeCurrentSlideIndex === 0} className="retro-button flex items-center gap-2 bg-slate-900/80 px-4 py-2 font-mono text-xs font-bold text-slate-200 disabled:opacity-30"><ChevronLeft size={18} /><span className="hidden sm:inline">{prevLabel}</span></button>
          <div className="flex min-w-0 flex-grow items-center gap-4" role="navigation" aria-label={progressLabel}>
            <div className="flex h-6 flex-grow items-center gap-[3px]">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => { setCurrentSlideIndex(index); setIsRevealVisible(false); }}
                  title={`${String(index + 1).padStart(2, '0')} · ${segmentTitle(slide)}`}
                  aria-label={`${slideLabel} ${index + 1}`}
                  aria-current={index === safeCurrentSlideIndex}
                  className={`group flex h-full flex-1 items-center ${slide.type === SlideType.CHAPTER ? "ml-2" : ""}`}
                >
                  <span className={`block w-full transition-all duration-300 ${index === safeCurrentSlideIndex ? 'h-3 bg-gradient-to-r from-fuchsia-400 to-cyan-300 shadow-[0_0_12px_rgba(217,70,239,.7)]' : index < safeCurrentSlideIndex ? 'h-1.5 bg-violet-500/80 group-hover:h-3' : 'h-1.5 bg-slate-700/80 group-hover:h-3 group-hover:bg-slate-500'}`} />
                </button>
              ))}
            </div>
            <span className="pixel-font hidden shrink-0 text-slate-500 lg:inline">{Math.round(progress)}%</span>
          </div>
          <button type="button" onClick={nextSlide} disabled={safeCurrentSlideIndex === slides.length - 1 || slides.length === 0} className="retro-button flex items-center gap-2 border-fuchsia-400/60 bg-gradient-to-r from-fuchsia-700 to-violet-600 px-4 py-2 font-mono text-xs font-bold text-white disabled:opacity-30">{nextLabel}<ChevronRight size={18} /></button>
        </div>
      </footer>
      {isPresenting && !isChromeVisible && <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-[3px] bg-slate-900/60"><div className="h-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 transition-all duration-500" style={{ width: `${progress}%` }} /></div>}
      {showPresentHint && <div role="status" className="pointer-events-none absolute bottom-10 left-1/2 z-[70] -translate-x-1/2 animate-fadeIn border border-cyan-400/50 bg-[#070a19]/95 px-5 py-3 text-center font-mono text-sm text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,.25)]">{lang === 'de' ? 'Präsentationsmodus · P oder Esc beendet ihn · Maus an den oberen/unteren Rand zeigt die Steuerung' : 'Presentation mode · P or Esc exits · move the mouse to the top/bottom edge for controls'}</div>}
    </div>
  );
};

export default App;