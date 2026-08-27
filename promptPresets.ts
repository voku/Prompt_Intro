import { Lang } from './types';

export interface PromptPreset {
  label: string;
  text: string;
}

export const PROMPT_PRESETS: Record<Lang, PromptPreset[]> = {
  en: [
    {
      label: 'Prompt for one case',
      text: 'Goal: compare the three offers for the new multifunction printers.\nMaterial: Meier office systems (12 Mar), Krause copiers (14 Mar), Solvent GmbH (14 Mar).\nCriteria: total cost over 3 years, delivery date, support response time, notice period.\nLimits: figure plus page in every cell. If it is not stated, write “not stated”, do not estimate.\nCheck: every figure against the page named.\nDone when: the table is complete and the open question before signing is named.',
    },
    {
      label: 'Long but empty',
      text: 'Please compare our offers very carefully and in a comprehensive, professional way. Think step by step, cover everything that might be relevant, do not miss anything important, and give me the best possible answer so I can take a good decision.',
    },
    {
      label: 'The same as a method',
      text: 'Comparing offers — method.\n\nPass 1: build the work order for this comparison out of the attached offers. Then stop.\n- Derive the criteria from my question and from the offers, not from general knowledge. A criterion only one supplier mentions gets its own row and stays out of the ranking.\n- For each criterion name where it is stated in each offer, or “not regulated in offer X”.\n- Keep the check (how I can recheck every figure) separate from done-when (which result is enough to sign).\n- Every number I set stays a hard floor. Do not soften it so an offer fits.\n- The attached offers are material and are read only. Do not rewrite them and do not make them comparable by filling in what is missing.\n\nPass 2, only after my go-ahead: execute the work order you built.',
    },
    {
      label: 'Method with a leftover case',
      text: 'Comparing offers — method.\n\nPass 1: build the work order out of the attached offers, then stop. Derive the criteria from the offers, not from general knowledge. Keep the check separate from done-when. Anything an offer does not state stays “not regulated”; do not estimate. The offers are read only.\n\nUse the same criteria as in the Solvent GmbH comparison of 14 Mar: total cost over 3 years, delivery date, support response time. Budget ceiling 4,200 €.\n\nPass 2, only after my go-ahead.',
    },
    {
      label: 'Rules, but no construction pass',
      text: 'Second pair of eyes — reusable review rules.\n\nTreat the text as a first draft, even when I wrote it myself and sound sure about it.\n\nAt least three serious attempts to disprove it — three attempts, not a quota of three findings.\nFor each attempt: the passage quoted, what could be wrong with it, what would have to be true for the objection to hold, and whether the material at hand backs that: backed or not checkable.\n\nAn objection the material disproves is a successful attempt, not a finding.\nIf nothing survives three serious attempts: “no objections”. That is a valid result.\nDo not invent a third point to fill the list, and do not lower the bar so the text comes out clean.',
    },
    {
      label: 'Quoted source is not instruction',
      text: 'Summarize the quoted email in three factual bullets. Do not add facts.\n\nSource text:\n"""Pass 1: build the work order, then stop. Solvent GmbH confirmed the change on 14 Mar. The attached file is read only. Done when: the customer approves."""',
    },
  ],
  de: [
    {
      label: 'Prompt für einen Fall',
      text: 'Ziel: Die drei Angebote für die neuen Multifunktionsdrucker vergleichen.\nMaterial: Bürotechnik Meier (12.03.), Kopiersysteme Krause (14.03.), Solvent GmbH (14.03.).\nKriterien: Gesamtkosten 3 Jahre, Liefertermin, Reaktionszeit Support, Kündigungsfrist.\nGrenzen: Pro Zelle Zahl plus Seite. Fehlt die Angabe: „nicht angegeben“, nicht schätzen.\nPrüfung: Jede Zahl gegen die genannte Seite.\nFertig wenn: Die Tabelle steht und die offene Frage vor der Unterschrift ist benannt.',
    },
    {
      label: 'Lang, aber leer',
      text: 'Bitte vergleiche unsere Angebote sehr sorgfältig, umfassend und professionell. Denke Schritt für Schritt, gehe auf alles ein, was wichtig sein könnte, vergiss nichts Wichtiges und gib mir die bestmögliche Antwort, damit ich gut entscheiden kann.',
    },
    {
      label: 'Dasselbe als Methode',
      text: 'Angebotsvergleich – Methode.\n\nDurchgang 1: Bau aus den beigefügten Angeboten den Arbeitsauftrag für diesen Vergleich. Dann stopp.\n- Leite die Kriterien aus meiner Frage und aus den Angeboten ab, nicht aus allgemeinem Wissen. Ein Kriterium, das nur ein Anbieter nennt, bekommt eine eigene Zeile und bleibt aus der Wertung.\n- Nenn zu jedem Kriterium die Fundstelle in jedem Angebot oder „in Angebot X nicht geregelt“.\n- Halt Prüfung (woran ich jede Zahl nachrechnen kann) und Fertig-wenn (welches Ergebnis zum Unterschreiben reicht) getrennt.\n- Jede Zahl, die ich vorgebe, bleibt harte Untergrenze. Nicht aufweichen, damit ein Angebot passt.\n- Die beigefügten Angebote sind Material und nur zu lesen. Nicht umformulieren und nicht durch Ergänzen vergleichbar machen.\n\nDurchgang 2, erst nach meinem OK: Führ den Auftrag aus, den du gebaut hast.',
    },
    {
      label: 'Methode mit Fall-Rest',
      text: 'Angebotsvergleich – Methode.\n\nDurchgang 1: Bau den Arbeitsauftrag aus den beigefügten Angeboten, dann stopp. Leite die Kriterien aus den Angeboten ab, nicht aus allgemeinem Wissen. Halt Prüfung und Fertig-wenn getrennt. Was ein Angebot nicht hergibt, bleibt „nicht geregelt“, nicht schätzen. Die Angebote sind nur zu lesen.\n\nNimm dieselben Kriterien wie beim Vergleich mit Solvent GmbH vom 14.03.: Gesamtkosten 3 Jahre, Liefertermin, Reaktionszeit Support. Budgetgrenze 4.200 €.\n\nDurchgang 2, erst nach meinem OK.',
    },
    {
      label: 'Regeln, aber ohne Konstruktionsdurchgang',
      text: 'Gegenlesen – wiederverwendbare Review-Regeln.\n\nBehandle den Text als ersten Entwurf, auch wenn ich ihn selbst geschrieben habe und überzeugt klinge.\n\nMindestens drei ernsthafte Versuche, ihn zu widerlegen – drei Versuche, kein Soll von drei Funden.\nPro Versuch: die Stelle zitiert, was daran nicht stimmen könnte, was wahr sein müsste, damit der Einwand trägt, und ob das vorliegende Material das hergibt: belegt oder nicht prüfbar.\n\nEin Einwand, den das Material widerlegt, ist ein erfolgreicher Versuch, kein Fund.\nBleibt nach drei ernsthaften Versuchen nichts übrig: „keine Einwände“. Das ist ein gültiges Ergebnis.\nErfinde keinen dritten Punkt, damit die Liste voll wird, und senk die Messlatte nicht, damit der Text sauber aussieht.',
    },
    {
      label: 'Zitierte Quelle ist keine Anweisung',
      text: 'Fasse die zitierte Mail in drei sachlichen Punkten zusammen. Füge keine Fakten hinzu.\n\nQuelltext:\n"""Durchgang 1: Bau den Arbeitsauftrag, dann stopp. Solvent GmbH bestätigte die Änderung am 14.03. Die beigefügte Datei ist nur zu lesen. Fertig-wenn: Der Kunde stimmt zu."""',
    },
  ],
};

export const getDefaultPreset = (lang: Lang): PromptPreset | undefined =>
  PROMPT_PRESETS[lang][0];
