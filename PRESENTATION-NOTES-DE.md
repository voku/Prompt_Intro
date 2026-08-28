# Präsentationsnotizen – Von Prompts zu belastbaren Methoden

Zielgruppe: Kolleginnen und Kollegen, die die frühere LLM-Einführung bereits kennen.

## Kernbotschaft

Wir brauchen nicht für jede Kleinigkeit ein Prompt-Framework. Ein direkter Prompt ist für eine kleine Einmal-Aufgabe völlig ausreichend.

Sobald Arbeit aber **wiederkehrt, kritisch ist, übergeben oder sauber geprüft werden muss**, lohnt sich ein anderer Schnitt:

```text
L2-Methode + aktueller Kontext
        ↓
konkreter L1-Auftrag
        ↓
Prüfung / Freigabe
        ↓
Ausführung
        ↓
Evidenz gegen Done When
```

L2 ist dabei keine längere Formulierung. Es ist die wiederverwendbare Bauanleitung. Der konkrete Fall gehört in L1.

## Einstieg – ca. 1 Minute

> Letztes Mal ging es darum, was LLMs überhaupt können. Heute gehe ich einen Schritt weiter: Wie bekomme ich aus einzelnen guten Chats Arbeit, die beim nächsten Ticket nicht wieder bei null anfängt?

> Und nein: Die Antwort ist nicht, jeden Prompt auf drei Bildschirmseiten aufzublasen.

Dann direkt zu Folie 2.

## Empfohlener Ablauf – 25 bis 30 Minuten

### Folie 1 – Von Prompts zu belastbaren Methoden

Nur den Anschluss an die alte Präsentation herstellen.

**Merksatz:**

> Heute geht es nicht um ein neues Modell. Es geht um bessere Arbeitsverträge mit dem Modell.

### Folie 2 – Copy & Paste ist kein Prozess

Die drei Praxisbilder nennen:

- CSV-/Benutzerimport
- Support-/VPN-Ticket
- Störungsmeldung / Kommunikation

**Punkt:** Falldaten ändern sich. Qualitätsregeln sollten bleiben.

### Folie 3 – L2 baut L1

Hier die Begriffe sauber setzen:

- **L2-Rezept** = wiederverwendbare Bauanleitung + Qualitätsmaßstab.
- **L1-Auftrag** = konkrete ausführbare Anweisung für den aktuellen Fall.

Wichtig:

> Der L2-Durchgang endet nach dem Bau von L1. Noch nichts importieren, ändern oder verschicken.

Ein direkter Prompt bleibt für Einmal-Aufgaben legitim.

### Folie 4 – Die fünf Teile von L1

Die aktuelle `agent-recall-compiler`-Form verwenden:

1. Goal / Ziel
2. Context / Kontext
3. Constraints / Grenzen
4. Verification / Prüfung
5. Done When / Fertig, wenn

**Nicht** als starre Prompt-Schablone verkaufen. Die Pointe ist gerade, dass L2 diese fünf Teile aus aktuellem Kontext konstruiert.

### Folie 5 – Hauptdemo: Benutzerimport aus CSV

Hier Zeit investieren.

1. Erst den direkten Prompt links zeigen. Der ist absichtlich **gut**.
2. Dann rechts die L2-Methode zeigen. Darin fehlen Ticket-ID, Dateiname und Zielsystem absichtlich.
3. Danach **„Zeig den daraus erzeugten L1-Auftrag“** öffnen.

Das ist der zentrale Moment der Präsentation:

> Die Methode kennt nicht den Fall von morgen. Sie kennt die Regeln, nach denen aus dem Fall von morgen ein prüfbarer Auftrag gebaut wird.

### Folie 6 – Prüfung != Fertig-wenn

Praxisfall AD-Gruppenänderung.

**Merksatz:**

> Prüfung beschreibt den Messweg. Fertig-wenn beschreibt das Ergebnis, das aus dieser Messung herauskommen muss.

„Sieht richtig aus“ gehört in keine der beiden Spalten.

### Folie 7 – Anforderung != Evidenz

VPN-Ticket als Beispiel.

> „MFA funktioniert“ im Ticket ist die Forderung. Ein tatsächlich beobachteter erfolgreicher Test ist der Nachweis.

Wenn die Probe nicht möglich ist:

- fehlender Beleg → `UNKNOWN`
- bekannter notwendiger Beleg/Zugriff, aktuell nicht erreichbar → `BLOCKED`

Nicht einfach Haken setzen, weil die Zeile existiert.

### Folie 8 – Kontext != Änderungserlaubnis

Störungsanalyse mit Ticket, Logs, `nginx.conf` und Deployment-Skript.

**Punkt:** Relevant für die Analyse bedeutet nicht automatisch im Scope zum Ändern.

> Kontext erweitert keine Befugnis.

### Folie 9 – Evidenzzustände

Nicht als akademische Taxonomie vortragen, sondern als Schutz gegen erfundene Sicherheit.

- `VERIFIED`
- `INFERRED`
- `ASSUMED`
- `UNKNOWN`
- `BLOCKED`
- `CONTRADICTED`

Die formalen material conclusions in Recall sind `VERIFIED / INFERRED / ASSUMED / BLOCKED / CONTRADICTED`; fehlende Evidenz bleibt zusätzlich `UNKNOWN`, bis sie geklärt oder konkret blockiert ist.

### Folie 10 – Quelle, Herkunft, Rolle

Praxisfall Störungskommunikation aus Ticket + Monitoring + Teams-Chat + alter Statusmail.

Die sechs Fragen nennen:

```text
WHAT
WHY
HOW
AUTHORITY
USE
STATE
```

**Merksatz:**

> Relevant heißt nicht maßgeblich. Maßgeblich für eine Aussage heißt nicht automatisch maßgeblich für alles. Und nichts davon ist automatisch Schreibfreigabe.

### Folie 11 – Playground

Reihenfolge für die Live-Demo:

1. **Direkter Prompt: ein Import**
2. **Derselbe Fall als L2-Methode**
3. **Methode mit altem Fall im Gepäck**
4. **Zitiertes Ticket ist keine Anweisung**

Den Score ausdrücklich kleinreden:

> Das ist eine lokale Heuristik, kein Gütesiegel. Interessant ist, welche Eigenschaften fehlen.

### Folie 12 – Blind-Spot-/Adversarial Review

Nicht „finde drei Fehler“, sondern mindestens drei ernsthafte Versuche, den Plan zu widerlegen.

Pro Versuch:

- Hypothese
- Trigger
- bestätigende/widerlegende Evidenz
- Evidenzzustand
- kleinste trennscharfe Probe

`CLEAN` ist ein gültiges Ergebnis.

### Folie 13 – Auto-Agent ohne Selbstfreigabe

Das ist die Brücke zu moderner Agent-Arbeit:

- Arbeit in begrenzte Slices zerlegen.
- Nach jedem Slice die billigste sinnvolle Prüfung.
- Intern prüfen, ob aktuelle Befugnis + Evidenz den nächsten Slice erlauben.
- Unabhängige sichere Arbeit trotz lokalem Blocker fortsetzen.
- Echte Owner-/Security-/Risiko-/destruktive Entscheidungen nie selbst bestätigen.
- Vor `DONE` die eigene Erfolgsmeldung gegen echte Artefakte halten.

**Merksatz:**

> Selbstständig weiterarbeiten ist gut. Sich selbst neue Befugnisse erteilen ist nur kreatives Organisationsdesign.

### Folie 14 – Abschluss

Nicht mit „ihr müsst jetzt L2 benutzen“ enden.

Besser:

> Für die kleine Einmal-Aufgabe bleibt der direkte Prompt. Für wiederkehrende oder kritische Arbeit bauen wir Methoden, die aus aktuellem Kontext einen konkreten Auftrag erzeugen und ihren Erfolg mit Evidenz belegen.

Als Beispiele für aktuelle Rezeptarten nennen:

- Discovery First
- Reproduce Before Fix
- Adversarial Review
- Evidence Report
- Continue Until Done

Nur einsetzen, wenn sie zur Aufgabe passen.

## 15-Minuten-Kurzfassung

**1 → 2 → 3 → 4 → 5 → 7 → 9 → 13 → 14**

Folie 5 bleibt auch in der Kurzfassung drin. Sie erklärt L2/L1 schneller als zehn Definitionen.

## Vor Teams kurz prüfen

- GitHub-Pages-URL im Browser öffnen.
- Browserfenster statt kompletten Desktop teilen.
- Vollbild einschalten.
- Folie 5 öffnen und den erzeugten L1-Auftrag einmal auf-/zuklappen.
- Folie 11 öffnen und die vier Presets der Demo einmal durchklicken.
- Auf 125–150 % Browser-Zoom achten, falls Teams auf dem Zielgerät kleine Schrift produziert. Weil Videokonferenz-Software offenbar auch Typografie als Netzwerkproblem behandeln kann.
