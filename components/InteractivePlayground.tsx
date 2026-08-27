import React, { useEffect, useMemo, useState } from 'react';
import { BadgeCheck, Gauge, Play, RotateCcw, ShieldAlert, Target, TriangleAlert } from 'lucide-react';
import { GuideMode, Lang } from '../types';
import { getDefaultPreset, PROMPT_PRESETS } from '../promptPresets';
import {
  evaluateTaskFitPrompt,
  TaskFitPromptEvaluation,
} from '../services/taskFitEvaluator';

interface RunRecord {
  id: number;
  label: string;
  evaluation: TaskFitPromptEvaluation;
}

interface InteractivePlaygroundProps {
  lang: Lang;
  guideMode: GuideMode;
}

const InteractivePlayground: React.FC<InteractivePlaygroundProps> = ({ lang, guideMode }) => {
  const [prompt, setPrompt] = useState(getDefaultPreset(lang, guideMode)?.text ?? '');
  const [evaluation, setEvaluation] = useState<TaskFitPromptEvaluation | null>(null);
  const [runHistory, setRunHistory] = useState<RunRecord[]>([]);

  const labels = useMemo(
    () => ({
      badge: lang === 'de' ? 'Lokaler Evaluator · kein Modellaufruf' : 'Local evaluator · no model call',
      helper: lang === 'de'
        ? 'Sucht nach Auftrag, Material, Grenzen, Form, Endpunkt und Nachweis – und nach Fülltext. Länge gibt keine Punkte.'
        : 'Looks for job, material, limits, form, stopping point and evidence — and for filler. Length earns no points.',
      placeholder: lang === 'de'
        ? 'Prompt hier einfügen oder einen Preset laden…'
        : 'Paste a prompt here or load a preset…',
      run: lang === 'de' ? 'Prompt prüfen' : 'Check the prompt',
      reset: lang === 'de' ? 'Zurücksetzen' : 'Reset',
      checks: lang === 'de' ? 'Die sechs Zeilen' : 'The six lines',
      warnings: lang === 'de' ? 'Warnungen' : 'Warnings',
      hedgeWords: lang === 'de' ? 'Weichmacher erkannt' : 'Hedge words detected',
      unsafeData: lang === 'de' ? 'Sieht nach schützenswerten Daten aus' : 'Looks like data that needs protection',
      verbosity: lang === 'de' ? 'Fülltext oder Wiederholung erkannt' : 'Filler or repetition detected',
      history: lang === 'de' ? 'Letzte Auswertungen' : 'Recent evaluations',
      score: lang === 'de' ? 'Brauchbarkeit' : 'Usability score',
      words: lang === 'de' ? 'Wörter' : 'words',
      signals: lang === 'de' ? 'von 6 Zeilen' : 'of 6 lines',
      lengthNote: lang === 'de'
        ? 'Länge zählt nicht. Gewertet werden nutzbare Anweisungen, Risiken und Wiederholungen – ein Einzeiler kann voll punkten.'
        : 'Length does not count. Usable instructions, risks and repetition do — a one-liner can score full marks.',
      noWarnings: lang === 'de' ? 'Keine Warnungen erkannt.' : 'No warnings detected.',
      evidenceSignals: lang === 'de' ? 'Belege verlangt' : 'Evidence requested',
      riskWarnings: lang === 'de' ? 'Risikohinweise' : 'Risk signals',
      waiting: lang === 'de'
        ? 'Nimm ein Beispiel oder füg deinen eigenen Prompt ein. Vergleich vor allem „lang, aber leer“ mit „klein und ausreichend“.'
        : 'Pick an example or paste your own prompt. Compare “long but empty” with “small and sufficient”.',
      missing: lang === 'de' ? 'Fehlend' : 'Missing',
    }),
    [lang],
  );

  const presets = PROMPT_PRESETS[guideMode][lang];

  useEffect(() => {
    setPrompt(getDefaultPreset(lang, guideMode)?.text ?? '');
    setEvaluation(null);
    setRunHistory([]);
  }, [guideMode, lang]);

  const handleRun = (labelOverride?: string): void => {
    if (!prompt.trim()) {
      return;
    }

    const matchingPreset = presets.find((preset) => preset.text === prompt);
    const nextEvaluation = evaluateTaskFitPrompt(prompt, guideMode);
    setEvaluation(nextEvaluation);
    setRunHistory((previous) => [
      {
        id: Date.now(),
        label: labelOverride ?? matchingPreset?.label ?? (lang === 'de' ? 'Eigener Prompt' : 'Custom prompt'),
        evaluation: nextEvaluation,
      },
      ...previous,
    ].slice(0, 4));
  };

  const handleReset = (): void => {
    setPrompt(getDefaultPreset(lang, guideMode)?.text ?? '');
    setEvaluation(null);
    setRunHistory([]);
  };

  const totalWarnings = evaluation
    ? evaluation.hedgeWords.length
      + evaluation.unsafeDataMatches.length
      + evaluation.riskWarnings.length
      + evaluation.verbosityWarnings.length
    : 0;

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
        <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 font-semibold text-blue-700 shadow-sm">
          <BadgeCheck size={14} />
          {labels.badge}
        </div>
        <p>{labels.helper}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setPrompt(preset.text);
                  setEvaluation(null);
                }}
                className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder={labels.placeholder}
            className="min-h-[320px] w-full resize-none rounded-xl border border-gray-300 p-4 font-mono text-sm shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => handleRun()}
              disabled={!prompt.trim()}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="inline-flex items-center gap-2">
                <Play size={16} />
                {labels.run}
              </span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              <span className="inline-flex items-center gap-2">
                <RotateCcw size={16} />
                {labels.reset}
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            {evaluation ? (
              <>
                <div className="mb-4 border-b border-gray-100 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">{labels.score}</div>
                      <div className="text-4xl font-bold text-gray-900">
                        {evaluation.score}<span className="text-lg text-gray-400">/100</span>
                      </div>
                    </div>
                    <div className="max-w-xs rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                      {evaluation.summary[lang]}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-gray-700">
                    <span className="rounded-full bg-gray-100 px-3 py-1">{evaluation.wordCount} {labels.words}</span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-800">{evaluation.controlSignalCount} {labels.signals}</span>
                    <span className={`rounded-full px-3 py-1 ${totalWarnings > 0 ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                      {totalWarnings} {labels.warnings.toLocaleLowerCase()}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-gray-500">{labels.lengthNote}</p>
                </div>

                <div className="mb-4">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-700">{labels.checks}</h3>
                  <div className="space-y-2">
                    {evaluation.checks.map((check) => (
                      <div
                        key={check.key}
                        className={`rounded-lg border px-3 py-3 ${check.passed ? 'border-blue-200 bg-blue-50' : 'border-amber-200 bg-amber-50'}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className={`font-semibold ${check.passed ? 'text-blue-900' : 'text-amber-900'}`}>
                            {check.label[lang]}
                          </span>
                          <span className={`text-xs font-bold uppercase tracking-wider ${check.passed ? 'text-blue-700' : 'text-amber-700'}`}>
                            {check.passed ? 'OK' : labels.missing}
                          </span>
                        </div>
                        <p className={`mt-1 text-sm ${check.passed ? 'text-blue-800' : 'text-amber-800'}`}>{check.detail[lang]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-700">{labels.warnings}</h3>
                  <div className="space-y-2 text-sm">
                    {evaluation.verbosityWarnings.map((warning, index) => (
                      <div key={`${warning.en}-${index}`} className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-amber-900">
                        <div className="mb-1 inline-flex items-center gap-2 font-semibold">
                          <Gauge size={16} />
                          {labels.verbosity}
                        </div>
                        <div>{warning[lang]}</div>
                      </div>
                    ))}

                    {evaluation.hedgeWords.length > 0 && (
                      <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-amber-900">
                        <div className="mb-1 inline-flex items-center gap-2 font-semibold">
                          <TriangleAlert size={16} />
                          {labels.hedgeWords}
                        </div>
                        <div>{evaluation.hedgeWords.join(', ')}</div>
                      </div>
                    )}

                    {evaluation.unsafeDataMatches.length > 0 && (
                      <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-red-900">
                        <div className="mb-1 inline-flex items-center gap-2 font-semibold">
                          <ShieldAlert size={16} />
                          {labels.unsafeData}
                        </div>
                        <div>{evaluation.unsafeDataMatches.join(', ')}</div>
                      </div>
                    )}

                    {guideMode === 'decisions' && evaluation.evidenceSignals.length > 0 && (
                      <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-3 text-blue-900">
                        <div className="mb-1 font-semibold">{labels.evidenceSignals}</div>
                        <div>{evaluation.evidenceSignals.join(', ')}</div>
                      </div>
                    )}

                    {evaluation.riskWarnings.length > 0 && (
                      <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-red-900">
                        <div className="mb-1 inline-flex items-center gap-2 font-semibold">
                          <ShieldAlert size={16} />
                          {labels.riskWarnings}
                        </div>
                        <div className="space-y-1">
                          {evaluation.riskWarnings.map((warning, index) => (
                            <div key={`${warning.en}-${index}`}>{warning[lang]}</div>
                          ))}
                        </div>
                      </div>
                    )}

                    {totalWarnings === 0 && (
                      <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-gray-600">{labels.noWarnings}</div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex min-h-[420px] flex-col items-center justify-center gap-3 text-center text-gray-500">
                <Target size={28} className="text-blue-500" />
                <div className="max-w-sm">{labels.waiting}</div>
              </div>
            )}
          </div>

          {runHistory.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-700">{labels.history}</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {runHistory.map((run) => {
                  const missingCount = run.evaluation.checks.filter((check) => !check.passed).length;
                  const warningCount = run.evaluation.hedgeWords.length
                    + run.evaluation.unsafeDataMatches.length
                    + run.evaluation.riskWarnings.length
                    + run.evaluation.verbosityWarnings.length;

                  return (
                    <div key={run.id} className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="truncate text-sm font-semibold text-gray-800" title={run.label}>{run.label}</span>
                        <span className="rounded-full bg-slate-900 px-2 py-1 text-xs font-bold text-white">{run.evaluation.score}</span>
                      </div>
                      <div className="space-y-1 text-xs text-gray-500">
                        <div>{run.evaluation.wordCount} {labels.words} · {run.evaluation.controlSignalCount} {labels.signals}</div>
                        <div>{labels.missing}: {missingCount} · {labels.warnings}: {warningCount}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractivePlayground;
