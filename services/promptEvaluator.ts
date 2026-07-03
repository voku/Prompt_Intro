import { GuideMode, Lang } from '../types';

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
  operationalSignals: string[];
  operationalWarnings: string[];
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

const hedgeWordPatterns = [
  /\bmaybe\b/gi,
  /\bperhaps\b/gi,
  /\btry to\b/gi,
  /\bif possible\b/gi,
  /\bshould probably\b/gi,
  /\bvielleicht\b/gi,
  /\beventuell\b/gi,
  /\bversuch(?:e|en)?\b/gi,
  /\bfalls möglich\b/gi,
];

const unsafeDataPatterns = [
  /api[_ -]?key/gi,
  /password/gi,
  /secret/gi,
  /token/gi,
  /private key/gi,
  /credential/gi,
  /ssn/gi,
  /ghp_[A-Za-z0-9]+/g,
  /sk-[A-Za-z0-9]+/g,
  /-----BEGIN [A-Z ]+PRIVATE KEY-----/g,
];

const serviceOpsPositivePatterns = [
  /\bextract\b|\bsummarize\b|\bclassify\b|\bcompare\b|\brewrite\b|\bdraft\b|\breview\b/gi,
  /identify gaps|identify missing|missing information|generate questions|questions for requester/gi,
  /prepare (?:a )?(?:checklist|ticket update|handoff|escalation)/gi,
  /structure(?:d)? handoff|escalation draft|ticket update text|safe ticket reply/gi,
  /provided (?:ticket|text|output|logs?|policy|runbook|notes|evidence|command output)/gi,
  /facts?\s+vs\s+assumptions?|facts|assumptions/gi,
  /evidence checked|observed evidence|supported facts/gi,
  /approval status|approval chain|policy requirements/gi,
  /rollback|post-change checks?|readiness gaps/gi,
  /runbook|knowledge base|\bKB\b|KB draft/gi,
];

const safeSupportRolePatterns = [
  /draft (?:a )?(?:checklist|ticket update|handoff|escalation|KB|runbook)/i,
  /review (?:the )?provided (?:output|logs?|ticket|text|policy|runbook|notes|evidence)/i,
  /summari[sz]e (?:the )?provided (?:logs?|output|ticket|text|evidence|notes)/i,
  /identify (?:missing information|gaps|unsafe|risks?|questions)/i,
  /prepare (?:a )?(?:ticket update|checklist|handoff|escalation|questions)/i,
  /compare (?:the )?.*against (?:the )?provided policy/i,
  /use only (?:the )?(?:provided|this)/i,
  /provided (?:AD|mailbox|command|tool|policy|runbook|log|monitoring|ticket|closure) (?:output|excerpt|text|notes?)/i,
  /read-only verification checklist/i,
  /operator checklist/i,
  /create (?:a )?(?:KB|knowledge base|runbook) draft/i,
];

const directOperationalActionPatterns = [
  /check AD/gi,
  /unlock (?:the )?account/gi,
  /reset (?:the )?password/gi,
  /add (?:the )?group|add .* AD groups?/gi,
  /remove (?:the )?group|remove .* AD groups?/gi,
  /grant access/gi,
  /fix (?:the )?mailbox/gi,
  /restart (?:the )?service/gi,
  /apply (?:the )?change/gi,
  /close (?:the )?ticket/gi,
  /approve (?:the )?change/gi,
];

const serviceOpsWarningPatterns = [
  /permission change|give (?:her|him|them) (?:the )?same permissions?/gi,
  /same access as|copy(?:ing)? access|copy another user/gi,
  /production change|modify production/gi,
  /escalate(?:d|s|ion)? without (?:a )?requested action/gi,
  /urgent|asap|today/gi,
  /probably|maybe|guess|might be/gi,
  /closest matching group/gi,
  /probably (?:a )?(?:server|network) problem/gi,
];


const quotedBlockPatterns = [
  /"(?:[^"\\]|\\.)*"/gs,
  /'(?:[^'\\]|\\.)*'/gs,
  /`(?:[^`\\]|\\.)*`/gs,
];

const providedInputSectionPattern = /(?:^|\n)\s*(?:Input|Use only this|Ticket|Provided [^:\n]*|Log excerpt|Policy excerpt|Closure notes)\s*:\s*[\s\S]*?(?=\n\s*(?:Goal|Context|Constraints|Validation|Output format|Done when|Input|Ticket|Provided [^:\n]*|Log excerpt|Policy excerpt|Closure notes)\s*:|$)/gi;

const maskOperationalInputLayer = (input: string): string => {
  let masked = input.replace(providedInputSectionPattern, '\n[provided input masked]\n');

  for (const pattern of quotedBlockPatterns) {
    masked = masked.replace(pattern, '[quoted input masked]');
  }

  return masked;
};

const uniqueMatches = (input: string, patterns: RegExp[]): string[] => {
  const matches = new Set<string>();

  for (const pattern of patterns) {
    const result = input.match(pattern);
    result?.forEach((match) => matches.add(match));
  }

  return Array.from(matches);
};

export const evaluatePrompt = (prompt: string, guideMode: GuideMode = 'coding'): PromptEvaluation => {
  const checks: PromptCheck[] = sectionChecks.map(({ key, label, detail, patterns }) => ({
    key,
    label,
    detail,
    passed: patterns.some((pattern) => pattern.test(prompt)),
  }));

  const hedgeWords = uniqueMatches(prompt, hedgeWordPatterns);
  const unsafeDataMatches = uniqueMatches(prompt, unsafeDataPatterns);
  const operationalSignals = guideMode === 'serviceOps' ? uniqueMatches(prompt, serviceOpsPositivePatterns) : [];
  const operationalInstructionLayer = guideMode === 'serviceOps' ? maskOperationalInputLayer(prompt) : prompt;
  const rawInputRiskSignals = guideMode === 'serviceOps'
    ? uniqueMatches(prompt.replace(operationalInstructionLayer, ''), serviceOpsWarningPatterns)
    : [];
  const safeSupportRole = safeSupportRolePatterns.some((pattern) => pattern.test(operationalInstructionLayer));
  const directOperationalWarnings = guideMode === 'serviceOps' && !safeSupportRole
    ? uniqueMatches(operationalInstructionLayer, directOperationalActionPatterns)
    : [];
  const instructionWarnings = guideMode === 'serviceOps'
    ? uniqueMatches(operationalInstructionLayer, serviceOpsWarningPatterns)
    : [];
  const operationalWarnings = guideMode === 'serviceOps'
    ? [...instructionWarnings, ...directOperationalWarnings, ...rawInputRiskSignals.map((match) => `raw input mentions: ${match}`)]
    : [];

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
  if (guideMode === 'serviceOps') {
    score += Math.min(18, operationalSignals.length * 3);
    score -= Math.min(20, (instructionWarnings.length + directOperationalWarnings.length) * 4);
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
    operationalSignals,
    operationalWarnings,
    summary,
  };
};
