import { GuideMode, Lang } from '../types';
import {
  evaluatePrompt as evaluateBasePrompt,
  PromptEvaluation as BasePromptEvaluation,
} from './promptEvaluator';

export interface TaskFitPromptEvaluation extends BasePromptEvaluation {
  wordCount: number;
  controlSignalCount: number;
  verbosityWarnings: Array<Record<Lang, string>>;
  lengthIsScored: false;
}

const fillerPatterns: Array<{ pattern: RegExp; label: Record<Lang, string> }> = [
  {
    pattern: /\b(?:very|extremely)\s+(?:detailed|comprehensive|thorough|professional)\b/giu,
    label: {
      en: 'Generic intensity words do not define better behavior.',
      de: 'Generische Verstärker definieren kein besseres Verhalten.',
    },
  },
  {
    pattern: /\b(?:cover everything|do not miss anything|best possible answer|everything (?:else )?that might be useful)\b/giu,
    label: {
      en: 'Unlimited scope replaces a usable boundary with wishful thinking.',
      de: 'Unbegrenzter Scope ersetzt eine nutzbare Grenze durch Wunschdenken.',
    },
  },
  {
    pattern: /\b(?:think (?:carefully|deeply|step by step)|be thorough|be professional)\b/giu,
    label: {
      en: 'Process theatre adds words without adding evidence, constraints, or validation.',
      de: 'Prozess-Theater ergänzt Wörter, aber keine Evidenz, Grenzen oder Validierung.',
    },
  },
];

const countWords = (prompt: string): number => prompt.trim().split(/\s+/u).filter(Boolean).length;

const findRepeatedInstructionLines = (prompt: string): string[] => {
  const counts = new Map<string, number>();

  for (const line of prompt.split(/\r?\n/u)) {
    const normalized = line
      .trim()
      .toLocaleLowerCase()
      .replace(/^[\-*\d.)\s]+/u, '')
      .replace(/\s+/gu, ' ');

    if (normalized.length < 18) {
      continue;
    }

    counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .filter(([, count]) => count > 1)
    .map(([line]) => line);
};

const collectVerbosityWarnings = (prompt: string): Array<Record<Lang, string>> => {
  const warnings: Array<Record<Lang, string>> = [];

  for (const { pattern, label } of fillerPatterns) {
    pattern.lastIndex = 0;
    if (pattern.test(prompt)) {
      warnings.push(label);
    }
  }

  const repeatedLines = findRepeatedInstructionLines(prompt);
  if (repeatedLines.length > 0) {
    warnings.push({
      en: `Repeated instruction lines detected: ${repeatedLines.slice(0, 2).join(' | ')}`,
      de: `Wiederholte Anweisungszeilen erkannt: ${repeatedLines.slice(0, 2).join(' | ')}`,
    });
  }

  return warnings;
};

export const evaluateTaskFitPrompt = (
  prompt: string,
  guideMode: GuideMode = 'coding',
): TaskFitPromptEvaluation => {
  const baseEvaluation = evaluateBasePrompt(prompt, guideMode);
  const wordCount = countWords(prompt);
  const controlSignalCount = baseEvaluation.checks.filter((check) => check.passed).length;
  const verbosityWarnings = collectVerbosityWarnings(prompt);

  let score = baseEvaluation.score;
  score -= Math.min(18, verbosityWarnings.length * 6);

  if (wordCount >= 140 && controlSignalCount <= 2) {
    score -= 12;
    verbosityWarnings.push({
      en: 'The prompt is long but still provides few usable control signals.',
      de: 'Der Prompt ist lang, enthält aber weiterhin nur wenige nutzbare Kontrollsignale.',
    });
  }

  score = Math.max(0, Math.min(100, score));

  const summary: Record<Lang, string> = score >= 85 && verbosityWarnings.length === 0
    ? {
        en: 'Task-fit prompt: the useful control signals are present without obvious filler.',
        de: 'Aufgabenpassender Prompt: Die nötigen Kontrollsignale sind ohne offensichtlichen Fülltext vorhanden.',
      }
    : score >= 60
      ? {
          en: 'Usable draft: improve missing control signals or remove instructions that do not change the task.',
          de: 'Brauchbarer Entwurf: Fehlende Kontrollsignale ergänzen oder Anweisungen entfernen, die die Aufgabe nicht verändern.',
        }
      : {
          en: 'Weak task contract: more words will not fix missing evidence, boundaries, validation, or a clear outcome.',
          de: 'Schwacher Aufgabenvertrag: Mehr Wörter ersetzen keine Evidenz, Grenzen, Validierung oder ein klares Ergebnis.',
        };

  return {
    ...baseEvaluation,
    score,
    summary,
    wordCount,
    controlSignalCount,
    verbosityWarnings,
    lengthIsScored: false,
  };
};
