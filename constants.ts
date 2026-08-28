import { SlideData, SlideType } from './types';

export const SLIDES: SlideData[] = [
  {
    id: 1,
    type: SlideType.TITLE,
    icon: 'BrainCircuit',
    title: 'From Prompts to Reliable Methods',
    titleDE: 'Von Prompts zu belastbaren Methoden',
    subtitle: 'Part 2: turn good individual chats into repeatable IT work with explicit context, evidence and stopping conditions.',
    subtitleDE: 'Teil 2: Aus einzelnen guten Chats wird wiederholbare IT-Arbeit – mit klarem Kontext, sichtbarer Evidenz und echten Abbruchkriterien.',
  },
  {
    id: 2,
    type: SlideType.CONTENT,
    icon: 'RefreshCcw',
    title: 'Today’s Prompt Is Tomorrow’s Copy-Paste',
    titleDE: 'Der Prompt von heute ist morgen schon Copy & Paste',
    subtitle: 'The problem is not that a case-specific prompt is bad. The problem is mixing the current ticket with rules that should survive the next ticket.',
    subtitleDE: 'Ein Einzelfall-Prompt ist nicht schlecht. Schlecht wird es, wenn Falldaten und Qualitätsregeln so vermischt sind, dass wir beim nächsten Ticket alles wieder zusammensuchen.',
    content: [
      'A CSV import, a VPN ticket and an incident mail all contain facts that are valid only for this case.',
      'The reusable part is the quality bar: what may change, what counts as evidence, how the result is checked, and when the work is actually done.',
      'Copying the old prompt also copies stale dates, filenames, assumptions and permissions.',
      'A direct prompt is still the right tool for a small one-off task. Repeated or consequential work deserves a reusable construction method.',
    ],
    contentDE: [
      'CSV-Import, VPN-Ticket oder Störungsmeldung: Jeder Fall bringt eigene Dateien, IDs, Systeme, Benutzer und Randbedingungen mit.',
      'Wiederverwendbar ist etwas anderes: Was darf geändert werden? Was gilt als Beleg? Wie prüfen wir das Ergebnis? Wann ist wirklich Schluss?',
      'Wer den alten Prompt kopiert, kopiert gern auch alte Dateinamen, Annahmen, Berechtigungen und Abkürzungen mit. Genau so entstehen die interessanten Fehler.',
      'Für eine kleine Einmal-Aufgabe bleibt ein direkter Prompt völlig in Ordnung. Wiederkehrende oder kritische Arbeit bekommt eine wiederverwendbare Methode.',
    ],
  },
  {
    id: 3,
    type: SlideType.CONTENT,
    icon: 'Layers3',
    title: 'L2 Builds L1',
    titleDE: 'L2 baut den konkreten L1-Auftrag',
    subtitle: 'L2 is not a longer prompt. It is a reusable recipe for constructing the concrete prompt from current evidence.',
    subtitleDE: 'L2 ist kein längerer Prompt. L2 beschreibt, wie aus aktuellem Kontext ein konkreter, ausführbarer Auftrag entsteht.',
    content: [
      'L2 recipe: reusable construction method and quality bar. It does not hard-code today’s ticket, file or command.',
      'L1 contract: concrete instructions for the current case. Exact files, systems, checks and limits belong here.',
      'The L2 pass ends after constructing L1. It does not start implementing, importing, sending or changing anything.',
      'For a simple one-off request, skip L2 and use a direct prompt. L2 earns its cost when work repeats, matters, or must be handed over.',
      'Think of it as compiling a prompt instead of copy-pasting one.',
    ],
    contentDE: [
      'L2-Rezept: die wiederverwendbare Bauanleitung plus Qualitätsmaßstab. Kein Ticket von heute, kein Dateiname von heute, kein erfundener Befehl.',
      'L1-Auftrag: die konkrete Anweisung für genau diesen Fall. Hier stehen die echten Dateien, Systeme, Grenzen und Prüfungen.',
      'Der L2-Durchgang endet nach dem Bau des L1-Auftrags. Noch nichts importieren, verschicken, ändern oder freigeben.',
      'Für eine kleine Einmal-Frage sparen wir uns den Umweg. L2 lohnt sich, sobald Arbeit wiederkehrt, kritisch ist oder sauber übergeben werden muss.',
      'Praktisch ist das ein Compiler für Arbeitsaufträge statt Copy & Paste für Prompts.',
    ],
  },
  {
    id: 4,
    type: SlideType.CONTENT,
    icon: 'ListChecks',
    title: 'A Concrete L1 Contract Has Five Parts',
    titleDE: 'Ein konkreter L1-Auftrag hat fünf Teile',
    subtitle: 'Small enough to read, precise enough to verify.',
    subtitleDE: 'Klein genug zum Gegenlesen. Konkret genug, um später nicht über „sieht gut aus“ diskutieren zu müssen.',
    content: [
      'Goal — the observable outcome. Keep every measurable floor measurable.',
      'Context — exact current anchors: ticket, file, system, runbook, known state and relevant constraints.',
      'Constraints — what may not change, which shortcuts are forbidden, and where authority ends.',
      'Verification — the exact supported procedure that measures reality. Unknown commands stay UNKNOWN until discovered from evidence.',
      'Done When — the observed result that is sufficient to claim completion. Verification and Done When are deliberately different.',
    ],
    contentDE: [
      'Goal / Ziel – welches beobachtbare Ergebnis soll am Ende vorliegen? Zahlen und Mindestwerte bleiben Zahlen und Mindestwerte.',
      'Context / Kontext – die konkreten Anker dieses Falls: Ticket, Datei, Zielsystem, Runbook, Ist-Zustand und bekannte Abhängigkeiten.',
      'Constraints / Grenzen – was darf nicht geändert werden, welche Abkürzungen sind verboten und wo endet die eigene Befugnis?',
      'Verification / Prüfung – womit messen wir die Realität? Nur belegte Verfahren und Befehle. Was wir nicht kennen, bleibt UNKNOWN, bis wir es nachgeschlagen haben.',
      'Done When / Fertig, wenn – welches gemessene Ergebnis reicht für „fertig“? Die Messmethode und das Erfolgskriterium bleiben getrennt.',
    ],
  },
  {
    id: 5,
    type: SlideType.COMPARISON,
    icon: 'FileSpreadsheet',
    title: 'One CSV Import Prompt — or a Method for Every Import',
    titleDE: 'Ein Prompt für diesen CSV-Import – oder eine Methode für alle',
    subtitle: 'The direct prompt can be excellent. It simply expires with the case.',
    subtitleDE: 'Der direkte Prompt links ist gut. Er ist nur nach diesem Import verbraucht.',
    technique: 'User import from CSV',
    techniqueDE: 'Benutzerimport aus CSV',
    codeStandard: `Goal: validate the user import from users_2026-08-28.csv for ticket SD-18427.
Context: target system Portal-Test, 742 rows, mapping from import-runbook-v3.pdf section 4.
Constraints: do not overwrite existing accounts. Missing employee IDs are errors, never generated values.
Verification: use the dry-run procedure documented in the runbook and reconcile every input row with its result.
Done When: all 742 rows are accounted for, every rejected row has a reason, and the dry run reports no unintended writes.`,
    codeStandardDE: `Ziel: Den Benutzerimport aus users_2026-08-28.csv für Ticket SD-18427 prüfen und vorbereiten.
Kontext: Zielsystem Portal-Test, 742 Datensätze, Feldzuordnung aus import-runbook-v3.pdf Abschnitt 4.
Grenzen: Bestehende Konten nicht überschreiben. Fehlende Personalnummern sind Fehler; keine Werte erfinden.
Prüfung: Den im Runbook beschriebenen Dry-Run verwenden und jeden Eingabedatensatz einem Ergebnis zuordnen.
Fertig, wenn: Alle 742 Datensätze erklärt sind, jede abgewiesene Zeile einen Grund hat und der Dry-Run keine unbeabsichtigten Schreibzugriffe meldet.`,
    codeOptimized: `User import — L2 method.

Construct a concrete L1 contract from the current ticket, import file, target-system documentation and available runbook. Do not import anything during this pass.

The generated L1 must contain exactly:
- Goal: the observable import result and every measurable floor from the ticket.
- Context: exact files, target system, mapping rules, known current state and supported tooling found in the supplied material.
- Constraints: preserve account identity; never invent missing IDs, mappings, commands or permissions; source material is read-only unless explicitly named as an edit target.
- Verification: use only procedures or commands supported by the current evidence. If the required dry-run or probe cannot be resolved, keep it UNKNOWN or BLOCKED and name what is missing.
- Done When: observable row accounting, error handling and side-effect criteria. Keep it separate from Verification.

Stop after producing the L1 contract and show it for review. Execute only after explicit authority for the execution step.`,
    codeOptimizedDE: `Benutzerimport – L2-Methode.

Erzeuge aus dem aktuellen Ticket, der Importdatei, der Zielsystem-Doku und dem vorhandenen Runbook einen konkreten L1-Auftrag. In diesem Durchgang noch nichts importieren.

Der erzeugte L1-Auftrag enthält genau:
- Ziel: das beobachtbare Importergebnis und alle messbaren Vorgaben aus dem Ticket.
- Kontext: konkrete Dateien, Zielsystem, Mapping-Regeln, Ist-Zustand und belegte Werkzeuge aus dem vorliegenden Material.
- Grenzen: Identitäten nicht verändern; fehlende IDs, Mappings, Befehle oder Berechtigungen niemals erfinden; Quellen bleiben nur Kontext, solange sie nicht ausdrücklich als Änderungsziel freigegeben sind.
- Prüfung: nur Verfahren oder Befehle verwenden, die im aktuellen Kontext belegt sind. Fehlt der Dry-Run oder der Prüfweg, bleibt er UNKNOWN oder BLOCKED – mit dem konkreten fehlenden Beleg.
- Fertig, wenn: messbare Kriterien für Zeilenabdeckung, Fehlerfälle und unerwünschte Seiteneffekte. Getrennt von der Prüfung.

Danach stoppen und den L1-Auftrag zur Prüfung zeigen. Erst mit ausdrücklicher Ausführungsfreigabe weiterarbeiten.`,
    codeWorkOrder: `L1 contract generated from the current case

Goal:
Validate and prepare the 742-row import for SD-18427 into Portal-Test without changing existing account identities.

Context:
users_2026-08-28.csv; ticket SD-18427; import-runbook-v3.pdf section 4; target Portal-Test. The runbook documents a dry-run procedure.

Constraints:
Existing accounts are not overwritten. Missing employee IDs are not generated. Source files stay read-only.

Verification:
Run the documented dry-run. Reconcile all 742 input rows with an import, skip or error result. Review the dry-run side-effect summary.

Done When:
742/742 rows are accounted for; every skipped/error row has a concrete reason; no unintended write is reported; unresolved required mapping remains BLOCKED.

UNKNOWN / BLOCKED:
Any mapping or required permission that is not present in the supplied ticket/runbook remains explicit instead of being guessed.`,
    codeWorkOrderDE: `L1-Auftrag aus dem aktuellen Fall

Ziel:
Den Import mit 742 Datensätzen für SD-18427 nach Portal-Test prüfen und vorbereiten, ohne bestehende Konto-Identitäten zu verändern.

Kontext:
users_2026-08-28.csv; Ticket SD-18427; import-runbook-v3.pdf Abschnitt 4; Ziel Portal-Test. Das Runbook beschreibt einen Dry-Run.

Grenzen:
Bestehende Konten nicht überschreiben. Fehlende Personalnummern nicht erzeugen. Quelldateien bleiben unverändert.

Prüfung:
Den dokumentierten Dry-Run ausführen. Alle 742 Eingabezeilen einem Import-, Skip- oder Fehlerergebnis zuordnen. Die Side-Effect-Zusammenfassung des Dry-Runs prüfen.

Fertig, wenn:
742/742 Zeilen erklärt sind; jede Skip-/Fehlerzeile einen konkreten Grund hat; kein unbeabsichtigter Schreibzugriff gemeldet wird; notwendige, aber fehlende Mappings als BLOCKED sichtbar bleiben.

UNKNOWN / BLOCKED:
Nicht belegte Mappings oder benötigte Berechtigungen bleiben sichtbar. Nichts ergänzen, nur damit die Tabelle vollständig aussieht.`,
    content: 'The left prompt is already concrete and useful. The L2 method on the right keeps only the reusable construction rules and compiles today’s ticket and files into a fresh L1 contract.',
    contentDE: 'Links steckt der ganze Fall direkt im Prompt. Rechts bleibt nur die wiederverwendbare Bauanleitung. Ticket, Datei und Zielsystem landen erst im daraus erzeugten L1-Auftrag.',
  },
  {
    id: 6,
    type: SlideType.COMPARISON,
    icon: 'Gauge',
    title: 'Verification Is Not Done When',
    titleDE: 'Prüfen ist nicht dasselbe wie fertig sein',
    subtitle: 'One describes the measurement. The other describes the result that must come out of that measurement.',
    subtitleDE: 'Die eine Frage lautet: Wie messe ich? Die andere: Welches Messergebnis reicht für „fertig“?',
    technique: 'AD group change',
    techniqueDE: 'AD-Gruppenänderung',
    codeStandard: `Add the users from the ticket to the AD group and check afterwards that everything looks right. Close the ticket when it is okay.`,
    codeStandardDE: `Füge die Benutzer aus dem Ticket der AD-Gruppe hinzu. Prüf danach, ob alles passt, und schließ das Ticket, wenn es okay ist.`,
    codeOptimized: `AD group change — method.

First construct the L1 contract from the ticket, current group state and the approved operating procedure. Do not change AD yet.

Verification must describe the measurement procedure: resolve the exact target group, capture before/after membership, compare every requested user, inspect command/tool errors, and verify that no unrequested membership changed.

Done When must describe the acceptable observed result: every requested user has the expected membership, zero unrequested users changed, the operation produced no unresolved error, and the evidence needed by the ticket is attached.

If the supported command or required authority is missing, return UNKNOWN/BLOCKED. Do not replace verification with “looks plausible”.`,
    codeOptimizedDE: `AD-Gruppenänderung – Methode.

Erzeuge zuerst aus Ticket, aktuellem Gruppenstand und freigegebenem Betriebsweg den konkreten L1-Auftrag. Noch nichts im AD ändern.

Prüfung beschreibt den Messweg: exakte Zielgruppe auflösen, Mitgliedschaft vorher/nachher erfassen, jeden angeforderten Benutzer vergleichen, Tool-/Befehlsfehler prüfen und sicherstellen, dass keine nicht angeforderte Mitgliedschaft verändert wurde.

Fertig, wenn beschreibt das notwendige Messergebnis: Jeder angeforderte Benutzer hat die erwartete Mitgliedschaft, 0 zusätzliche Benutzer wurden verändert, es gibt keinen offenen Fehler und die für das Ticket nötige Evidenz ist vorhanden.

Fehlt der belegte Befehl oder die nötige Berechtigung: UNKNOWN/BLOCKED. Nicht durch „sieht plausibel aus“ ersetzen.`,
    content: '“I checked it” is a procedure claim. “The requested users changed and nobody else did” is an observed result. Mixing both makes failures impossible to state precisely.',
    contentDE: '„Ich habe geprüft“ beschreibt höchstens einen Vorgang. „Alle angeforderten Benutzer sind drin und niemand sonst wurde verändert“ beschreibt ein Ergebnis. Genau diese Trennung brauchen wir.',
  },
  {
    id: 7,
    type: SlideType.COMPARISON,
    icon: 'TicketCheck',
    title: 'Acceptance Criteria Are Not Evidence',
    titleDE: 'Eine Anforderung ist noch kein Nachweis',
    subtitle: 'A checkbox written in the ticket does not become true because the model can repeat it.',
    subtitleDE: 'Nur weil im Ticket ein Haken vorgesehen ist, ist die Sache noch lange nicht erledigt. Menschen haben das Prinzip übrigens ebenfalls perfektioniert.',
    technique: 'Support ticket sign-off',
    techniqueDE: 'Ticket-Abnahme',
    codeStandard: `Check the VPN ticket against these criteria: login works, MFA works, internal DNS resolves, file share is reachable. Then tell me whether the ticket can be closed.`,
    codeStandardDE: `Prüf das VPN-Ticket gegen diese Kriterien: Anmeldung funktioniert, MFA funktioniert, interne DNS-Auflösung funktioniert, Fileshare ist erreichbar. Sag mir danach, ob das Ticket geschlossen werden kann.`,
    codeOptimized: `Ticket sign-off — method.

Treat the criteria from the ticket as requirements, never as evidence that they are satisfied.

Construct the L1 check from the ticket and available test evidence. One row per criterion:
criterion | evidence/probe | observed result | state | remaining gap

A criterion is VERIFIED only when the supplied evidence or an authorized executed probe supports it. A missing result stays UNKNOWN. A required probe that cannot be run due to access or authority is BLOCKED.

Verification defines how each row is tested. Done When defines which set of VERIFIED rows is sufficient to close the ticket. Do not lower the closing rule merely because one probe is unavailable.`,
    codeOptimizedDE: `Ticket-Abnahme – Methode.

Behandle die Kriterien aus dem Ticket als Anforderungen. Niemals als Beleg dafür, dass sie bereits erfüllt sind.

Erzeuge aus Ticket und vorhandener Prüfevidenz einen konkreten L1-Check. Eine Zeile pro Kriterium:
Kriterium | Beleg/Probe | beobachtetes Ergebnis | Zustand | offene Lücke

VERIFIED gibt es nur mit passendem Beleg oder einer tatsächlich ausgeführten, autorisierten Probe. Fehlt das Ergebnis: UNKNOWN. Kann eine notwendige Probe wegen Zugriff oder Befugnis nicht laufen: BLOCKED.

Prüfung beschreibt, wie jede Zeile entschieden wird. Fertig, wenn beschreibt, welche VERIFIED-Ergebnisse zum Schließen des Tickets nötig sind. Die Abnahmebedingung nicht weichklopfen, nur weil eine Probe gerade unbequem ist.`,
    content: 'Writing “VPN works” in a checklist is intent. A successful probe is evidence. The distinction sounds obvious right up until a ticket is closed on the checklist alone.',
    contentDE: '„VPN funktioniert“ im Ticket ist die Forderung. Ein beobachteter erfolgreicher Test ist der Nachweis. Klingt banal – bis jemand den Haken mit der Evidenz verwechselt und das Ticket schließt.',
  },
  {
    id: 8,
    type: SlideType.COMPARISON,
    icon: 'FileLock2',
    title: 'Context Is Not Edit Permission',
    titleDE: 'Kontext ist keine Änderungserlaubnis',
    subtitle: 'A file can be essential for understanding the task and still be completely off limits for editing.',
    subtitleDE: 'Eine Datei kann für die Analyse zwingend nötig sein und trotzdem absolut nicht zum Änderungsumfang gehören.',
    technique: 'Incident investigation',
    techniqueDE: 'Störungsanalyse',
    codeStandard: `Attached are the incident ticket, nginx.conf, the deployment script and the latest logs. Find the cause and fix the problem.`,
    codeStandardDE: `Anbei Störungsticket, nginx.conf, Deployment-Skript und die aktuellen Logs. Finde die Ursache und behebe das Problem.`,
    codeOptimized: `Incident investigation — method.

Construct the L1 contract from the task and assign every relevant source an explicit role before proposing changes.

ticket             → requirement / incident scope
logs               → verification context, read only
nginx.conf          → configuration context; edit only if the approved task names it as a change candidate
deployment script  → dependency context; no edit permission merely because it is relevant
actual change file → implementation candidate only when supported by task authority

The generated L1 must keep understanding, verification and edit authority separate. If the evidence points to a file outside approved scope, report the owner/scope decision as BLOCKED instead of editing it silently.`,
    codeOptimizedDE: `Störungsanalyse – Methode.

Erzeuge den L1-Auftrag aus dem aktuellen Task und gib jeder relevanten Quelle zuerst eine klare Rolle.

Ticket             → Anforderung und Störungsumfang
Logs               → Prüfevidenz, nur lesen
nginx.conf          → Konfigurationskontext; nur ändern, wenn der freigegebene Task sie ausdrücklich als Änderungsziel enthält
Deployment-Skript  → Abhängigkeitskontext; Relevanz ist keine Schreibfreigabe
Änderungsdatei     → nur dann Änderungskandidat, wenn die Task-Befugnis das abdeckt

Der erzeugte L1-Auftrag trennt Verstehen, Prüfen und Ändern. Zeigt die Evidenz auf eine Datei außerhalb des freigegebenen Umfangs, wird die nötige Owner-/Scope-Entscheidung als BLOCKED benannt – nicht heimlich trotzdem editiert.`,
    content: '“The model needed the file to understand the incident” and “the model may change the file” are two completely different statements.',
    contentDE: '„Die Datei wird zum Verstehen gebraucht“ und „die Datei darf geändert werden“ sind zwei völlig verschiedene Aussagen. Kontext erweitert den Scope nicht automatisch.',
  },
  {
    id: 9,
    type: SlideType.CONTENT,
    icon: 'BadgeCheck',
    title: 'Evidence Beats Confidence',
    titleDE: 'Evidenz schlägt Selbstvertrauen',
    subtitle: 'The model needs vocabulary for uncertainty, otherwise plausible prose quietly turns into facts.',
    subtitleDE: 'Wenn Unsicherheit keinen Namen bekommt, wird aus einer Lücke erstaunlich schnell eine sehr selbstbewusst formulierte „Tatsache“.',
    content: [
      'VERIFIED — directly supported by authoritative evidence; name the anchor.',
      'INFERRED — derived from verified evidence; show the derivation.',
      'ASSUMED — a working assumption, visibly labelled and never silently promoted to fact.',
      'UNKNOWN — required evidence is absent or has not yet been established.',
      'BLOCKED — the required evidence, access or authority is known but currently unavailable.',
      'CONTRADICTED — authoritative sources disagree; show the conflict instead of averaging it away.',
      'Model confidence, reviewer agreement and an unexecuted command are none of the above.',
    ],
    contentDE: [
      'VERIFIED – durch belastbare Evidenz belegt. Fundstelle, Probe oder Artefakt nennen.',
      'INFERRED – aus VERIFIED-Fakten abgeleitet. Den Ableitungsschritt sichtbar machen.',
      'ASSUMED – Arbeitsannahme. Klar als Annahme markieren und nicht später still zum Fakt befördern.',
      'UNKNOWN – der nötige Beleg fehlt oder wurde noch nicht ermittelt.',
      'BLOCKED – wir wissen, welcher Beleg, Zugriff oder welche Befugnis fehlt, kommen aktuell aber nicht daran.',
      'CONTRADICTED – belastbare Quellen widersprechen sich. Konflikt zeigen, nicht wegmitteln.',
      'Selbstsicherheit, Zustimmung eines zweiten Modells und ein nur angekündigter Prüf-Befehl sind keine Evidenzzustände.',
    ],
  },
  {
    id: 10,
    type: SlideType.COMPARISON,
    icon: 'Fingerprint',
    title: 'Every Source Needs Provenance and a Role',
    titleDE: 'Jede Quelle braucht Herkunft und eine Rolle',
    subtitle: 'Ticket, monitoring, chat and an old status mail can all be relevant without being equally authoritative.',
    subtitleDE: 'Ticket, Monitoring, Teams-Chat und alte Statusmail können alle relevant sein. Gleich verlässlich sind sie deshalb noch lange nicht.',
    technique: 'Incident communication',
    techniqueDE: 'Störungskommunikation',
    codeStandard: `Use the ticket, monitoring screenshot, Teams chat and the previous incident mail to write the current status update.`,
    codeStandardDE: `Nimm Ticket, Monitoring-Screenshot, Teams-Chat und die letzte Störungsmail und schreib daraus das aktuelle Statusupdate.`,
    codeOptimized: `Incident communication — method.

Before drafting, construct the source map from the current material. For every source record:
WHAT | WHY | HOW | AUTHORITY | USE | STATE

Example semantics to derive from the actual case, not assume:
- monitoring may be authoritative for observed service state;
- the incident ticket may own scope and customer impact;
- chat may be context or a lead, not automatically a fact source;
- the previous mail may be style/template only, never current status.

The L1 draft may state VERIFIED facts and clearly marked INFERRED conclusions. UNKNOWN/BLOCKED items become explicit open points. CONTRADICTED sources are shown to the operator before communication. Never upgrade a source role because it produces the nicer answer.`,
    codeOptimizedDE: `Störungskommunikation – Methode.

Baue vor dem Schreiben zuerst eine Quellenkarte aus dem aktuellen Material. Pro Quelle:
WHAT | WHY | HOW | AUTHORITY | USE | STATE

Die Rollen werden aus dem konkreten Fall abgeleitet, nicht vorausgesetzt. Typische Beispiele:
- Monitoring kann für den beobachteten technischen Zustand maßgeblich sein.
- Das Störungsticket kann Scope und gemeldeten Impact tragen.
- Ein Teams-Chat kann Kontext oder Hinweis sein, aber nicht automatisch belastbarer Fakt.
- Die alte Statusmail kann Stilvorlage sein, aber niemals Quelle für den aktuellen Zustand.

Der konkrete L1-Entwurf darf VERIFIED-Fakten und klar markierte INFERRED-Aussagen verwenden. UNKNOWN/BLOCKED werden als offene Punkte sichtbar. CONTRADICTED landet vor dem Versand beim Verantwortlichen. Keine Quelle hochstufen, nur weil sie die angenehmere Antwort liefert.`,
    content: 'Relevant is not the same as authoritative. And authoritative for one fact does not mean writable or authoritative for every other fact.',
    contentDE: 'Relevant heißt nicht maßgeblich. Und eine Quelle kann für genau eine Aussage maßgeblich sein, ohne deshalb Schreibziel oder Universalwahrheit zu werden.',
  },
  {
    id: 11,
    type: SlideType.PLAYGROUND,
    icon: 'FlaskConical',
    title: 'Try It: Prompt, Rule Set or L2 Method?',
    titleDE: 'Ausprobieren: Prompt, Regelsatz oder L2-Methode?',
    subtitle: 'Local heuristic only. The score is not evidence; the interesting part is which construction properties are present or missing.',
    subtitleDE: 'Nur eine lokale Heuristik. Der Score ist kein Gütesiegel – interessant ist, welche Eigenschaften vorhanden sind und welche fehlen.',
  },
  {
    id: 12,
    type: SlideType.COMPARISON,
    icon: 'SearchCheck',
    title: 'Adversarial Review Needs Attempts, Not a Finding Quota',
    titleDE: 'Blind-Spot-Review braucht Angriffsversuche, keine Fundquote',
    subtitle: 'If you demand exactly three problems, the model will eventually discover that your quota is the real requirement.',
    subtitleDE: 'Wer genau drei Fehler bestellt, bekommt irgendwann drei Fehler. Notfalls wird der dritte eben aus Höflichkeit erfunden.',
    technique: 'Change-plan review',
    techniqueDE: 'Change-Plan gegenprüfen',
    codeStandard: `Review this change plan and list the three biggest risks before we execute it.`,
    codeStandardDE: `Prüf diesen Change-Plan und nenn mir die drei größten Risiken, bevor wir ihn ausführen.`,
    codeOptimized: `Adversarial review — method.

Treat the current plan as a first draft, not as truth and not as guilty until proven innocent.

Construct the review from the actual change scope, affected systems, rollback/recovery path, current evidence and available validation.

Require at least three distinct serious falsification attempts. For each attempt:
- hypothesis / failure mode
- exact trigger scenario
- evidence that would confirm or disprove it
- observed evidence state
- smallest discriminating probe when evidence is missing

A disproved hypothesis is a successful review attempt, not a defect. CLEAN is valid after the required serious probes. Do not manufacture a third finding and do not lower the test bar to make the plan look safe.`,
    codeOptimizedDE: `Blind-Spot-Review – Methode.

Behandle den aktuellen Change-Plan als ersten Entwurf: weder als Wahrheit noch als automatisch verdächtig.

Erzeuge den Review-Auftrag aus tatsächlichem Scope, betroffenen Systemen, Rollback-/Recovery-Weg, aktueller Evidenz und verfügbaren Prüfungen.

Mindestens drei unterschiedliche ernsthafte Falsifikationsversuche. Pro Versuch:
- Hypothese / möglicher Fehlerzustand
- konkretes Trigger-Szenario
- Evidenz, die den Verdacht bestätigt oder widerlegt
- beobachteter Evidenzzustand
- kleinste trennscharfe Probe, falls Evidenz fehlt

Eine widerlegte Hypothese ist ein erfolgreicher Review-Versuch – kein Defekt. CLEAN ist nach den geforderten ernsthaften Proben ein gültiges Ergebnis. Keinen dritten Fund erfinden und die Messlatte nicht senken, damit der Plan gut aussieht.`,
    content: 'The numeric floor belongs to the investigation effort, not to the number of defects the universe is required to contain.',
    contentDE: 'Die Untergrenze gehört zur Prüfleistung, nicht zur Anzahl der Fehler, die das Universum gefälligst bereitzustellen hat.',
  },
  {
    id: 13,
    type: SlideType.CONTENT,
    icon: 'Bot',
    title: 'Automatic Continuation Is Not Self-Approval',
    titleDE: 'Auto-Agent heißt weiterarbeiten – nicht sich selbst freigeben',
    subtitle: 'A good agent continues across authorized work. It stops at real authority boundaries instead of asking after every harmless step or silently crossing them.',
    subtitleDE: 'Ein guter Agent arbeitet innerhalb seiner Freigabe selbstständig weiter. Er fragt nicht nach jedem ungefährlichen Schritt – und überschreitet echte Entscheidungsgrenzen trotzdem nicht.',
    content: [
      'Split multi-step work into bounded slices: objective, dependencies, expected artifact/change, validation checkpoint.',
      'After each slice run the cheapest meaningful validation and perform an internal continuation check against current authority and evidence.',
      'A blocker stops the affected slice and its dependants, not every independent safe task around it.',
      'Human, owner, security, accepted-risk, destructive or irreversible decisions are never satisfied by self-confirmation. Return HUMAN_DECISION_REQUIRED / BLOCKED with the exact decision.',
      'When validation is already red, distinguish PRE_EXISTING, INTRODUCED and UNKNOWN_ORIGIN where evidence allows it.',
      'Before claiming DONE, reconcile the claim with real artifacts: current diff/state, changed files, executed validation, review findings and remaining blockers.',
    ],
    contentDE: [
      'Mehrstufige Arbeit zuerst in begrenzte Slices zerlegen: Ziel, Abhängigkeiten, erwartete Änderung/Artefakt und Prüfpunkt.',
      'Nach jedem Slice die billigste sinnvolle Prüfung ausführen und intern gegen aktuelle Befugnis, Evidenz und verbleibende Abhängigkeiten prüfen: Darf und kann ich sinnvoll weiter?',
      'Ein Blocker stoppt den betroffenen Slice und seine echten Abhängigkeiten – nicht automatisch jede unabhängige sichere Restarbeit.',
      'Owner-, Security-, Risiko-, destruktive oder irreversible Entscheidungen niemals selbst bestätigen. HUMAN_DECISION_REQUIRED / BLOCKED plus die konkrete fehlende Entscheidung.',
      'Ist eine Prüfung schon vorher rot, nach Möglichkeit PRE_EXISTING, INTRODUCED oder UNKNOWN_ORIGIN unterscheiden statt reflexhaft Schuld zu verteilen.',
      'Vor DONE die eigene Erfolgsmeldung gegen echte Artefakte halten: aktueller Stand/Diff, geänderte Dateien, ausgeführte Prüfungen, Review-Funde und offene Blocker. Prosa verliert gegen Evidenz.',
    ],
  },
  {
    id: 14,
    type: SlideType.END,
    icon: 'Library',
    title: 'Build a Small Library of Proven Methods',
    titleDE: 'Baut euch eine kleine Bibliothek guter Methoden',
    subtitle: 'Not every chat deserves a framework. Repeated and consequential work deserves a method that keeps earning its place.',
    subtitleDE: 'Nicht jeder Chat braucht ein Framework. Aber wiederkehrende und kritische Arbeit verdient eine Methode, die ihren Nutzen immer wieder beweisen muss.',
    content: [
      'Use direct prompts for simple one-off work. Use L2 recipes when the construction method itself is reusable.',
      'Compile L2 into a concrete L1 contract from current evidence: Goal, Context, Constraints, Verification, Done When.',
      'Keep missing evidence visible as UNKNOWN/BLOCKED; do not turn confidence into facts.',
      'Keep context, authority and edit permission separate.',
      'Use adversarial review, reproduce-before-fix, discovery-first, evidence-report and continue-until-done where the task actually benefits from them.',
      'Record whether a method was applied and helpful. Selection is not proof of usefulness.',
    ],
    contentDE: [
      'Direkter Prompt für die kleine Einmal-Aufgabe. L2-Rezept dort, wo die Bauanleitung selbst wiederverwendbar ist.',
      'L2 aus aktueller Evidenz in einen konkreten L1-Auftrag übersetzen: Ziel, Kontext, Grenzen, Prüfung, Fertig-wenn.',
      'Fehlende Evidenz als UNKNOWN/BLOCKED sichtbar lassen. Selbstsicherheit nicht als Fakt verkleiden.',
      'Kontext, fachliche Autorität und Änderungserlaubnis auseinanderhalten.',
      'Je nach Aufgabe gezielt Methoden wie Discovery First, Reproduce Before Fix, Adversarial Review, Evidence Report oder Continue Until Done einsetzen – nicht alle gleichzeitig, nur weil die Liste hübsch aussieht.',
      'Nach dem Einsatz festhalten, ob die Methode wirklich angewendet wurde und geholfen hat. Ausgewählt wurde sie schnell; nützlich muss sie sich erst noch erweisen.',
    ],
  },
];
