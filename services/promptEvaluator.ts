import { Lang } from '../types';

export interface PromptCheck {
  key: 'goal' | 'context' | 'constraints' | 'outputFormat' | 'doneWhen' | 'validation';
  passed: boolean;
  label: Record<Lang, string>;
  detail: Record<Lang, string>;
}

export interface PromptEvaluation {
  score: number;
  checks: PromptCheck[];
  hedgeWords: string[];
  unsafeDataMatches: string[];
  summary: Record<Lang, string>;
}

const sectionChecks: Array<Pick<PromptCheck, 'key' | 'label' | 'detail'> & { patterns: RegExp[] }> = [
  {
    key: 'goal',
    label: { en: 'Goal present', de: 'Ziel vorhanden' },
    detail: {
      en: 'State what should change, not just the topic.',
      de: 'Beschreibe, was sich ändern soll, nicht nur das Thema.',
    },
    patterns: [/\bgoal\s*:/i, /<goal>/i, /\bziel\s*:/i],
  },
  {
    key: 'context',
    label: { en: 'Context present', de: 'Kontext vorhanden' },
    detail: {
      en: 'Name files, examples, logs, specs, or screenshots that matter.',
      de: 'Nenne relevante Dateien, Beispiele, Logs, Spezifikationen oder Screenshots.',
    },
    patterns: [/\bcontext\s*:/i, /<context>/i, /\bkontext\s*:/i],
  },
  {
    key: 'constraints',
    label: { en: 'Constraints present', de: 'Einschränkungen vorhanden' },
    detail: {
      en: 'Define what must stay unchanged and where the model must not drift.',
      de: 'Definiere, was unverändert bleiben muss und wo das Modell nicht driften darf.',
    },
    patterns: [/\bconstraints?\s*:/i, /<constraints?>/i, /\beinschränkungen?\s*:/i],
  },
  {
    key: 'outputFormat',
    label: { en: 'Output format present', de: 'Ausgabeformat vorhanden' },
    detail: {
      en: 'Ask for JSON, a table, bullet points, or another checkable format.',
      de: 'Fordere JSON, eine Tabelle, Bullet Points oder ein anderes prüfbares Format an.',
    },
    patterns: [
      /\boutput format\s*:/i,
      /\bformat\s*:/i,
      /reply only/i,
      /valid json/i,
      /schema/i,
      /markdown table/i,
      /\bausgabeformat\s*:/i,
      /\bnur als/i,
    ],
  },
  {
    key: 'doneWhen',
    label: { en: 'Done-when present', de: 'Fertig-wenn vorhanden' },
    detail: {
      en: 'Give the agent an exact stopping condition.',
      de: 'Gib dem Agenten eine exakte Abbruchbedingung.',
    },
    patterns: [/\bdone when\s*:/i, /\bdone-when\b/i, /\bfertig wenn\s*:/i],
  },
  {
    key: 'validation',
    label: { en: 'Validation present', de: 'Validierung vorhanden' },
    detail: {
      en: 'Demand checks, test runs, diffs, or raw output as proof.',
      de: 'Fordere Checks, Testläufe, Diffs oder rohe Ausgabe als Beweis an.',
    },
    patterns: [
      /\bvalidation\s*:/i,
      /\bvalidate\b/i,
      /\btypecheck\b/i,
      /\bnpm run build\b/i,
      /\bnpm test\b/i,
      /\brun tests?\b/i,
      /\bpaste raw output\b/i,
      /\bvalidierung\s*:/i,
      /\btests? ausführen\b/i,
      /\brohe ausgabe\b/i,
    ],
  },
];

const hedgeWordPatterns = [/\bmaybe\b/gi, /\bperhaps\b/gi, /\btry to\b/gi, /\bif possible\b/gi, /\bshould probably\b/gi, /\bvielleicht\b/gi, /\beventuell\b/gi, /\bversuch(?:e|en)?\b/gi, /\bfalls möglich\b/gi];
const unsafeDataPatterns = [/api[_ -]?key/gi, /password/gi, /secret/gi, /token/gi, /private key/gi, /credential/gi, /ssn/gi, /ghp_[A-Za-z0-9]+/g, /sk-[A-Za-z0-9]+/g, /-----BEGIN [A-Z ]+PRIVATE KEY-----/g];

const uniqueMatches = (input: string, patterns: RegExp[]): string[] => {
  const matches = new Set<string>();

  for (const pattern of patterns) {
    const result = input.match(pattern);
    result?.forEach((match) => matches.add(match));
  }

  return Array.from(matches);
};

export const evaluatePrompt = (prompt: string): PromptEvaluation => {
  const checks: PromptCheck[] = sectionChecks.map(({ key, label, detail, patterns }) => ({
    key,
    label,
    detail,
    passed: patterns.some((pattern) => pattern.test(prompt)),
  }));

  const hedgeWords = uniqueMatches(prompt, hedgeWordPatterns);
  const unsafeDataMatches = uniqueMatches(prompt, unsafeDataPatterns);

  const passedChecks = checks.filter((check) => check.passed).length;
  const coreContractReady = ['goal', 'context', 'constraints', 'doneWhen'].every((key) =>
    checks.some((check) => check.key === key && check.passed),
  );
  const validationReady = ['outputFormat', 'validation'].every((key) =>
    checks.some((check) => check.key === key && check.passed),
  );

  let score = passedChecks * 12;
  if (coreContractReady) {
    score += 18;
  }
  if (validationReady) {
    score += 10;
  }
  if (hedgeWords.length > 0) {
    score -= 10;
  }
  if (unsafeDataMatches.length > 0) {
    score -= 20;
  }

  score = Math.max(0, Math.min(100, score));

  const summary =
    score >= 85
      ? {
          en: 'Strong operational prompt: it is structured, checkable, and less likely to drift.',
          de: 'Starker operativer Prompt: strukturiert, prüfbar und weniger driftanfällig.',
        }
      : score >= 60
        ? {
            en: 'Usable draft: add the missing contract sections before handing this to an agent.',
            de: 'Brauchbarer Entwurf: ergänze die fehlenden Vertragsteile, bevor du ihn einem Agenten gibst.',
          }
        : {
            en: 'Weak prompt: it still reads like a vague ticket instead of an operational contract.',
            de: 'Schwacher Prompt: liest sich noch wie ein vages Ticket statt wie ein operativer Vertrag.',
          };

  return {
    score,
    checks,
    hedgeWords,
    unsafeDataMatches,
    summary,
  };
};
