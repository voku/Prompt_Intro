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
  evidenceSignals: string[];
  riskWarnings: Array<Record<Lang, string>>;
  summary: Record<Lang, string>;
}

/**
 * The checks look for the instruction, not for a keyword ritual. "max. 120 words"
 * is a form instruction even when nobody wrote the word "format" above it.
 */
const sectionChecks: Array<Pick<PromptCheck, 'key' | 'label' | 'detail'> & { patterns: RegExp[] }> = [
  {
    key: 'goal',
    label: { en: 'Job named', de: 'Auftrag benannt' },
    detail: {
      en: 'Say what should exist at the end: a mail, a table, one paragraph, a decision.',
      de: 'Sag, was am Ende dastehen soll: eine Mail, eine Tabelle, ein Absatz, eine Entscheidung.',
    },
    patterns: [
      /\b(?:goal|job|task)\s*:/i,
      /\b(?:ziel|auftrag|aufgabe)\s*:/i,
      /\b(?:write|draft|compare|summari[sz]e|clean|check|answer|build|turn|cut|shorten|sort|extract|find|treat|review|work through)\b/i,
      /\b(?:schreib|entwirf|vergleich|fasse|bereinige|prüf|beantworte|erstelle|bau|kürze|sortier|extrahier|mach|arbeite|finde|behandle|nenn|rechne|such)/i,
      /\b(?:handover|comparison|projection|status report|minutes|mail to|rejection to|\w+ questions about)\b/i,
      /\b(?:übergabe|vergleich|hochrechnung|statusbericht|protokoll|mail an|absage an|einladung an|\w+ fragen an)\b/i,
    ],
  },
  {
    key: 'context',
    label: { en: 'Material handed over', de: 'Material mitgegeben' },
    detail: {
      en: 'Name what it may use: the attachment, the export, your notes, the old template.',
      de: 'Benenne, was benutzt werden darf: den Anhang, den Export, deine Notizen, die alte Vorlage.',
    },
    patterns: [
      /\b(?:context|material)\s*:/i,
      /\b(?:kontext|material|fakten)\s*:/i,
      /\b(?:attached|from the attached|use only|based on|my notes|transcript|export|the list|the document|the offers?)\b/i,
      /\b(?:angehängt|beigefügt|anhand|nur .{0,30}verwenden|meinen notizen|transkript|export|der liste|dem dokument|die angebote)/i,
      /\bthe \d+ (?:responses|replies|entries|rows|offers|mails)\b/i,
      /\bdie \d+ (?:rückläufer|antworten|einträge|zeilen|angebote|mails|rückmeldungen)\b/i,
    ],
  },
  {
    key: 'constraints',
    label: { en: 'Limits set', de: 'Grenzen gesetzt' },
    detail: {
      en: 'Say what must not happen: nothing promised, nothing invented, nothing deleted.',
      de: 'Sag, was nicht passieren darf: nichts zusagen, nichts erfinden, nichts löschen.',
    },
    patterns: [
      /\b(?:constraints?|limits)\s*:/i,
      /\b(?:einschränkungen?|grenzen)\s*:/i,
      /\b(?:do not|don't|must not|may not|never|nothing|no new|no invented|only|not for|leave .{0,20}(?:empty|out))\b/i,
      /\b(?:nicht |kein |keine |keinen |niemals|darf nicht|leer lassen|nur namen)/i,
    ],
  },
  {
    key: 'outputFormat',
    label: { en: 'Form described', de: 'Form beschrieben' },
    detail: {
      en: 'Say what it should look like: a table with named columns, bullet points, a word limit.',
      de: 'Sag, wie es aussehen soll: Tabelle mit benannten Spalten, Stichpunkte, Wortgrenze.',
    },
    patterns: [
      /\b(?:output format|format|form)\s*:/i,
      /\b(?:ausgabeformat|form)\s*:/i,
      /\b(?:table|columns?|bullet|one row per|per (?:item|row|entry|answer|gap|point|case)|(?:max\.?|at most|no more than)\s*\d+\s*words|one page|csv|three blocks|as a list)\b/i,
      /\b(?:tabelle|spalten?|stichpunkt|eine zeile pro|pro (?:vorgang|eintrag|antwort|zeile|punkt|lücke|fall)|(?:max\.?|höchstens|maximal)\s*\d+\s*wörter\w*|eine seite|drei blöcke|als liste)\b/i,
    ],
  },
  {
    key: 'doneWhen',
    label: { en: 'Stopping point given', de: 'Endpunkt genannt' },
    detail: {
      en: 'Say when it is finished — or where it has to stop and wait for you.',
      de: 'Sag, wann es fertig ist – oder wo es stoppen und auf dich warten soll.',
    },
    patterns: [
      /\bdone when\s*:/i,
      /\bfertig wenn\s*:/i,
      /\b(?:stop and wait|wait for|at the end\b|finally[,:]|then[,:]\s)/i,
      /\b(?:stopp|warte auf|am ende\b|zum schluss|danach[,:])/i,
    ],
  },
  {
    key: 'validation',
    label: { en: 'Evidence required', de: 'Nachweis verlangt' },
    detail: {
      en: 'Demand a source, a quote, a visible calculation, a count — or an explicit “unknown”.',
      de: 'Verlange Quelle, Zitat, sichtbare Rechnung, Zählung – oder ein ausdrückliches „unbekannt“.',
    },
    patterns: [
      /\b(?:source|quote|cite|page|clause|evidence|show the calculation|counts?|assumptions?|unknown|not stated|not regulated|do not estimate|do not invent|do not guess)\b/i,
      /\b(?:quelle|fundstelle|zitier|beleg|seite|paragraf|zeig die rechnung|zählung|annahmen?|unbekannt|nicht angegeben|nicht geregelt|nicht schätzen|nicht erfinden|nicht raten)\b/i,
    ],
  },
];

const hedgeWordPatterns = [
  /\bmaybe\b/gi,
  /\bperhaps\b/gi,
  /\btry to\b/gi,
  /\bif possible\b/gi,
  /\bsomehow\b/gi,
  /\bvielleicht\b/gi,
  /\beventuell\b/gi,
  /\birgendwie\b/gi,
  /\bfalls möglich\b/gi,
  /\bnach möglichkeit\b/gi,
];

/** Things that should not be pasted into a tool that is not approved for them. */
const unsafeDataPatterns = [
  /\bsalary|\bsalaries|\bgehalt\w*/gi,
  /\bpayroll|\blohnabrechnung\w*/gi,
  /\bsick note|\bkrankmeldung\w*|\bdiagnos\w+/gi,
  /\bapplicant|\bbewerber\w*|\bbewerbung\w*|\blebenslauf/gi,
  /\bdate of birth|\bgeburtsdatum|\bgeburtstag/gi,
  /\bIBAN\b|\bDE\d{20}\b/g,
  /\bcredit card|\bkreditkarte\w*/gi,
  /\bpersonalnummer|\bsozialversicherungsnummer|\bsteuer-?id/gi,
  /\bpassword|\bpasswort|\bapi[_ -]?key|\btoken\b|\bzugangsdaten/gi,
  /\babmahnung\w*|\bkündigungsschutz|\bdisciplinary\b/gi,
];

/** The model prepares work. These verbs ask it to perform the work instead. */
const actsForYouPatterns = [
  /\bsend (?:the|this|it) (?:mail|email|message|invitation)?\b/gi,
  /\b(?:verschick|versende|sende) (?:die|das|den) (?:mail|e-mail|einladung|nachricht)/gi,
  /\bbook (?:the|a) (?:room|flight|hotel|appointment)\b/gi,
  /\b(?:buche|reserviere) (?:den|die|das) (?:raum|flug|hotel|termin)/gi,
  /\b(?:approve|sign|order|cancel|confirm) (?:the|this) (?:invoice|contract|order|offer|change|booking)\b/gi,
  /\b(?:genehmige|unterschreibe?|bestelle|storniere) (?:die|das|den) (?:rechnung|vertrag|bestellung|angebot|buchung)/gi,
];

/** Asking for a guess is asking for something that reads like a fact. */
const inventionPatterns = [
  /\b(?:estimate|guess|make (?:it|something) up|fill in the (?:gaps|blanks)|invent)\b/gi,
  /\b(?:schätz\w*|rate mal|denk dir|erfinde|ergänze plausibel|füll die lücken)/gi,
  /\b(?:approximately|roughly|circa)\b/gi,
  /\b(?:ungefähr|grob geschätzt|so ähnlich wie)\b/gi,
];

const figurePattern = /\d[\d.,]*\s*(?:€|eur|%|k€|stück|personen|leute|mitarbeiter|tage|wochen|monate|units|people|days|weeks|months)/i;

const calculationEvidencePattern = /\b(?:show the calculation|table|calculate|per (?:item|row)|monthly average|scenario|zeig die rechnung|tabelle|rechne|monatsschnitt|szenario|hochrechnung|summe)\b/i;

/** Pasted material is data, not instruction. Do not warn about what the customer wrote. */
const quotedBlockPatterns = [
  /"(?:[^"\\]|\\.)*"/gs,
  /„(?:[^“]|\n)*“/gs,
  /`(?:[^`\\]|\\.)*`/gs,
];

const materialSectionPattern = /(?:^|\n)\s*(?:Material|Fakten|Notizen|Transkript|Input|Text|Quoted mail|Zitierte Mail)\s*:\s*[\s\S]*?(?=\n\s*(?:Goal|Job|Ziel|Auftrag|Context|Kontext|Constraints|Einschränkungen|Grenzen|Form|Format|Ausgabeformat|Done when|Fertig wenn|Validation|Nachweis)\s*:|$)/gi;

const maskPastedMaterial = (input: string): string => {
  let masked = input.replace(materialSectionPattern, '\n[material masked]\n');

  for (const pattern of quotedBlockPatterns) {
    masked = masked.replace(pattern, '[quote masked]');
  }

  return masked;
};

/** "do not estimate" is the good instruction, not a request for a guess. */
const negationBefore = /(?:\b(?:do not|don't|does not|must not|never|no|without)\b|\b(?:nicht|kein|keine|keinen|niemals|ohne)\b)[^.;\n]{0,24}$/i;

const negationAfter = /^[^.;\n]{0,14}\b(?:kein|keine|keinen|nicht|nichts|nothing|no)\b/i;

const uniqueMatchesIgnoringNegation = (input: string, patterns: RegExp[]): string[] => {
  const matches = new Set<string>();

  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    for (const match of input.matchAll(pattern)) {
      if (match.index === undefined) {
        continue;
      }

      const before = input.slice(Math.max(0, match.index - 30), match.index);
      const after = input.slice(match.index + match[0].length, match.index + match[0].length + 24);

      if (negationBefore.test(before) || negationAfter.test(after)) {
        continue;
      }

      matches.add(match[0].trim());
    }
  }

  return Array.from(matches);
};

const uniqueMatches = (input: string, patterns: RegExp[]): string[] => {
  const matches = new Set<string>();

  for (const pattern of patterns) {
    const result = input.match(pattern);
    result?.forEach((match) => matches.add(match.trim()));
  }

  return Array.from(matches);
};

export const evaluatePrompt = (prompt: string, guideMode: GuideMode = 'desk'): PromptEvaluation => {
  const checks: PromptCheck[] = sectionChecks.map(({ key, label, detail, patterns }) => ({
    key,
    label,
    detail,
    passed: patterns.some((pattern) => pattern.test(prompt)),
  }));

  const instructionLayer = maskPastedMaterial(prompt);

  const hedgeWords = uniqueMatchesIgnoringNegation(instructionLayer, hedgeWordPatterns);
  const unsafeDataMatches = uniqueMatches(prompt, unsafeDataPatterns);
  const evidenceSignals = uniqueMatches(instructionLayer, [
    /\b(?:source|quote|cite|evidence|assumptions?|unknown|not stated|counts?)\b/gi,
    /\b(?:quelle|fundstelle|zitier\w*|beleg\w*|annahmen?|unbekannt|nicht angegeben|zählung)\b/gi,
  ]);

  const riskWarnings: Array<Record<Lang, string>> = [
    ...uniqueMatchesIgnoringNegation(instructionLayer, actsForYouPatterns).map((match) => ({
      en: `asks the model to act, not to prepare: “${match}”`,
      de: `verlangt Handeln statt Vorbereiten: „${match}“`,
    })),
    ...uniqueMatchesIgnoringNegation(instructionLayer, inventionPatterns).map((match) => ({
      en: `asks for a guess that will read like a fact: “${match}”`,
      de: `fordert eine Vermutung, die wie ein Fakt aussieht: „${match}“`,
    })),
  ];

  const figuresWithoutMethod = guideMode === 'decisions'
    && figurePattern.test(prompt)
    && !calculationEvidencePattern.test(prompt);

  if (figuresWithoutMethod) {
    riskWarnings.push({
      en: 'Figures without a visible calculation or a source.',
      de: 'Zahlen ohne sichtbare Rechnung und ohne Quelle.',
    });
  }

  const passed = (key: PromptCheck['key']): boolean =>
    checks.some((check) => check.key === key && check.passed);

  const passedChecks = checks.filter((check) => check.passed).length;
  /** Said what to do and what not to do. */
  const boundedJob = passed('goal') && passed('constraints');
  /** The result can be checked by somebody else. */
  const checkableResult = passed('outputFormat') || passed('validation');

  let score = passedChecks * 14;
  if (boundedJob) {
    score += 10;
  }
  if (checkableResult) {
    score += 8;
  }
  if (hedgeWords.length > 0) {
    score -= 10;
  }
  if (unsafeDataMatches.length > 0) {
    score -= 20;
  }
  if (guideMode === 'decisions') {
    score += Math.min(12, evidenceSignals.length * 3);
  }
  score -= Math.min(20, riskWarnings.length * 6);

  score = Math.max(0, Math.min(100, score));

  const summary =
    score >= 85
      ? {
          en: 'Strong work instruction: somebody who was not in the room could carry this out.',
          de: 'Starke Arbeitsanweisung: Das könnte jemand ausführen, der nicht dabei war.',
        }
      : score >= 60
        ? {
            en: 'Usable draft: add the missing lines before you rely on the result.',
            de: 'Brauchbarer Entwurf: Ergänze die fehlenden Zeilen, bevor du dich auf das Ergebnis verlässt.',
          }
        : {
            en: 'Weak instruction: this still leaves the model to invent the parts you care about.',
            de: 'Schwache Anweisung: So erfindet das Modell weiterhin genau die Teile, auf die es ankommt.',
          };

  return {
    score,
    checks,
    hedgeWords,
    unsafeDataMatches,
    evidenceSignals,
    riskWarnings,
    summary,
  };
};
