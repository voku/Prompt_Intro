import React, { useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, CircleDashed, ListChecks, Target } from 'lucide-react';
import { GuideMode, Lang } from '../types';

interface PromptComparisonProps {
  standard: string;
  optimized: string;
  technique: string;
  description: string;
  lang: Lang;
  codeVokuprompt?: string;
  guideMode: GuideMode;
}

const countWords = (value: string): number => value.trim().split(/\s+/u).filter(Boolean).length;

const PromptComparison: React.FC<PromptComparisonProps> = ({
  standard,
  optimized,
  technique,
  description,
  lang,
  codeVokuprompt,
  guideMode,
}) => {
  const [showVokuprompt, setShowVokuprompt] = useState(false);
  const standardWordCount = useMemo(() => countWords(standard), [standard]);
  const optimizedWordCount = useMemo(() => countWords(optimized), [optimized]);

  const labels = {
    techniquePrefix: lang === 'de' ? 'Technik' : 'Technique',
    standardLabel: lang === 'de' ? 'So tippt man es wirklich' : 'What people actually type',
    optimizedLabel: lang === 'de' ? 'So wird es brauchbar' : 'What makes it usable',
    wordCount: lang === 'de' ? 'Wörter' : 'words',
    footer: guideMode === 'decisions'
      ? (lang === 'de'
          ? 'Die bessere Version nennt Material, Grenzen und Quelle. Länge ist kein Qualitätsmerkmal, eine fehlende Zahl bleibt eine fehlende Zahl.'
          : 'The better version names material, limits and source. Length is not a quality signal, and a missing figure stays missing.')
      : (lang === 'de'
          ? 'Die bessere Version enthält nur, was diese Aufgabe braucht. Sie darf kürzer oder länger sein.'
          : 'The better version contains only what this task needs. It may be shorter or longer.'),
    showVokuprompt: lang === 'de'
      ? 'Ausführliche Variante anzeigen'
      : 'Show the spelled-out variant',
    hideVokuprompt: lang === 'de'
      ? 'Ausführliche Variante ausblenden'
      : 'Hide the spelled-out variant',
    vokupromptLabel: lang === 'de'
      ? 'Variante mit allen fünf Zeilen'
      : 'Variant with all five lines',
    vokupromptNote: lang === 'de'
      ? 'Lohnt sich, wenn es teuer wird, lange dauert oder jemand anderes damit weiterarbeitet. Sonst ist die kurze Version die richtige.'
      : 'Worth it when the task is expensive, long-running, or handed to somebody else. Otherwise the short version is the right one.',
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
            <CircleDashed size={20} className="text-amber-700" />
          </div>
          <div className="flex-grow p-6 font-mono text-sm text-gray-800 whitespace-pre-wrap">{standard}</div>
          <div className="border-t border-amber-100 bg-amber-50/60 px-4 py-2 text-right text-xs font-medium text-amber-800">
            {standardWordCount} {labels.wordCount}
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-xl border-2 border-blue-400 bg-white">
          <div className="flex items-center justify-between border-b border-blue-300 bg-blue-50 px-4 py-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-900">{labels.optimizedLabel}</span>
            <Target size={20} className="text-blue-700" />
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

      {codeVokuprompt && (
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setShowVokuprompt((value) => !value)}
            className="flex w-full items-center justify-between rounded-xl border-2 border-slate-300 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-expanded={showVokuprompt}
            aria-label={showVokuprompt ? labels.hideVokuprompt : labels.showVokuprompt}
          >
            <span className="flex items-center gap-2">
              <ListChecks size={16} className="text-slate-600" />
              {showVokuprompt ? labels.hideVokuprompt : labels.showVokuprompt}
            </span>
            {showVokuprompt ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showVokuprompt && (
            <div className="mt-2 overflow-hidden rounded-xl border-2 border-slate-300 shadow-sm">
              <div className="flex items-center gap-2 bg-slate-700 px-4 py-3">
                <ListChecks size={18} className="text-white" />
                <span className="text-sm font-semibold uppercase tracking-wider text-white">{labels.vokupromptLabel}</span>
              </div>
              <div className="bg-slate-50 p-5">
                <p className="mb-3 text-xs italic text-slate-600">{labels.vokupromptNote}</p>
                <pre className="font-mono text-sm leading-relaxed text-slate-900 whitespace-pre-wrap">{codeVokuprompt}</pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromptComparison;
