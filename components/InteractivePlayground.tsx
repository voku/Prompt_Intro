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
      badge: lang === 'de' ? 'Lokale Heuristik · kein LLM-Aufruf' : 'Local heuristic · no model call',
      helper: lang === 'de'
        ? 'Die Heuristik sucht nach L2-Eigenschaften: erst einen konkreten L1-Auftrag aus aktuellem Kontext bauen, vor der Ausführung stoppen, Prüfung und Fertig-wenn trennen, fehlende Evidenz sichtbar lassen und Kontextrollen respektieren.'
        : 'The heuristic looks for L2 properties: construct a concrete L1 contract from current context, stop before execution, separate Verification from Done When, preserve missing evidence and respect context roles.',
      placeholder: lang === 'de' ? 'Eigenen Prompt oder eine eigene Methode einfügen …' : 'Paste your own prompt or method …',
      run: lang === 'de' ? 'Analysieren' : 'Analyse',
      reset: lang === 'de' ? 'Zurücksetzen' : 'Reset',
      checks: lang === 'de' ? 'Welche L2-Eigenschaften sind vorhanden?' : 'Which L2 properties are present?',
      caseBound: lang === 'de' ? 'Falldaten im wiederverwendbaren Text' : 'Case data in reusable text',
      caseBoundNote: lang === 'de'
        ? 'Ticket-ID, Dateiname, Datum oder ähnliche Falldaten gehören in den aktuellen Kontext bzw. den erzeugten L1-Auftrag – nicht dauerhaft in die L2-Methode.'
        : 'Ticket IDs, filenames, dates and similar case data belong in the current context or generated L1 contract, not in the reusable L2 method.',
      warnings: lang === 'de' ? 'Auffälligkeiten' : 'Warnings',
      filler: lang === 'de' ? 'Prompt-Füllmaterial' : 'Prompt filler',
      risk: lang === 'de' ? 'Befugnis / Risiko' : 'Authority / risk',
      history: lang === 'de' ? 'Letzte Analysen' : 'Recent analyses',
      score: lang === 'de' ? 'Heuristik-Score' : 'Heuristic score',
      words: lang === 'de' ? 'Wörter' : 'words',
      signals: lang === 'de' ? 'von 6 Merkmalen' : 'of 6 traits',
      lengthNote: lang === 'de'
        ? 'Die Länge ist egal. Entscheidend ist, ob die Methode aus aktuellem Kontext einen konkreten Auftrag baut, vor der Ausführung stoppt und beim nächsten Fall noch funktioniert.'
        : 'Length does not matter. What matters is whether the method builds a concrete contract from current context, stops before execution and survives the next case.',
      noWarnings: lang === 'de' ? 'Keine Auffälligkeit gefunden.' : 'Nothing flagged.',
      noCaseBound: lang === 'de' ? 'Keine offensichtlichen Falldaten in der wiederverwendbaren Anweisung.' : 'No obvious case-specific data in the reusable instruction.',
      waiting: lang === 'de'
        ? 'Starte mit „Direkter Prompt: ein Import“ und vergleiche danach „Derselbe Fall als L2-Methode“. Danach den absichtlich kaputten Fall „Methode mit altem Fall im Gepäck“ ausprobieren.'
        : 'Start with “Direct prompt: one import”, compare it with “Same task as an L2 method”, then try the deliberately polluted method.',
      missing: lang === 'de' ? 'FEHLT' : 'MISSING',
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
    if (!prompt.trim()) return;

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
      <div className="border-2 border-cyan-800 bg-cyan-950/30 px-4 py-3 text-sm text-cyan-100 shadow-[4px_4px_0_#020617]">
        <div className="pixel-font mb-2 inline-flex items-center gap-2 text-[8px] text-emerald-300">
          <BadgeCheck size={14} />
          {labels.badge}
        </div>
        <p className="leading-relaxed">{labels.helper}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_.85fr]">
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
                className="retro-button bg-slate-900 px-3 py-2 text-xs font-bold text-slate-200 hover:text-cyan-200"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder={labels.placeholder}
            className="min-h-[360px] w-full resize-y border-2 border-indigo-800 bg-[#050816] p-4 font-mono text-sm leading-relaxed text-slate-200 shadow-[5px_5px_0_#020617] outline-none focus:border-cyan-500"
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleRun}
              disabled={!prompt.trim()}
              className="retro-button flex-1 bg-fuchsia-700 px-4 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="inline-flex items-center gap-2"><Play size={16} />{labels.run}</span>
            </button>
            <button type="button" onClick={handleReset} className="retro-button bg-slate-900 px-4 py-3 font-bold text-slate-200">
              <span className="inline-flex items-center gap-2"><RotateCcw size={16} />{labels.reset}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="border-2 border-indigo-800 bg-slate-950/85 p-5 shadow-[5px_5px_0_#020617]">
            {evaluation ? (
              <>
                <div className="mb-5 border-b-2 border-indigo-900 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="pixel-font text-[8px] text-fuchsia-400">{labels.score}</div>
                      <div className="mt-2 text-4xl font-black text-white">{evaluation.score}<span className="text-lg text-slate-500">/100</span></div>
                      <div className="mt-1 text-sm font-bold text-cyan-300">{evaluation.verdict[lang]}</div>
                    </div>
                    <div className="max-w-xs border-2 border-emerald-800 bg-emerald-950/30 px-4 py-3 text-sm font-semibold leading-relaxed text-emerald-100">
                      {evaluation.summary[lang]}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="border border-slate-700 bg-slate-900 px-3 py-1 text-slate-300">{evaluation.wordCount} {labels.words}</span>
                    <span className="border border-cyan-800 bg-cyan-950/30 px-3 py-1 text-cyan-200">{evaluation.methodSignalCount} {labels.signals}</span>
                    <span className={`border px-3 py-1 ${evaluation.caseBoundTokens.length > 0 ? 'border-amber-700 bg-amber-950/30 text-amber-200' : 'border-emerald-800 bg-emerald-950/30 text-emerald-200'}`}>
                      {evaluation.caseBoundTokens.length}× {lang === 'de' ? 'fallgebunden' : 'case-bound'}
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-400">{labels.lengthNote}</p>
                </div>

                <div className="mb-5">
                  <h3 className="pixel-font mb-3 text-[8px] text-fuchsia-400">{labels.checks}</h3>
                  <div className="space-y-2">
                    {evaluation.checks.map((check) => (
                      <div key={check.key} className={`border px-3 py-3 ${check.passed ? 'border-cyan-800 bg-cyan-950/20' : 'border-amber-800 bg-amber-950/20'}`}>
                        <div className="flex items-center justify-between gap-3">
                          <span className={`font-bold ${check.passed ? 'text-cyan-100' : 'text-amber-100'}`}>{check.label[lang]}</span>
                          <span className={`pixel-font text-[7px] ${check.passed ? 'text-emerald-300' : 'text-amber-300'}`}>{check.passed ? 'OK' : labels.missing}</span>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-slate-400">{check.detail[lang]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <h3 className="pixel-font mb-3 text-[8px] text-fuchsia-400">{labels.caseBound}</h3>
                  {evaluation.caseBoundTokens.length > 0 ? (
                    <div className="border border-amber-700 bg-amber-950/25 px-3 py-3 text-sm text-amber-100">
                      <div className="mb-2 inline-flex items-center gap-2 font-bold"><CalendarX size={16} />{evaluation.caseBoundTokens.length}</div>
                      <ul className="mb-2 list-disc space-y-1 pl-5">
                        {evaluation.caseBoundTokens.map((token) => <li key={token}>{describeCaseBoundToken(token, lang)}</li>)}
                      </ul>
                      <p className="text-xs leading-relaxed text-amber-200/80">{labels.caseBoundNote}</p>
                    </div>
                  ) : (
                    <div className="border border-emerald-800 bg-emerald-950/25 px-3 py-3 text-sm text-emerald-100">{labels.noCaseBound}</div>
                  )}
                </div>

                <div>
                  <h3 className="pixel-font mb-3 text-[8px] text-fuchsia-400">{labels.warnings}</h3>
                  <div className="space-y-2 text-sm">
                    {evaluation.fillerWarnings.map((warning, index) => (
                      <div key={`${warning.en}-${index}`} className="border border-amber-800 bg-amber-950/20 px-3 py-3 text-amber-100">
                        <div className="mb-1 inline-flex items-center gap-2 font-bold"><Gauge size={16} />{labels.filler}</div>
                        <div>{warning[lang]}</div>
                      </div>
                    ))}
                    {evaluation.riskWarnings.map((warning, index) => (
                      <div key={`${warning.en}-${index}`} className="border border-rose-800 bg-rose-950/20 px-3 py-3 text-rose-100">
                        <div className="mb-1 inline-flex items-center gap-2 font-bold"><ShieldAlert size={16} />{labels.risk}</div>
                        <div>{warning[lang]}</div>
                      </div>
                    ))}
                    {totalWarnings === 0 && <div className="border border-slate-700 bg-slate-900 px-3 py-3 text-slate-400">{labels.noWarnings}</div>}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex min-h-[460px] flex-col items-center justify-center gap-4 text-center text-slate-400">
                <Wrench size={34} className="text-cyan-400" />
                <div className="max-w-sm leading-relaxed">{labels.waiting}</div>
              </div>
            )}
          </div>

          {runHistory.length > 0 && (
            <div className="border-2 border-indigo-900 bg-slate-950/70 p-4">
              <h3 className="pixel-font mb-3 text-[8px] text-fuchsia-400">{labels.history}</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {runHistory.map((run) => (
                  <div key={run.id} className="border border-slate-700 bg-slate-900 p-3">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="truncate text-sm font-bold text-slate-200" title={run.label}>{run.label}</span>
                      <span className="bg-fuchsia-800 px-2 py-1 text-xs font-black text-white">{run.evaluation.score}</span>
                    </div>
                    <div className="space-y-1 text-xs text-slate-500">
                      <div>{run.evaluation.verdict[lang]}</div>
                      <div>{run.evaluation.methodSignalCount}/6 · {run.evaluation.caseBoundTokens.length}× {lang === 'de' ? 'fallgebunden' : 'case-bound'}</div>
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
