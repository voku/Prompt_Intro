import React from 'react';
import PromptComparison from './PromptComparison';
import VisualPanel from './VisualPanel';
import L2ToolboxPanel from './L2ToolboxPanel';
import LegacyBridge from './LegacyBridge';
import { resolveIcon } from '../iconUtils';
import { Lang, SlideData, SlideType } from '../types';

interface SlideLayoutProps { data: SlideData; isActive: boolean; lang: Lang; }

const SlideLayout: React.FC<SlideLayoutProps> = ({ data, isActive, lang }) => {
  const IconComponent = resolveIcon(data.icon);
  if (!isActive) return null;

  const t = (en: string | undefined, de: string | undefined): string | undefined => lang === 'de' && de ? de : en;
  const tArr = (en: string | string[] | undefined, de: string | string[] | undefined): string | string[] | undefined => lang === 'de' && de ? de : en;
  const title = t(data.title, data.titleDE) ?? data.title;
  const subtitle = t(data.subtitle, data.subtitleDE);
  const content = tArr(data.content, data.contentDE);
  const technique = t(data.technique, data.techniqueDE);
  const topic = t(data.topic, data.topicDE);
  const thanksLabel = lang === 'de' ? 'ENDE // VIELEN DANK // FRAGEN & DISKUSSION' : 'END // THANK YOU // QUESTIONS & DISCUSSION';
  const trainingLabel = 'PROMPT ENGINEERING · TRAINING';
  const mentalModelVisuals = ['carwash', 'noise-hallucination', 'tokens', 'next-token'];
  const legacyVisuals = ['legacy-recap', 'legacy-timejump'];
  const contentLabel = data.type === SlideType.END
    ? (lang === 'de' ? 'FAZIT // TAKEAWAYS' : 'SUMMARY // TAKEAWAYS')
    : data.icon === 'Layers'
      ? (lang === 'de' ? 'PRAXIS // FÜHRUNG NACH BEDARF' : 'PRACTICE // GUIDANCE AS NEEDED')
      : data.icon === 'ShieldAlert'
        ? (lang === 'de' ? 'COMPLIANCE // REGELN' : 'COMPLIANCE // RULES')
        : data.icon === 'AlertTriangle'
          ? (lang === 'de' ? 'PROBLEM // ANALYSE' : 'PROBLEM // ANALYSIS')
          : data.visual && legacyVisuals.includes(data.visual)
            ? (lang === 'de' ? 'RECAP // WAS WAR NOCHMAL?' : 'RECAP // WHERE WERE WE?')
            : data.visual && mentalModelVisuals.includes(data.visual)
              ? `LLM // ${topic ?? 'MENTAL MODEL'}`
              : data.visual === 'toolbox'
                ? (lang === 'de' ? 'METHODEN // VORLAGEN' : 'METHODS // TEMPLATES')
                : (lang === 'de' ? 'PRAXIS // METHODE' : 'PRACTICE // METHOD');
  const compareLabel = topic
    ? `${lang === 'de' ? 'PRAXIS' : 'PRACTICE'} // ${topic}`
    : (lang === 'de' ? 'PRAXIS // VORHER & NACHHER' : 'PRACTICE // BEFORE & AFTER');
  const readyLabel = lang === 'de' ? 'BEREIT' : 'READY';

  const renderTextBlock = () => {
    if (!content) return null;
    if (Array.isArray(content)) {
      const isGuidanceBlocks = content.some((p) => p.startsWith('Baustein ') || p.startsWith('Building block '));
      return (
        <div className="grid gap-3">
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
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-2 ${levelColors[colorIdx]} px-5 py-4 transition hover:translate-x-1`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`pixel-font border px-2.5 py-1 text-[9px] font-bold ${badgeColors[colorIdx]}`}>
                      {String(levelNum).padStart(2, '0')}
                    </span>
                    <span className="text-lg font-bold text-white md:text-xl">{levelName.trim()}</span>
                  </div>
                  {levelDesc && (
                    <span className="font-mono text-sm text-slate-300 sm:text-right">{levelDesc.trim()}</span>
                  )}
                </div>
              );
            }

            const isSolution = point.startsWith('Unsere Lösung:') || point.startsWith('Our solution:');
            const isWarning = data.icon === 'ShieldAlert';

            return (
              <div
                key={index}
                className={`flex items-start gap-3 border-l-4 px-4 py-3.5 transition ${
                  isSolution
                    ? 'border-emerald-500 bg-emerald-950/30'
                    : isWarning
                      ? 'border-rose-600 bg-rose-950/20'
                      : 'border-indigo-700 bg-slate-950/55'
                }`}
              >
                <span
                  className={`pixel-font mt-1 text-[8px] ${
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

  const renderVisual = () => {
    if (data.visual === 'legacy-recap' || data.visual === 'legacy-timejump') {
      return <LegacyBridge kind={data.visual} lang={lang} />;
    }
    if (!data.visual) return null;
    return <VisualPanel kind={data.visual} lang={lang} />;
  };

  const renderContent = () => {
    switch (data.type) {
      case SlideType.TITLE:
        return (
          <div className="grid h-full min-h-[620px] items-center gap-10 lg:grid-cols-[1.12fr_.88fr]">
            <div className="animate-fadeIn">
              <div className="pixel-font mb-8 inline-block border-2 border-fuchsia-500 bg-fuchsia-950/70 px-4 py-3 text-[10px] leading-5 text-fuchsia-300 shadow-[4px_4px_0_#2e1065]">{trainingLabel}</div>
              <h1 className="max-w-4xl text-5xl font-black uppercase leading-[.96] tracking-[-.045em] text-white md:text-7xl lg:text-8xl">{title}</h1>
              <div className="my-8 h-1 w-48 bg-gradient-to-r from-fuchsia-500 via-amber-400 to-cyan-400" />
              <h2 className="max-w-3xl text-xl font-semibold leading-relaxed text-cyan-100 md:text-2xl">{subtitle}</h2>
              <div className="mt-10 flex flex-wrap gap-3 font-mono text-sm">
                <span className="border-2 border-slate-700 bg-slate-950 px-4 py-2 text-slate-300">{lang === 'de' ? 'PROMPT' : 'PROMPT'}</span>
                <span className="self-center text-fuchsia-400">→</span>
                <span className="border-2 border-amber-700 bg-amber-950/30 px-4 py-2 text-amber-200">{lang === 'de' ? 'LEITPLANKEN' : 'GUARDRAILS'}</span>
                <span className="self-center text-fuchsia-400">→</span>
                <span className="border-2 border-emerald-700 bg-emerald-950/30 px-4 py-2 text-emerald-200">{lang === 'de' ? 'WERKZEUGE' : 'TOOLS'}</span>
                <span className="self-center text-fuchsia-400">→</span>
                <span className="border-2 border-cyan-700 bg-cyan-950/30 px-4 py-2 text-cyan-200">{lang === 'de' ? 'ERGEBNISSE' : 'RESULTS'}</span>
              </div>
            </div>

            <div className="retro-panel relative hidden min-h-[500px] overflow-hidden bg-[#080d20] p-8 lg:block">
              <div className="absolute inset-0 opacity-50" style={{backgroundImage:'linear-gradient(rgba(34,211,238,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,.08) 1px,transparent 1px)',backgroundSize:'24px 24px'}} />
              <div className="relative flex h-full min-h-[430px] flex-col justify-between">
                <div className="flex justify-between"><span className="pixel-font text-[9px] text-fuchsia-400">PROMPT // AI</span><span className="pixel-font text-[9px] text-amber-300">{readyLabel}</span></div>
                <div className="mx-auto flex h-44 w-44 items-center justify-center border-4 border-indigo-700 bg-indigo-950 shadow-[8px_8px_0_#020617,0_0_50px_rgba(217,70,239,.28)]"><IconComponent size={92} className="text-cyan-300" strokeWidth={1.5} /></div>
                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="border border-cyan-800 bg-cyan-950/20 p-3 text-cyan-200">{lang === 'de' ? 'ROLLE & KONTEXT' : 'ROLE & CONTEXT'}</div>
                  <div className="border border-emerald-800 bg-emerald-950/20 p-3 text-emerald-200">{lang === 'de' ? 'ERST ANALYSIEREN' : 'ANALYSE FIRST'}</div>
                  <div className="border border-fuchsia-800 bg-fuchsia-950/20 p-3 text-fuchsia-200">{lang === 'de' ? 'TOOLS & CODE' : 'TOOLS & CODE'}</div>
                  <div className="border border-amber-800 bg-amber-950/20 p-3 text-amber-200">{lang === 'de' ? 'BELEGE & SICHERHEIT' : 'EVIDENCE & SAFETY'}</div>
                </div>
              </div>
            </div>
          </div>
        );

      case SlideType.CONTENT:
      case SlideType.END:
        return (
          <div className="flex h-full flex-col animate-fadeIn">
            <div className="mb-6 flex items-center gap-5 border-b-2 border-indigo-900 pb-5">
              <div className="border-2 border-fuchsia-700 bg-fuchsia-950/50 p-3 text-cyan-300 shadow-[4px_4px_0_#020617]"><IconComponent size={32} /></div>
              <div>
                <div className="pixel-font mb-2 text-[8px] text-fuchsia-400">{contentLabel}</div>
                <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-5xl">{title}</h2>
              </div>
            </div>

            {subtitle && <p className="mb-6 max-w-6xl text-lg font-semibold leading-relaxed text-cyan-100 md:text-xl">{subtitle}</p>}

            {data.visual === 'toolbox' ? (
              <div className="flex-grow">
                <div className="retro-panel bg-[#080d20]/75 p-5 md:p-7"><L2ToolboxPanel lang={lang} /></div>
                {content && <div className="mt-4 border-l-4 border-indigo-700 bg-slate-950/55 px-4 py-3 text-sm font-medium text-slate-300">{typeof content === 'string' ? content : content.join(' ')}</div>}
              </div>
            ) : data.visual && legacyVisuals.includes(data.visual) ? (
              <div className="grid flex-grow gap-6 xl:grid-cols-[1.65fr_.6fr] xl:items-center">
                <div className="retro-panel bg-[#080d20]/75 p-5 md:p-7">{renderVisual()}</div>
                <div>{renderTextBlock()}</div>
              </div>
            ) : data.visual ? (
              <div className="grid flex-grow gap-6 lg:grid-cols-[1.55fr_.72fr] lg:items-center">
                <div className="retro-panel bg-[#080d20]/75 p-5 md:p-7">{renderVisual()}</div>
                <div>{renderTextBlock()}</div>
              </div>
            ) : (
              <div className="flex-grow">{renderTextBlock()}</div>
            )}

            {data.type === SlideType.END && <div className="pixel-font mt-auto pt-7 text-center text-[10px] text-emerald-300">{thanksLabel}</div>}
          </div>
        );

      case SlideType.COMPARISON:
        return (
          <div className="flex h-full flex-col animate-fadeIn">
            <div className="mb-4 flex items-center gap-4">
              <div className="border-2 border-fuchsia-700 bg-fuchsia-950/50 p-2 text-cyan-300"><IconComponent size={28} /></div>
              <div>
                <div className="pixel-font mb-2 text-[8px] uppercase text-fuchsia-400">{compareLabel}</div>
                <h2 className="text-3xl font-black uppercase text-white md:text-4xl">{title}</h2>
              </div>
            </div>
            {subtitle && <p className="mb-5 text-lg font-semibold text-cyan-100">{subtitle}</p>}
            <div className="flex-grow">
              <PromptComparison
                standard={(lang === 'de' && data.codeStandardDE ? data.codeStandardDE : data.codeStandard) ?? ''}
                optimized={(lang === 'de' && data.codeOptimizedDE ? data.codeOptimizedDE : data.codeOptimized) ?? ''}
                technique={technique ?? (lang === 'de' ? 'Praxisfall' : 'Example')}
                description={typeof content === 'string' ? content : ''}
                lang={lang}
                workOrder={lang === 'de' && data.codeWorkOrderDE ? data.codeWorkOrderDE : data.codeWorkOrder}
              />
            </div>
          </div>
        );

      default:
        return <div>Unknown Slide Type</div>;
    }
  };

  return <section className="retro-panel relative mx-auto h-full w-full max-w-[1500px] overflow-auto bg-[#0a0f22]/95 p-6 md:p-10 lg:p-12"><div className="pointer-events-none absolute right-4 top-4 pixel-font text-[7px] text-indigo-700">SYS://PROMPT_INTRO</div>{renderContent()}</section>;
};

export default SlideLayout;
