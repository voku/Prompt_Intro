import React, { useEffect, useRef, useState } from 'react';
import { BrainCircuit, ChevronLeft, ChevronRight, Clock, Github, LayoutGrid, Maximize, X } from 'lucide-react';
import SlideLayout from './components/SlideLayout';
import { SLIDES } from './constants';
import { INTRO_SLIDES } from './introSlides';
import { Lang } from './types';
import { resolveIcon } from './iconUtils';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [lang, setLang] = useState<Lang>('de');
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number } | null>(null);
  const slides = [...INTRO_SLIDES, ...SLIDES];
  const safeSlideCount = Math.max(slides.length, 1);
  const safeCurrentSlideIndex = Math.min(currentSlideIndex, safeSlideCount - 1);
  const currentSlide = slides[safeCurrentSlideIndex];
  const progress = slides.length > 0 ? ((safeCurrentSlideIndex + 1) / slides.length) * 100 : 0;
  const nextSlide = (): void => { if (safeCurrentSlideIndex < slides.length - 1) setCurrentSlideIndex((v) => v + 1); };
  const prevSlide = (): void => { if (safeCurrentSlideIndex > 0) setCurrentSlideIndex((v) => v - 1); };
  const handleTouchStart = (event: React.TouchEvent<HTMLElement>): void => { if (isGridOpen || event.touches.length !== 1) { touchStartRef.current = null; touchEndRef.current = null; return; } const t = event.touches[0]; touchStartRef.current = { x: t.clientX, y: t.clientY }; touchEndRef.current = null; };
  const handleTouchMove = (event: React.TouchEvent<HTMLElement>): void => { if (!touchStartRef.current || event.touches.length !== 1) return; const t = event.touches[0]; touchEndRef.current = { x: t.clientX, y: t.clientY }; };
  const handleTouchEnd = (): void => { if (!touchStartRef.current || !touchEndRef.current) { touchStartRef.current = null; touchEndRef.current = null; return; } const dx = touchEndRef.current.x - touchStartRef.current.x; const dy = touchEndRef.current.y - touchStartRef.current.y; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) dx < 0 ? nextSlide() : prevSlide(); touchStartRef.current = null; touchEndRef.current = null; };
  const toggleFullscreen = (): void => { if (!document.fullscreenElement) { void document.documentElement.requestFullscreen(); return; } if (document.exitFullscreen) void document.exitFullscreen(); };
  useEffect(() => { const interval = window.setInterval(() => setElapsedSeconds((s) => s + 1), 1000); return () => window.clearInterval(interval); }, []);
  useEffect(() => { setCurrentSlideIndex((i) => Math.min(i, Math.max(slides.length - 1, 0))); }, [slides.length]);
  useEffect(() => { const handleKeyDown = (event: KeyboardEvent): void => { const tag = document.activeElement?.tagName.toLowerCase(); if (tag === 'input' || tag === 'textarea') return; if (event.key === 'ArrowRight') nextSlide(); if (event.key === 'ArrowLeft') prevSlide(); if (event.key === ' ' && !isGridOpen) { event.preventDefault(); nextSlide(); } if (event.key === 'Escape' && isGridOpen) setIsGridOpen(false); }; window.addEventListener('keydown', handleKeyDown); return () => window.removeEventListener('keydown', handleKeyDown); }, [currentSlideIndex, isGridOpen, slides.length]);
  const formatTime = (seconds: number): string => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  const prevLabel = lang === 'de' ? 'ZURÜCK' : 'BACK';
  const nextLabel = lang === 'de' ? 'WEITER' : 'NEXT';
  const overviewLabel = lang === 'de' ? 'ÜBERSICHT' : 'OVERVIEW';
  const fullscreenLabel = lang === 'de' ? 'VOLLBILD' : 'FULLSCREEN';
  const slideLabel = lang === 'de' ? 'FOLIE' : 'STAGE';
  const progressLabel = lang === 'de' ? 'FORTSCHRITT' : 'PROGRESS';
  const deckTitle = lang === 'de' ? 'VON PLAUSIBLEN ANTWORTEN ZU BELASTBARER ARBEIT' : 'FROM PLAUSIBLE ANSWERS TO RELIABLE WORK';

  return (
    <div className="retro-stage flex min-h-screen flex-col text-slate-100 selection:bg-fuchsia-500 selection:text-white">
      <header className="sticky top-0 z-50 border-b-2 border-indigo-900 bg-[#070a19]/95 px-4 py-3 shadow-[0_4px_0_#020617] backdrop-blur md:px-7">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="retro-panel flex h-10 w-10 shrink-0 items-center justify-center bg-indigo-950 text-cyan-300"><BrainCircuit size={21} /></div>
            <div className="hidden md:block"><div className="pixel-font text-[10px] leading-5 text-fuchsia-400">V0KU // LLM QUEST</div><div className="truncate text-sm font-extrabold tracking-[.12em] text-white">{deckTitle}</div></div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden items-center gap-2 font-mono text-xs text-cyan-300 lg:flex"><span className="text-rose-400">♥ ♥ ♥</span><span className="text-slate-500">XP</span><div className="h-3 w-28 border-2 border-slate-600 bg-slate-950 p-[1px]"><div className="h-full bg-emerald-400" style={{ width: `${progress}%` }} /></div></div>
            <div className="hidden items-center gap-2 border-l border-indigo-900 pl-3 font-mono text-xs text-slate-400 sm:flex"><Clock size={14} />{formatTime(elapsedSeconds)}</div>
            <span className="pixel-font hidden text-[9px] text-amber-300 sm:inline">{String(safeCurrentSlideIndex + 1).padStart(2, '0')}/{String(slides.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => setLang((v) => v === 'en' ? 'de' : 'en')} className="retro-button bg-slate-900 px-3 py-2 font-mono text-xs font-bold text-cyan-300">{lang === 'en' ? 'DE' : 'EN'}</button>
            <button type="button" onClick={() => setIsGridOpen((v) => !v)} className="retro-button bg-slate-900 p-2 text-fuchsia-300" title={overviewLabel}>{isGridOpen ? <X size={19} /> : <LayoutGrid size={19} />}</button>
            <button type="button" onClick={toggleFullscreen} className="retro-button bg-slate-900 p-2 text-cyan-300" title={fullscreenLabel}><Maximize size={19} /></button>
            <a href="https://github.com/voku/Prompt_Intro" target="_blank" rel="noopener noreferrer" className="retro-button hidden bg-slate-900 p-2 text-slate-300 md:block"><Github size={19} /></a>
          </div>
        </div>
      </header>

      <main className="relative flex flex-grow items-center justify-center overflow-hidden px-3 pb-24 pt-4 md:px-7 md:pb-28 md:pt-6" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div className={`flex h-full w-full justify-center transition-opacity duration-200 ${isGridOpen ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
          {currentSlide && <SlideLayout key={safeCurrentSlideIndex} data={currentSlide} isActive={!isGridOpen} lang={lang} />}
        </div>
        {isGridOpen && <div className="absolute inset-0 z-40 overflow-y-auto bg-[#050816]/95 p-6 backdrop-blur-sm animate-fadeIn"><div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{slides.map((slide, index) => { const Icon = resolveIcon(slide.icon); const title = lang === 'de' && slide.titleDE ? slide.titleDE : slide.title; return <button key={slide.id} type="button" onClick={() => { setCurrentSlideIndex(index); setIsGridOpen(false); }} className={`retro-panel group relative flex min-h-44 flex-col items-start p-5 text-left transition ${safeCurrentSlideIndex === index ? 'bg-indigo-950 text-white' : 'bg-slate-950/90 text-slate-400 hover:bg-slate-900'}`}><div className="mb-4 border-2 border-indigo-800 bg-slate-900 p-2 text-cyan-300"><Icon size={22} /></div><span className="pixel-font mb-3 text-[8px] text-fuchsia-400">{slideLabel} {String(index + 1).padStart(2, '0')}</span><h3 className="font-bold leading-tight">{title}</h3>{safeCurrentSlideIndex === index && <span className="pixel-pulse absolute right-3 top-3 h-2 w-2 bg-emerald-400" />}</button>; })}</div></div>}
      </main>

      <footer className="fixed bottom-0 left-0 z-50 w-full border-t-2 border-indigo-900 bg-[#070a19]/95 p-3 shadow-[0_-4px_0_#020617] backdrop-blur md:p-4">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3">
          <button type="button" onClick={prevSlide} disabled={safeCurrentSlideIndex === 0} className="retro-button flex items-center gap-2 bg-slate-900 px-4 py-2 font-mono text-xs font-bold text-slate-200 disabled:opacity-30"><ChevronLeft size={18} />{prevLabel}</button>
          <button type="button" onClick={() => setIsGridOpen(true)} className="group mx-1 flex h-5 flex-grow items-center border-2 border-indigo-900 bg-slate-950 p-[2px] md:mx-8" title={overviewLabel}><div className="h-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 transition-all duration-300" style={{ width: `${progress}%` }} /><span className="pixel-font ml-3 hidden text-[8px] text-slate-500 lg:inline">{progressLabel} {Math.round(progress)}%</span></button>
          <button type="button" onClick={nextSlide} disabled={safeCurrentSlideIndex === slides.length - 1 || slides.length === 0} className="retro-button flex items-center gap-2 bg-fuchsia-700 px-4 py-2 font-mono text-xs font-bold text-white disabled:opacity-30">{nextLabel}<ChevronRight size={18} /></button>
        </div>
      </footer>
    </div>
  );
};

export default App;
