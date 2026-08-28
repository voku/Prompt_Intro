import { SlideData, SlideType } from './types';

export const SLIDES: SlideData[] = [
  {
    id: 1,
    type: SlideType.TITLE,
    icon: 'BrainCircuit',
    title: 'From Prompts to Reliable Methods',
    titleDE: 'Von Prompts zu belastbaren Methoden',
    subtitle: 'Current prompt techniques for real IT work: less prose, more context, evidence and authority.',
    subtitleDE: 'Aktuelle Prompt-Techniken für echte IT-Arbeit: weniger Gelaber, mehr Kontext, Evidenz und klare Befugnisse.',
  },
  {
    id: 2,
    type: SlideType.CONTENT,
    visual: 'case-split',
    icon: 'RefreshCcw',
    title: 'The Case Expires. The Method Shouldn’t.',
    titleDE: 'Der Fall veraltet. Die Methode nicht.',
    subtitle: 'Ticket IDs, files and systems change. The quality bar should survive.',
    subtitleDE: 'Ticket-ID, Datei und Zielsystem ändern sich. Der Qualitätsmaßstab sollte bleiben.',
    content: [
      'A good one-off prompt can be exactly right for today.',
      'Copy-paste becomes dangerous when yesterday’s case details look like reusable rules.',
    ],
    contentDE: [
      'Ein guter Einzelfall-Prompt kann für heute genau richtig sein.',
      'Problematisch wird Copy & Paste erst, wenn Falldaten von gestern plötzlich wie Regeln für morgen aussehen.',
    ],
  },
  {
    id: 3,
    type: SlideType.CONTENT,
    visual: 'compiler',
    icon: 'Workflow',
    title: 'L2 Is a Prompt Compiler',
    titleDE: 'L2 ist ein Prompt-Compiler',
    subtitle: 'Reusable recipe in, current context in, concrete L1 contract out.',
    subtitleDE: 'Wiederverwendbare Bauanleitung rein, aktueller Kontext rein, konkreter L1-Auftrag raus.',
    content: [
      'L2 describes how to build the task contract. It does not contain today’s ticket.',
      'The L2 pass stops after L1. No import, change or send happens yet.',
    ],
    contentDE: [
      'L2 beschreibt, wie der konkrete Auftrag gebaut wird. Das Ticket von heute gehört dort nicht hinein.',
      'Nach dem L1-Auftrag ist Schluss. Noch kein Import, keine Änderung, kein Versand.',
    ],
  },
  {
    id: 4,
    type: SlideType.CONTENT,
    visual: 'l1-stack',
    icon: 'ListChecks',
    title: 'L1: Five Things, No Ritual',
    titleDE: 'L1: fünf Dinge, kein Ritual',
    subtitle: 'Small enough to review. Precise enough to verify.',
    subtitleDE: 'Kurz genug zum Gegenlesen. Präzise genug zum Prüfen.',
    content: 'The point is not to hand-write five headings every time. L2 should derive them from the current evidence.',
    contentDE: 'Die Pointe ist nicht, jedes Mal fünf Überschriften abzutippen. L2 soll sie aus dem aktuellen Kontext ableiten.',
  },
  {
    id: 5,
    type: SlideType.COMPARISON,
    icon: 'FileSpreadsheet',
    title: 'Friday, 16:47. 742 Users. One Bad Mapping.',
    titleDE: 'Freitag, 16:47 Uhr. 742 Benutzer. Ein kaputtes Mapping.',
    subtitle: 'A useful direct prompt vs. a reusable import method.',
    subtitleDE: 'Ein guter direkter Prompt gegen eine wiederverwendbare Import-Methode.',
    technique: 'CSV user import',
    techniqueDE: 'CSV-Benutzerimport',
    codeStandard: `Validate SD-18427 before the user import.

File: users_2026-08-28.csv
Target: Portal-Test
Rows: 742
Runbook: section 4

Do not overwrite existing identities.
Missing employee IDs are errors.
Use the documented dry-run.
Done when all 742 rows are explained and no unintended write appears.`,
    codeStandardDE: `Prüfe SD-18427 vor dem Benutzerimport.

Datei: users_2026-08-28.csv
Ziel: Portal-Test
Zeilen: 742
Runbook: Abschnitt 4

Bestehende Identitäten nicht überschreiben.
Fehlende Personalnummern sind Fehler.
Den dokumentierten Dry-Run verwenden.
Fertig, wenn alle 742 Zeilen erklärt sind und kein unbeabsichtigter Schreibzugriff auftaucht.`,
    codeOptimized: `Build the L1 import contract from the current ticket, file, target-system docs and runbook.

Preserve identity.
Never invent IDs, mappings, commands or permissions.
Use only verification supported by current evidence.
Keep missing evidence UNKNOWN/BLOCKED.
Keep Verification separate from Done When.

Stop after the L1 contract. Do not import yet.`,
    codeOptimizedDE: `Baue aus aktuellem Ticket, Importdatei, Zielsystem-Doku und Runbook den L1-Auftrag.

Identitäten erhalten.
Keine IDs, Mappings, Befehle oder Berechtigungen erfinden.
Nur belegte Prüfwege verwenden.
Fehlende Evidenz bleibt UNKNOWN/BLOCKED.
Prüfung und Fertig-wenn trennen.

Nach dem L1-Auftrag stoppen. Noch nichts importieren.`,
    codeWorkOrder: `Goal: validate the 742-row import for SD-18427.
Context: users_2026-08-28.csv → Portal-Test; runbook section 4.
Constraints: no identity overwrite; no invented employee IDs.
Verification: documented dry-run + 742/742 row reconciliation.
Done When: every row explained; zero unintended writes.
Blocked: unresolved required mapping or permission.`,
    codeWorkOrderDE: `Ziel: Import mit 742 Zeilen für SD-18427 prüfen.
Kontext: users_2026-08-28.csv → Portal-Test; Runbook Abschnitt 4.
Grenzen: keine Identität überschreiben; keine Personalnummer erfinden.
Prüfung: dokumentierter Dry-Run + 742/742 Zeilen abgleichen.
Fertig, wenn: jede Zeile erklärt ist; 0 unbeabsichtigte Schreibzugriffe.
BLOCKED: notwendiges Mapping oder Berechtigung fehlt.`,
    content: 'Same quality bar. The case-specific details moved out of the reusable method.',
    contentDE: 'Gleicher Qualitätsmaßstab. Die Falldaten sind aus der wiederverwendbaren Methode verschwunden.',
  },
  {
    id: 6,
    type: SlideType.COMPARISON,
    icon: 'TicketCheck',
    title: '“VPN Works” Is Not Evidence',
    titleDE: '„VPN geht“ ist kein Nachweis',
    subtitle: 'Acceptance criteria tell you what must be true. Evidence tells you whether it is true.',
    subtitleDE: 'Abnahmekriterien sagen, was stimmen muss. Evidenz sagt, ob es wirklich stimmt.',
    technique: 'VPN support ticket',
    techniqueDE: 'VPN-Supportticket',
    codeStandard: `Check whether the VPN ticket can be closed:
- login works
- MFA works
- internal DNS works
- file share is reachable`,
    codeStandardDE: `Prüf, ob das VPN-Ticket geschlossen werden kann:
- Anmeldung geht
- MFA geht
- internes DNS geht
- Fileshare erreichbar`,
    codeOptimized: `Treat the ticket checklist as requirements, never as proof.

For each criterion record:
probe → observed result → evidence state.

VERIFIED only with observed evidence.
Missing result = UNKNOWN.
Required probe unavailable = BLOCKED.

Close only when the required observed results satisfy Done When.`,
    codeOptimizedDE: `Behandle die Ticket-Checkliste als Anforderungen, niemals als Beweis.

Pro Kriterium festhalten:
Probe → beobachtetes Ergebnis → Evidenzzustand.

VERIFIED nur mit beobachtetem Nachweis.
Ergebnis fehlt = UNKNOWN.
Notwendige Probe nicht möglich = BLOCKED.

Ticket erst schließen, wenn die beobachteten Ergebnisse Done When erfüllen.`,
    content: 'The checklist is intent. The probe result is reality.',
    contentDE: 'Die Checkliste ist Absicht. Das Ergebnis der Probe ist Realität.',
  },
  {
    id: 7,
    type: SlideType.CONTENT,
    visual: 'authority-map',
    icon: 'FileLock2',
    title: 'Context Is Not Permission',
    titleDE: 'Kontext ist keine Erlaubnis',
    subtitle: 'A file may be essential for understanding and still completely outside edit scope.',
    subtitleDE: 'Eine Datei kann fürs Verstehen zwingend nötig sein und trotzdem außerhalb des Änderungsumfangs liegen.',
    content: [
      'Relevance answers “should I inspect this?” Authority answers “may I change this?”',
      'If the fix points outside approved scope, report the missing decision instead of silently widening scope.',
    ],
    contentDE: [
      'Relevanz beantwortet „muss ich das ansehen?“. Befugnis beantwortet „darf ich das ändern?“.',
      'Zeigt die Lösung aus dem freigegebenen Scope heraus, fehlt eine Entscheidung. Nicht heimlich den Scope erweitern.',
    ],
  },
  {
    id: 8,
    type: SlideType.CONTENT,
    visual: 'evidence-board',
    icon: 'BadgeCheck',
    title: 'Give Uncertainty a Name',
    titleDE: 'Unsicherheit braucht einen Namen',
    subtitle: 'Otherwise “probably” has a nasty habit of turning into “fact” two messages later.',
    subtitleDE: 'Sonst wird aus „wahrscheinlich“ zwei Nachrichten später erstaunlich zuverlässig ein „Fakt“.',
    content: 'Confidence is not a seventh evidence state.',
    contentDE: 'Selbstsicherheit ist kein siebter Evidenzzustand.',
  },
  {
    id: 9,
    type: SlideType.COMPARISON,
    icon: 'SearchCheck',
    title: 'Don’t Order Three Findings',
    titleDE: 'Bestell keine drei Fehler',
    subtitle: 'Ask for three serious attempts to break the plan instead.',
    subtitleDE: 'Verlange drei ernsthafte Versuche, den Plan zu widerlegen.',
    technique: 'Change review',
    techniqueDE: 'Change-Review',
    codeStandard: `Review this change plan and list the three biggest risks.`,
    codeStandardDE: `Prüf diesen Change-Plan und nenn mir die drei größten Risiken.`,
    codeOptimized: `Try at least three distinct serious ways to falsify the plan.

For each attempt:
hypothesis → trigger → confirming/disproving evidence → smallest useful probe.

A disproved hypothesis is a successful review attempt.
CLEAN is valid.
Do not manufacture a finding to fill the list.`,
    codeOptimizedDE: `Versuche den Plan auf mindestens drei unterschiedliche ernsthafte Arten zu widerlegen.

Pro Versuch:
Hypothese → Trigger → bestätigende/widerlegende Evidenz → kleinste sinnvolle Probe.

Eine widerlegte Hypothese ist ein erfolgreicher Review-Versuch.
CLEAN ist erlaubt.
Keinen Fund erfinden, nur damit die Liste voll ist.`,
    content: 'The floor belongs to the investigation effort, not to the number of defects reality is required to provide.',
    contentDE: 'Die Untergrenze gehört zur Prüfleistung, nicht zur Anzahl der Fehler, die die Realität gefälligst liefern soll.',
  },
  {
    id: 10,
    type: SlideType.CONTENT,
    visual: 'agent-loop',
    icon: 'Bot',
    title: 'Auto-Agent Without Self-Approval',
    titleDE: 'Auto-Agent ohne Selbstfreigabe',
    subtitle: 'Continue inside authority. Stop at real decisions.',
    subtitleDE: 'Innerhalb der Freigabe weiterarbeiten. An echten Entscheidungen stoppen.',
    content: [
      'After each slice: run the cheapest meaningful check, then continue if evidence and authority still hold.',
      'Owner, security, accepted-risk, destructive and irreversible decisions are never satisfied by self-confirmation.',
    ],
    contentDE: [
      'Nach jedem Slice: billigste sinnvolle Prüfung, dann automatisch weiter, solange Evidenz und Befugnis noch tragen.',
      'Owner-, Security-, Risiko-, destruktive und irreversible Entscheidungen niemals selbst bestätigen.',
    ],
  },
  {
    id: 11,
    type: SlideType.CONTENT,
    visual: 'toolbox',
    icon: 'Library',
    title: 'Use a Small Toolbox, Not One Mega-Prompt',
    titleDE: 'Kleine Toolbox statt Mega-Prompt',
    subtitle: 'Pick the method that changes how the task should be approached.',
    subtitleDE: 'Nimm nur die Methode, die für diese Aufgabe wirklich etwas am Vorgehen ändert.',
    content: 'These are real recipe shapes from the current agent-recall-compiler catalog, not regex scores pretending to understand prompts.',
    contentDE: 'Das sind echte Rezeptformen aus dem aktuellen agent-recall-compiler – keine Regex-Punkte, die so tun, als würden sie Prompt-Qualität verstehen.',
  },
  {
    id: 12,
    type: SlideType.END,
    visual: 'library',
    icon: 'Boxes',
    title: 'The Goal Is Better Work, Not Better-Looking Prompts',
    titleDE: 'Das Ziel ist bessere Arbeit, nicht hübschere Prompts',
    subtitle: 'Use the smallest prompt technique that buys real reliability.',
    subtitleDE: 'Nimm die kleinste Prompt-Technik, die tatsächlich mehr Verlässlichkeit bringt.',
    content: [
      'One-off: direct prompt.',
      'Recurring: reusable construction method.',
      'Consequential: explicit evidence, verification and authority.',
    ],
    contentDE: [
      'Einmalig: direkter Prompt.',
      'Wiederkehrend: wiederverwendbare Bauanleitung.',
      'Kritisch: Evidenz, Prüfung und Befugnis explizit machen.',
    ],
  },
];
