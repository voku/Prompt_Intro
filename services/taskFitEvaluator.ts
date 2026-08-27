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
    pattern: /\b(?:very|extremely)\s+(?:detailed|comprehensive|thorough|professional|careful)\b/giu,
    label: {
      en: 'Generic intensity words do not describe better work.',
      de: 'Generische Verstärker beschreiben keine bessere Arbeit.',
    },
  },
  {
    pattern: /\b(?:sehr|besonders|äußerst)\s+(?:detailliert\w*|umfassend\w*|gründlich\w*|professionell\w*|sorgfältig\w*)/giu,
    label: {
      en: 'Generic intensity words do not describe better work.',
      de: 'Generische Verstärker beschreiben keine bessere Arbeit.',
    },
  },
  {
    pattern: /\b(?:cover everything|do not miss anything|best possible answer|everything (?:else )?that might be (?:useful|relevant))\b/giu,
    label: {
      en: 'Unlimited scope replaces a usable boundary with wishful thinking.',
      de: 'Unbegrenzter Umfang ersetzt eine nutzbare Grenze durch Wunschdenken.',
    },
  },
  {
    pattern: /(?:decke alles ab|vergiss nichts|übersehe nichts|bestmögliche antwort|alles,? was (?:wichtig|nützlich|relevant) sein könnte|gehe auf alles ein)/giu,
    label: {
      en: 'Unlimited scope replaces a usable boundary with wishful thinking.',
      de: 'Unbegrenzter Umfang ersetzt eine nutzbare Grenze durch Wunschdenken.',
    },
  },
  {
    pattern: /\b(?:think (?:carefully|deeply|step by step)|be thorough|be professional|take your time)\b/giu,
    label: {
      en: 'Process theatre adds words but no material, limits, or evidence.',
      de: 'Prozess-Theater ergänzt Wörter, aber kein Material, keine Grenzen, keine Belege.',
    },
  },
  {
    pattern: /(?:denke? (?:sorgfältig|gründlich|schritt für schritt)|sei (?:gründlich|professionell)|lass dir zeit)/giu,
    label: {
      en: 'Process theatre adds words but no material, limits, or evidence.',
      de: 'Prozess-Theater ergänzt Wörter, aber kein Material, keine Grenzen, keine Belege.',
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
  guideMode: GuideMode = 'desk',
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
      en: 'Long prompt, few usable instructions. The words are not the missing part.',
      de: 'Langer Prompt, wenige nutzbare Anweisungen. An den Wörtern liegt es nicht.',
    });
  }

  score = Math.max(0, Math.min(100, score));

  const summary: Record<Lang, string> = score >= 85 && verbosityWarnings.length === 0
    ? {
        en: 'Fits the task: the useful instructions are there, without filler.',
        de: 'Passt zur Aufgabe: Die nützlichen Anweisungen sind da, ohne Fülltext.',
      }
    : score >= 60
      ? {
          en: 'Usable draft: add the missing lines, or delete the ones that change nothing.',
          de: 'Brauchbarer Entwurf: Ergänze die fehlenden Zeilen oder streich die, die nichts verändern.',
        }
      : {
          en: 'Weak instruction: more words will not replace material, limits, or a source.',
          de: 'Schwache Anweisung: Mehr Wörter ersetzen kein Material, keine Grenzen und keine Quelle.',
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
