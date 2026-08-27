import React, { useEffect, useMemo, useState } from 'react';
import { BadgeCheck, CalendarX, Gauge, Play, RotateCcw, ShieldAlert, Wrench } from 'lucide-react';
import { Lang } from '../types';
import { getDefaultPreset, PROMPT_PRESETS } from '../promptPresets';
import { describeCaseBoundToken, evaluatePrompt, PromptEvaluation } from '../services/promptEvaluator';

interface RunRecord {
  id: number;
  label: string;
  evaluation: PromptEvaluation;
}

interface InteractivePlaygroundProps {
  lang: Lang;
}

const InteractivePlayground: React.FC<InteractivePlaygroundProps> = ({ lang }) => {
  const [prompt, setPrompt] = useState(getDefaultPreset(lang)?.text ?? '');
  const [evaluation, setEvaluation] = useState<PromptEvaluation | null>(null);
  const [runHistory, setRunHistory] = useState<RunRecord[]>([]);

  const labels = useMemo(
    () => ({
      badge: lang === 'de' ? 'Lokale Prüfung · kein Modellaufruf' : 'Local check · no model call',
      helper: lang === 'de'
        ? 'Sucht die zwei Durchgänge, die Trennung von Prüfung und Fertig-wenn – und alles, was den Text an einen Fall bindet.'
        : 'Looks for the two passes, the split between check and done-when — and for everything that binds the text to one case.',
      placeholder: lang === 'de'
        ? 'Eigene Methode oder eigenen Prompt einfügen…'
        : 'Paste your own method or prompt…',
      run: lang === 'de' ? 'Prüfen' : 'Check it',
      reset: lang === 'de' ? 'Zurücksetzen' : 'Reset',
      checks: lang === 'de' ? 'Was eine Methode ausmacht' : 'What makes it a method',
      caseBound: lang === 'de' ? 'Bindet den Text an einen Fall' : 'Binds the text to one case',
      caseBoundNote: lang === 'de'
        ? 'Das gehört ins Material, das du beilegst – nicht in die Methode. Sonst läuft sie mit dem Fall ab.'
        : 'This belongs in the material you attach, not in the method. Otherwise it expires with the case.',
      warnings: lang === 'de' ? 'Hinweise' : 'Warnings',
      filler: lang === 'de' ? 'Fülltext erkannt' : 'Filler detected',
      risk: lang === 'de' ? 'Risiko' : 'Risk',
      history: lang === 'de' ? 'Letzte Prüfungen' : 'Recent checks',
      score: lang === 'de' ? 'Wiederverwendbarkeit' : 'Reusability',
      words: lang === 'de' ? 'Wörter' : 'words',
      signals: lang === 'de' ? 'von 6 Merkmalen' : 'of 6 traits',
      lengthNote: lang === 'de'
        ? 'Länge zählt nicht. Gewertet wird, ob der Text den Auftrag selbst bauen kann und ob er den nächsten Fall übersteht.'
        : 'Length does not count. What counts is whether the text can build the work order itself and survive the next case.',
      noWarnings: lang === 'de' ? 'Keine Hinweise.' : 'Nothing flagged.',
      noCaseBound: lang === 'de'
        ? 'Nichts gefunden, was an einen Einzelfall gebunden ist.'
        : 'Nothing found that is tied to a single case.',
      waiting: lang === 'de'
        ? 'Nimm ein Beispiel oder füg deinen eigenen Text ein. Vergleich vor allem „Prompt für einen Fall“ mit „Dasselbe als Methode“.'
        : 'Pick an example or paste your own text. Compare “prompt for one case” with “the same as a method”.',
      missing: lang === 'de' ? 'Fehlt' : 'Missing',
    }),
    [lang],
  );

  const presets = PROMPT_PRESETS[lang];

  useEffect(() => {
    setPrompt(getDefaultPreset(lang)?.text ?? '');
    setEvaluation(null);
    setRunHistory([]);
  }, [lang]);

  const handleRun = (): void => {
    if (!prompt.trim()) {
      return;
    }

    const matchingPreset = presets.find((preset) => preset.text === prompt);
    const nextEvaluation = evaluatePrompt(prompt);
    setEvaluation(nextEvaluation);
    setRunHistory((previous) => [
      {
        id: Date.now(),
        label: matchingPreset?.label ?? (lang === 'de' ? 'Eigener Text' : 'Own text'),
        evaluation: nextEvaluation,
      },
      ...previous,
    ].slice(0, 4));
  };

  const handleReset = (): void => {
    setPrompt(getDefaultPreset(lang)?.text ?? '');
    setEvaluation(null);
    setRunHistory([]);
  };

  const totalWarnings = evaluation ? evaluation.fillerWarnings.length + evaluation.riskWarnings.length : 0;

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
              onClick={handleRun}
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
                      <div className="mt-1 text-sm font-bold text-blue-700">{evaluation.verdict[lang]}</div>
                    </div>
                    <div className="max-w-xs rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                      {evaluation.summary[lang]}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-gray-700">
                    <span className="rounded-full bg-gray-100 px-3 py-1">{evaluation.wordCount} {labels.words}</span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-800">{evaluation.methodSignalCount} {labels.signals}</span>
                    <span className={`rounded-full px-3 py-1 ${evaluation.caseBoundTokens.length > 0 ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                      {evaluation.caseBoundTokens.length}× {lang === 'de' ? 'fallgebunden' : 'case-bound'}
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

                <div className="mb-4">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-700">{labels.caseBound}</h3>
                  {evaluation.caseBoundTokens.length > 0 ? (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-sm text-amber-900">
                      <div className="mb-1 inline-flex items-center gap-2 font-semibold">
                        <CalendarX size={16} />
                        {evaluation.caseBoundTokens.length}
                      </div>
                      <ul className="mb-2 list-disc space-y-1 pl-5">
                        {evaluation.caseBoundTokens.map((token) => (
                          <li key={token}>{describeCaseBoundToken(token, lang)}</li>
                        ))}
                      </ul>
                      <p className="text-xs italic">{labels.caseBoundNote}</p>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-3 text-sm text-green-900">{labels.noCaseBound}</div>
                  )}
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-700">{labels.warnings}</h3>
                  <div className="space-y-2 text-sm">
                    {evaluation.fillerWarnings.map((warning, index) => (
                      <div key={`${warning.en}-${index}`} className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-amber-900">
                        <div className="mb-1 inline-flex items-center gap-2 font-semibold">
                          <Gauge size={16} />
                          {labels.filler}
                        </div>
                        <div>{warning[lang]}</div>
                      </div>
                    ))}

                    {evaluation.riskWarnings.map((warning, index) => (
                      <div key={`${warning.en}-${index}`} className="rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-red-900">
                        <div className="mb-1 inline-flex items-center gap-2 font-semibold">
                          <ShieldAlert size={16} />
                          {labels.risk}
                        </div>
                        <div>{warning[lang]}</div>
                      </div>
                    ))}

                    {totalWarnings === 0 && (
                      <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-gray-600">{labels.noWarnings}</div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex min-h-[420px] flex-col items-center justify-center gap-3 text-center text-gray-500">
                <Wrench size={28} className="text-blue-500" />
                <div className="max-w-sm">{labels.waiting}</div>
              </div>
            )}
          </div>

          {runHistory.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-700">{labels.history}</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {runHistory.map((run) => (
                  <div key={run.id} className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="truncate text-sm font-semibold text-gray-800" title={run.label}>{run.label}</span>
                      <span className="rounded-full bg-slate-900 px-2 py-1 text-xs font-bold text-white">{run.evaluation.score}</span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div>{run.evaluation.verdict[lang]}</div>
                      <div>
                        {run.evaluation.methodSignalCount}/6 · {run.evaluation.caseBoundTokens.length}× {lang === 'de' ? 'fallgebunden' : 'case-bound'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractivePlayground;
