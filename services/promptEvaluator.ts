import { Lang } from '../types';

export interface MethodCheck {
  key: 'twoPass' | 'derivedFromMaterial' | 'measureVsDone' | 'unknownAllowed' | 'noManufacturing' | 'boundedMaterial';
  passed: boolean;
  label: Record<Lang, string>;
  detail: Record<Lang, string>;
}

export interface PromptEvaluation {
  score: number;
  checks: MethodCheck[];
  /** Anything that ties the text to one case and will expire with it. */
  caseBoundTokens: string[];
  fillerWarnings: Array<Record<Lang, string>>;
  riskWarnings: Array<Record<Lang, string>>;
  wordCount: number;
  methodSignalCount: number;
  verdict: Record<Lang, string>;
  summary: Record<Lang, string>;
}

/**
 * A method is recognised by what it makes the model do before the work starts,
 * not by a keyword ritual. "Dann stopp." is the two-pass rule even without the
 * word "Durchgang" above it.
 */
const methodChecks: Array<Pick<MethodCheck, 'key' | 'label' | 'detail'> & { patterns: RegExp[] }> = [
  {
    key: 'twoPass',
    label: { en: 'Two passes', de: 'Zwei Durchgänge' },
    detail: {
      en: 'Build the work order first, then stop and let a human read it before any work happens.',
      de: 'Erst den Arbeitsauftrag bauen, dann stoppen und lesen lassen, bevor gearbeitet wird.',
    },
    patterns: [
      /\b(?:pass|step)\s*1\b/i,
      /\bdurchgang\s*1\b/i,
      /\b(?:then stop|stop there|before you (?:start|begin|do the work)|only after my (?:go-ahead|ok)|wait for my)\b/i,
      /(?:dann stopp|halt (?:dann )?an|erst nach meinem ok|warte auf mein ok|bevor du (?:anfängst|arbeitest|loslegst))/i,
      /\b(?:build|construct|write) the work order\b/i,
      /\bbau (?:mir )?(?:den|zuerst den|erst den) arbeitsauftrag\b/i,
    ],
  },
  {
    key: 'derivedFromMaterial',
    label: { en: 'Derived from the material', de: 'Aus dem Material abgeleitet' },
    detail: {
      en: 'The specifics come out of what is attached today, not out of the method text.',
      de: 'Das Konkrete kommt aus dem, was heute beiliegt – nicht aus dem Methodentext.',
    },
    patterns: [
      /\bderive .{0,40}\bfrom\b/i,
      /\bfrom the attached\b/i,
      /\bout of (?:the )?attached\b/i,
      /\bnot from general knowledge\b/i,
      /(?:leite .{0,40}\bab\b|aus dem beigefügten|aus den beigefügten|aus dem angehängten|aus den angehängten|aus dem vorliegenden|nicht aus allgemeinem wissen)/i,
    ],
  },
  {
    key: 'measureVsDone',
    label: { en: 'Check and done-when kept apart', de: 'Prüfung und Fertig-wenn getrennt' },
    detail: {
      en: 'How the result is measured is one question. Which measured result is enough is another.',
      de: 'Wie gemessen wird, ist die eine Frage. Welches gemessene Ergebnis reicht, die andere.',
    },
    patterns: [
      /\b(?:verification|the check)\b[\s\S]{0,400}\bdone[- ]when\b/i,
      /\bdone[- ]when\b[\s\S]{0,400}\b(?:verification|the check)\b/i,
      /^\s*check\s*:[\s\S]{0,400}^\s*done when\s*:/im,
      /\bprüfung\b[\s\S]{0,400}\bfertig[- ]wenn\b/i,
      /\bfertig[- ]wenn\b[\s\S]{0,400}\bprüfung\b/i,
      /\bkeep .{0,30}(?:separate|apart)\b/i,
      /(?:getrennt halten|halt .{0,30}(?:getrennt|auseinander)|auseinanderhalten)/i,
    ],
  },
  {
    key: 'unknownAllowed',
    label: { en: 'Missing stays missing', de: 'Fehlendes bleibt fehlend' },
    detail: {
      en: 'Name UNKNOWN, "not regulated" or "not checkable" as valid results instead of a plausible filler.',
      de: 'UNBEKANNT, „nicht geregelt“ oder „nicht prüfbar“ als gültiges Ergebnis zulassen statt plausibel zu füllen.',
    },
    patterns: [
      /\b(?:unknown|not stated|not regulated|not checkable|blocked)\b/i,
      /(?:unbekannt|nicht geregelt|nicht angegeben|nicht prüfbar|nicht verwendbar|als frage zurück)/i,
    ],
  },
  {
    key: 'noManufacturing',
    label: { en: 'No quota, no softening', de: 'Kein Soll, kein Weichklopfen' },
    detail: {
      en: 'A clean result is allowed; the bar is never lowered and findings are never invented to fill a list.',
      de: 'Ein sauberes Ergebnis ist erlaubt; die Messlatte wird nicht gesenkt und nichts erfunden, um die Liste zu füllen.',
    },
    patterns: [
      /\bdo not (?:invent|manufacture|soften|weaken|lower|average|derive)\b/i,
      /\bto (?:fill|close) the (?:list|row|gap)\b/i,
      /\bnot a quota\b/i,
      /\bis a valid result\b/i,
      /\bno objections\b/i,
      /(?:nicht erfinden|erfinde (?:keinen?|nichts)|kein soll|nicht aufweichen|nicht weichklopfen|weichklopf|senk .{0,30}nicht|gültiges ergebnis|keine einwände|damit .{0,30}voll wird)/i,
    ],
  },
  {
    key: 'boundedMaterial',
    label: { en: 'Material has a role', de: 'Material hat eine Rolle' },
    detail: {
      en: 'Say what may be edited and what is read-only. Handing something over is not permission to change it.',
      de: 'Sag, was bearbeitet werden darf und was nur gelesen wird. Mitgeben ist keine Änderungserlaubnis.',
    },
    patterns: [
      /\bread only\b|\bread-only\b/i,
      /\bdo not (?:rewrite|change|reorder|sort|delete)\b/i,
      /\brole(?:s)?\b[\s\S]{0,120}\b(?:never upgraded|not upgraded)\b/i,
      /\bare material\b/i,
      /(?:nur (?:zu )?lesen|nicht umformulier|nicht ändern|nicht sortier|keine zeile (?:ändern|löschen)|sind material|maßstab|rolle bekommt|rollen werden)/i,
    ],
  },
];

/** What ties a text to one case: it will be wrong or stale the next time. */
const caseBoundPatterns: Array<{ pattern: RegExp; label: Record<Lang, string> }> = [
  {
    pattern: /\b\d{1,2}\.\d{1,2}\.(?:\d{2,4})?\b|\b\d{4}-\d{2}-\d{2}\b|\b\d{1,2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\b|\b\d{1,2}\.\s?(?:Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember)\b/g,
    label: { en: 'a date', de: 'ein Datum' },
  },
  {
    pattern: /\b\d[\d.,]*\s?(?:€|EUR|euro)\b/gi,
    label: { en: 'an amount', de: 'ein Betrag' },
  },
  {
    pattern: /\b[\wÄÖÜäöüß-]+\.(?:xlsx?|docx?|pdf|pptx?|csv|msg)\b/gi,
    label: { en: 'a file name', de: 'ein Dateiname' },
  },
  {
    pattern: /\b(?:S\.|Seite|p\.|page)\s?\d{1,3}\b/gi,
    label: { en: 'a page number', de: 'eine Seitenzahl' },
  },
  {
    pattern: /\b(?:Frau|Herr|Mr|Ms|Mrs)\s+[A-ZÄÖÜ][\wÄÖÜäöüß-]+/g,
    label: { en: 'a person', de: 'eine Person' },
  },
  {
    pattern: /\b[A-ZÄÖÜ][\wÄÖÜäöüß-]+\s(?:GmbH|AG|KG|Ltd|Inc)\b/g,
    label: { en: 'a company', de: 'eine Firma' },
  },
];

const fillerPatterns: Array<{ pattern: RegExp; label: Record<Lang, string> }> = [
  {
    pattern: /\b(?:very|extremely)\s+(?:detailed|comprehensive|thorough|professional|careful)\b/giu,
    label: {
      en: 'Generic intensity words describe nothing the model can do differently.',
      de: 'Generische Verstärker beschreiben nichts, was das Modell anders machen könnte.',
    },
  },
  {
    pattern: /\b(?:sehr|besonders|äußerst)\s+(?:detailliert\w*|umfassend\w*|gründlich\w*|professionell\w*|sorgfältig\w*)/giu,
    label: {
      en: 'Generic intensity words describe nothing the model can do differently.',
      de: 'Generische Verstärker beschreiben nichts, was das Modell anders machen könnte.',
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
      en: 'Process theatre adds words but no material, boundary, or evidence.',
      de: 'Prozess-Theater ergänzt Wörter, aber kein Material, keine Grenze, keinen Beleg.',
    },
  },
  {
    pattern: /(?:denke? (?:sorgfältig|gründlich|schritt für schritt)|sei (?:gründlich|professionell)|lass dir zeit)/giu,
    label: {
      en: 'Process theatre adds words but no material, boundary, or evidence.',
      de: 'Prozess-Theater ergänzt Wörter, aber kein Material, keine Grenze, keinen Beleg.',
    },
  },
];

/** The model prepares work. These ask it to perform the work instead. */
const actsForYouPatterns = [
  /\bsend (?:the|this|it)\s?(?:mail|email|message|invitation)?\b/gi,
  /\b(?:verschick|versende|sende) (?:die|das|den) (?:mail|e-mail|einladung|nachricht)/gi,
  /\bbook (?:the|a) (?:room|flight|hotel|appointment)\b/gi,
  /\b(?:buche|reserviere) (?:den|die|das) (?:raum|flug|hotel|termin)/gi,
  /\b(?:approve|sign|order|cancel|confirm) (?:the|this) (?:invoice|contract|order|offer|change|booking)\b/gi,
  /\b(?:genehmige|unterschreibe?|bestelle|storniere) (?:die|das|den) (?:rechnung|vertrag|bestellung|angebot|buchung)/gi,
];

/** Asking for a guess is asking for something that will read like a fact. */
const inventionPatterns = [
  /\b(?:estimate|guess|make (?:it|something) up|fill in the (?:gaps|blanks)|invent)\b/gi,
  /\b(?:schätz\w*|rate mal|denk dir|erfinde|ergänze plausibel|füll die lücken)/gi,
  /\b(?:approximately|roughly)\b/gi,
  /\b(?:ungefähr|grob geschätzt)\b/gi,
];

/** Things that should not be pasted into a tool that is not approved for them. */
const unsafeDataPatterns = [
  /\bsalar(?:y|ies)|\bgehalt\w*|\bpayroll|\blohnabrechnung\w*/gi,
  /\bsick note|\bkrankmeldung\w*|\bdiagnos\w+/gi,
  /\bapplicant|\bbewerber\w*|\bbewerbung\w*|\blebenslauf/gi,
  /\bdate of birth|\bgeburtsdatum/gi,
  /\bIBAN\b|\bDE\d{20}\b|\bcredit card|\bkreditkarte\w*/gi,
  /\bpersonalnummer|\bsozialversicherungsnummer|\bsteuer-?id/gi,
  /\bpassword|\bpasswort|\bapi[_ -]?key|\bzugangsdaten/gi,
];

/** "do not estimate" is the good instruction, not a request for a guess. */
const negationBefore = /(?:\b(?:do not|don't|does not|must not|never|not|no|without)\b|\b(?:nicht|kein|keine|keinen|niemals|ohne)\b)[^.;\n]{0,24}$/i;
const negationAfter = /^[^.;\n]{0,14}\b(?:kein|keine|keinen|nicht|nichts|nothing|no)\b/i;

const matchesIgnoringNegation = (input: string, patterns: RegExp[]): string[] => {
  const matches = new Set<string>();

  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    for (const match of input.matchAll(pattern)) {
      if (match.index === undefined) {
        continue;
      }

      const before = input.slice(Math.max(0, match.index - 44), match.index);
      const after = input.slice(match.index + match[0].length, match.index + match[0].length + 24);

      if (negationBefore.test(before) || negationAfter.test(after)) {
        continue;
      }

      matches.add(match[0].trim());
    }
  }

  return Array.from(matches);
};

const allMatches = (input: string, patterns: RegExp[]): string[] => {
  const matches = new Set<string>();

  for (const pattern of patterns) {
    input.match(pattern)?.forEach((match) => matches.add(match.trim()));
  }

  return Array.from(matches);
};

const countWords = (prompt: string): number => prompt.trim().split(/\s+/u).filter(Boolean).length;

const findRepeatedLines = (prompt: string): string[] => {
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

const collectCaseBoundTokens = (prompt: string): string[] => {
  const found: string[] = [];

  for (const { pattern, label } of caseBoundPatterns) {
    pattern.lastIndex = 0;
    const hits = prompt.match(pattern);
    if (hits && hits.length > 0) {
      found.push(`${label.en}|${label.de}|${hits[0].trim()}`);
    }
  }

  return found;
};

export const describeCaseBoundToken = (token: string, lang: Lang): string => {
  const [en, de, sample] = token.split('|');
  return `${lang === 'de' ? de : en}: ${sample}`;
};

export const evaluatePrompt = (prompt: string): PromptEvaluation => {
  const checks: MethodCheck[] = methodChecks.map(({ key, label, detail, patterns }) => ({
    key,
    label,
    detail,
    passed: patterns.some((pattern) => pattern.test(prompt)),
  }));

  const wordCount = countWords(prompt);
  const methodSignalCount = checks.filter((check) => check.passed).length;
  const caseBoundTokens = collectCaseBoundTokens(prompt);

  const fillerWarnings: Array<Record<Lang, string>> = [];
  for (const { pattern, label } of fillerPatterns) {
    pattern.lastIndex = 0;
    if (pattern.test(prompt)) {
      fillerWarnings.push(label);
    }
  }

  const repeatedLines = findRepeatedLines(prompt);
  if (repeatedLines.length > 0) {
    fillerWarnings.push({
      en: `Repeated instruction lines: ${repeatedLines.slice(0, 2).join(' | ')}`,
      de: `Wiederholte Anweisungszeilen: ${repeatedLines.slice(0, 2).join(' | ')}`,
    });
  }

  const riskWarnings: Array<Record<Lang, string>> = [
    ...matchesIgnoringNegation(prompt, actsForYouPatterns).map((match) => ({
      en: `Asks the model to act instead of prepare: “${match}”`,
      de: `Verlangt Handeln statt Vorbereiten: „${match}“`,
    })),
    ...matchesIgnoringNegation(prompt, inventionPatterns).map((match) => ({
      en: `Asks for a guess that will read like a fact: “${match}”`,
      de: `Fordert eine Vermutung, die wie ein Fakt aussieht: „${match}“`,
    })),
    ...allMatches(prompt, unsafeDataPatterns).map((match) => ({
      en: `Looks like data that needs protection: “${match}”`,
      de: `Sieht nach schützenswerten Daten aus: „${match}“`,
    })),
  ];

  let score = methodSignalCount * 15;
  if (checks[0].passed && checks[1].passed) {
    // The two passes only mean something when the specifics come from today's material.
    score += 10;
  }
  score -= Math.min(24, caseBoundTokens.length * 8);
  score -= Math.min(18, fillerWarnings.length * 6);
  score -= Math.min(20, riskWarnings.length * 7);
  score = Math.max(0, Math.min(100, score));

  const verdict: Record<Lang, string> = methodSignalCount >= 4 && caseBoundTokens.length === 0
    ? { en: 'Method — reusable', de: 'Methode – wiederverwendbar' }
    : methodSignalCount >= 4
      ? { en: 'Method, tied to one case', de: 'Methode, an einen Fall gebunden' }
      : methodSignalCount >= 2
        ? { en: 'Half method, half prompt', de: 'Halb Methode, halb Prompt' }
        : { en: 'Prompt for one case', de: 'Prompt für einen Fall' };

  const summary: Record<Lang, string> = methodSignalCount >= 4 && caseBoundTokens.length === 0
    ? {
        en: 'This survives the next case: it builds the work order from whatever material arrives.',
        de: 'Das übersteht den nächsten Fall: Es baut den Arbeitsauftrag aus dem Material, das gerade ankommt.',
      }
    : caseBoundTokens.length > 0 && methodSignalCount >= 4
      ? {
          en: 'The mechanics are right, but the named specifics will expire. Move them into the material you attach.',
          de: 'Der Ablauf stimmt, aber das Konkrete darin läuft ab. Verschieb es in das Material, das du beilegst.',
        }
      : methodSignalCount >= 2
        ? {
            en: 'Some of the method is here. Missing: the pass that builds the work order and stops before the work.',
            de: 'Ein Teil der Methode steht. Es fehlt: der Durchgang, der den Auftrag baut und vor der Arbeit stoppt.',
          }
        : {
            en: 'Usable today, worthless next week. Nothing here tells the model how to build the work order itself.',
            de: 'Heute brauchbar, nächste Woche wertlos. Nichts hier sagt dem Modell, wie es den Auftrag selbst baut.',
          };

  return {
    score,
    checks,
    caseBoundTokens,
    fillerWarnings,
    riskWarnings,
    wordCount,
    methodSignalCount,
    verdict,
    summary,
  };
};
