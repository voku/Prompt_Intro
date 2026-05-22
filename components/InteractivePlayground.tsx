import React, { useMemo, useState } from 'react';
import { BadgeCheck, Play, RotateCcw, ShieldAlert, Target, TriangleAlert } from 'lucide-react';
import { Lang } from '../types';
import { PromptEvaluation, evaluatePrompt } from '../services/promptEvaluator';

interface RunRecord {
  id: number;
  label: string;
  evaluation: PromptEvaluation;
}

interface InteractivePlaygroundProps {
  lang: Lang;
}

const PROMPT_PRESETS: Record<Lang, Array<{ label: string; text: string }>> = {
  en: [
    {
      label: 'Weak bug fix',
      text: 'Please maybe fix the login bug if possible and add some tests.',
    },
    {
      label: 'Bug fix contract',
      text: 'Goal: Fix the login regression in AuthController.\nContext: Inspect the failing path in src/AuthController.ts and the regression case in tests/auth/login.spec.ts.\nConstraints: Preserve the public API, do not touch unrelated routes, and add exactly one regression test for the broken path.\nValidation: Run npm test and npm run typecheck, then paste raw output.\nOutput format: Bullet list with changed files, root cause, and validation results.\nDone when: The regression test fails before the fix, passes after the fix, and the public API stays unchanged.',
    },
    {
      label: 'Legacy migration slice',
      text: 'Goal: Migrate one reporting screen from jQuery to React.\nContext: Compare the old screen in legacy/reports.html with the new component in src/features/reports. Include before/after screenshots.\nConstraints: Keep existing behavior stable, migrate only the invoice filter slice, and document every behavior difference.\nValidation: Run the existing UI test, compare screenshots, and list any remaining gaps.\nOutput format: Markdown table with old behavior, new behavior, and evidence.\nDone when: One vertical slice is migrated, screenshots match, and open decisions are documented in implementation notes.',
    },
    {
      label: 'SQL debugging',
      text: 'Goal: Find the root cause of the failing SQL query.\nContext: Inspect the schema first, then compare the working query with the failing query from the production log.\nConstraints: Produce the minimal fix, do not add indexes without evidence, and do not rewrite unrelated joins.\nValidation: Show the schema evidence, identify the exact mismatch, and provide the corrected query.\nOutput format: Short sections for schema, diff, root cause, and fix.\nDone when: The root cause is named and the minimal corrected query is ready to run.',
    },
  ],
  de: [
    {
      label: 'Schwacher Bugfix',
      text: 'Bitte vielleicht den Login-Bug beheben und wenn möglich ein paar Tests hinzufügen.',
    },
    {
      label: 'Bugfix-Vertrag',
      text: 'Ziel: Die Login-Regression in AuthController beheben.\nKontext: Den fehlschlagenden Pfad in src/AuthController.ts und den Regressionstest in tests/auth/login.spec.ts prüfen.\nEinschränkungen: Öffentliche API beibehalten, keine nicht betroffenen Routen anfassen und genau einen Regressionstest für den kaputten Pfad ergänzen.\nValidierung: npm test und npm run typecheck ausführen und rohe Ausgabe einfügen.\nAusgabeformat: Bullet-Liste mit geänderten Dateien, Grundursache und Validierungsergebnissen.\nFertig wenn: Der Regressionstest vor dem Fix fehlschlägt, nach dem Fix besteht und die öffentliche API unverändert bleibt.',
    },
    {
      label: 'Legacy-Migration',
      text: 'Ziel: Einen Reporting-Screen von jQuery nach React migrieren.\nKontext: Den alten Screen in legacy/reports.html mit der neuen Komponente in src/features/reports vergleichen. Vorher/Nachher-Screenshots einbeziehen.\nEinschränkungen: Bestehendes Verhalten stabil halten, nur den Invoice-Filter-Slice migrieren und jede Verhaltensabweichung dokumentieren.\nValidierung: Den vorhandenen UI-Test ausführen, Screenshots vergleichen und verbleibende Lücken auflisten.\nAusgabeformat: Markdown-Tabelle mit altem Verhalten, neuem Verhalten und Beleg.\nFertig wenn: Ein vertikaler Slice migriert ist, die Screenshots passen und offene Entscheidungen in den Implementation Notes stehen.',
    },
    {
      label: 'SQL-Debugging',
      text: 'Ziel: Die Grundursache der fehlschlagenden SQL-Query finden.\nKontext: Zuerst das Schema prüfen, dann die funktionierende Query mit der fehlschlagenden Query aus dem Produktionslog vergleichen.\nEinschränkungen: Minimalen Fix liefern, keine Indizes ohne Beleg hinzufügen und keine nicht betroffenen Joins umschreiben.\nValidierung: Schema-Belege zeigen, den exakten Mismatch benennen und die korrigierte Query liefern.\nAusgabeformat: Kurze Abschnitte für Schema, Diff, Grundursache und Fix.\nFertig wenn: Die Grundursache benannt ist und die minimal korrigierte Query bereitsteht.',
    },
  ],
};

const InteractivePlayground: React.FC<InteractivePlaygroundProps> = ({ lang }) => {
  const [prompt, setPrompt] = useState(PROMPT_PRESETS[lang][1].text);
  const [evaluation, setEvaluation] = useState<PromptEvaluation | null>(null);
  const [runHistory, setRunHistory] = useState<RunRecord[]>([]);

  const labels = useMemo(
    () => ({
      badge: lang === 'de' ? 'Lokaler Evaluator · kein Modellaufruf' : 'Local evaluator · no model call',
      helper:
        lang === 'de'
          ? 'Bewertet Prompt-Qualität vor der Agenten-Ausführung: Struktur, Nachweisbarkeit und Risikosignale.'
          : 'Scores prompt quality before you hand it to an agent: structure, evidence, and risk signals.',
      placeholder:
        lang === 'de'
          ? 'Prompt hier einfügen oder einen Preset laden…'
          : 'Paste a prompt here or load a preset…',
      run: lang === 'de' ? 'Prompt prüfen' : 'Evaluate prompt',
      reset: lang === 'de' ? 'Zurücksetzen' : 'Reset',
      checks: lang === 'de' ? 'Vertrags-Checks' : 'Contract checks',
      summary: lang === 'de' ? 'Zusammenfassung' : 'Summary',
      warnings: lang === 'de' ? 'Warnungen' : 'Warnings',
      hedgeWords: lang === 'de' ? 'Abschwächende Wörter erkannt' : 'Hedge words detected',
      unsafeData: lang === 'de' ? 'Möglicherweise sensible Daten erkannt' : 'Potentially sensitive data detected',
      history: lang === 'de' ? 'Letzte Auswertungen' : 'Recent evaluations',
      score: lang === 'de' ? 'Punktzahl' : 'Score',
      noWarnings: lang === 'de' ? 'Keine Warnungen erkannt.' : 'No warnings detected.',
      waiting:
        lang === 'de'
          ? 'Wähle einen Preset oder prüfe deinen eigenen Prompt.'
          : 'Choose a preset or evaluate your own prompt.',
      missing: lang === 'de' ? 'Fehlend' : 'Missing',
    }),
    [lang],
  );

  const presets = PROMPT_PRESETS[lang];

  const handleRun = (labelOverride?: string) => {
    if (!prompt.trim()) {
      return;
    }

    const nextEvaluation = evaluatePrompt(prompt);
    setEvaluation(nextEvaluation);
    setRunHistory((previous) => [
      {
        id: Date.now(),
        label: labelOverride ?? (lang === 'de' ? 'Eigener Prompt' : 'Custom prompt'),
        evaluation: nextEvaluation,
      },
      ...previous,
    ].slice(0, 4));
  };

  const handleReset = () => {
    setPrompt(PROMPT_PRESETS[lang][1].text);
    setEvaluation(null);
    setRunHistory([]);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
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
                onClick={() => setPrompt(preset.text)}
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
              onClick={() => handleRun(presets.find((preset) => preset.text === prompt)?.label)}
              disabled={!prompt.trim()}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="inline-flex items-center gap-2">
                <Play size={16} />
                {labels.run}
              </span>
            </button>

            <button
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
                <div className="mb-4 flex items-center justify-between gap-4 border-b border-gray-100 pb-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">{labels.score}</div>
                    <div className="text-4xl font-bold text-gray-900">{evaluation.score}<span className="text-lg text-gray-400">/100</span></div>
                  </div>
                  <div className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                    {evaluation.summary[lang]}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-700">{labels.checks}</h3>
                  <div className="space-y-2">
                    {evaluation.checks.map((check) => (
                      <div
                        key={check.key}
                        className={`rounded-lg border px-3 py-3 ${check.passed ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className={`font-semibold ${check.passed ? 'text-green-800' : 'text-amber-800'}`}>
                            {check.label[lang]}
                          </span>
                          <span className={`text-xs font-bold uppercase tracking-wider ${check.passed ? 'text-green-700' : 'text-amber-700'}`}>
                            {check.passed ? 'OK' : labels.missing}
                          </span>
                        </div>
                        <p className={`mt-1 text-sm ${check.passed ? 'text-green-700' : 'text-amber-700'}`}>{check.detail[lang]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-700">{labels.warnings}</h3>
                  <div className="space-y-2 text-sm">
                    {evaluation.hedgeWords.length > 0 && (
                      <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-amber-800">
                        <div className="mb-1 inline-flex items-center gap-2 font-semibold">
                          <TriangleAlert size={16} />
                          {labels.hedgeWords}
                        </div>
                        <div>{evaluation.hedgeWords.join(', ')}</div>
                      </div>
                    )}
                    {evaluation.unsafeDataMatches.length > 0 && (
                      <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-red-800">
                        <div className="mb-1 inline-flex items-center gap-2 font-semibold">
                          <ShieldAlert size={16} />
                          {labels.unsafeData}
                        </div>
                        <div>{evaluation.unsafeDataMatches.join(', ')}</div>
                      </div>
                    )}
                    {evaluation.hedgeWords.length === 0 && evaluation.unsafeDataMatches.length === 0 && (
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
                  const warningCount = run.evaluation.hedgeWords.length + run.evaluation.unsafeDataMatches.length;

                  return (
                    <div key={run.id} className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="truncate text-sm font-semibold text-gray-800" title={run.label}>{run.label}</span>
                        <span className="rounded-full bg-slate-900 px-2 py-1 text-xs font-bold text-white">{run.evaluation.score}</span>
                      </div>
                      <div className="space-y-1 text-xs text-gray-500">
                        <div>{labels.missing}: {missingCount}</div>
                        <div>{labels.warnings}: {warningCount}</div>
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
