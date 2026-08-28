import React, { useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, FileClock, Recycle, Wrench } from 'lucide-react';
import { Lang } from '../types';

interface PromptComparisonProps {
  standard: string;
  optimized: string;
  technique: string;
  description: string;
  lang: Lang;
  workOrder?: string;
}

const countWords = (value: string): number => value.trim().split(/\s+/u).filter(Boolean).length;

const PromptComparison: React.FC<PromptComparisonProps> = ({
  standard,
  optimized,
  technique,
  description,
  lang,
  workOrder,
}) => {
  const [showWorkOrder, setShowWorkOrder] = useState(false);
  const standardWordCount = useMemo(() => countWords(standard), [standard]);
  const optimizedWordCount = useMemo(() => countWords(optimized), [optimized]);

  const labels = {
    techniquePrefix: lang === 'de' ? 'Praxisfall' : 'Case',
    standardLabel: lang === 'de' ? 'Direkter Prompt für genau diesen Fall' : 'Direct prompt for this case',
    optimizedLabel: lang === 'de' ? 'L2-Methode für wiederkehrende Fälle' : 'Reusable L2 method',
    wordCount: lang === 'de' ? 'Wörter' : 'words',
    footer: lang === 'de'
      ? 'Links steckt der aktuelle Fall im Prompt. Rechts bleibt die Bauanleitung, die auch beim nächsten Fall noch gilt.'
      : 'The left prompt contains the current case. The right side keeps only the construction method that survives the next case.',
    showWorkOrder: lang === 'de' ? 'Zeig den daraus erzeugten L1-Auftrag' : 'Show the generated L1 contract',
    hideWorkOrder: lang === 'de' ? 'L1-Auftrag ausblenden' : 'Hide L1 contract',
    workOrderLabel: lang === 'de' ? 'Erzeugter L1-Auftrag · erst prüfen, dann ausführen' : 'Generated L1 contract · review before execution',
    workOrderNote: lang === 'de'
      ? 'Genau hier liegt der Nutzen: Der konkrete Fall wird automatisch in einen kurzen Auftrag übersetzt, den wir vor jeder Änderung gegenlesen können.'
      : 'This is the useful boundary: the current case becomes a short concrete contract that can be reviewed before anything is changed.',
  };

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="border-2 border-indigo-800 bg-indigo-950/60 p-4 text-sm text-cyan-100 shadow-[4px_4px_0_#020617]">
        <strong className="text-amber-300">{labels.techniquePrefix}: {technique}</strong> — {description}
      </div>

      <div className="grid h-full flex-grow grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col overflow-hidden border-2 border-amber-500 bg-slate-950/85 shadow-[5px_5px_0_#020617]">
          <div className="flex items-center justify-between border-b-2 border-amber-700 bg-amber-950/50 px-4 py-3">
            <span className="text-sm font-bold uppercase tracking-wider text-amber-200">{labels.standardLabel}</span>
            <FileClock size={20} className="text-amber-300" />
          </div>
          <div className="flex-grow p-5 font-mono text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">{standard}</div>
          <div className="border-t border-amber-900 bg-amber-950/30 px-4 py-2 text-right text-xs font-medium text-amber-300">
            {standardWordCount} {labels.wordCount}
          </div>
        </div>

        <div className="flex flex-col overflow-hidden border-2 border-cyan-500 bg-slate-950/85 shadow-[5px_5px_0_#020617]">
          <div className="flex items-center justify-between border-b-2 border-cyan-800 bg-cyan-950/40 px-4 py-3">
            <span className="text-sm font-bold uppercase tracking-wider text-cyan-200">{labels.optimizedLabel}</span>
            <Recycle size={20} className="text-cyan-300" />
          </div>
          <div className="flex-grow p-5 font-mono text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">{optimized}</div>
          <div className="border-t border-cyan-900 bg-cyan-950/30 px-4 py-2 text-right text-xs font-medium text-cyan-300">
            {optimizedWordCount} {labels.wordCount}
          </div>
        </div>
      </div>

      <div className="flex justify-center text-sm font-medium text-slate-400">
        <ArrowRight className="mr-2 inline shrink-0 text-fuchsia-400" size={16} />
        {labels.footer}
      </div>

      {workOrder && (
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setShowWorkOrder((value) => !value)}
            className="retro-button flex w-full items-center justify-between bg-slate-900 px-4 py-3 text-sm font-bold text-cyan-200 transition-colors hover:bg-indigo-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-expanded={showWorkOrder}
            aria-label={showWorkOrder ? labels.hideWorkOrder : labels.showWorkOrder}
          >
            <span className="flex items-center gap-2">
              <Wrench size={16} className="text-fuchsia-300" />
              {showWorkOrder ? labels.hideWorkOrder : labels.showWorkOrder}
            </span>
            {showWorkOrder ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showWorkOrder && (
            <div className="mt-3 overflow-hidden border-2 border-emerald-700 bg-slate-950 shadow-[5px_5px_0_#020617]">
              <div className="flex items-center gap-2 border-b-2 border-emerald-800 bg-emerald-950/50 px-4 py-3">
                <Wrench size={18} className="text-emerald-300" />
                <span className="text-sm font-bold uppercase tracking-wider text-emerald-200">{labels.workOrderLabel}</span>
              </div>
              <div className="p-5">
                <p className="mb-3 text-xs font-medium text-slate-400">{labels.workOrderNote}</p>
                <pre className="font-mono text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">{workOrder}</pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromptComparison;
