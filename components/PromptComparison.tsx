import React, { useState } from 'react';
import { XCircle, CheckCircle, ArrowRight, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Lang } from '../types';

interface PromptComparisonProps {
  standard: string;
  optimized: string;
  technique: string;
  description: string;
  lang: Lang;
  codeVokuprompt?: string;
}

const PromptComparison: React.FC<PromptComparisonProps> = ({
  standard,
  optimized,
  technique,
  description,
  lang,
  codeVokuprompt,
}) => {
  const [showVokuprompt, setShowVokuprompt] = useState(false);

  const labels = {
    techniquePrefix: lang === 'de' ? 'Technik' : 'Technique',
    standardLabel: lang === 'de' ? 'Schwacher Prompt' : 'Weak Prompt',
    optimizedLabel: lang === 'de' ? 'Operativer Prompt' : 'Operational Prompt',
    footer: lang === 'de'
      ? 'Der stärkere Prompt ist strukturierter, überprüfbarer, leichter zu validieren und weniger driftanfällig.'
      : 'The stronger prompt is more structured, more verifiable, easier to validate, and less likely to drift.',
    showVokuprompt: lang === 'de'
      ? 'vokuprompt-Variante anzeigen'
      : 'Show vokuprompt variant',
    hideVokuprompt: lang === 'de'
      ? 'vokuprompt-Variante ausblenden'
      : 'Hide vokuprompt variant',
    vokupromptLabel: lang === 'de'
      ? 'vokuprompt-Variante'
      : 'vokuprompt variant',
    vokupromptNote: lang === 'de'
      ? 'Zusätzliche, stärker operationalisierte Version mit expliziten Prüfschritten.'
      : 'Optional, even more operational version with explicit validation steps.',
  };

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="mb-2 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
        <strong>{labels.techniquePrefix}: {technique}</strong> — {description}
      </div>

      <div className="grid h-full flex-grow grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col overflow-hidden rounded-xl border-2 border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between border-b border-gray-300 bg-gray-200 px-4 py-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-700">{labels.standardLabel}</span>
            <XCircle size={20} className="text-red-500" />
          </div>
          <div className="flex-grow p-6 font-mono text-sm text-gray-700 whitespace-pre-wrap">{standard}</div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-xl border-2 border-green-500 bg-white shadow-lg transition-transform duration-300 md:-translate-y-2 md:hover:-translate-y-3">
          <div className="flex items-center justify-between bg-green-600 px-4 py-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-white">{labels.optimizedLabel}</span>
            <CheckCircle size={20} className="text-white" />
          </div>
          <div className="flex-grow bg-green-50 p-6 font-mono text-sm text-gray-800 whitespace-pre-wrap">{optimized}</div>
        </div>
      </div>

      <div className="flex justify-center text-sm italic text-gray-500">
        <ArrowRight className="mr-2 inline" size={16} />
        {labels.footer}
      </div>

      {codeVokuprompt && (
        <div className="mt-2">
          <button
            onClick={() => setShowVokuprompt((value) => !value)}
            className="flex w-full items-center justify-between rounded-xl border-2 border-violet-300 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-800 transition-colors hover:bg-violet-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            aria-expanded={showVokuprompt}
            aria-label={showVokuprompt ? labels.hideVokuprompt : labels.showVokuprompt}
          >
            <span className="flex items-center gap-2">
              <Sparkles size={16} className="text-violet-500" />
              {showVokuprompt ? labels.hideVokuprompt : labels.showVokuprompt}
            </span>
            {showVokuprompt ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showVokuprompt && (
            <div className="mt-2 overflow-hidden rounded-xl border-2 border-violet-400 shadow-md">
              <div className="flex items-center gap-2 bg-violet-600 px-4 py-3">
                <Sparkles size={18} className="text-white" />
                <span className="text-sm font-semibold uppercase tracking-wider text-white">{labels.vokupromptLabel}</span>
              </div>
              <div className="bg-violet-50 p-5">
                <p className="mb-3 text-xs italic text-violet-700">{labels.vokupromptNote}</p>
                <pre className="font-mono text-sm leading-relaxed text-violet-900 whitespace-pre-wrap">{codeVokuprompt}</pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromptComparison;
