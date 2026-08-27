import { GuideMode, Lang } from './types';

export interface PromptPreset {
  label: string;
  text: string;
}

const DESK_PRESETS: Record<Lang, PromptPreset[]> = {
  en: [
    {
      label: 'Short and lazy',
      text: 'Write a friendly mail to the customer saying the delivery will be late.',
    },
    {
      label: 'Long but empty',
      text: 'Please write a very detailed, comprehensive and professionally formulated mail to our customer. Think carefully and step by step, cover everything that might be relevant, be extremely thorough and friendly, do not miss anything important, and provide the best possible answer for the customer and for us.',
    },
    {
      label: 'Small and sufficient',
      text: 'Mail to Ms Berger (purchasing, long-standing customer, prefers short mails). Facts: delivery moves from 12 Sept to 26 Sept, cause is a supply shortage on the housing, a partial delivery of 40 units is possible on 12 Sept. Do not offer a discount, express shipping or any date before 26 Sept. Form: max. 120 words, one concrete offer at the end. Anything I did not tell you, do not invent — write [CHECK] instead.',
    },
    {
      label: 'Meeting minutes',
      text: 'Three blocks from the attached transcript. Decided: the decision and who said it. Open: task, name, by when — only names that appear in the transcript. Not decided: points that were postponed. No date in the text: write “no date given”, do not estimate. Output format: three lists, no intro and no closing summary.',
    },
    {
      label: 'Long document',
      text: 'Goal: answer four questions about the attached contract — term and renewal, notice period and form, when the price may rise, who is liable and up to what amount. Context: use only the attached document. Constraints: for each answer quote the sentence plus clause or page; if something is not in there write “not regulated” and do not add what would be customary. Done when: all four questions have an answer or an explicit “not regulated”.',
    },
  ],
  de: [
    {
      label: 'Kurz und faul',
      text: 'Schreib eine freundliche Mail an den Kunden, dass die Lieferung später kommt.',
    },
    {
      label: 'Lang, aber leer',
      text: 'Bitte schreib eine sehr detaillierte, umfassende und professionell formulierte Mail an unseren Kunden. Denke sorgfältig und Schritt für Schritt, gehe auf alles ein, was wichtig sein könnte, sei besonders gründlich und freundlich, vergiss nichts Wichtiges und liefere die bestmögliche Antwort für den Kunden und für uns.',
    },
    {
      label: 'Klein und ausreichend',
      text: 'Mail an Frau Berger (Einkauf, langjährige Kundin, mag kurze Mails). Fakten: Liefertermin rutscht vom 12.09. auf den 26.09., Grund ist ein Lieferengpass beim Gehäuse, eine Teillieferung von 40 Stück ist am 12.09. möglich. Nicht anbieten: Preisnachlass, Expressversand, Termin vor dem 26.09. Form: max. 120 Wörter, am Schluss ein konkretes Angebot. Was ich dir nicht gesagt habe, erfindest du nicht – schreib [KLÄREN] hin.',
    },
    {
      label: 'Protokoll',
      text: 'Aus dem angehängten Transkript drei Blöcke. Entschieden: der Beschluss und wer ihn gesagt hat. Offen: Aufgabe, Name, bis wann – nur Namen, die im Transkript vorkommen. Nicht entschieden: die vertagten Punkte. Steht kein Datum im Text: „kein Termin genannt“, nicht schätzen. Ausgabeformat: drei Listen, keine Einleitung und kein Fazit.',
    },
    {
      label: 'Langes Dokument',
      text: 'Ziel: vier Fragen zum angehängten Vertrag beantworten – Laufzeit und Verlängerung, Kündigungsfrist und Form, wann der Preis steigen darf, wer bis zu welcher Summe haftet. Kontext: nur das angehängte Dokument verwenden. Einschränkungen: pro Antwort den Satz plus Paragraf oder Seite zitieren; steht etwas nicht drin, „nicht geregelt“ schreiben und nicht ergänzen, was üblich wäre. Fertig wenn: alle vier Fragen eine Antwort oder ein ausdrückliches „nicht geregelt“ haben.',
    },
  ],
};

const DECISION_PRESETS: Record<Lang, PromptPreset[]> = {
  en: [
    {
      label: 'No source at all',
      text: 'Will our budget last until the end of the year?',
    },
    {
      label: 'Projection with assumptions',
      text: 'Projection from the attached cost export for January to August. Calculate it so I can follow it: monthly average, projection to December, difference to budget. List your assumptions one by one. Three scenarios: as before, +10 %, −10 %. And say which figure you are missing to turn this into a decision paper.',
    },
    {
      label: 'Comparing offers',
      text: 'Goal: compare the three attached offers so we can sign one. Context: use only the offers. Criteria in this order: total cost over 3 years, delivery date, support hours, notice period. Constraints: in each cell the figure plus where it says so; if the offer does not say, write “not stated” and do not estimate. Output format: one table plus a recommendation in two sentences. Done when: the recommendation names the one question that has to be settled before we sign.',
    },
    {
      label: 'Handover',
      text: 'Handover for a colleague who was in none of the meetings and cannot see this chat. From my notes, per item: status today, next step, by when, who decides, where the file is, what must not be promised. Anything you cannot back up from my notes goes at the end as a question to me, not as an assumption in the text. Order: whatever is due in the first three days first.',
    },
    {
      label: 'Series work in blocks',
      text: 'Work through the 60 responses in blocks of 10. Same structure per entry: name, agrees yes/no/unclear, note in max. 10 words. After each block an interim status with the counts, then stop and wait for “continue”. Entries that do not fit the scheme go on a “to clarify” pile — do not make them fit.',
    },
  ],
  de: [
    {
      label: 'Ganz ohne Quelle',
      text: 'Reicht unser Budget bis Jahresende?',
    },
    {
      label: 'Hochrechnung mit Annahmen',
      text: 'Hochrechnung aus dem angehängten Kostenexport Januar bis August. Rechne nachvollziehbar: Monatsschnitt, Hochrechnung bis Dezember, Differenz zum Budget. Nenn deine Annahmen einzeln. Drei Szenarien: wie gehabt, +10 %, −10 %. Und sag, welche Zahl dir fehlt, um daraus eine Entscheidungsvorlage zu machen.',
    },
    {
      label: 'Angebotsvergleich',
      text: 'Ziel: die drei angehängten Angebote so vergleichen, dass wir eines unterschreiben können. Kontext: nur die Angebote verwenden. Kriterien in dieser Reihenfolge: Gesamtkosten über 3 Jahre, Liefertermin, Support-Zeiten, Kündigungsfrist. Einschränkungen: pro Zelle die Zahl plus Fundstelle; fehlt die Angabe, „nicht angegeben“ schreiben und nicht schätzen. Ausgabeformat: eine Tabelle plus Empfehlung in zwei Sätzen. Fertig wenn: die Empfehlung die eine Frage nennt, die vor der Unterschrift geklärt sein muss.',
    },
    {
      label: 'Übergabe',
      text: 'Übergabe für eine Kollegin, die in keinem der Termine war und diesen Chat nicht sehen kann. Aus meinen Notizen, pro Vorgang: Stand heute, nächster Schritt, bis wann, wer entscheidet, wo die Datei liegt, was nicht zugesagt werden darf. Was du aus meinen Notizen nicht belegen kannst, kommt ans Ende als Frage an mich, nicht als Annahme im Text. Reihenfolge: was in den ersten drei Tagen ansteht, zuerst.',
    },
    {
      label: 'Serienarbeit in Blöcken',
      text: 'Arbeite die 60 Rückläufer in Blöcken zu 10 ab. Pro Eintrag dieselbe Struktur: Name, Zustimmung ja/nein/unklar, Anmerkung in max. 10 Wörtern. Nach jedem Block ein Zwischenstand mit Zählung, dann stopp und warte auf „weiter“. Einträge, die nicht ins Schema passen, kommen auf einen Stapel „Klärfall“ – nicht passend machen.',
    },
  ],
};

export const PROMPT_PRESETS: Record<GuideMode, Record<Lang, PromptPreset[]>> = {
  desk: DESK_PRESETS,
  decisions: DECISION_PRESETS,
};

export const getDefaultPreset = (lang: Lang, guideMode: GuideMode): PromptPreset | undefined =>
  PROMPT_PRESETS[guideMode][lang][1] ?? PROMPT_PRESETS[guideMode][lang][0];
