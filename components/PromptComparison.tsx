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
    techniquePrefix: lang === 'de' ? 'Fall' : 'Case',
    standardLabel: lang === 'de' ? 'Prompt für diesen einen Fall' : 'Prompt for this one case',
    optimizedLabel: lang === 'de' ? 'Methode, die den Auftrag baut' : 'Method that builds the work order',
    wordCount: lang === 'de' ? 'Wörter' : 'words',
    footer: lang === 'de'
      ? 'Links steht der Einzelfall. Rechts steht das, was beim nächsten Fall noch gilt.'
      : 'The left one is this case. The right one is what still holds for the next one.',
    showWorkOrder: lang === 'de' ? 'Zeigen, was Durchgang 1 daraus macht' : 'Show what pass 1 produces from it',
    hideWorkOrder: lang === 'de' ? 'Durchgang 1 ausblenden' : 'Hide pass 1',
    workOrderLabel: lang === 'de' ? 'Durchgang 1 · Arbeitsauftrag, den du liest und freigibst' : 'Pass 1 · the work order you read and approve',
    workOrderNote: lang === 'de'
      ? 'Das hat die Methode gebaut, nicht du. Du korrigierst eine halbe Seite – nicht vier fertige.'
      : 'The method built this, not you. You correct half a page instead of four finished ones.',
  };

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="mb-2 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
        <strong>{labels.techniquePrefix}: {technique}</strong> — {description}
      </div>

      <div className="grid h-full flex-grow grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col overflow-hidden rounded-xl border-2 border-amber-300 bg-white">
          <div className="flex items-center justify-between border-b border-amber-200 bg-amber-50 px-4 py-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-amber-900">{labels.standardLabel}</span>
            <FileClock size={20} className="text-amber-700" />
          </div>
          <div className="flex-grow p-6 font-mono text-sm text-gray-800 whitespace-pre-wrap">{standard}</div>
          <div className="border-t border-amber-100 bg-amber-50/60 px-4 py-2 text-right text-xs font-medium text-amber-800">
            {standardWordCount} {labels.wordCount}
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-xl border-2 border-blue-400 bg-white">
          <div className="flex items-center justify-between border-b border-blue-300 bg-blue-50 px-4 py-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-900">{labels.optimizedLabel}</span>
            <Recycle size={20} className="text-blue-700" />
          </div>
          <div className="flex-grow p-6 font-mono text-sm text-gray-800 whitespace-pre-wrap">{optimized}</div>
          <div className="border-t border-blue-100 bg-blue-50/60 px-4 py-2 text-right text-xs font-medium text-blue-800">
            {optimizedWordCount} {labels.wordCount}
          </div>
        </div>
      </div>

      <div className="flex justify-center text-sm italic text-gray-600">
        <ArrowRight className="mr-2 inline shrink-0" size={16} />
        {labels.footer}
      </div>

      {workOrder && (
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setShowWorkOrder((value) => !value)}
            className="flex w-full items-center justify-between rounded-xl border-2 border-slate-300 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-expanded={showWorkOrder}
            aria-label={showWorkOrder ? labels.hideWorkOrder : labels.showWorkOrder}
          >
            <span className="flex items-center gap-2">
              <Wrench size={16} className="text-slate-600" />
              {showWorkOrder ? labels.hideWorkOrder : labels.showWorkOrder}
            </span>
            {showWorkOrder ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showWorkOrder && (
            <div className="mt-2 overflow-hidden rounded-xl border-2 border-slate-300 shadow-sm">
              <div className="flex items-center gap-2 bg-slate-700 px-4 py-3">
                <Wrench size={18} className="text-white" />
                <span className="text-sm font-semibold uppercase tracking-wider text-white">{labels.workOrderLabel}</span>
              </div>
              <div className="bg-slate-50 p-5">
                <p className="mb-3 text-xs italic text-slate-600">{labels.workOrderNote}</p>
                <pre className="font-mono text-sm leading-relaxed text-slate-900 whitespace-pre-wrap">{workOrder}</pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromptComparison;
