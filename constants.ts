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
      'LLMs do not look things up. They continue text plausibly.',
      'Classic weaknesses: arithmetic (math), up-to-date facts (news), citations.',
      'The risk: hallucinations. The model sounds just as convincing when it is wrong – instead of saying "I don\'t know".',
      'Our solution: We must give the model tools and guardrails.',
    ],
    contentDE: [
      'LLMs schlagen nichts nach. Sie setzen Text plausibel fort.',
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
3. Schedule: Based on this, create a maintenance plan (daily, weekly, monthly).`,
    codeOptimizedDE: `1. Analyse: Welche Komponenten hat Anlage X (Förderbänder, Sensoren...)?
2. Risiken: Wo sind die häufigsten Ausfälle?
3. Zeitplan: Erstelle basierend darauf einen Wartungsplan (Täglich, Wöchentlich, Monatlich).`,
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
    id: 13,
    type: SlideType.CONTENT,
    visual: 'compiler',
    icon: 'Workflow',
    title: 'So We Build a Contract, Not a Magic Spell',
    titleDE: 'Darum bauen wir einen Auftrag – keinen Zauberspruch',
    subtitle: 'Reusable way of working + today’s case → concrete work order. (I call these two levels L2 and L1.)',
    subtitleDE: 'Wiederverwendbare Arbeitsweise + heutiger Fall → konkreter Arbeitsauftrag. (Bei mir heißen die beiden Ebenen L2 und L1.)',
    content: [
      'L2 holds the reusable method. Today’s ticket, file and system belong in L1.',
      'The construction pass stops before execution. First understand the contract, then act.',
    ],
    contentDE: [
      'Die Vorlage (L2) beschreibt das Vorgehen. Ticket, Datei und System von heute stehen erst im Arbeitsauftrag (L1).',
      'Beim Erstellen des Auftrags wird noch nichts ausgeführt. Erst den Auftrag verstehen, dann handeln.',
    ],
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
    codeOptimized: `Build the L1 import contract from the current ticket, CSV, mapping documentation, target-system docs and runbook.

Derive the actual files, mappings, tools and checks from that evidence.
Preserve identity.
Never invent IDs, mappings, commands or permissions.
Missing evidence stays UNKNOWN/BLOCKED.
Keep Verification separate from Done When.

Stop after L1. Do not import yet.`,
    codeOptimizedDE: `Erstelle aus Ticket, CSV-Datei, Mapping-Doku, Zielsystem-Doku und Runbook einen konkreten Arbeitsauftrag für den Import.

Dateien, Mappings, Werkzeuge und Prüfwege aus diesen Unterlagen ableiten.
Bestehende Benutzerkonten nicht überschreiben.
Keine IDs, Mappings, Befehle oder Berechtigungen erfinden.
Was nicht belegt ist, bleibt UNKNOWN/BLOCKED.
„Prüfung“ und „Erledigt, wenn“ getrennt aufführen.

Nach dem Arbeitsauftrag aufhören. Noch nichts importieren.`,
    codeWorkOrder: `Goal: validate SD-18427 before the import runs.
Context: users_2026-08-28.csv → Portal-Test; 742 rows; new cost_center → department mapping.
Constraints: no identity overwrite; no invented employee IDs or mapping assumptions.
Verification: documented dry-run + reconcile 742/742 rows + verify the new mapping against current docs.
Done When: every row is explained; zero unintended writes; the new mapping is VERIFIED or explicitly BLOCKED.`,
    codeWorkOrderDE: `Ziel: SD-18427 prüfen, bevor der Import läuft.
Kontext: users_2026-08-28.csv → Portal-Test; 742 Zeilen; neues Mapping cost_center → department.
Grenzen: keine bestehenden Konten überschreiben; keine Personalnummer oder Mapping-Annahme erfinden.
Prüfung: dokumentierter Dry-Run + 742/742 Zeilen abgleichen + neues Mapping gegen aktuelle Doku prüfen.
Erledigt, wenn: jede Zeile erklärt ist; 0 unbeabsichtigte Schreibzugriffe; neues Mapping VERIFIED oder ausdrücklich BLOCKED.`,
    content: 'The direct prompt is fine for this ticket. L2 is useful when the same quality bar should survive the next import.',
    contentDE: 'Der direkte Prompt ist für dieses Ticket völlig okay. L2 lohnt sich, wenn derselbe Qualitätsmaßstab auch beim nächsten Import gelten soll.',
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
probe → observed result → evidence state.

VERIFIED only with observed evidence.
No result = UNKNOWN.
Required probe unavailable = BLOCKED.
Close only when Done When is supported by the observed results.`,
    codeOptimizedDE: `Aussage des Benutzers und Ticket-Checkliste sind Hinweise, kein Beweis.

Pro notwendigem Kriterium festhalten:
Test → beobachtetes Ergebnis → Belegstatus.

VERIFIED nur mit beobachtetem Nachweis.
Kein Ergebnis = UNKNOWN.
Notwendiger Test nicht möglich = BLOCKED.
Erst schließen, wenn die beobachteten Ergebnisse das Abschlusskriterium belegen.`,
    content: '“Works for me” can be useful evidence. It is still not automatically the whole acceptance test.',
    contentDE: '„Geht bei mir wieder“ ist ein wertvoller Hinweis – aber noch keine vollständige Abnahme.',
  },
  {
    id: 16,
    type: SlideType.CONTENT,
    visual: 'authority-map',
    icon: 'FileLock2',
    title: 'Context Is Not Permission',
    titleDE: 'Kontext ist keine Erlaubnis',
    subtitle: 'A file may explain the incident and still be outside edit scope.',
    subtitleDE: 'Eine Datei kann die Störung erklären und trotzdem außerhalb des Änderungsumfangs liegen.',
    content: [
      'Relevance answers “should I inspect this?”. Authority answers “may I change this?”.',
      'If the fix leaves approved scope, name the missing decision instead of silently widening scope.',
    ],
    contentDE: [
      'Relevanz beantwortet „muss ich das ansehen?“. Befugnis beantwortet „darf ich das ändern?“.',
      'Liegt die Lösung außerhalb des freigegebenen Umfangs: fehlende Entscheidung benennen, statt den Umfang heimlich zu erweitern.',
    ],
  },
  {
    id: 17,
    type: SlideType.CONTENT,
    visual: 'evidence-board',
    icon: 'BadgeCheck',
    title: 'Give Uncertainty a Name',
    titleDE: 'Unsicherheit braucht einen Namen',
    subtitle: 'Otherwise “probably” has a nasty habit of becoming “fact” two messages later.',
    subtitleDE: 'Sonst wird aus „wahrscheinlich“ zwei Nachrichten später erstaunlich zuverlässig ein „Fakt“.',
    content: 'Confidence is not a fourth state.',
    contentDE: 'Selbstsicherheit ist kein vierter Zustand.',
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
CLEAN is valid.
Do not manufacture a finding to fill the list.`,
    codeOptimizedDE: `Versuche den Plan auf mindestens drei unterschiedliche ernsthafte Arten zu widerlegen.

Pro Versuch:
Vermutung → konkreter Auslöser → Beleg dafür oder dagegen → kleinster sinnvoller Test.

Eine widerlegte Vermutung ist ein erfolgreicher Prüfversuch.
CLEAN ist erlaubt.
Keinen Fund erfinden, nur damit die Liste voll ist.`,
    content: 'The number belongs to the investigation effort, not to the number of defects reality is required to provide.',
    contentDE: 'Die Zahl gehört zur Prüfleistung – nicht zur Anzahl der Fehler, die die Realität gefälligst liefern soll.',
  },
  {
    id: 19,
    type: SlideType.CONTENT,
    visual: 'agent-loop',
    icon: 'Bot',
    title: 'Auto-Agent Without Self-Approval',
    titleDE: 'Auto-Agent ohne Selbstfreigabe',
    subtitle: 'Continue inside authority. Stop at real decisions.',
    subtitleDE: 'Innerhalb der Freigabe weiterarbeiten. An echten Entscheidungen stoppen.',
    content: [
      'After each slice: cheapest meaningful check, then continue while evidence and authority still hold.',
      'Owner, security, accepted-risk, destructive and irreversible decisions are never self-approved.',
    ],
    contentDE: [
      'Nach jedem Arbeitsschritt kurz und sinnvoll prüfen – dann automatisch weiter, solange Belege und Freigabe reichen.',
      'Entscheidungen zu Zuständigkeit, Sicherheit und Risiko – und alles, was löscht oder sich nicht rückgängig machen lässt – nie selbst freigeben.',
    ],
  },
  {
    id: 20,
    type: SlideType.CONTENT,
    visual: 'toolbox',
    icon: 'Library',
    title: 'Small L2 Toolbox, Not One Mega-Prompt',
    titleDE: 'Kleine L2-Toolbox statt Mega-Prompt',
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
