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
    standardLabel:   lang === 'de' ? 'Standard-Prompt'   : 'Standard Prompt',
    optimizedLabel:  lang === 'de' ? 'Optimierter Prompt' : 'Optimised Prompt',
    footer: lang === 'de'
      ? 'Der optimierte Prompt liefert deterministische, verlässliche Ergebnisse.'
      : 'The optimised prompt delivers deterministic, reliable results.',
    showVokuprompt: lang === 'de'
      ? 'vokuprompt-Ergebnis anzeigen'
      : 'Show vokuprompt result',
    hideVokuprompt: lang === 'de'
      ? 'vokuprompt-Ergebnis ausblenden'
      : 'Hide vokuprompt result',
    vokupromptLabel: lang === 'de'
      ? 'vokuprompt-verbesserter Prompt'
      : 'vokuprompt-improved Prompt',
    vokupromptNote: lang === 'de'
      ? 'Automatisch aus den vokuprompt-Mustern zusammengestellt – mit kontextspezifischen Platzhaltern ausgefüllt.'
      : 'Automatically compiled from vokuprompt patterns – placeholders filled with slide-specific context.',
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-blue-900 text-sm mb-2">
        <strong>{labels.techniquePrefix}: {technique}</strong> — {description}
      </div>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        {/* Standard (Bad) */}
        <div className="flex flex-col border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50">
          <div className="bg-gray-200 px-4 py-3 flex items-center justify-between border-b border-gray-300">
            <span className="font-semibold text-gray-700 uppercase text-sm tracking-wider">{labels.standardLabel}</span>
            <XCircle size={20} className="text-red-500" />
          </div>
          <div className="p-6 flex-grow font-mono text-sm text-gray-600 whitespace-pre-wrap">
            {standard}
          </div>
        </div>

        {/* Optimized (Good) */}
        <div className="flex flex-col border-2 border-green-500 rounded-xl overflow-hidden bg-white shadow-lg transform md:-translate-y-2 md:hover:-translate-y-3 transition-transform duration-300">
          <div className="bg-green-600 px-4 py-3 flex items-center justify-between">
            <span className="font-semibold text-white uppercase text-sm tracking-wider">{labels.optimizedLabel}</span>
            <CheckCircle size={20} className="text-white" />
          </div>
          <div className="p-6 flex-grow font-mono text-sm text-gray-800 whitespace-pre-wrap bg-green-50">
            {optimized}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center text-gray-400 text-sm italic">
        <ArrowRight className="inline mr-2" size={16} />
        {labels.footer}
      </div>

      {/* vokuprompt expandable section */}
      {codeVokuprompt && (
        <div className="mt-2">
          <button
            onClick={() => setShowVokuprompt(v => !v)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 border-violet-300 bg-violet-50 hover:bg-violet-100 transition-colors text-violet-800 font-semibold text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
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
            <div className="mt-2 rounded-xl border-2 border-violet-400 overflow-hidden shadow-md">
              <div className="bg-violet-600 px-4 py-3 flex items-center gap-2">
                <Sparkles size={18} className="text-white" />
                <span className="font-semibold text-white uppercase text-sm tracking-wider">{labels.vokupromptLabel}</span>
              </div>
              <div className="p-5 bg-violet-50">
                <p className="text-xs text-violet-600 mb-3 italic">{labels.vokupromptNote}</p>
                <pre className="font-mono text-sm text-violet-900 whitespace-pre-wrap leading-relaxed">
                  {codeVokuprompt}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromptComparison;