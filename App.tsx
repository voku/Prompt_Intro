import React, { useState, useEffect, useRef } from 'react';
import { SLIDES } from './constants';
import SlideLayout from './components/SlideLayout';
import { ChevronLeft, ChevronRight, LayoutGrid, Maximize, X, Clock, Github } from 'lucide-react';
import * as Icons from 'lucide-react';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Timer Effect
  useEffect(() => {
      const interval = setInterval(() => {
          setElapsedSeconds(s => s + 1);
      }, 1000);
      return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number) => {
      const minutes = Math.floor(secs / 60);
      const remainingSeconds = secs % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === ' ' && !isGridOpen) {
        e.preventDefault(); // Prevent scroll
        nextSlide();
      }
      if (e.key === 'Escape') {
          if (isGridOpen) setIsGridOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, isGridOpen]);

  const currentSlide = SLIDES[currentSlideIndex];
  const progress = ((currentSlideIndex + 1) / SLIDES.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-gray-900 font-sans selection:bg-red-200">
      
      {/* Header / Nav Bar */}
      <div className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center text-white font-bold text-xs shadow-md">R</div>
            <span className="font-semibold text-gray-700 tracking-tight hidden md:inline">REMONDIS Digital Training</span>
        </div>
        
        <div className="flex items-center space-x-4">
             {/* Timer */}
             <div className="hidden md:flex items-center text-gray-400 font-mono text-xs border-r border-gray-200 pr-4 mr-2">
                <Clock size={14} className="mr-2" />
                {formatTime(elapsedSeconds)}
             </div>

             <span className="text-sm text-gray-500 font-mono hidden sm:inline">
                {currentSlideIndex + 1} / {SLIDES.length}
             </span>
             
             <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block"></div>

             <button 
               onClick={() => setIsGridOpen(!isGridOpen)}
               className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
               title={isGridOpen ? "Close Overview" : "Slide Overview"}
             >
                {isGridOpen ? <X size={20} /> : <LayoutGrid size={20} />}
             </button>

             <button 
               onClick={toggleFullscreen}
               className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
               title="Fullscreen"
             >
                <Maximize size={20} />
             </button>

             <a
               href="https://github.com/voku/Prompt_Intro"
               target="_blank"
               rel="noopener noreferrer"
               className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
               title="Contribute on GitHub"
             >
               <Github size={20} />
             </a>
        </div>
      </div>

      {/* Main Content Area */}
      <main ref={mainRef} className="flex-grow flex items-center justify-center p-4 md:p-8 overflow-hidden relative">
         {/* Slide View */}
         <div className={`w-full h-full flex justify-center transition-opacity duration-300 ${isGridOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <SlideLayout key={currentSlideIndex} data={currentSlide} isActive={!isGridOpen} />
         </div>

         {/* Grid Overview Overlay */}
         {isGridOpen && (
             <div className="absolute inset-0 bg-slate-50/95 backdrop-blur-sm z-40 overflow-y-auto p-8 animate-fadeIn">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {SLIDES.map((slide, idx) => {
                         const IconComp = slide.icon && (Icons as any)[slide.icon] ? (Icons as any)[slide.icon] : Icons.HelpCircle;
                         return (
                             <button
                                key={slide.id}
                                onClick={() => {
                                    setCurrentSlideIndex(idx);
                                    setIsGridOpen(false);
                                }}
                                className={`
                                    relative flex flex-col items-start p-6 rounded-xl border-2 transition-all duration-200 text-left group
                                    ${currentSlideIndex === idx 
                                        ? 'border-red-500 bg-white shadow-lg scale-[1.02]' 
                                        : 'border-gray-200 bg-white hover:border-red-300 hover:shadow-md'
                                    }
                                `}
                             >
                                <div className={`mb-4 p-2 rounded-lg ${currentSlideIndex === idx ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500 group-hover:text-red-500 group-hover:bg-red-50'}`}>
                                    <IconComp size={24} />
                                </div>
                                <span className="text-xs font-mono text-gray-400 mb-2">Slide {idx + 1}</span>
                                <h3 className={`font-bold leading-tight ${currentSlideIndex === idx ? 'text-gray-900' : 'text-gray-600'}`}>
                                    {slide.title}
                                </h3>
                                {currentSlideIndex === idx && (
                                    <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                )}
                             </button>
                         );
                    })}
                </div>
             </div>
         )}
      </main>

      {/* Bottom Navigation Control */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm border-t border-gray-200 p-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
           
           <button 
             onClick={prevSlide}
             disabled={currentSlideIndex === 0}
             className="flex items-center space-x-2 px-6 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-gray-700 font-medium active:scale-95"
           >
             <ChevronLeft size={20} />
             <span>Zurück</span>
           </button>

           {/* Progress Bar */}
           <div className="flex-grow mx-8 h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer group" onClick={() => setIsGridOpen(true)} title="Show all slides">
              <div 
                className="h-full bg-red-600 transition-all duration-500 ease-out group-hover:bg-red-500 relative" 
                style={{ width: `${progress}%` }}
              >
                  <div className="absolute right-0 top-0 h-full w-2 bg-red-400 opacity-0 group-hover:opacity-100 animate-pulse"></div>
              </div>
           </div>

           <button 
             onClick={nextSlide}
             disabled={currentSlideIndex === SLIDES.length - 1}
             className="flex items-center space-x-2 px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all font-medium shadow-lg hover:shadow-xl transform active:scale-95"
           >
             <span>Weiter</span>
             <ChevronRight size={20} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default App;