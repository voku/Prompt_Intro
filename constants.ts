import { SlideData, SlideType } from './types';

export const SLIDES: SlideData[] = [
  {
    id: 1,
    type: SlideType.TITLE,
    icon: 'BrainCircuit',
    title: 'Prompt Engineering in der Praxis',
    titleDE: 'Prompt Engineering in der Praxis',
    subtitle: 'I work with LLMs every day and hand them real work. But trust comes from verifiable steps — not from a convincing answer.',
    subtitleDE: 'Ich arbeite jeden Tag mit LLMs und vertraue ihnen echte Arbeit an. Vertrauen entsteht aber durch prüfbare Schritte – nicht durch eine überzeugende Antwort.',
  },
  {
    id: 2,
    type: SlideType.CONTENT,
    icon: 'AlertTriangle',
    title: 'The LLM Problem',
    titleDE: 'Das LLM-Problem',
    subtitle: 'Why ChatGPT sometimes acts like an overly confident, clueless intern',
    subtitleDE: 'Warum ChatGPT manchmal wie ein sehr selbstbewusster, aber ahnungsloser Praktikant wirkt',
    content: [
      'The model itself generates from its context. Looking things up, calculating or checking systems requires provided tools.',
      'Classic weaknesses: arithmetic (math), up-to-date facts (news), citations.',
      'The risk: hallucinations. The model sounds just as convincing when it is wrong – instead of saying "I don\'t know".',
      'Our solution: We must give the model tools and guardrails.',
    ],
    contentDE: [
      'Das Modell selbst erzeugt aus seinem Kontext. Nachschlagen, rechnen oder Systeme prüfen kann es nur über bereitgestellte Werkzeuge.',
      'Klassische Schwächen: Rechnen (Mathe), aktuelle Fakten (News), Zitate.',
      'Das Risiko: Halluzinationen. Das Modell klingt auch dann überzeugend, wenn es falsch liegt – statt „Ich weiß es nicht“ zu sagen.',
      'Unsere Lösung: Wir müssen dem Modell Werkzeuge und Leitplanken geben.',
    ],
  },
  {
    id: 3,
    type: SlideType.CONTENT,
    visual: 'carwash',
    icon: 'CarFront',
    title: '50 Metres? Walking Sounds Great. Wrong Task.',
    titleDE: '50 Meter? Laufen klingt super. Falsche Aufgabe.',
    subtitle: 'A model can optimise the explicit clue and miss the implicit goal.',
    subtitleDE: 'Ein Modell kann die sichtbare Information sauber verarbeiten und trotzdem das unausgesprochene Ziel verfehlen.',
    content: [
      'The model does not automatically inherit all the assumptions in our head.',
      'For important work: make the actual goal and the relevant constraints observable.',
    ],
    contentDE: [
      'Das Modell bekommt unsere unausgesprochenen Annahmen nicht automatisch mitgeliefert.',
      'Bei wichtiger Arbeit: Ziel und relevante Randbedingungen sichtbar machen.',
    ],
  },
  {
    id: 4,
    type: SlideType.CONTENT,
    visual: 'noise-hallucination',
    icon: 'ScanSearch',
    title: 'Nothing Was There. Both Models Found Something.',
    titleDE: 'Da war nichts. Beide Modelle fanden trotzdem etwas.',
    subtitle: 'Pattern completion can look exactly like observation when nobody checks the ground truth.',
    subtitleDE: 'Mustererkennung kann exakt wie Beobachtung klingen – solange niemand gegen die Realität prüft.',
    content: [
      'A confident description is still only a model output.',
      'If the source does not support the claim, the correct state is UNKNOWN — not a better story.',
    ],
    contentDE: [
      'Eine selbstbewusste Beschreibung bleibt erstmal nur Modell-Output.',
      'Wenn die Quelle die Aussage nicht trägt, ist UNKNOWN die richtige Antwort – nicht die schönere Geschichte.',
    ],
  },
  {
    id: 5,
    type: SlideType.CONTENT,
    visual: 'tokens',
    icon: 'Binary',
    title: 'Characters, Words, Tokens: Different Layers',
    titleDE: 'Buchstaben, Wörter, Tokens: nicht dasselbe',
    subtitle: 'Language models do not natively see text as the neat character grid we see.',
    subtitleDE: 'Ein Sprachmodell sieht Text nicht automatisch als die saubere Buchstabenfolge, die wir vor Augen haben.',
    content: [
      'Tokenisation is model-specific; tokens are not guaranteed to map one-to-one to characters or words.',
      'Exact string work, counting or arithmetic should use deterministic tools when it matters.',
    ],
    contentDE: [
      'Tokenisierung ist modellabhängig. Ein Token ist nicht automatisch ein Buchstabe oder genau ein Wort.',
      'Wenn exaktes Zählen, String-Arbeit oder Rechnen zählt: deterministisches Tool benutzen.',
    ],
  },
  {
    id: 6,
    type: SlideType.CONTENT,
    visual: 'next-token',
    icon: 'Sparkles',
    title: 'Plausible Continuation Is Not a Truth Database',
    titleDE: 'Plausible Fortsetzung ist keine Wahrheitsdatenbank',
    subtitle: 'Generation rewards contextual fit. Truth needs evidence, retrieval or tools.',
    subtitleDE: 'Generation belohnt, was zum Kontext passt. Wahrheit braucht Evidenz, Retrieval oder Tools.',
    content: [
      'That is why fabricated facts can sound completely natural.',
      'Modern reasoning and tools help enormously — but the final claim still needs evidence when it matters.',
    ],
    contentDE: [
      'Darum kann auch eine erfundene Behauptung völlig natürlich klingen.',
      'Reasoning und Tools helfen massiv – aber wichtige Aussagen brauchen am Ende trotzdem Evidenz.',
    ],
  },
  {
    id: 7,
    type: SlideType.COMPARISON,
    icon: 'Calculator',
    title: 'Example: Logic & Math',
    titleDE: 'Beispiel: Logik & Mathe',
    subtitle: 'Code makes the calculation reproducible and checkable.',
    subtitleDE: 'Code macht den Rechenweg reproduzierbar und überprüfbar.',
    technique: 'Code-Aided Reasoning (PoT)',
    techniqueDE: 'Code-Aided Reasoning (PoT)',
    codeStandard: 'A waste collection truck consumes 32L/100km. It runs 2 routes of 45km daily. Diesel costs €1.70. What are the costs in November (excluding Sundays) in 2024?',
    codeStandardDE: 'Ein Müllwagen verbraucht 32L/100km. Er fährt täglich 2 Touren à 45km. Diesel kostet 1,70€. Wie hoch sind die Kosten im November (ohne Sonntage) im Jahr 2024?',
    codeOptimized: `Goal: Calculate fuel costs.
Constraint: Do NOT calculate manually.
Action: Write a Python script that:
1. Determines the number of working days (Mon-Sat) in November 2024.
2. Calculates consumption based on 90km/day.
3. Outputs the total costs.`,
    codeOptimizedDE: `Ziel: Berechne Treibstoffkosten.
Constraint: Rechne NICHT selbst.
Action: Schreibe ein Python-Skript, das:
1. Die Anzahl der Werktage (Mo-Sa) im November 2024 ermittelt.
2. Den Verbrauch basierend auf 90km/Tag berechnet.
3. Die Gesamtkosten ausgibt.`,
    content: 'Without code you only see a number. With code you see the calculation – e.g. how many working days were counted – and can rerun and check it.',
    contentDE: 'Ohne Code sieht man nur eine Zahl. Mit Code sieht man den Rechenweg – z. B. wie viele Werktage gezählt wurden – und kann ihn nachrechnen und prüfen.',
  },
  {
    id: 8,
    type: SlideType.COMPARISON,
    icon: 'Globe',
    title: 'Example: Facts & Knowledge',
    titleDE: 'Beispiel: Fakten & Wissen',
    subtitle: 'Facts need sources, not creativity.',
    subtitleDE: 'Fakten brauchen Quellen, keine Kreativität.',
    technique: 'Fact Grounding & Tool Use',
    techniqueDE: 'Fact Grounding & Tool Use',
    codeStandard: 'Who is currently on the managing board of Siemens AG?',
    codeStandardDE: 'Wer sitzt aktuell im Vorstand der Siemens AG?',
    codeOptimized: `Use Google Search to find the current board members on the official Siemens website.
List the names and functions.
Cite the source (URL) for each person.`,
    codeOptimizedDE: `Nutze Google Search, um die aktuelle Vorstandsliste auf der offiziellen Siemens-Website zu finden.
Liste Namen und Funktionen auf.
Nenne für jede Person die Quelle (URL).`,
    content: 'Without a search tool, the model often names board members from 2021 or invents names. With search plus a source for every name, we get current data we can check ourselves.',
    contentDE: 'Ohne Search-Tool nennt das Modell oft Vorstände von 2021 oder erfindet Namen. Mit Suche und Quellenpflicht bekommen wir aktuelle Angaben, die wir selbst nachprüfen können.',
  },
  {
    id: 9,
    type: SlideType.CONTENT,
    icon: 'Layers',
    title: 'How Much Guidance Does the Task Need?',
    titleDE: 'Wie viel Führung braucht die Aufgabe?',
    subtitle: 'Not a ladder from beginner to pro — use as much guidance as the task requires.',
    subtitleDE: 'Keine Leiter vom Anfänger zum Profi – so viel Führung, wie die Aufgabe braucht.',
    content: [
      'Level 1: Ask directly (simple, low-risk questions)',
      'Level 2: Add context and examples (role, goal, desired style)',
      'Level 3: Structure the task (analyse first, then produce the result)',
      'Level 4: Tools and checks (code, search, sources – when the result must hold up)',
    ],
    contentDE: [
      'Level 1: Direkt fragen (einfache, unkritische Fragen)',
      'Level 2: Kontext und Beispiele mitgeben (Rolle, Ziel, gewünschter Stil)',
      'Level 3: Aufgabe strukturieren (erst analysieren, dann Ergebnis erstellen)',
      'Level 4: Werkzeuge und Prüfung (Code, Suche, Quellen – wenn das Ergebnis halten muss)',
    ],
  },
  {
    id: 10,
    type: SlideType.COMPARISON,
    icon: 'ListOrdered',
    title: 'Technique: Analyse First, Then Produce',
    titleDE: 'Technik: Erst analysieren, dann Ergebnis erstellen',
    subtitle: 'Not a magic phrase — we decide what has to be clarified first.',
    subtitleDE: 'Kein Zauberspruch – wir legen fest, was zuerst geklärt werden muss.',
    technique: 'Structure the task',
    techniqueDE: 'Aufgabe strukturieren',
    codeStandard: 'Create a plan for the maintenance of sorting plant X.',
    codeStandardDE: 'Erstelle einen Plan für die Wartung der Sortieranlage X.',
    codeOptimized: `1. Analysis: What components does plant X have (conveyor belts, sensors...)?
2. Risks: Where do failures occur most frequently?
3. Schedule: Based on this, create a maintenance plan (daily, weekly, monthly).
4. Missing information: Mark what is not documented or cannot be determined from the available information.`,
    codeOptimizedDE: `1. Analyse: Welche Komponenten hat Anlage X (Förderbänder, Sensoren...)?
2. Risiken: Wo sind die häufigsten Ausfälle?
3. Zeitplan: Erstelle basierend darauf einen Wartungsplan (täglich, wöchentlich, monatlich).
4. Fehlende Informationen: Markiere, was nicht dokumentiert ist oder sich aus den vorhandenen Informationen nicht ableiten lässt.`,
    content: 'Modern models reason on their own. What helps is our structure: the plan then builds on the analysis of this plant instead of a generic template.',
    contentDE: 'Moderne Modelle „denken“ ohnehin mit. Was hilft, ist unsere Struktur: Der Plan baut dann auf der Analyse dieser Anlage auf statt auf einer Standardvorlage.',
  },
  {
    id: 11,
    type: SlideType.COMPARISON,
    icon: 'UserCog',
    title: 'Technique: Persona & Context',
    titleDE: 'Technik: Persona & Kontext',
    subtitle: 'Who am I and what do I want?',
    subtitleDE: 'Wer bin ich und was will ich?',
    technique: 'North Star & Context',
    techniqueDE: 'North Star & Context',
    codeStandard: 'Write an email to the municipality that the bins were not emptied.',
    codeStandardDE: 'Schreib eine Mail an die Kommune, dass die Tonnen nicht geleert wurden.',
    codeOptimized: `Role: Operations manager at a waste-management company.
Context: Black ice prevented access to Street X.
Goal: Inform them that we will make a second attempt tomorrow.
Tone: Professional, safety-conscious, cooperative.`,
    codeOptimizedDE: `Rolle: Betriebsleiter eines Entsorgungsbetriebs.
Kontext: Glatteis verhinderte Zufahrt in Straße X.
Ziel: Informieren, dass wir morgen einen zweiten Versuch starten.
Ton: Professionell, sicherheitsbewusst, kooperativ.`,
    content: 'Context is king. Without context, the model writes a generic apology. With context ("black ice", "safety"), it sounds professional.',
    contentDE: 'Kontext ist King. Ohne Kontext schreibt das Modell eine Standard-Entschuldigung. Mit Kontext (\'Glatteis\', \'Sicherheit\') wirkt es professionell.',
  },
  {
    id: 12,
    type: SlideType.COMPARISON,
    icon: 'Code',
    title: 'Technique: Structured Output',
    titleDE: 'Technik: Strukturierte Ausgabe',
    subtitle: 'Data instead of prose',
    subtitleDE: 'Daten statt Prosa',
    technique: 'XML Delimiters & JSON',
    techniqueDE: 'Abgrenzung & JSON',
    codeStandard: 'Read this accident report and tell me what happened.',
    codeStandardDE: 'Lies diesen Unfallbericht und sag mir, was passiert ist.',
    codeOptimized: `<task>Extract accident data</task>
<format>
Respond ONLY in JSON format:
{
  "date": "ISO-8601",
  "accident_type": "string",
  "injured": "integer",
  "measures": []
}
</format>
<report>...</report>`,
    codeOptimizedDE: `<task>Extrahiere Unfalldaten</task>
<format>
Antworte NUR im JSON-Format:
{
  "datum": "ISO-8601",
  "unfallart": "string",
  "verletzte": "integer",
  "maßnahmen": []
}
</format>
<bericht>...</bericht>`,
    content: 'In chat: specify the format in the prompt (as shown). Via API: use a real JSON schema / structured output – then the system enforces the format, not a polite request.',
    contentDE: 'Im Chat: Format im Prompt vorgeben (wie hier). Per API: echtes JSON-Schema bzw. Structured Output nutzen – dann erzwingt das System das Format, nicht eine höfliche Bitte im Prompt.',
  },
  {
    id: 14,
    type: SlideType.COMPARISON,
    icon: 'FileSpreadsheet',
    title: 'Friday, 16:47. 742 Users. One Suspicious Mapping.',
    titleDE: 'Freitag, 16:47 Uhr. 742 Benutzer. Ein verdächtiges Mapping.',
    subtitle: 'The case changes. The method for not wrecking the import should not.',
    subtitleDE: 'Der Fall ändert sich. Die Methode, mit der wir den Import nicht ruinieren, sollte bleiben.',
    technique: 'CSV user import',
    techniqueDE: 'CSV-Benutzerimport',
    codeStandard: `SD-18427 must be ready today.

users_2026-08-28.csv → Portal-Test
742 rows
New mapping: cost_center → department

Check the import before anyone runs it.
Do not overwrite existing identities.
Missing employee IDs are errors.
Use the documented dry-run.
Explain all 742 rows and flag the new mapping if evidence is missing.`,
    codeStandardDE: `SD-18427 muss heute noch vorbereitet werden.

users_2026-08-28.csv → Portal-Test
742 Zeilen
Neu im Mapping: cost_center → department

Prüf den Import, bevor ihn jemand startet.
Bestehende Identitäten nicht überschreiben.
Fehlende Personalnummern sind Fehler.
Den dokumentierten Dry-Run verwenden.
Alle 742 Zeilen erklären; das neue Mapping markieren, wenn dafür der Beleg fehlt.`,
    codeOptimized: `Build a concrete import work order from the current ticket, CSV, mapping documentation, target-system docs and runbook.

Derive the actual files, mappings, tools and checks from that evidence.
Preserve identity.
Never invent IDs, mappings, commands or permissions.
Missing evidence stays explicitly unresolved; do not guess.
Keep Verification separate from Done When.

Stop after the work order. Do not import yet.`,
    codeOptimizedDE: `Erstelle aus Ticket, CSV-Datei, Mapping-Doku, Zielsystem-Doku und Runbook einen konkreten Arbeitsauftrag für den Import.

Dateien, Mappings, Werkzeuge und Prüfwege aus diesen Unterlagen ableiten.
Bestehende Benutzerkonten nicht überschreiben.
Keine IDs, Mappings, Befehle oder Berechtigungen erfinden.
Fehlende Belege ausdrücklich als offen markieren; nicht raten.
„Prüfung“ und „Erledigt, wenn“ getrennt aufführen.

Nach dem Arbeitsauftrag aufhören. Noch nichts importieren.`,
    codeWorkOrder: `Goal: validate SD-18427 before the import runs.
Context: users_2026-08-28.csv → Portal-Test; 742 rows; new cost_center → department mapping.
Constraints: no identity overwrite; no invented employee IDs or mapping assumptions.
Verification: documented dry-run + reconcile 742/742 rows + verify the new mapping against current docs.
Done When: every row is explained; zero unintended writes; the new mapping is verified against current docs or explicitly left open with a reason.`,
    codeWorkOrderDE: `Ziel: SD-18427 prüfen, bevor der Import läuft.
Kontext: users_2026-08-28.csv → Portal-Test; 742 Zeilen; neues Mapping cost_center → department.
Grenzen: keine bestehenden Konten überschreiben; keine Personalnummer oder Mapping-Annahme erfinden.
Prüfung: dokumentierter Dry-Run + 742/742 Zeilen abgleichen + neues Mapping gegen aktuelle Doku prüfen.
Erledigt, wenn: jede Zeile erklärt ist; 0 unbeabsichtigte Schreibzugriffe; neues Mapping gegen aktuelle Doku belegt oder mit Grund ausdrücklich offen.`,
    content: 'The direct prompt is fine for this ticket. A reusable template is useful when the same quality bar should survive the next import.',
    contentDE: 'Der direkte Prompt ist für dieses Ticket völlig okay. Eine wiederverwendbare Vorlage lohnt sich, wenn derselbe Qualitätsmaßstab auch beim nächsten Import gelten soll.',
  },
  {
    id: 15,
    type: SlideType.COMPARISON,
    icon: 'TicketCheck',
    title: 'User Says “VPN Works Again”. Can We Close It?',
    titleDE: 'Benutzer sagt: „VPN geht wieder.“ Ticket zu?',
    subtitle: 'Requirement, user report and observed verification are three different things.',
    subtitleDE: 'Anforderung, Benutzeraussage und beobachtete Prüfung sind drei verschiedene Dinge.',
    technique: 'VPN support ticket',
    techniqueDE: 'VPN-Supportticket',
    codeStandard: `The user says VPN works again after reinstalling the client.
Can we close the ticket?

Checklist:
- login
- MFA
- internal DNS
- file share`,
    codeStandardDE: `Der Benutzer sagt, nach der Neuinstallation läuft VPN wieder.
Können wir das Ticket schließen?

Checkliste:
- Anmeldung
- MFA
- internes DNS
- Fileshare`,
    codeOptimized: `Treat the user report and ticket checklist as input, not proof.

For each required criterion record:
probe → observed result → status (proven / assumed / open).

Do not turn a missing result into a pass.
If a required probe is unavailable, mark it open with the reason.
Close only when the observed results support the acceptance criteria.`,
    codeOptimizedDE: `Aussage des Benutzers und Ticket-Checkliste sind Hinweise, kein Beweis.

Pro notwendigem Kriterium festhalten:
Test → beobachtetes Ergebnis → Status (belegt / vermutet / offen).

Ein fehlendes Ergebnis ist kein bestandener Test.
Ist ein notwendiger Test nicht möglich, bleibt er mit Begründung offen.
Erst schließen, wenn die beobachteten Ergebnisse die Abschlusskriterien belegen.`,
    content: '“Works for me” can be useful evidence. It is still not automatically the whole acceptance test.',
    contentDE: '„Geht bei mir wieder“ ist ein wertvoller Hinweis – aber noch keine vollständige Abnahme.',
  },
  {
    id: 18,
    type: SlideType.COMPARISON,
    icon: 'SearchCheck',
    title: 'Don’t Order Three Bugs',
    titleDE: 'Bestell keine drei Fehler',
    subtitle: 'Order three serious attempts to disprove the change instead.',
    subtitleDE: 'Bestell drei ernsthafte Versuche, den Change zu widerlegen.',
    technique: 'Change review',
    techniqueDE: 'Change-Review',
    codeStandard: `The production change goes live at 18:00.
Review the plan and give me the three biggest risks.`,
    codeStandardDE: `Der Production-Change geht um 18:00 live.
Prüf den Plan und nenn mir die drei größten Risiken.`,
    codeOptimized: `Try at least three distinct serious ways to falsify the plan.

For each attempt:
hypothesis → exact trigger → confirming/disproving evidence → smallest useful probe.

A disproved hypothesis is a successful review attempt.
“No issue found” is a valid result.
Do not manufacture a finding to fill the list.`,
    codeOptimizedDE: `Versuche den Plan auf mindestens drei unterschiedliche ernsthafte Arten zu widerlegen.

Pro Versuch:
Vermutung → konkreter Auslöser → Beleg dafür oder dagegen → kleinster sinnvoller Test.

Eine widerlegte Vermutung ist ein erfolgreicher Prüfversuch.
„Kein Problem gefunden“ ist ein gültiges Ergebnis.
Keinen Fund erfinden, nur damit die Liste voll ist.`,
    content: 'The number belongs to the investigation effort, not to the number of defects reality is required to provide.',
    contentDE: 'Die Zahl gehört zur Prüfleistung – nicht zur Anzahl der Fehler, die die Realität gefälligst liefern soll.',
  },
  {
    id: 20,
    type: SlideType.CONTENT,
    visual: 'toolbox',
    icon: 'Library',
    title: 'Small Reusable Toolbox, Not One Mega-Prompt',
    titleDE: 'Kleine Vorlagen-Toolbox statt Mega-Prompt',
    subtitle: 'Three everyday situations. The template stays the same, the case changes – out comes a concrete work order.',
    subtitleDE: 'Drei typische Situationen. Die Vorlage bleibt gleich, der Fall wechselt – heraus kommt ein konkreter Arbeitsauftrag.',
    content: 'Use a template when it actually changes how you approach the task — not every task needs every technique.',
    contentDE: 'Eine Vorlage lohnt sich nur, wenn sie das Vorgehen wirklich verändert – nicht jede Aufgabe braucht jede Technik.',
  },
  {
    id: 21,
    type: SlideType.CONTENT,
    icon: 'ShieldAlert',
    title: 'Security & Compliance',
    titleDE: 'Sicherheit & Compliance',
    subtitle: 'Approved service + permitted data',
    subtitleDE: 'Freigegebener Dienst + zulässige Daten',
    content: [
      'Use only AI services approved by the company – a private account is not a work tool.',
      'Enter only data that is permitted for that service: personal data (GDPR) and business secrets only where explicitly allowed.',
      'Always verify results ("human in the loop") – responsibility stays with us.',
      'When in doubt: ask IT Security or Data Protection before you paste.',
    ],
    contentDE: [
      'Nur KI-Dienste nutzen, die bei uns freigegeben sind – ein privater Account ist kein Arbeitswerkzeug.',
      'Nur Daten eingeben, die für diesen Dienst zulässig sind: personenbezogene Daten (DSGVO) und Betriebsgeheimnisse nur, wo das ausdrücklich erlaubt ist.',
      'Ergebnisse immer prüfen („Human in the Loop“) – die Verantwortung bleibt bei uns.',
      'Im Zweifel: vor dem Einfügen IT-Security oder Datenschutz fragen.',
    ],
  },
  {
    id: 22,
    type: SlideType.END,
    icon: 'CheckCircle',
    title: 'Summary & Takeaways',
    titleDE: 'Zusammenfassung & Takeaways',
    subtitle: 'The goal is better work, not better-looking prompts.',
    subtitleDE: 'Das Ziel ist bessere Arbeit, nicht hübschere Prompts.',
    content: [
      'Brief it like a smart new colleague: role, context, goal.',
      'Calculate with code, facts with sources, analyse before producing.',
      'Name uncertainty: proven, assumed or open.',
      'First understand or reproduce, then change.',
      'Going in circles? Do not regenerate — add new information or start fresh.',
      'Recurring task? Keep the prompt as a template. The case changes, the template stays.',
    ],
    contentDE: [
      'Briefen wie einen klugen neuen Kollegen: Rolle, Kontext, Ziel.',
      'Rechnen mit Code, Fakten mit Quelle, erst analysieren, dann Ergebnis.',
      'Unsicherheit benennen: belegt, vermutet oder offen.',
      'Erst verstehen oder nachstellen, dann ändern.',
      'Dreht sich die KI im Kreis? Nicht neu würfeln – neue Infos geben oder neu anfangen.',
      'Wiederkehrende Aufgabe? Den Prompt als Vorlage aufheben. Der Fall wechselt, die Vorlage bleibt.',
    ],
  },
];
