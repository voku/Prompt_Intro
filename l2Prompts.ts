export interface L2ToolboxPrompt {
  id: string;
  sourceRecipe: string;
  category: string;
  title: string;
  prompt: string;
  categoryDE: string;
  categoryEN: string;
  titleDE: string;
  titleEN: string;
  descriptionDE: string;
  descriptionEN: string;
  promptDE: string;
  promptEN: string;
}

export const L2_TOOLBOX_PROMPTS: L2ToolboxPrompt[] = [
  {
    id: 'import-discovery',
    sourceRecipe: 'discovery-first',
    category: 'IMPORT',
    title: 'CSV-Import erst verstehen',
    prompt: `Erzeuge aus dem aktuellen Import-Ticket, der CSV-Datei, der Zielsystem-Dokumentation und dem vorhandenen Runbook einen konkreten L1-Auftrag für die Prüfung des Imports.

Der L1-Auftrag muss enthalten:
- Ziel: Welches beobachtbare Importergebnis wird erwartet?
- Kontext: Welche Datei, welches Zielsystem, welches Mapping und welcher Ist-Zustand sind tatsächlich belegt?
- Grenzen: Bestehende Identitäten nicht überschreiben. Fehlende IDs, Mappings, Befehle oder Berechtigungen nicht erfinden.
- Prüfung: Nur Dry-Runs, Proben oder Befehle verwenden, die aus dem aktuellen Material belegt sind.
- Fertig, wenn: Jede Eingabezeile ist erklärt und unbeabsichtigte Schreibzugriffe sind ausgeschlossen.

Trenne VERIFIED, INFERRED, UNKNOWN, BLOCKED und CONTRADICTED sichtbar voneinander.

Wenn eine notwendige Information fehlt, benenne genau den fehlenden Beleg statt eine plausible Annahme einzusetzen.

Stoppe nach dem L1-Auftrag. Noch nichts importieren oder verändern.`,
    categoryDE: 'IMPORT',
    categoryEN: 'IMPORT',
    titleDE: 'CSV-Import erst verstehen',
    titleEN: 'Understand the CSV import first',
    descriptionDE: 'Aus Ticket, CSV, Zielsystem und Runbook erst einen belastbaren Prüfauftrag bauen. Noch nichts importieren.',
    descriptionEN: 'Build a grounded verification contract from ticket, CSV, target system and runbook before importing anything.',
    promptDE: `Erzeuge aus dem aktuellen Import-Ticket, der CSV-Datei, der Zielsystem-Dokumentation und dem vorhandenen Runbook einen konkreten L1-Auftrag für die Prüfung des Imports.

Der L1-Auftrag muss enthalten:
- Ziel: Welches beobachtbare Importergebnis wird erwartet?
- Kontext: Welche Datei, welches Zielsystem, welches Mapping und welcher Ist-Zustand sind tatsächlich belegt?
- Grenzen: Bestehende Identitäten nicht überschreiben. Fehlende IDs, Mappings, Befehle oder Berechtigungen nicht erfinden.
- Prüfung: Nur Dry-Runs, Proben oder Befehle verwenden, die aus dem aktuellen Material belegt sind.
- Fertig, wenn: Jede Eingabezeile ist erklärt und unbeabsichtigte Schreibzugriffe sind ausgeschlossen.

Trenne VERIFIED, INFERRED, UNKNOWN, BLOCKED und CONTRADICTED sichtbar voneinander.

Wenn eine notwendige Information fehlt, benenne genau den fehlenden Beleg statt eine plausible Annahme einzusetzen.

Stoppe nach dem L1-Auftrag. Noch nichts importieren oder verändern.`,
    promptEN: `Create a concrete L1 contract for validating the import from the current import ticket, CSV file, target-system documentation and available runbook.

The L1 contract must contain Goal, Context, Constraints, Verification and Done When. Derive exact files, mappings, systems and supported probes from current evidence. Never invent missing IDs, mappings, commands or permissions. Keep VERIFIED, INFERRED, UNKNOWN, BLOCKED and CONTRADICTED distinct.

Stop after producing the L1 contract. Do not import or change anything yet.`,
  },
  {
    id: 'vpn-reproduce',
    sourceRecipe: 'reproduce-before-fix',
    category: 'SUPPORT',
    title: 'VPN-Fehler erst reproduzieren',
    prompt: `Erzeuge aus dem aktuellen VPN-Ticket, den vorhandenen Client-Logs, dem VPN-Profil und den freigegebenen Diagnosemöglichkeiten einen konkreten L1-Auftrag zur Reproduktion des Fehlers.

Der Auftrag soll die Verbindung in beobachtbare Schritte zerlegen, zum Beispiel:
Client → Namensauflösung → Gateway → Authentifizierung → MFA → interne Ressource.

Für jeden relevanten Schritt festhalten:
- erwartetes Verhalten,
- kleinste sinnvolle Probe,
- beobachtetes Ergebnis,
- Evidenzzustand.

Produktive Einstellungen noch nicht ändern.

Wenn der Fehler nicht reproduziert werden kann, ist das ein gültiges Ergebnis: dokumentiere die ausgeführten Proben und lasse die Fehlerursache UNKNOWN statt eine Erklärung zu erfinden.

Stoppe nach dem Reproduktionsauftrag.`,
    categoryDE: 'SUPPORT',
    categoryEN: 'SUPPORT',
    titleDE: 'VPN-Fehler erst reproduzieren',
    titleEN: 'Reproduce the VPN failure first',
    descriptionDE: 'Nicht gleich Profil, MFA oder Firewall anfassen. Erst beweisen, welcher Schritt wirklich scheitert.',
    descriptionEN: 'Do not touch profile, MFA or firewall first. Prove which step actually fails.',
    promptDE: `Erzeuge aus dem aktuellen VPN-Ticket, den vorhandenen Client-Logs, dem VPN-Profil und den freigegebenen Diagnosemöglichkeiten einen konkreten L1-Auftrag zur Reproduktion des Fehlers.

Der Auftrag soll die Verbindung in beobachtbare Schritte zerlegen, zum Beispiel:
Client → Namensauflösung → Gateway → Authentifizierung → MFA → interne Ressource.

Für jeden relevanten Schritt festhalten:
- erwartetes Verhalten,
- kleinste sinnvolle Probe,
- beobachtetes Ergebnis,
- Evidenzzustand.

Produktive Einstellungen noch nicht ändern.

Wenn der Fehler nicht reproduziert werden kann, ist das ein gültiges Ergebnis: dokumentiere die ausgeführten Proben und lasse die Fehlerursache UNKNOWN statt eine Erklärung zu erfinden.

Stoppe nach dem Reproduktionsauftrag.`,
    promptEN: `Create a concrete L1 reproduction contract from the current VPN ticket, available client logs, VPN profile and approved diagnostic capabilities. Break the connection into observable steps and define the smallest useful probe for each relevant step. Do not change production settings yet. If the failure cannot be reproduced, preserve the cause as UNKNOWN and record the attempted probes instead of inventing an explanation. Stop after the reproduction contract.`,
  },
  {
    id: 'change-review',
    sourceRecipe: 'adversarial-review',
    category: 'CHANGE',
    title: 'Den 18-Uhr-Change wirklich angreifen',
    prompt: `Erzeuge für den aktuellen Production-Change einen konkreten L1-Review-Auftrag.

Behandle den Change-Plan als ersten Entwurf, nicht als Wahrheit und auch nicht als automatisch fehlerhaft.

Verlange mindestens drei unterschiedliche ernsthafte Falsifikationsversuche. Pro Versuch:
- Hypothese / möglicher Fehlerzustand,
- konkretes Trigger-Szenario,
- Evidenz, die den Verdacht bestätigt oder widerlegt,
- kleinste sinnvolle Probe vor dem Change.

Berücksichtige nur Risiken, die aus aktuellem Scope, betroffenen Systemen, Abhängigkeiten, Rollback-Weg und vorhandener Evidenz plausibel werden.

Eine widerlegte Hypothese ist ein erfolgreicher Review-Versuch, kein Fund.
CLEAN ist ein gültiges Ergebnis.
Keine Risiken erfinden, nur damit eine Liste voll wird.

Stoppe nach dem Review-Auftrag.`,
    categoryDE: 'CHANGE',
    categoryEN: 'CHANGE',
    titleDE: 'Den 18-Uhr-Change wirklich angreifen',
    titleEN: 'Actually attack the 18:00 change',
    descriptionDE: 'Keine bestellten „drei Risiken“. Drei ernsthafte Versuche, den Plan vor Production zu widerlegen.',
    descriptionEN: 'No ordered “three risks”. Make three serious attempts to falsify the plan before production.',
    promptDE: `Erzeuge für den aktuellen Production-Change einen konkreten L1-Review-Auftrag.

Behandle den Change-Plan als ersten Entwurf, nicht als Wahrheit und auch nicht als automatisch fehlerhaft.

Verlange mindestens drei unterschiedliche ernsthafte Falsifikationsversuche. Pro Versuch:
- Hypothese / möglicher Fehlerzustand,
- konkretes Trigger-Szenario,
- Evidenz, die den Verdacht bestätigt oder widerlegt,
- kleinste sinnvolle Probe vor dem Change.

Berücksichtige nur Risiken, die aus aktuellem Scope, betroffenen Systemen, Abhängigkeiten, Rollback-Weg und vorhandener Evidenz plausibel werden.

Eine widerlegte Hypothese ist ein erfolgreicher Review-Versuch, kein Fund.
CLEAN ist ein gültiges Ergebnis.
Keine Risiken erfinden, nur damit eine Liste voll wird.

Stoppe nach dem Review-Auftrag.`,
    promptEN: `Create a concrete L1 review contract for the current production change. Require at least three distinct serious falsification attempts grounded in current scope, affected systems, dependencies, rollback path and available evidence. For each attempt require a hypothesis, exact trigger, confirming/disproving evidence and the smallest useful pre-change probe. A disproved hypothesis is a successful review attempt. CLEAN is valid. Do not invent findings to fill a list. Stop after the review contract.`,
  },
  {
    id: 'incident-missingness',
    sourceRecipe: 'missingness-audit',
    category: 'STÖRUNG',
    title: 'Was fehlt uns vor der Behebung?',
    prompt: `Erzeuge aus dem aktuellen Störungsticket, den Logs, der betroffenen Konfiguration und dem vorhandenen Betriebswissen einen L1-Auftrag für einen Missingness-Check.

Prüfe nur dort, wo der konkrete Fall es relevant macht, ob uns etwas Notwendiges fehlt:
- Evidenz zur vermuteten Ursache,
- reproduzierbare Probe,
- Fehler- oder Negativpfad,
- Rollback / Recovery,
- Monitoring oder beobachtbares Erfolgssignal,
- notwendige Berechtigung oder Owner-Entscheidung.

Jede behauptete Lücke braucht einen konkreten Anker im aktuellen Fall.
Keine neue Wunschliste und keinen allgemeinen Best-Practice-Backlog erzeugen.

UNKNOWN bedeutet: Der Beleg fehlt.
BLOCKED bedeutet: Wir wissen, was wir brauchen, kommen aber aktuell nicht daran.

Stoppe nach dem L1-Auftrag. Noch keine Störung beheben.`,
    categoryDE: 'STÖRUNG',
    categoryEN: 'INCIDENT',
    titleDE: 'Was fehlt uns vor der Behebung?',
    titleEN: 'What is missing before remediation?',
    descriptionDE: 'Nicht sofort Lösungen sammeln. Erst prüfen, welche Evidenz, Rückfalloption oder Beobachtbarkeit für eine sichere Behebung fehlt.',
    descriptionEN: 'Do not collect fixes first. Identify missing evidence, recovery paths or observability needed for safe remediation.',
    promptDE: `Erzeuge aus dem aktuellen Störungsticket, den Logs, der betroffenen Konfiguration und dem vorhandenen Betriebswissen einen L1-Auftrag für einen Missingness-Check.

Prüfe nur dort, wo der konkrete Fall es relevant macht, ob uns etwas Notwendiges fehlt:
- Evidenz zur vermuteten Ursache,
- reproduzierbare Probe,
- Fehler- oder Negativpfad,
- Rollback / Recovery,
- Monitoring oder beobachtbares Erfolgssignal,
- notwendige Berechtigung oder Owner-Entscheidung.

Jede behauptete Lücke braucht einen konkreten Anker im aktuellen Fall.
Keine neue Wunschliste und keinen allgemeinen Best-Practice-Backlog erzeugen.

UNKNOWN bedeutet: Der Beleg fehlt.
BLOCKED bedeutet: Wir wissen, was wir brauchen, kommen aber aktuell nicht daran.

Stoppe nach dem L1-Auftrag. Noch keine Störung beheben.`,
    promptEN: `Create an L1 missingness-audit contract from the current incident ticket, logs, affected configuration and available operating knowledge. Only where the current case makes it relevant, identify missing causal evidence, reproduction, negative paths, rollback/recovery, observability, permissions or owner decisions. Every claimed gap needs a concrete anchor in the current case. Do not create a generic best-practice backlog. Stop before remediation.`,
  },
  {
    id: 'incident-plan',
    sourceRecipe: 'plan-as-draft',
    category: 'PLAN',
    title: 'Störungsplan als Entwurf behandeln',
    prompt: `Erzeuge aus dem vorhandenen Plan zur Störungsbehebung und der aktuellen Evidenz einen konkreten L1-Planungsauftrag.

Behandle den vorhandenen Plan als brauchbaren Entwurf, nicht als fertige Wahrheit.

Prüfe gezielt:
- Stimmen Ursache und aktueller Ist-Zustand noch mit der Evidenz überein?
- Sind die Schritte in einer sicheren Reihenfolge?
- Bleiben Scope und Befugnisse erhalten?
- Gibt es pro kritischem Schritt eine beobachtbare Prüfung?
- Sind Negativpfad und Rollback dort geklärt, wo sie wirklich relevant sind?

Kennzeichne Änderungen am Plan als:
KEEP | STÄRKEN | ERGÄNZEN | AUSSERHALB_SCOPE

Nur evidenzgestützte Änderungen übernehmen. Keine zusätzlichen Aufgaben erfinden, nur um den Plan umfangreicher wirken zu lassen.

Wenn der Plan nach der Prüfung ausreicht, ist PLAN_SUFFICIENT ein gültiges Ergebnis.

Stoppe nach dem verbesserten L1-Plan.`,
    categoryDE: 'PLAN',
    categoryEN: 'PLAN',
    titleDE: 'Störungsplan als Entwurf behandeln',
    titleEN: 'Treat the incident plan as a draft',
    descriptionDE: 'Einen plausiblen Plan nicht einfach abnicken. Gegen aktuellen Zustand und echte Prüfwege härten.',
    descriptionEN: 'Do not rubber-stamp a plausible plan. Strengthen it against current state and real verification paths.',
    promptDE: `Erzeuge aus dem vorhandenen Plan zur Störungsbehebung und der aktuellen Evidenz einen konkreten L1-Planungsauftrag.

Behandle den vorhandenen Plan als brauchbaren Entwurf, nicht als fertige Wahrheit.

Prüfe gezielt:
- Stimmen Ursache und aktueller Ist-Zustand noch mit der Evidenz überein?
- Sind die Schritte in einer sicheren Reihenfolge?
- Bleiben Scope und Befugnisse erhalten?
- Gibt es pro kritischem Schritt eine beobachtbare Prüfung?
- Sind Negativpfad und Rollback dort geklärt, wo sie wirklich relevant sind?

Kennzeichne Änderungen am Plan als:
KEEP | STÄRKEN | ERGÄNZEN | AUSSERHALB_SCOPE

Nur evidenzgestützte Änderungen übernehmen. Keine zusätzlichen Aufgaben erfinden, nur um den Plan umfangreicher wirken zu lassen.

Wenn der Plan nach der Prüfung ausreicht, ist PLAN_SUFFICIENT ein gültiges Ergebnis.

Stoppe nach dem verbesserten L1-Plan.`,
    promptEN: `Create a concrete L1 planning contract from the current incident-remediation plan and current evidence. Treat the plan as a useful draft, not established truth. Check current-state evidence, ordering, scope/authority, executable verification, negative paths and rollback where relevant. Classify revisions as KEEP, STRENGTHEN, ADD or OUT_OF_SCOPE. Only make evidence-backed changes. PLAN_SUFFICIENT is valid. Stop after the improved plan.`,
  },
  {
    id: 'support-handoff',
    sourceRecipe: 'production-ready-handoff',
    category: 'ÜBERGABE',
    title: 'Schichtwechsel ohne Chat-Gedächtnis',
    prompt: `Erzeuge aus dem aktuellen Support-/Störungsfall einen eigenständigen L1-Übergabeauftrag für jemanden, der den bisherigen Chat nicht kennt.

Die Übergabe muss aus der aktuellen Evidenz rekonstruierbar sein und mindestens enthalten:
- Ziel und aktueller Scope,
- VERIFIED Ist-Zustand mit konkreten Quellen/Proben,
- bereits ausgeführte Schritte und deren beobachtete Ergebnisse,
- widerlegte Hypothesen, damit sie nicht ohne neue Evidenz erneut aufgemacht werden,
- UNKNOWN / BLOCKED / CONTRADICTED,
- bestehende Befugnisse und echte Entscheidungsgrenzen,
- kleinster sinnvoller nächster Schritt,
- dazugehörige Prüfung und Fertig-wenn-Kriterium.

Alte Chat-Annahmen nicht als Fakten übernehmen.
Keine Zugangsdaten, Secrets oder irrelevante Gesprächshistorie in die Übergabe kopieren.

Wenn eine notwendige Owner-/Security-/Risikoentscheidung fehlt, benenne sie als BLOCKED statt sie dem nächsten Bearbeiter still unterzuschieben.

Das Ergebnis ist ein kopierfertiger L1-Übergabeauftrag, keine Erfolgsmeldung.`,
    categoryDE: 'ÜBERGABE',
    categoryEN: 'HANDOFF',
    titleDE: 'Schichtwechsel ohne Chat-Gedächtnis',
    titleEN: 'Shift handoff without chat memory',
    descriptionDE: 'Der nächste Admin oder Agent bekommt nur belegten Stand, offene Lücken, Befugnisse und den nächsten sicheren Schritt.',
    descriptionEN: 'Give the next admin or agent only grounded state, open gaps, authority and the next safe step.',
    promptDE: `Erzeuge aus dem aktuellen Support-/Störungsfall einen eigenständigen L1-Übergabeauftrag für jemanden, der den bisherigen Chat nicht kennt.

Die Übergabe muss aus der aktuellen Evidenz rekonstruierbar sein und mindestens enthalten:
- Ziel und aktueller Scope,
- VERIFIED Ist-Zustand mit konkreten Quellen/Proben,
- bereits ausgeführte Schritte und deren beobachtete Ergebnisse,
- widerlegte Hypothesen, damit sie nicht ohne neue Evidenz erneut aufgemacht werden,
- UNKNOWN / BLOCKED / CONTRADICTED,
- bestehende Befugnisse und echte Entscheidungsgrenzen,
- kleinster sinnvoller nächster Schritt,
- dazugehörige Prüfung und Fertig-wenn-Kriterium.

Alte Chat-Annahmen nicht als Fakten übernehmen.
Keine Zugangsdaten, Secrets oder irrelevante Gesprächshistorie in die Übergabe kopieren.

Wenn eine notwendige Owner-/Security-/Risikoentscheidung fehlt, benenne sie als BLOCKED statt sie dem nächsten Bearbeiter still unterzuschieben.

Das Ergebnis ist ein kopierfertiger L1-Übergabeauftrag, keine Erfolgsmeldung.`,
    promptEN: `Create a self-contained L1 handoff contract for the current support/incident case for someone who has no access to the previous chat. Include grounded goal/scope, VERIFIED current state with evidence anchors, completed steps and observed results, disproved hypotheses, UNKNOWN/BLOCKED/CONTRADICTED items, current authority, real decision boundaries, the smallest useful next step, its verification and Done When. Do not copy secrets or irrelevant chat history. Missing owner/security/risk decisions remain BLOCKED. The result is a copy-ready handoff contract, not a success claim.`,
  },
];
