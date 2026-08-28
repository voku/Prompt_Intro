import { SlideData, SlideType } from './types';

export const SLIDES: SlideData[] = [
  {
    id: 1,
    type: SlideType.TITLE,
    icon: 'BrainCircuit',
    title: 'From Plausible Answers to Reliable Work',
    titleDE: 'Von plausiblen Antworten zu belastbarer Arbeit',
    subtitle: 'Before prompt techniques: why LLMs behave the way they do — and what that means for real IT work.',
    subtitleDE: 'Bevor wir über Prompt-Techniken reden: warum LLMs so arbeiten, wie sie arbeiten – und was das für echte IT-Arbeit bedeutet.',
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
    type: SlideType.CONTENT,
    visual: 'compiler',
    icon: 'Workflow',
    title: 'So We Build a Contract, Not a Magic Spell',
    titleDE: 'Darum bauen wir einen Auftrag – keinen Zauberspruch',
    subtitle: 'L2 describes how to build a concrete L1 contract from current context and evidence.',
    subtitleDE: 'L2 beschreibt, wie aus aktuellem Kontext und Evidenz ein konkreter L1-Auftrag entsteht.',
    content: [
      'L2 holds the reusable method. Today’s ticket, file and system belong in L1.',
      'The construction pass stops before execution. First understand the contract, then act.',
    ],
    contentDE: [
      'L2 enthält die wiederverwendbare Methode. Ticket, Datei und System von heute gehören in L1.',
      'Der Bau-Durchgang stoppt vor der Ausführung. Erst Auftrag verstehen, dann handeln.',
    ],
  },
  {
    id: 7,
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
    codeOptimizedDE: `Baue aus aktuellem Ticket, CSV, Mapping-Doku, Zielsystem-Doku und Runbook den L1-Auftrag für den Import.

Konkrete Dateien, Mappings, Werkzeuge und Prüfwege aus dieser Evidenz ableiten.
Identitäten erhalten.
Keine IDs, Mappings, Befehle oder Berechtigungen erfinden.
Fehlende Evidenz bleibt UNKNOWN/BLOCKED.
Prüfung und Fertig-wenn trennen.

Nach L1 stoppen. Noch nichts importieren.`,
    codeWorkOrder: `Goal: validate SD-18427 before the import runs.
Context: users_2026-08-28.csv → Portal-Test; 742 rows; new cost_center → department mapping.
Constraints: no identity overwrite; no invented employee IDs or mapping assumptions.
Verification: documented dry-run + reconcile 742/742 rows + verify the new mapping against current docs.
Done When: every row is explained; zero unintended writes; the new mapping is VERIFIED or explicitly BLOCKED.`,
    codeWorkOrderDE: `Ziel: SD-18427 prüfen, bevor der Import läuft.
Kontext: users_2026-08-28.csv → Portal-Test; 742 Zeilen; neues Mapping cost_center → department.
Grenzen: keine Identität überschreiben; keine Personalnummer oder Mapping-Annahme erfinden.
Prüfung: dokumentierter Dry-Run + 742/742 Zeilen abgleichen + neues Mapping gegen aktuelle Doku prüfen.
Fertig, wenn: jede Zeile erklärt ist; 0 unbeabsichtigte Schreibzugriffe; neues Mapping VERIFIED oder ausdrücklich BLOCKED.`,
    content: 'The direct prompt is fine for this ticket. L2 is useful when the same quality bar should survive the next import.',
    contentDE: 'Der direkte Prompt ist für dieses Ticket völlig okay. L2 lohnt sich, wenn derselbe Qualitätsmaßstab auch beim nächsten Import gelten soll.',
  },
  {
    id: 8,
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
    codeOptimizedDE: `Benutzeraussage und Ticket-Checkliste sind Input, kein Beweis.

Pro notwendigem Kriterium festhalten:
Probe → beobachtetes Ergebnis → Evidenzzustand.

VERIFIED nur mit beobachtetem Nachweis.
Kein Ergebnis = UNKNOWN.
Notwendige Probe nicht möglich = BLOCKED.
Erst schließen, wenn die beobachteten Ergebnisse Done When tragen.`,
    content: '“Works for me” can be useful evidence. It is still not automatically the whole acceptance test.',
    contentDE: '„Geht bei mir wieder“ kann wertvolle Evidenz sein. Es ist nur nicht automatisch die komplette Abnahme.',
  },
  {
    id: 9,
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
      'Zeigt die Lösung aus dem freigegebenen Scope heraus: fehlende Entscheidung benennen, nicht Scope heimlich erweitern.',
    ],
  },
  {
    id: 10,
    type: SlideType.CONTENT,
    visual: 'evidence-board',
    icon: 'BadgeCheck',
    title: 'Give Uncertainty a Name',
    titleDE: 'Unsicherheit braucht einen Namen',
    subtitle: 'Otherwise “probably” has a nasty habit of becoming “fact” two messages later.',
    subtitleDE: 'Sonst wird aus „wahrscheinlich“ zwei Nachrichten später erstaunlich zuverlässig ein „Fakt“.',
    content: 'Confidence is not a seventh evidence state.',
    contentDE: 'Selbstsicherheit ist kein siebter Evidenzzustand.',
  },
  {
    id: 11,
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
Hypothese → konkreter Trigger → bestätigende/widerlegende Evidenz → kleinste sinnvolle Probe.

Eine widerlegte Hypothese ist ein erfolgreicher Review-Versuch.
CLEAN ist erlaubt.
Keinen Fund erfinden, nur damit die Liste voll ist.`,
    content: 'The number belongs to the investigation effort, not to the number of defects reality is required to provide.',
    contentDE: 'Die Zahl gehört zur Prüfleistung – nicht zur Anzahl der Fehler, die die Realität gefälligst liefern soll.',
  },
  {
    id: 12,
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
      'Nach jedem Slice: billigste sinnvolle Prüfung, dann automatisch weiter, solange Evidenz und Befugnis tragen.',
      'Owner-, Security-, Risiko-, destruktive und irreversible Entscheidungen niemals selbst bestätigen.',
    ],
  },
  {
    id: 13,
    type: SlideType.CONTENT,
    visual: 'toolbox',
    icon: 'Library',
    title: 'Small L2 Toolbox, Not One Mega-Prompt',
    titleDE: 'Kleine L2-Toolbox statt Mega-Prompt',
    subtitle: 'Click a method to open the actual current source prompt from agent-recall-compiler.',
    subtitleDE: 'Auf eine Methode klicken: darunter öffnet sich der konkrete aktuelle Source-Prompt aus agent-recall-compiler.',
    content: 'Pick a construction method because it changes how the task should be approached — not because every task needs every technique.',
    contentDE: 'Eine Methode auswählen, weil sie das Vorgehen sinnvoll verändert – nicht weil jede Aufgabe jede Technik braucht.',
  },
  {
    id: 14,
    type: SlideType.END,
    visual: 'library',
    icon: 'Boxes',
    title: 'The Goal Is Better Work, Not Better-Looking Prompts',
    titleDE: 'Das Ziel ist bessere Arbeit, nicht hübschere Prompts',
    subtitle: 'Use the smallest technique that buys real reliability.',
    subtitleDE: 'Nimm die kleinste Technik, die tatsächlich mehr Verlässlichkeit bringt.',
    content: [
      'One-off: direct prompt.',
      'Recurring: reusable L2 construction method.',
      'Consequential: explicit evidence, verification and authority.',
    ],
    contentDE: [
      'Einmalig: direkter Prompt.',
      'Wiederkehrend: wiederverwendbare L2-Bauanleitung.',
      'Kritisch: Evidenz, Prüfung und Befugnis explizit machen.',
    ],
  },
];
