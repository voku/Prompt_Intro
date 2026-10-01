import React from 'react';
import { useFitToBox } from './useFitToBox';
import PromptComparison from './PromptComparison';
import VisualPanel from './VisualPanel';
import L2ToolboxPanel from './L2ToolboxPanel';
import LegacyBridge from './LegacyBridge';
import ChapterSlide from './ChapterSlide';
import StatementSlide from './StatementSlide';
import EndSlide from './EndSlide';
import StepIndicator from './StepIndicator';
import { CheckCircle2, ChevronsDown, Rabbit } from 'lucide-react';
import { resolveIcon } from '../iconUtils';
import { Lang, SlideData, SlideType } from '../types';

interface SlideLayoutProps { data: SlideData; isActive: boolean; isRevealed?: boolean; lang: Lang; }

const SlideLayout: React.FC<SlideLayoutProps> = ({ data, isActive, isRevealed = false, lang }) => {
  const IconComponent = resolveIcon(data.icon);
  const fitRef = useFitToBox<HTMLDivElement>([data.id, isRevealed, lang, isActive]);
  if (!isActive) return null;

  const t = (en: string | undefined, de: string | undefined): string | undefined => lang === 'de' && de ? de : en;
  const tArr = (en: string | string[] | undefined, de: string | string[] | undefined): string | string[] | undefined => lang === 'de' && de ? de : en;
  const title = t(data.title, data.titleDE) ?? data.title;
  const subtitle = t(data.subtitle, data.subtitleDE);
  const content = tArr(data.content, data.contentDE);
  const technique = t(data.technique, data.techniqueDE);
  const topic = t(data.topic, data.topicDE);
  const punchline = t(data.punchline, data.punchlineDE);
  const punchlineNext = t(data.punchlineNext, data.punchlineNextDE);
  const trainingLabel = 'PROMPT ENGINEERING · TRAINING';
  const de = lang === 'de';
  const legacyVisuals = ['legacy-recap', 'legacy-timejump'];
  // Visuals that need the full width; their text runs as a strip underneath.
  const wideVisuals = ['guidance-ladder', 'compliance-gates', 'evidence-board', 'bug-quota'];
  const visualPrefix: Record<string, string> = {
    carwash: 'LLM', unpuzzle: 'LLM', 'noise-hallucination': 'LLM', tokens: 'LLM', 'next-token': 'LLM',
    'guidance-ladder': de ? 'FÜHREN' : 'GUIDE',
    'vpn-status': de ? 'PRÜFEN' : 'VERIFY', 'bug-quota': de ? 'PRÜFEN' : 'VERIFY',
    'compliance-gates': 'COMPLIANCE', 'evidence-board': 'BONUS',
  };
  const contentLabel = data.visual && legacyVisuals.includes(data.visual)
    ? (de ? 'RECAP // WAS WAR NOCHMAL?' : 'RECAP // WHERE WERE WE?')
    : data.visual === 'toolbox'
      ? (de ? 'METHODEN // VORLAGEN' : 'METHODS // TEMPLATES')
      : data.visual && visualPrefix[data.visual]
        ? `${visualPrefix[data.visual]} // ${topic ?? ''}`
        : (de ? 'PRAXIS // METHODE' : 'PRACTICE // METHOD');
  const isToolbox = data.visual === 'toolbox';
  const compareLabel = topic
    ? `${data.step ? (de ? 'FÜHREN' : 'GUIDE') : (de ? 'PRÜFEN' : 'VERIFY')} // ${topic}`
    : (lang === 'de' ? 'PRAXIS // VORHER & NACHHER' : 'PRACTICE // BEFORE & AFTER');

  const renderTextBlock = () => {
    if (!content) return null;
    if (Array.isArray(content)) {
      const isGuidanceBlocks = content.some((p) => p.startsWith('Baustein ') || p.startsWith('Building block '));
      return (
        <div className={`grid ${isGuidanceBlocks ? 'gap-5' : 'gap-3'}`}>
          {content.map((point, index) => {
            const levelMatch = point.match(/^(?:Baustein|Building block)\s+(\d+):\s*([^(]+)(\(.*\))?$/);
            if (isGuidanceBlocks && levelMatch) {
              const [, levelNum, levelName, levelDesc] = levelMatch;
              const levelColors = [
                'border-slate-600 bg-slate-950/70 text-slate-300',
                'border-cyan-700 bg-cyan-950/40 text-cyan-200',
                'border-violet-700 bg-violet-950/40 text-violet-200',
                'border-fuchsia-600 bg-fuchsia-950/50 text-fuchsia-200 shadow-[0_0_15px_rgba(217,70,239,.15)]',
              ];
              const badgeColors = [
                'bg-slate-800 text-slate-300 border-slate-600',
                'bg-cyan-900/60 text-cyan-300 border-cyan-600',
                'bg-violet-900/60 text-violet-300 border-violet-600',
                'bg-fuchsia-900/60 text-fuchsia-300 border-fuchsia-500',
              ];
              const colorIdx = Math.min(Number(levelNum) - 1, levelColors.length - 1);
              return (
                <div
                  key={index}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-2 ${levelColors[colorIdx]} px-6 py-7 transition hover:translate-x-1`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`pixel-font border px-2.5 py-1 font-bold ${badgeColors[colorIdx]}`}>
                      {String(levelNum).padStart(2, '0')}
                    </span>
                    <span className="text-xl font-bold text-white md:text-3xl">{levelName.trim()}</span>
                  </div>
                  {levelDesc && (
                    <span className="font-mono text-sm text-slate-300 md:text-base sm:text-right">{levelDesc.trim()}</span>
                  )}
                </div>
              );
            }

            const isSolution = point.startsWith('Unsere Lösung:') || point.startsWith('Our solution:');
            const isWarning = data.icon === 'ShieldAlert';

            return (
              <div
                key={index}
                className={`flex items-start gap-3 border-l-4 px-5 py-4 transition ${
                  isSolution
                    ? 'border-emerald-500 bg-emerald-950/30'
                    : isWarning
                      ? 'border-rose-600 bg-rose-950/20'
                      : 'border-indigo-700 bg-slate-950/55'
                }`}
              >
                <span
                  className={`pixel-font mt-1 ${
                    isSolution ? 'text-emerald-300' : isWarning ? 'text-rose-400' : 'text-amber-300'
                  }`}
                >
                  0{index + 1}
                </span>
                <p className="text-base font-medium leading-relaxed text-slate-200 md:text-lg">{point}</p>
              </div>
            );
          })}
        </div>
      );
    }
    return <p className="text-lg font-medium leading-relaxed text-slate-300 md:text-xl">{content}</p>;
  };

  const renderPunchline = (className = '') => {
    if (!punchline || !isRevealed) return null;
    return (
      <div
        ref={(el) => el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}
        className={`animate-fadeIn border-2 border-fuchsia-700 bg-fuchsia-950/35 px-5 py-4 shadow-[4px_4px_0_#020617] ${className}`}>
        <div className="pixel-font text-fuchsia-300">{lang === 'de' ? 'POINTE' : 'PUNCHLINE'}</div>
        <div className="mt-2 text-lg font-black leading-snug text-white md:text-xl">{punchline}</div>
        {punchlineNext && (
          <div className="mt-3 flex items-center gap-2 border-t border-fuchsia-900 pt-3 text-base font-semibold text-cyan-200">
            <Rabbit size={18} className="shrink-0 text-cyan-300" />
            <span>{punchlineNext}</span>
          </div>
        )}
      </div>
    );
  };

  /** Horizontal strip of short takeaways under a legacy visual; the last one is the hook to the next slide. */
  const renderTakeaways = () => {
    if (!Array.isArray(content)) return null;
    return (
      <div className="stagger grid gap-3 md:grid-cols-3">
        {content.map((point, index) => {
          const isLast = index === content.length - 1;
          return (
            <div
              key={index}
              className={`relative flex items-center gap-4 border px-5 py-4 ${isLast ? 'border-fuchsia-400/60 bg-gradient-to-br from-fuchsia-950/60 to-indigo-950/60 shadow-[0_0_30px_-6px_rgba(217,70,239,.45)]' : 'border-indigo-500/30 bg-slate-950/60'}`}
            >
              <span className={`pixel-font mt-1 ${isLast ? 'text-fuchsia-300' : 'text-amber-300'}`}>{String(index + 1).padStart(2, '0')}</span>
              <p className={`text-base leading-snug md:text-lg ${isLast ? 'font-semibold text-white' : 'font-medium text-slate-200'}`}>{point}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const renderVisual = () => {
    if (data.visual === 'legacy-recap' || data.visual === 'legacy-timejump') {
      return <LegacyBridge kind={data.visual} lang={lang} />;
    }
    if (!data.visual) return null;
    return <VisualPanel kind={data.visual} lang={lang} revealed={isRevealed} />;
  };

  const renderContent = () => {
    switch (data.type) {
      case SlideType.TITLE:
        return (
          <div className="grid min-h-full items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
            <div className="animate-fadeIn">
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="pixel-font border border-fuchsia-400/60 bg-fuchsia-950/70 px-4 py-3 text-fuchsia-300">{trainingLabel}</span>
                <span className="pixel-font border border-cyan-400/40 bg-cyan-950/40 px-3 py-3 text-cyan-300">{lang === 'de' ? 'TEIL 2 // DAS SEQUEL' : 'PART 2 // THE SEQUEL'}</span>
              </div>
              <h1 className="max-w-4xl text-balance text-5xl font-bold uppercase leading-[.98] tracking-[-.03em] text-white md:text-7xl xl:text-[5.5rem]">
                Prompt <span className="text-gradient">Engineering</span> {lang === 'de' ? 'in der Praxis' : 'in practice'}
              </h1>
              <div className="my-8 h-1 w-48 bg-gradient-to-r from-fuchsia-500 via-amber-400 to-cyan-400" />
              <h2 className="lead-rule max-w-3xl pl-5 text-xl font-medium leading-relaxed text-cyan-100/90 md:text-2xl">{subtitle}</h2>
              <div className="mt-9 flex flex-wrap items-center gap-3 font-mono text-sm">
                <span className="border border-slate-600 bg-slate-950 px-4 py-2 text-slate-300">PROMPT</span>
                <span className="text-fuchsia-400">→</span>
                <span className="border border-amber-600/70 bg-amber-950/30 px-4 py-2 text-amber-200">{lang === 'de' ? 'LEITPLANKEN' : 'GUARDRAILS'}</span>
                <span className="text-fuchsia-400">→</span>
                <span className="border border-emerald-600/70 bg-emerald-950/30 px-4 py-2 text-emerald-200">{lang === 'de' ? 'WERKZEUGE' : 'TOOLS'}</span>
                <span className="text-fuchsia-400">→</span>
                <span className="border border-cyan-600/70 bg-cyan-950/30 px-4 py-2 text-cyan-200">{lang === 'de' ? 'ERGEBNISSE' : 'RESULTS'}</span>
              </div>
            </div>

            {/* Save-game card: the previous talk is cleared, this one is loading. */}
            <div className="stagger hidden flex-col gap-4 lg:flex">
              <div className="border border-emerald-400/40 bg-emerald-950/20 p-5">
                <div className="flex items-center justify-between"><span className="pixel-font text-emerald-300">{lang === 'de' ? 'LEVEL 1 // GESCHAFFT' : 'LEVEL 1 // CLEARED'}</span><CheckCircle2 size={22} className="text-emerald-300" /></div>
                <div className="mt-3 text-2xl font-bold leading-tight text-white">{lang === 'de' ? '„Willkommen in der Welt der LLMs!“' : '“Welcome to the world of LLMs!”'}</div>
                <p className="mt-2 text-sm leading-snug text-slate-400">{lang === 'de' ? 'Wie Maschinen Sprache verstehen, generieren und unterstützen.' : 'How machines understand, generate and support language.'}</p>
              </div>
              <div className="flex justify-center text-fuchsia-400"><ChevronsDown size={30} className="pixel-pulse" /></div>
              <div className="relative overflow-hidden border border-fuchsia-400/60 bg-gradient-to-br from-fuchsia-950/60 to-indigo-950/70 p-6 shadow-[0_0_44px_-8px_rgba(217,70,239,.5)]">
                <div className="flex items-center justify-between"><span className="pixel-font text-fuchsia-300">{lang === 'de' ? 'LEVEL 2 // LÄDT …' : 'LEVEL 2 // LOADING …'}</span><IconComponent size={26} className="text-cyan-300" /></div>
                <div className="mt-3 text-3xl font-bold leading-tight text-white">{title}</div>
                <div className="mt-5 h-3 border border-slate-600 bg-slate-950 p-[2px]"><div className="h-full w-[12%] bg-gradient-to-r from-fuchsia-500 to-cyan-300 pixel-pulse" /></div>
                <div className="mt-5 grid grid-cols-2 gap-2 font-mono text-xs">
                  <span className="border border-cyan-800 bg-cyan-950/30 px-3 py-2 text-cyan-200">{lang === 'de' ? 'ROLLE & KONTEXT' : 'ROLE & CONTEXT'}</span>
                  <span className="border border-emerald-800 bg-emerald-950/30 px-3 py-2 text-emerald-200">{lang === 'de' ? 'ERST ANALYSIEREN' : 'ANALYSE FIRST'}</span>
                  <span className="border border-fuchsia-800 bg-fuchsia-950/30 px-3 py-2 text-fuchsia-200">TOOLS & CODE</span>
                  <span className="border border-amber-800 bg-amber-950/30 px-3 py-2 text-amber-200">{lang === 'de' ? 'BELEGE & SICHERHEIT' : 'EVIDENCE & SAFETY'}</span>
                </div>
              </div>
              <div className="pixel-font text-center text-slate-500">{lang === 'de' ? 'LARS MOELLEKEN // WEB · SYSADMIN · PHP' : 'LARS MOELLEKEN // WEB · SYSADMIN · PHP'}</div>
            </div>
          </div>
        );

      case SlideType.STATEMENT:
        return <StatementSlide icon={data.icon} kicker={title} statement={subtitle ?? ''} points={Array.isArray(content) ? content : []} lang={lang} />;

      case SlideType.END:
        return <EndSlide title={title} subtitle={subtitle} points={Array.isArray(content) ? content : []} action={technique} lang={lang} />;

      case SlideType.CONTENT:
        return (
          <div className="flex min-h-full flex-col animate-fadeIn">
            <div className={`flex items-center gap-5 border-b border-indigo-500/25 ${isToolbox ? "mb-4 pb-3" : "mb-6 pb-5"}`}>
              <div className={`flex shrink-0 items-center justify-center border border-fuchsia-400/50 bg-gradient-to-br from-fuchsia-950/70 to-indigo-950 text-cyan-300 shadow-[0_0_28px_rgba(217,70,239,.28)] ${isToolbox ? "h-14 w-14" : "h-16 w-16 md:h-20 md:w-20"}`}><IconComponent size={34} strokeWidth={1.75} /></div>
              <div className="min-w-0">
                <div className="pixel-font mb-2 text-fuchsia-400">{contentLabel}</div>
                <h2 className={`text-balance text-3xl font-bold leading-[1.05] tracking-tight text-white ${isToolbox ? "md:text-4xl" : "md:text-5xl"}`}>{title}</h2>
              </div>
            </div>

            {subtitle && <p className={`lead-rule ${isToolbox ? "max-w-none" : "max-w-5xl"} pl-5 font-medium leading-relaxed text-cyan-100/90 ${isToolbox ? "mb-4 text-base md:text-lg" : "mb-6 text-lg md:text-xl"}`}>{subtitle}</p>}

            {data.visual === 'toolbox' ? (
              <div className="flex-grow">
                <div className="retro-panel bg-[#080d20]/75 p-4 md:p-5"><L2ToolboxPanel lang={lang} /></div>
                {content && <div className="mt-3 border-l-4 border-indigo-700 bg-slate-950/55 px-4 py-2 text-sm font-medium text-slate-300">{typeof content === 'string' ? content : content.join(' ')}</div>}
              </div>
            ) : data.visual && legacyVisuals.includes(data.visual) ? (
              <div className="flex flex-grow flex-col gap-5">
                <div className="flex flex-grow flex-col [&>*]:flex-1">{renderVisual()}</div>
                {renderTakeaways()}
              </div>
            ) : data.visual && wideVisuals.includes(data.visual) ? (
              <div className="flex flex-grow flex-col justify-center gap-5">
                <div className="retro-panel bg-[#080d20]/75 p-5 md:p-7">
                  {renderVisual()}
                  {renderPunchline('mt-4')}
                </div>
                {renderTakeaways()}
              </div>
            ) : data.visual ? (
              <div className="grid flex-grow gap-6 lg:grid-cols-[1.6fr_.7fr] lg:items-center">
                <div className="retro-panel bg-[#080d20]/75 p-5 md:p-7">
                  {renderVisual()}
                  {renderPunchline('mt-4')}
                </div>
                <div>{renderTextBlock()}</div>
              </div>
            ) : (
              <div className="flex-grow">{renderTextBlock()}</div>
            )}

          </div>
        );

      case SlideType.CHAPTER:
        return <ChapterSlide chapter={data.chapter ?? 1} icon={data.icon} title={title} subtitle={subtitle} lang={lang} />;

      case SlideType.COMPARISON:
        return (
          <div className="flex min-h-full flex-col animate-fadeIn">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-fuchsia-400/50 bg-gradient-to-br from-fuchsia-950/70 to-indigo-950 text-cyan-300 shadow-[0_0_24px_rgba(217,70,239,.25)]"><IconComponent size={30} /></div>
              <div className="min-w-0 flex-1">
                <div className="pixel-font mb-2 uppercase text-fuchsia-400">{compareLabel}</div>
                <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">{title}</h2>
              </div>
              {data.step && <StepIndicator step={data.step} lang={lang} />}
            </div>
            {subtitle && <p className="lead-rule mb-5 pl-5 text-lg font-medium text-cyan-100/90 md:text-xl">{subtitle}</p>}
            <div className="flex flex-grow flex-col justify-center">
              <PromptComparison
                standard={(lang === 'de' && data.codeStandardDE ? data.codeStandardDE : data.codeStandard) ?? ''}
                optimized={(lang === 'de' && data.codeOptimizedDE ? data.codeOptimizedDE : data.codeOptimized) ?? ''}
                technique={technique ?? (lang === 'de' ? 'Praxisfall' : 'Example')}
                description={typeof content === 'string' ? content : ''}
                lang={lang}
                workOrder={lang === 'de' && data.codeWorkOrderDE ? data.codeWorkOrderDE : data.codeWorkOrder}
                result={lang === 'de' && data.codeResultDE ? data.codeResultDE : data.codeResult}
              />
              {renderPunchline('mt-5')}
            </div>
          </div>
        );

      default:
        return <div>Unknown Slide Type</div>;
    }
  };

  return (
    <section className="retro-panel hud relative mx-auto h-full min-h-0 w-full overflow-hidden bg-[#0a0f22]/90 p-6 backdrop-blur-sm md:p-9 lg:px-12 lg:py-10">
      <div className="pointer-events-none absolute right-5 top-4 pixel-font text-indigo-500/70">SYS://PROMPT_INTRO</div>
      <div ref={fitRef} className="h-full overflow-hidden">{renderContent()}</div>
    </section>
  );
};

export default SlideLayout;