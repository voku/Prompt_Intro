export type L2ToolIcon = 'wifi' | 'harddrive' | 'handoff';

export interface L2WorkOrderLine {
  label: string;
  text: string;
}

export interface L2ToolText {
  category: string;
  title: string;
  when: string;
  quickFix: string;
  recipe: string[];
  caseFacts: string[];
  workOrder: L2WorkOrderLine[];
  prompt: string;
}

export interface L2ToolboxPrompt {
  id: string;
  icon: L2ToolIcon;
  de: L2ToolText;
  en: L2ToolText;
}

export const L2_TOOLBOX_PROMPTS: L2ToolboxPrompt[] = [
  {
    id: 'vpn-reproduce',
    icon: 'wifi',
    de: {
      category: 'SUPPORT',
      title: 'Erst nachstellen, dann reparieren',
      when: 'Ein Fehler ist gemeldet, aber noch niemand hat gesehen, wo genau er entsteht.',
      quickFix: '„Wir rollen das VPN-Profil einfach neu aus.“',
      recipe: [
        'Den Ablauf in einzelne, prüfbare Schritte zerlegen.',
        'Pro Schritt den kleinsten sinnvollen Test festlegen.',
        'Nicht nachstellbar? Dann bleibt die Ursache UNKNOWN.',
      ],
      caseFacts: [
        'Ticket #4711: VPN bricht nach ca. 2 Min. ab',
        'Nur im Homeoffice, im Büro alles ok',
        'Client-Log vom Laptop liegt vor',
      ],
      workOrder: [
        { label: 'Ziel', text: 'Herausfinden, an welchem Schritt die Verbindung abbricht.' },
        { label: 'Kontext', text: '#4711 · Abbruch nach ca. 2 Min. · nur im Homeoffice · Client-Log vorhanden.' },
        { label: 'Grenzen', text: 'Keine Änderung an VPN-Gateway oder Profil.' },
        { label: 'Prüfung', text: 'DNS → Gateway → Anmeldung → MFA → Dateiserver einzeln testen.' },
        { label: 'Erledigt, wenn', text: 'Der fehlerhafte Schritt belegt ist – oder alle Tests grün sind und die Ursache offen (UNKNOWN) bleibt.' },
      ],
      prompt: `Erstelle aus dem aktuellen Ticket, den vorhandenen Logs und den freigegebenen Diagnosemöglichkeiten einen konkreten Arbeitsauftrag, um den Fehler nachzustellen.

Zerlege den Ablauf in einzelne, beobachtbare Schritte (z. B. Client → Namensauflösung → Gateway → Anmeldung → MFA → Zielsystem).

Halte für jeden relevanten Schritt fest:
- was passieren sollte,
- den kleinsten sinnvollen Test,
- was tatsächlich passiert ist,
- wie gut das belegt ist (VERIFIED / UNKNOWN / BLOCKED).

Ändere noch keine produktiven Einstellungen.

Lässt sich der Fehler nicht nachstellen, ist das ein gültiges Ergebnis: Dokumentiere die durchgeführten Tests und lass die Ursache UNKNOWN, statt eine Erklärung zu erfinden.

Hör nach dem Arbeitsauftrag auf.`,
    },
    en: {
      category: 'SUPPORT',
      title: 'Reproduce first, then fix',
      when: 'A failure was reported, but nobody has seen yet where exactly it happens.',
      quickFix: '“Let’s just redeploy the VPN profile.”',
      recipe: [
        'Break the flow into separate, testable steps.',
        'Define the smallest useful test for each step.',
        'Cannot reproduce? Then the cause stays UNKNOWN.',
      ],
      caseFacts: [
        'Ticket #4711: VPN drops after ~2 min',
        'Only when working from home',
        'Client log from the laptop is available',
      ],
      workOrder: [
        { label: 'Goal', text: 'Find out at which step the connection drops.' },
        { label: 'Context', text: '#4711 · drops after ~2 min · home office only · client log available.' },
        { label: 'Constraints', text: 'No changes to VPN gateway or profile.' },
        { label: 'Verification', text: 'Test DNS → gateway → login → MFA → file server one by one.' },
        { label: 'Done when', text: 'The failing step is proven – or all tests pass and the cause stays UNKNOWN.' },
      ],
      prompt: `Using the current ticket, available logs and approved diagnostic options, create a concrete work order to reproduce the failure.

Break the flow into observable steps (e.g. client → name resolution → gateway → login → MFA → target system).

For each relevant step record:
- what should happen,
- the smallest useful test,
- what actually happened,
- how well it is proven (VERIFIED / UNKNOWN / BLOCKED).

Do not change production settings yet.

If the failure cannot be reproduced, that is a valid result: document the tests you ran and keep the cause UNKNOWN instead of inventing an explanation.

Stop after the work order.`,
    },
  },
  {
    id: 'incident-gaps',
    icon: 'harddrive',
    de: {
      category: 'STÖRUNG',
      title: 'Vor dem Aufräumen: Was wissen wir nicht?',
      when: 'Es gibt schon eine naheliegende Lösung – aber sie wäre schwer rückgängig zu machen.',
      quickFix: '„Platte voll? Archiv-Ordner löschen, Alarm ist weg.“',
      recipe: [
        'Nur Lücken nennen, die zu diesem Fall gehören.',
        'Beleg fehlt → UNKNOWN. Kein Zugriff → BLOCKED.',
        'Noch nichts löschen oder reparieren.',
      ],
      caseFacts: [
        'Alarm: Dateiserver FS02, Laufwerk D: 97 % voll',
        'Vorschlag: Ordner \\logs\\archiv löschen',
        'D: wächst seit Montag ungewöhnlich schnell',
      ],
      workOrder: [
        { label: 'Ziel', text: 'Klären, ob \\logs\\archiv gefahrlos gelöscht werden darf.' },
        { label: 'Kontext', text: 'FS02 · D: 97 % · Wachstum seit Montag · Löschvorschlag liegt vor.' },
        { label: 'Grenzen', text: 'Nichts löschen, solange eine der Fragen offen ist.' },
        { label: 'Prüfung', text: 'Gilt eine Aufbewahrungsfrist? Gibt es ein Backup? Was schreibt seit Montag so viel?' },
        { label: 'Erledigt, wenn', text: 'Jede Frage belegt beantwortet ist – oder als BLOCKED bei der verantwortlichen Person liegt.' },
      ],
      prompt: `Erstelle aus dem aktuellen Störungsticket, den Logs, der betroffenen Konfiguration und dem vorhandenen Betriebswissen einen Arbeitsauftrag, der klärt, was uns vor der Behebung noch fehlt.

Prüfe nur dort, wo der konkrete Fall es nahelegt, ob etwas Wichtiges fehlt:
- ein Beleg für die vermutete Ursache,
- ein Test, mit dem sich der Fehler nachstellen lässt,
- ein Weg zurück (Backup, Rollback, Wiederherstellung),
- ein messbares Zeichen, dass die Behebung gewirkt hat,
- eine nötige Berechtigung oder Entscheidung der verantwortlichen Person.

Jede genannte Lücke braucht einen konkreten Bezug zum aktuellen Fall. Keine allgemeine Best-Practice-Wunschliste.

UNKNOWN heißt: Der Beleg fehlt.
BLOCKED heißt: Wir wissen, was wir brauchen, kommen aber gerade nicht dran.

Hör nach dem Arbeitsauftrag auf. Noch nichts beheben.`,
    },
    en: {
      category: 'INCIDENT',
      title: 'Before cleaning up: what don’t we know?',
      when: 'An obvious fix is already on the table – but it would be hard to undo.',
      quickFix: '“Disk full? Delete the archive folder, alert gone.”',
      recipe: [
        'Only name gaps that belong to this case.',
        'Evidence missing → UNKNOWN. No access → BLOCKED.',
        'Do not delete or fix anything yet.',
      ],
      caseFacts: [
        'Alert: file server FS02, drive D: 97 % full',
        'Proposal: delete folder \\logs\\archive',
        'D: has been growing unusually fast since Monday',
      ],
      workOrder: [
        { label: 'Goal', text: 'Clarify whether \\logs\\archive can be deleted safely.' },
        { label: 'Context', text: 'FS02 · D: 97 % · growth since Monday · deletion proposed.' },
        { label: 'Constraints', text: 'Delete nothing while any question is still open.' },
        { label: 'Verification', text: 'Is there a retention period? Is there a backup? What has been writing so much since Monday?' },
        { label: 'Done when', text: 'Every question is answered with evidence – or sits BLOCKED with the responsible owner.' },
      ],
      prompt: `Using the current incident ticket, logs, affected configuration and available operating knowledge, create a work order that clarifies what we are still missing before remediation.

Only where the current case makes it relevant, check whether something important is missing:
- evidence for the suspected cause,
- a test that reproduces the failure,
- a way back (backup, rollback, recovery),
- a measurable signal that the fix worked,
- a required permission or owner decision.

Every gap you name needs a concrete anchor in the current case. No generic best-practice wish list.

UNKNOWN means: evidence is missing.
BLOCKED means: we know what we need but cannot get it right now.

Stop after the work order. Do not fix anything yet.`,
    },
  },
  {
    id: 'shift-handoff',
    icon: 'handoff',
    de: {
      category: 'ÜBERGABE',
      title: 'Schichtwechsel ohne Chatverlauf',
      when: 'Jemand anderes – Kollegin, Kollege oder Agent – übernimmt den Fall und kennt den Chat nicht.',
      quickFix: '„Läuft fast. Details siehe Chat.“',
      recipe: [
        'Nur belegten Stand übergeben, keine Vermutungen als Fakten.',
        'Verworfene Ideen mitgeben, damit niemand sie wiederholt.',
        'Offene Entscheidungen als BLOCKED benennen.',
      ],
      caseFacts: [
        'Druck-Warteschlange Halle 3 hängt immer wieder',
        'Druckdienst 2× neu gestartet, hilft ca. 20 Min.',
        'Treiber-Update wartet auf Freigabe',
      ],
      workOrder: [
        { label: 'Ziel', text: 'Drucken in Halle 3 wieder stabil.' },
        { label: 'Stand (belegt)', text: 'Neustart des Druckdienstes hilft jeweils ca. 20 Min.' },
        { label: 'Verworfen', text: 'Netzwerkproblem – Ping und Port-Test waren ok.' },
        { label: 'BLOCKED', text: 'Treiber-Update braucht Freigabe durch das Client-Team.' },
        { label: 'Nächster Schritt', text: 'Den Druckauftrag finden, der die Warteschlange blockiert.' },
        { label: 'Erledigt, wenn', text: '2 Std. ohne Hänger nach der Maßnahme.' },
      ],
      prompt: `Erstelle aus dem aktuellen Support- oder Störungsfall eine eigenständige Übergabe für jemanden, der den bisherigen Chat nicht kennt.

Die Übergabe muss sich aus den aktuellen Belegen nachvollziehen lassen und mindestens enthalten:
- Ziel und aktuellen Umfang,
- den belegten Ist-Zustand mit konkreten Quellen oder Tests,
- bereits erledigte Schritte und was dabei herauskam,
- verworfene Vermutungen, damit sie nicht ohne neue Belege wieder aufgemacht werden,
- offene Punkte als UNKNOWN / BLOCKED / CONTRADICTED,
- was die übernehmende Person darf und wo sie nachfragen muss,
- den kleinsten sinnvollen nächsten Schritt,
- wie man prüft, ob er gewirkt hat, und wann der Fall erledigt ist.

Alte Annahmen aus dem Chat nicht als Fakten übernehmen.
Keine Zugangsdaten, Geheimnisse oder unnötige Gesprächshistorie kopieren.

Fehlt eine nötige Entscheidung (Verantwortliche, Security, Risiko), benenne sie als BLOCKED, statt sie der nächsten Person stillschweigend zu überlassen.

Das Ergebnis ist eine kopierfertige Übergabe, keine Erfolgsmeldung.`,
    },
    en: {
      category: 'HANDOFF',
      title: 'Shift handoff without chat history',
      when: 'Someone else – a colleague or an agent – takes over and has never seen the chat.',
      quickFix: '“Almost working. See chat for details.”',
      recipe: [
        'Hand over proven state only, no guesses as facts.',
        'Include discarded ideas so nobody repeats them.',
        'Name open decisions as BLOCKED.',
      ],
      caseFacts: [
        'Print queue in hall 3 keeps hanging',
        'Print spooler restarted twice, helps for ~20 min',
        'Driver update waiting for approval',
      ],
      workOrder: [
        { label: 'Goal', text: 'Printing in hall 3 is stable again.' },
        { label: 'State (proven)', text: 'Restarting the print spooler helps for ~20 min each time.' },
        { label: 'Ruled out', text: 'Network issue – ping and port test were fine.' },
        { label: 'BLOCKED', text: 'Driver update needs approval from the client team.' },
        { label: 'Next step', text: 'Find the print job that blocks the queue.' },
        { label: 'Done when', text: '2 h without a hang after the fix.' },
      ],
      prompt: `Create a self-contained handoff for the current support or incident case for someone who has not seen the previous chat.

It must be reconstructible from current evidence and contain at least:
- goal and current scope,
- proven current state with concrete sources or tests,
- steps already taken and their observed results,
- discarded hypotheses, so they are not reopened without new evidence,
- open items as UNKNOWN / BLOCKED / CONTRADICTED,
- what the next person may do and where they must ask,
- the smallest useful next step,
- how to verify it worked and when the case is done.

Do not carry over old chat assumptions as facts.
Do not copy credentials, secrets or irrelevant chat history.

If a required owner, security or risk decision is missing, name it as BLOCKED instead of silently passing it on.

The result is a copy-ready handoff, not a success report.`,
    },
  },
];
