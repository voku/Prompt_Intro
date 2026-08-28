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
  caseBoundTokens: string[];
  fillerWarnings: Array<Record<Lang, string>>;
  riskWarnings: Array<Record<Lang, string>>;
  wordCount: number;
  methodSignalCount: number;
  verdict: Record<Lang, string>;
  summary: Record<Lang, string>;
}

const methodChecks: Array<Pick<MethodCheck, 'key' | 'label' | 'detail'> & { patterns: RegExp[] }> = [
  {
    key: 'twoPass',
    label: { en: 'Construct before execution', de: 'Erst Auftrag bauen, dann ausführen' },
    detail: {
      en: 'A reusable L2 method constructs the concrete L1 contract and stops before changing anything.',
      de: 'Eine L2-Methode erzeugt zuerst den konkreten L1-Auftrag und stoppt, bevor sie etwas ändert oder ausführt.',
    },
    patterns: [
      /\b(?:pass|step)\s*1\b/i,
      /\bdurchgang\s*1\b/i,
      /\b(?:construct|build|create|generate) (?:a |the )?(?:concrete )?l1 (?:contract|prompt)\b/i,
      /\b(?:build|construct|write) the work order\b/i,
      /(?:erzeuge|erstelle|bau)[^\n.]{0,70}(?:l1[- ]?(?:auftrag|prompt)|arbeitsauftrag)/i,
      /(?:noch nichts (?:importieren|ändern|ausführen|verschicken)|vor der ausführung stopp|stoppe? vor der ausführung|erst nach .*freigabe|execute only after|do not .* during this pass)/i,
    ],
  },
  {
    key: 'derivedFromMaterial',
    label: { en: 'Case facts come from current evidence', de: 'Falldaten kommen aus aktuellem Kontext' },
    detail: {
      en: 'Ticket IDs, files, systems and probes are derived from the current material instead of being baked into the reusable method.',
      de: 'Ticket, Dateien, Systeme und Prüfwege werden aus dem aktuellen Material abgeleitet und nicht dauerhaft in die Methode eingebaut.',
    },
    patterns: [
      /\bderive .{0,80}\bfrom\b/i,
      /\bfrom the current (?:ticket|material|context)\b/i,
      /\bfrom the (?:attached|supplied)\b/i,
      /\bcurrent ticket, import file\b/i,
      /(?:aus dem aktuellen (?:ticket|material|kontext)|aus der aktuellen importdatei|aus .*runbook|aus dem vorliegenden material|aus den vorliegenden (?:quellen|dateien)|leite .{0,60}\bab\b)/i,
    ],
  },
  {
    key: 'measureVsDone',
    label: { en: 'Verification and Done When are separate', de: 'Prüfung und Fertig-wenn sind getrennt' },
    detail: {
      en: 'Verification says how reality is measured. Done When says which observed result is sufficient.',
      de: 'Prüfung beschreibt den Messweg. Fertig-wenn beschreibt das Ergebnis, das für „fertig“ tatsächlich reichen muss.',
    },
    patterns: [
      /\bverification\b[\s\S]{0,600}\bdone when\b/i,
      /\bdone when\b[\s\S]{0,600}\bverification\b/i,
      /\bkeep .{0,50}(?:separate|apart)\b/i,
      /\bprüfung\b[\s\S]{0,600}\bfertig[-, ]*wenn\b/i,
      /\bfertig[-, ]*wenn\b[\s\S]{0,600}\bprüfung\b/i,
      /(?:getrennt halten|auseinanderhalten|bleiben getrennt)/i,
    ],
  },
  {
    key: 'unknownAllowed',
    label: { en: 'Missing evidence stays visible', de: 'Fehlende Evidenz bleibt sichtbar' },
    detail: {
      en: 'UNKNOWN and BLOCKED remain explicit instead of being replaced with plausible guesses.',
      de: 'UNKNOWN und BLOCKED bleiben sichtbar. Eine Lücke wird nicht mit einer plausiblen Vermutung zugeschüttet.',
    },
    patterns: [
      /\b(?:unknown|blocked|not stated|not checkable|missing evidence)\b/i,
      /(?:unknown|blocked|unbekannt|blockiert|fehlende evidenz|nicht prüfbar|nicht belegt)/i,
    ],
  },
  {
    key: 'noManufacturing',
    label: { en: 'No finding quota, no invented certainty', de: 'Keine Fundquote, keine erfundene Sicherheit' },
    detail: {
      en: 'CLEAN is allowed; requirements are not weakened and findings are not invented to fill a list.',
      de: 'CLEAN ist erlaubt. Anforderungen werden nicht abgesenkt und Funde nicht erfunden, nur damit eine Liste voll wird.',
    },
    patterns: [
      /\b(?:clean is valid|clean remains valid|not a quota|do not (?:invent|manufacture|soften|weaken|lower|average))\b/i,
      /(?:clean .*gültig|keine fundquote|kein soll|nicht erfinden|nichts erfinden|nicht aufweichen|nicht weichklopfen|messlatte nicht senken|liste .*voll)/i,
    ],
  },
  {
    key: 'boundedMaterial',
    label: { en: 'Context has a role and authority boundary', de: 'Kontext hat Rolle und Befugnisgrenze' },
    detail: {
      en: 'Relevant material does not automatically become editable or authoritative.',
      de: 'Eine relevante Datei wird dadurch weder automatisch zum Änderungsziel noch zur maßgeblichen Quelle.',
    },
    patterns: [
      /\bread[- ]only\b/i,
      /\bcontext only\b/i,
      /\bedit (?:target|permission)\b/i,
      /\bsource material.*read/i,
      /(?:nur (?:zu )?lesen|nur kontext|änderungsziel|änderungserlaubnis|schreibfreigabe|task-befugnis|rolle|quellen bleiben)/i,
    ],
  },
];

const caseBoundPatterns: Array<{ pattern: RegExp; label: Record<Lang, string> }> = [
  {
    pattern: /\b\d{1,2}\.\d{1,2}\.(?:\d{2,4})?\b|\b\d{4}-\d{2}-\d{2}\b/g,
    label: { en: 'date', de: 'Datum' },
  },
  {
    pattern: /\b(?:INC|REQ|CHG|SD|TKT)-?\d{3,}\b/gi,
    label: { en: 'ticket ID', de: 'Ticket-ID' },
  },
  {
    pattern: /\b[\wÄÖÜäöüß-]+\.(?:xlsx?|docx?|pdf|pptx?|csv|msg)\b/gi,
    label: { en: 'file name', de: 'Dateiname' },
  },
  {
    pattern: /\b\d[\d.,]*\s?(?:€|EUR|euro)\b/gi,
    label: { en: 'amount', de: 'Betrag' },
  },
  {
    pattern: /\b(?:S\.|Seite|p\.|page|Abschnitt|section)\s?\d{1,3}(?:\.\d+)?\b/gi,
    label: { en: 'document location', de: 'konkrete Fundstelle' },
  },
  {
    pattern: /\b[A-ZÄÖÜ][\wÄÖÜäöüß-]+\s(?:GmbH|AG|KG|Ltd|Inc)\b/g,
    label: { en: 'company', de: 'Firma' },
  },
];

const fillerPatterns: Array<{ pattern: RegExp; label: Record<Lang, string> }> = [
  {
    pattern: /\b(?:very|extremely)\s+(?:detailed|comprehensive|thorough|professional|careful)\b|\b(?:sehr|besonders|äußerst)\s+(?:detailliert\w*|umfassend\w*|gründlich\w*|professionell\w*|sorgfältig\w*)/giu,
    label: {
      en: 'Intensity words add tone, not evidence or a measurable instruction.',
      de: '„Sehr sorgfältig“ klingt wichtig, ändert aber weder Evidenz noch Scope noch ein messbares Kriterium.',
    },
  },
  {
    pattern: /\b(?:cover everything|do not miss anything|best possible answer)\b|(?:berücksichtige alles|vergiss nichts|übersehe nichts|bestmögliche[ns]? ergebnis|alles,? was wichtig sein könnte)/giu,
    label: {
      en: 'Unlimited scope is not a usable boundary.',
      de: '„Berücksichtige alles“ ist keine Grenze. Es ist der sprachliche Cousin von „mach einfach richtig“.',
    },
  },
  {
    pattern: /\b(?:think (?:carefully|deeply|step by step)|be professional|take your time)\b|(?:denke? (?:sorgfältig|gründlich|schritt für schritt)|sei professionell|lass dir zeit)/giu,
    label: {
      en: 'Process theatre adds words but no additional evidence or control.',
      de: 'Prozess-Theater: mehr Wörter, aber kein zusätzlicher Beleg und keine zusätzliche Kontrolle.',
    },
  },
];

const actsForYouPatterns = [
  /\b(?:send|approve|sign|order|cancel)\b/gi,
  /\b(?:verschick|versende|genehmige|unterschreibe|bestelle|storniere|schließ das ticket|schließe das ticket)\b/gi,
];

const inventionPatterns = [
  /\b(?:estimate|guess|invent|fill in the gaps)\b/gi,
  /\b(?:schätz\w*|rate mal|erfinde|ergänze plausibel|füll die lücken)/gi,
];

const unsafeDataPatterns = [
  /\bpassword|\bpasswort|\bapi[_ -]?key|\bzugangsdaten/gi,
  /\bIBAN\b|\bDE\d{20}\b|\bkreditkarte\w*/gi,
  /\bpersonalnummer|\bsozialversicherungsnummer|\bsteuer-?id/gi,
  /\bgehalt\w*|\blohnabrechnung\w*|\bkrankmeldung\w*|\bdiagnos\w+/gi,
];

const negationBefore = /(?:\b(?:do not|don't|must not|never|not|no|without)\b|\b(?:nicht|kein|keine|keinen|niemals|ohne)\b)[^.;\n]{0,32}$/i;
const negationAfter = /^[^.;\n]{0,18}\b(?:kein|keine|keinen|nicht|nichts|nothing|no)\b/i;

const materialBlockPatterns: RegExp[] = [
  /```[\s\S]*?```/g,
  /"""[\s\S]*?"""/g,
  /'''[\s\S]*?'''/g,
  /(?:^|\n)\s*>\s?.*(?:\n\s*>\s?.*)*/g,
  /"(?:[^"\\]|\\.){80,}"/gs,
  /“[^”\n]{80,}”/g,
];

const labeledMaterialSectionPattern = /(?:^|\n)\s*(?:source text|quoted material|input text|document text|email text|ticket text|source excerpt|quelltext|zitatmaterial|eingabetext|dokumenttext|mailtext|tickettext|quellenauszug)\s*:\s*[\s\S]*?(?=\n\s*(?:(?:pass|step|durchgang)\s*\d+|goal|ziel|context|kontext|limits?|grenzen|constraints?|check|prüfung|done[- ]when|fertig[-, ]*wenn|rules?|regeln|output|ausgabe)\s*:|$)/gim;

const buildInstructionLayer = (input: string): string => {
  let instructionLayer = input.replace(labeledMaterialSectionPattern, '\n[source material omitted]\n');
  for (const pattern of materialBlockPatterns) {
    pattern.lastIndex = 0;
    instructionLayer = instructionLayer.replace(pattern, '[source material omitted]');
  }
  return instructionLayer;
};

const matchesIgnoringNegation = (input: string, patterns: RegExp[]): string[] => {
  const matches = new Set<string>();
  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    for (const match of input.matchAll(pattern)) {
      if (match.index === undefined) continue;
      const before = input.slice(Math.max(0, match.index - 52), match.index);
      const after = input.slice(match.index + match[0].length, match.index + match[0].length + 28);
      if (negationBefore.test(before) || negationAfter.test(after)) continue;
      matches.add(match[0].trim());
    }
  }
  return Array.from(matches);
};

const allMatches = (input: string, patterns: RegExp[]): string[] => {
  const matches = new Set<string>();
  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    input.match(pattern)?.forEach((match) => matches.add(match.trim()));
  }
  return Array.from(matches);
};

const countWords = (prompt: string): number => prompt.trim().split(/\s+/u).filter(Boolean).length;

const findRepeatedLines = (prompt: string): string[] => {
  const counts = new Map<string, number>();
  for (const line of prompt.split(/\r?\n/u)) {
    const normalized = line.trim().toLocaleLowerCase().replace(/^[\-*\d.)\s]+/u, '').replace(/\s+/gu, ' ');
    if (normalized.length < 18 || normalized === '[source material omitted]') continue;
    counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
  }
  return Array.from(counts.entries()).filter(([, count]) => count > 1).map(([line]) => line);
};

const collectCaseBoundTokens = (instructionLayer: string): string[] => {
  const found: string[] = [];
  for (const { pattern, label } of caseBoundPatterns) {
    pattern.lastIndex = 0;
    const hits = instructionLayer.match(pattern);
    if (hits && hits.length > 0) found.push(`${label.en}|${label.de}|${hits[0].trim()}`);
  }
  return found;
};

export const describeCaseBoundToken = (token: string, lang: Lang): string => {
  const [en, de, sample] = token.split('|');
  return `${lang === 'de' ? de : en}: ${sample}`;
};

export const evaluatePrompt = (prompt: string): PromptEvaluation => {
  const instructionLayer = buildInstructionLayer(prompt);
  const checks: MethodCheck[] = methodChecks.map(({ key, label, detail, patterns }) => ({
    key,
    label,
    detail,
    passed: patterns.some((pattern) => {
      pattern.lastIndex = 0;
      return pattern.test(instructionLayer);
    }),
  }));

  const wordCount = countWords(prompt);
  const methodSignalCount = checks.filter((check) => check.passed).length;
  const caseBoundTokens = collectCaseBoundTokens(instructionLayer);
  const fillerWarnings: Array<Record<Lang, string>> = [];

  for (const { pattern, label } of fillerPatterns) {
    pattern.lastIndex = 0;
    if (pattern.test(instructionLayer)) fillerWarnings.push(label);
  }

  const repeatedLines = findRepeatedLines(instructionLayer);
  if (repeatedLines.length > 0) {
    fillerWarnings.push({
      en: `Repeated instruction lines: ${repeatedLines.slice(0, 2).join(' | ')}`,
      de: `Doppelte Anweisungen: ${repeatedLines.slice(0, 2).join(' | ')}`,
    });
  }

  const riskWarnings: Array<Record<Lang, string>> = [
    ...matchesIgnoringNegation(instructionLayer, actsForYouPatterns).map((match) => ({
      en: `This asks for an accountable action. Keep execution authority explicit: “${match}”`,
      de: `Hier steckt eine verantwortliche Aktion drin. Die Ausführungsbefugnis muss ausdrücklich geklärt sein: „${match}“`,
    })),
    ...matchesIgnoringNegation(instructionLayer, inventionPatterns).map((match) => ({
      en: `This invites a guess that may later read like a fact: “${match}”`,
      de: `Das lädt zum Raten ein. Aus so einer Vermutung wird später erstaunlich leicht ein angeblicher Fakt: „${match}“`,
    })),
    ...allMatches(prompt, unsafeDataPatterns).map((match) => ({
      en: `Potentially sensitive data detected: “${match}”`,
      de: `Möglicherweise schützenswerte Daten erkannt: „${match}“`,
    })),
  ];

  let score = methodSignalCount * 15;
  const hasConstructionBoundary = checks[0].passed && checks[1].passed;
  score = hasConstructionBoundary ? score + 10 : Math.min(score, 69);
  score -= Math.min(24, caseBoundTokens.length * 8);
  score -= Math.min(18, fillerWarnings.length * 6);
  score -= Math.min(20, riskWarnings.length * 7);
  score = Math.max(0, Math.min(100, score));

  const reusableMethod = hasConstructionBoundary && methodSignalCount >= 4 && caseBoundTokens.length === 0;
  const caseBoundMethod = hasConstructionBoundary && methodSignalCount >= 4 && caseBoundTokens.length > 0;

  const verdict: Record<Lang, string> = reusableMethod
    ? { en: 'Reusable L2-style method', de: 'Wiederverwendbare L2-Methode' }
    : caseBoundMethod
      ? { en: 'Method still carrying case data', de: 'Methode mit Falldaten im Gepäck' }
      : methodSignalCount >= 2
        ? { en: 'Useful rules, not yet an L2 method', de: 'Gute Regeln, aber noch keine L2-Methode' }
        : { en: 'Direct case prompt', de: 'Direkter Prompt für einen Fall' };

  const summary: Record<Lang, string> = reusableMethod
    ? {
        en: 'The reusable text constructs a fresh L1 contract from current evidence and survives the next case.',
        de: 'Die Bauanleitung bleibt stabil und erzeugt aus dem nächsten Ticket wieder einen frischen L1-Auftrag.',
      }
    : caseBoundMethod
      ? {
          en: 'The construction idea works, but case-specific IDs/files remain in the reusable text.',
          de: 'Die Konstruktion passt, aber Ticket-ID, Datei oder andere Falldaten stecken noch in der Methode. Die gehören in den aktuellen Kontext.',
        }
      : methodSignalCount >= 2
        ? {
            en: 'Several good controls are present, but the text does not yet construct a concrete case contract and stop before execution.',
            de: 'Mehrere gute Regeln sind da. Was fehlt, ist der eigentliche L2-Schritt: aus aktuellem Kontext einen konkreten L1-Auftrag bauen und vor der Ausführung stoppen.',
          }
        : {
            en: 'This is a direct prompt. That may be exactly right for a one-off task.',
            de: 'Das ist ein direkter Prompt. Für eine Einmal-Aufgabe kann das genau die richtige Lösung sein.',
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
