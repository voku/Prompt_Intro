import React from 'react';
import PromptComparison from './PromptComparison';
import InteractivePlayground from './InteractivePlayground';
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
  const thanksLabel = lang === 'de' ? 'QUEST ABGESCHLOSSEN · DANKE!' : 'QUEST COMPLETE · THANK YOU!';
  const trainingLabel = lang === 'de' ? 'TEIL 2 · LLM-ARBEIT WIEDERHOLBAR MACHEN' : 'PART 2 · MAKE LLM WORK REPEATABLE';

  const renderContent = () => {
    switch (data.type) {
      case SlideType.TITLE:
        return <div className="grid h-full min-h-[620px] items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <div className="animate-fadeIn">
            <div className="pixel-font mb-8 inline-block border-2 border-fuchsia-500 bg-fuchsia-950/70 px-4 py-3 text-[10px] leading-5 text-fuchsia-300 shadow-[4px_4px_0_#2e1065]">{trainingLabel}</div>
            <h1 className="max-w-4xl text-5xl font-black uppercase leading-[.98] tracking-[-.04em] text-white md:text-7xl lg:text-8xl">{title}</h1>
            <div className="my-8 h-1 w-48 bg-gradient-to-r from-fuchsia-500 via-amber-400 to-cyan-400" />
            <h2 className="max-w-3xl text-xl font-semibold leading-relaxed text-cyan-200 md:text-2xl">{subtitle}</h2>
            <div className="mt-10 flex flex-wrap gap-3 font-mono text-sm"><span className="border-2 border-indigo-800 bg-slate-950 px-4 py-2 text-slate-300">PROMPT</span><span className="self-center text-fuchsia-400">→</span><span className="border-2 border-indigo-800 bg-slate-950 px-4 py-2 text-slate-300">2 PASSES</span><span className="self-center text-fuchsia-400">→</span><span className="border-2 border-indigo-800 bg-slate-950 px-4 py-2 text-slate-300">WORK ORDER</span><span className="self-center text-fuchsia-400">→</span><span className="border-2 border-emerald-700 bg-emerald-950/40 px-4 py-2 text-emerald-300">VERIFIED</span></div>
          </div>
          <div className="retro-panel relative hidden min-h-[500px] overflow-hidden bg-[#080d20] p-8 lg:block">
            <div className="absolute inset-0 opacity-50" style={{backgroundImage:'linear-gradient(rgba(34,211,238,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,.08) 1px,transparent 1px)',backgroundSize:'24px 24px'}} />
            <div className="relative flex h-full min-h-[430px] flex-col justify-between">
              <div className="flex justify-between"><span className="pixel-font text-[9px] text-fuchsia-400">MISSION // 02</span><span className="pixel-font text-[9px] text-amber-300">READY</span></div>
              <div className="mx-auto flex h-40 w-40 items-center justify-center border-4 border-indigo-700 bg-indigo-950 shadow-[8px_8px_0_#020617,0_0_40px_rgba(217,70,239,.25)]"><IconComponent size={88} className="text-cyan-300" strokeWidth={1.5} /></div>
              <div className="border-2 border-indigo-800 bg-slate-950 p-5 font-mono text-sm leading-7 text-emerald-300"><div>&gt; KLARHEIT</div><div>&gt; KONSISTENZ</div><div>&gt; QUALITÄT</div><div>&gt; VERTRAUEN</div><div className="pixel-pulse text-cyan-300">&gt; _</div></div>
            </div>
          </div>
        </div>;
      case SlideType.CONTENT:
      case SlideType.END:
        return <div className="flex h-full flex-col animate-fadeIn">
          <div className="mb-7 flex items-center gap-5 border-b-2 border-indigo-900 pb-5"><div className="border-2 border-fuchsia-700 bg-fuchsia-950/50 p-3 text-cyan-300 shadow-[4px_4px_0_#020617]"><IconComponent size={32} /></div><div><div className="pixel-font mb-2 text-[8px] text-fuchsia-400">MISSION BRIEF</div><h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-5xl">{title}</h2></div></div>
          {subtitle && <p className="mb-8 max-w-5xl text-lg font-semibold text-cyan-200 md:text-xl">{subtitle}</p>}
          <div className="grid gap-4">{Array.isArray(content) ? content.map((point, index) => <div key={index} className="retro-panel group flex items-start gap-4 bg-slate-950/75 p-4 transition hover:border-cyan-700 md:p-5"><div className="pixel-font mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border-2 border-indigo-700 bg-indigo-950 text-[9px] text-amber-300">{String(index + 1).padStart(2,'0')}</div><p className="text-lg font-medium leading-relaxed text-slate-200 md:text-xl">{point}</p></div>) : <div className="retro-panel bg-slate-950/75 p-6 text-xl leading-relaxed text-slate-200">{content}</div>}</div>
          {data.type === SlideType.END && <div className="pixel-font mt-auto pt-8 text-center text-[10px] text-emerald-300">{thanksLabel}</div>}
        </div>;
      case SlideType.COMPARISON:
        return <div className="flex h-full flex-col animate-fadeIn"><div className="mb-4 flex items-center gap-4"><div className="border-2 border-fuchsia-700 bg-fuchsia-950/50 p-2 text-cyan-300"><IconComponent size={28} /></div><div><div className="pixel-font mb-2 text-[8px] text-fuchsia-400">BOSS FIGHT // COMPARE</div><h2 className="text-3xl font-black uppercase text-white md:text-4xl">{title}</h2></div></div>{subtitle && <p className="mb-5 text-lg font-semibold text-cyan-200">{subtitle}</p>}<div className="flex-grow"><PromptComparison standard={(lang === 'de' && data.codeStandardDE ? data.codeStandardDE : data.codeStandard) ?? ''} optimized={(lang === 'de' && data.codeOptimizedDE ? data.codeOptimizedDE : data.codeOptimized) ?? ''} technique={technique ?? (lang === 'de' ? 'Beispiel' : 'Example')} description={typeof content === 'string' ? content : ''} lang={lang} workOrder={lang === 'de' && data.codeWorkOrderDE ? data.codeWorkOrderDE : data.codeWorkOrder} /></div></div>;
      case SlideType.PLAYGROUND:
        return <div className="flex h-full flex-col animate-fadeIn"><div className="mb-4 flex items-center gap-4"><div className="border-2 border-fuchsia-700 bg-fuchsia-950/50 p-2 text-cyan-300"><IconComponent size={28} /></div><div><div className="pixel-font mb-2 text-[8px] text-fuchsia-400">TRAINING ROOM // LIVE</div><h2 className="text-3xl font-black uppercase text-white md:text-4xl">{title}</h2></div></div>{subtitle && <p className="mb-5 text-lg font-semibold text-cyan-200">{subtitle}</p>}<InteractivePlayground lang={lang} /></div>;
      default: return <div>Unknown Slide Type</div>;
    }
  };

  return <section className="retro-panel relative mx-auto h-full w-full max-w-[1500px] overflow-auto bg-[#0a0f22]/95 p-6 md:p-10 lg:p-12"><div className="pointer-events-none absolute right-4 top-4 pixel-font text-[7px] text-indigo-700">SYS://PROMPT_INTRO</div>{renderContent()}</section>;
};

export default SlideLayout;
