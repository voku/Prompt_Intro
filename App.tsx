import React, { useEffect, useState, useRef } from 'react';
import { BrainCircuit, ChevronLeft, ChevronRight, Clock, Github, LayoutGrid, Maximize, X } from 'lucide-react';
import SlideLayout from './components/SlideLayout';
import { SLIDES } from './constants';
import { resolveIcon } from './iconUtils';
import { Lang } from './types';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [lang, setLang] = useState<Lang>('en');
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number } | null>(null);

  const nextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex((previous) => previous + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((previous) => previous - 1);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    if (isGridOpen || event.touches.length !== 1) {
      touchStartRef.current = null;
      touchEndRef.current = null;
      return;
    }

    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchEndRef.current = null;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLElement>) => {
    if (!touchStartRef.current || event.touches.length !== 1) {
      return;
    }

    const touch = event.touches[0];
    touchEndRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) {
      touchStartRef.current = null;
      touchEndRef.current = null;
      return;
    }

    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = touchEndRef.current.y - touchStartRef.current.y;
    const isHorizontalSwipe = Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4;

    if (isHorizontalSwipe) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen();
      return;
    }

    if (document.exitFullscreen) {
      void document.exitFullscreen();
    }
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') {
        return;
      }

      if (event.key === 'ArrowRight') {
        nextSlide();
      }
      if (event.key === 'ArrowLeft') {
        prevSlide();
      }
      if (event.key === ' ' && !isGridOpen) {
        event.preventDefault();
        nextSlide();
      }
      if (event.key === 'Escape' && isGridOpen) {
        setIsGridOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, isGridOpen]);

  const currentSlide = SLIDES[currentSlideIndex];
  const progress = ((currentSlideIndex + 1) / SLIDES.length) * 100;
  const prevLabel = lang === 'de' ? 'Zurück' : 'Back';
  const nextLabel = lang === 'de' ? 'Weiter' : 'Next';
  const overviewLabel = lang === 'de' ? 'Übersicht' : 'Overview';
  const deckTitle = lang === 'de' ? 'Operatives Prompting' : 'Operational Prompting';

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-gray-900 selection:bg-blue-200">
      <div className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-blue-600 text-white shadow-md">
            <BrainCircuit size={18} />
          </div>
          <span className="hidden font-semibold tracking-tight text-gray-700 md:inline">{deckTitle}</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="mr-2 hidden items-center border-r border-gray-200 pr-4 font-mono text-xs text-gray-400 md:flex">
            <Clock size={14} className="mr-2" />
            {formatTime(elapsedSeconds)}
          </div>

          <span className="hidden font-mono text-sm text-gray-500 sm:inline">
            {currentSlideIndex + 1} / {SLIDES.length}
          </span>

          <div className="mx-2 hidden h-6 w-px bg-gray-200 sm:block"></div>

          <button
            onClick={() => setLang((value) => (value === 'en' ? 'de' : 'en'))}
            className="rounded-lg border border-gray-200 px-3 py-1 font-mono text-xs font-bold tracking-widest text-gray-600 transition-colors hover:bg-gray-100"
            title={lang === 'en' ? 'Switch to Deutsch' : 'Switch to English'}
          >
            {lang === 'en' ? 'DE' : 'EN'}
          </button>

          <button
            onClick={() => setIsGridOpen((value) => !value)}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
            title={isGridOpen ? (lang === 'de' ? 'Übersicht schließen' : 'Close overview') : overviewLabel}
          >
            {isGridOpen ? <X size={20} /> : <LayoutGrid size={20} />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
            title={lang === 'de' ? 'Vollbild' : 'Fullscreen'}
          >
            <Maximize size={20} />
          </button>

          <a
            href="https://github.com/voku/Prompt_Intro"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
            title="Contribute on GitHub"
          >
            <Github size={20} />
          </a>
        </div>
      </div>

      <main
        className="relative flex flex-grow items-center justify-center overflow-hidden p-4 md:p-8"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={`flex h-full w-full justify-center transition-opacity duration-300 ${isGridOpen ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
          <SlideLayout key={currentSlideIndex} data={currentSlide} isActive={!isGridOpen} lang={lang} />
        </div>

        {!isGridOpen && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-500 shadow-sm md:hidden">
            {lang === 'de' ? 'Wischen zum Navigieren' : 'Swipe to navigate'}
          </div>
        )}

        {isGridOpen && (
          <div className="absolute inset-0 z-40 overflow-y-auto bg-slate-50/95 p-8 backdrop-blur-sm animate-fadeIn">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {SLIDES.map((slide, index) => {
                const IconComponent = resolveIcon(slide.icon);
                const slideTitle = lang === 'de' && slide.titleDE ? slide.titleDE : slide.title;
                const slideLabel = lang === 'de' ? 'Folie' : 'Slide';

                return (
                  <button
                    key={slide.id}
                    onClick={() => {
                      setCurrentSlideIndex(index);
                      setIsGridOpen(false);
                    }}
                    className={`group relative flex flex-col items-start rounded-xl border-2 p-6 text-left transition-all duration-200 ${
                      currentSlideIndex === index
                        ? 'scale-[1.02] border-blue-500 bg-white shadow-lg'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className={`mb-4 rounded-lg p-2 ${currentSlideIndex === index ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-500'}`}>
                      <IconComponent size={24} />
                    </div>
                    <span className="mb-2 text-xs font-mono text-gray-400">{slideLabel} {index + 1}</span>
                    <h3 className={`font-bold leading-tight ${currentSlideIndex === index ? 'text-gray-900' : 'text-gray-600'}`}>
                      {slideTitle}
                    </h3>
                    {currentSlideIndex === index && (
                      <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white/90 p-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="flex items-center space-x-2 rounded-lg px-6 py-2 font-medium text-gray-700 transition-all active:scale-95 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={20} />
            <span>{prevLabel}</span>
          </button>

          <div
            className="group mx-8 h-2 flex-grow cursor-pointer overflow-hidden rounded-full bg-gray-200"
            onClick={() => setIsGridOpen(true)}
            title={overviewLabel}
          >
            <div
              className="relative h-full bg-blue-600 transition-all duration-500 ease-out group-hover:bg-blue-500"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-0 h-full w-2 animate-pulse bg-blue-400 opacity-0 group-hover:opacity-100"></div>
            </div>
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === SLIDES.length - 1}
            className="flex items-center space-x-2 rounded-lg bg-gray-900 px-6 py-2 font-medium text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <span>{nextLabel}</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
