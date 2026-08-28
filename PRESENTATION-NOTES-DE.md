# Präsentationsnotizen – Von plausiblen Antworten zu belastbarer Arbeit

## Ziel

Die Kollegen sollen nicht das Gefühl bekommen, sie hätten vor Monaten Hausaufgaben für „Teil 2“ bekommen. Der Einstieg holt die alte LLM-Präsentation kurz zurück, zeigt den Fähigkeitssprung seitdem und stellt dann die neue Frage:

> Nicht mehr nur: Was kann ein LLM?
>
> Sondern: Wie geben wir einem inzwischen sehr handlungsfähigen LLM Arbeit so, dass das Ergebnis belastbar ist?

Die Botschaft ist ausdrücklich **nicht** „LLMs sind dumm“. Die interessantere Aussage ist:

> LLMs sind extrem gut darin, plausible Muster und Fortsetzungen zu erzeugen. Heute können sie zusätzlich Tools benutzen und selbst Arbeitsschritte ausführen. Genau deshalb werden Kontext, Evidenz und Grenzen wichtiger, nicht unwichtiger.

## Einstieg / Übergang

### 1 – Vor langer Zeit, in einer LLM-Präsentation weit, weit entfernt …

Erst den alten GIF wirken lassen.

> Einige erinnern sich vielleicht noch an den Vortrag. Falls nicht: völlig okay, ich erinnere mich selbst kaum noch an meine Foliennummern.

Dann nur drei Dinge rekonstruieren:

- Text rein → plausible Antwort raus.
- Zusammenfassen, Übersetzen, Schreiben, Code.
- Das Modell lernt Muster und setzt Kontext fort.

Nicht die alte Präsentation nacherzählen.

> Das war damals die Kernfrage: Was ist so ein LLM überhaupt und wofür kann man es benutzen?

**Brücke:**

> Seitdem ist ein kleines Detail passiert: Der Chatbot hat Hände bekommen.

### 2 – Dann bekam der Chatbot plötzlich Hände

Die beiden alten GIFs bewusst als Zeitmarker verwenden.

Links:

> Damals haben wir überwiegend über Antworten gesprochen.

Rechts:

> Heute lesen Modelle Dateien, benutzen Web und APIs, schreiben und ändern Code, arbeiten Tickets ab und führen mehrstufige Aufgaben aus.

Dann den wichtigsten Satz langsam:

> Der Fähigkeitssprung ist echt. Aber mehr Fähigkeiten machen eine plausible Aussage nicht automatisch wahr.

**Brücke zur eigentlichen Präsentation:**

> Und damit hat sich für mich die spannendere Frage verschoben: Nicht mehr „Was kann ein LLM?“, sondern „Wie geben wir ihm Arbeit so, dass wir dem Ergebnis anschließend trauen dürfen?“

### 3 – Von plausiblen Antworten zu belastbarer Arbeit

Diese Folie jetzt als eigentliche Titelfolie behandeln.

> Genau darum geht es heute. Erst ganz kurz: Warum passieren bei LLMs bestimmte scheinbar absurde Fehler? Danach: Welche einfachen Arbeitsmethoden ergeben sich daraus für Support, Admin und Entwicklung?

Ab hier beginnt der neue Vortrag wirklich.

## Warum LLMs manchmal seltsamen Unsinn produzieren

### 4 – 50 Meter? Laufen klingt super. Falsche Aufgabe.

Prompt vorlesen:

> Ich will mein Auto waschen. Die Waschanlage ist 50 Meter entfernt. Laufen oder fahren?

> „50 Meter“ aktiviert ein starkes Muster: kurze Strecke, also laufen. Aber unser eigentliches Ziel enthält eine implizite Bedingung: Das Auto muss zur Waschanlage.

Nicht behaupten, jedes Modell antworte immer so.

**Merksatz:**

> Wichtige Ziele und Randbedingungen sollten nicht nur in unserem Kopf existieren.

### 5 – Da war nichts. Beide Modelle fanden trotzdem etwas.

Das Rauschbild wirken lassen, dann die beiden Antworten und Ground Truth.

> Eine überzeugende Beschreibung ist noch keine Beobachtung.

Brücke zu `UNKNOWN`, `VERIFIED` und Evidenz.

### 6 – Buchstaben, Wörter, Tokens

Auf `strawberry` und die drei `r` zeigen.

> Wir sehen Zeichen. Ein Sprachmodell verarbeitet Text über modellabhängige Tokens und interne Repräsentationen. Das ist nicht automatisch dieselbe Ebene.

Nicht behaupten, moderne Modelle könnten grundsätzlich keine Buchstaben zählen.

> Wenn exakte String-Arbeit zählt, benutze ich lieber ein deterministisches Tool.

### 7 – Plausible Fortsetzung ist keine Wahrheitsdatenbank

Die Balken als **schematisch** kennzeichnen.

> „Passt gut zum Kontext“ und „ist nachweislich wahr“ sind zwei unterschiedliche Fragen.

**Brücke:**

> Und jetzt ergibt der ganze Evidenz-Kram plötzlich Sinn.

## Vom Modell zur Arbeitsmethode

### 8 – Darum bauen wir einen Auftrag, keinen Zauberspruch

```text
L2 + aktueller Kontext/Evidenz → L1
```

Die fünf L1-Bestandteile kurz zeigen:

- Ziel
- Kontext
- Grenzen
- Prüfung
- Fertig, wenn

> L2 ist die wiederverwendbare Bauanleitung. Der aktuelle Fall gehört in L1. Erst Auftrag bauen und gegenlesen, dann handeln.

### 9 – Freitag, 16:47 Uhr. 742 Benutzer. Ein verdächtiges Mapping.

Hauptbeispiel. Links konkreter Einzelfall, rechts Methode, dann erzeugten L1-Auftrag öffnen.

> Links ist nichts schlecht. L2 lohnt sich dann, wenn derselbe Qualitätsmaßstab auch beim nächsten Import gelten soll.

### 10 – Benutzer sagt: „VPN geht wieder.“ Ticket zu?

Drei Ebenen unterscheiden:

1. was das Ticket fordert,
2. was der Benutzer berichtet,
3. was wir tatsächlich geprüft haben.

### 11 – Kontext ist keine Erlaubnis

> Relevanz ist keine Schreibfreigabe.

### 12 – Unsicherheit braucht einen Namen

Für den Vortrag vor allem:

- `VERIFIED` – belegt
- `UNKNOWN` – Beleg fehlt
- `BLOCKED` – benötigter Beleg/Zugriff ist bekannt, aber aktuell nicht verfügbar

> Eine Lücke darf eine Lücke bleiben. Sie muss nicht mit einer hübschen Geschichte gefüllt werden.

### 13 – Bestell keine drei Fehler

> Drei Funde sind eine Quote. Drei ernsthafte Falsifikationsversuche sind Review-Arbeit.

`CLEAN` ist gültig.

### 14 – Auto-Agent ohne Selbstfreigabe

> Innerhalb der bestehenden Freigabe automatisch weiterarbeiten. Neue Owner-, Security-, Risiko- oder destruktive Entscheidungen nicht selbst erteilen.

### 15 – Kleine L2-Toolbox statt Mega-Prompt

Hier wirklich klicken. Die Beispiele sind absichtlich deutsch und auf die Fälle dieses Vortrags zugeschnitten.

Gute Reihenfolge:

1. CSV-Import erst verstehen
2. VPN-Fehler erst reproduzieren
3. Den 18-Uhr-Change wirklich angreifen
4. Schichtwechsel ohne Chat-Gedächtnis

Bei langen Prompts nicht alles vorlesen. Struktur und Unterschied zeigen.

### 16 – Bessere Arbeit, nicht hübschere Prompts

- einmalig → direkter Prompt
- wiederkehrend → L2-Methode
- kritisch → Evidenz + Befugnis explizit

> Das Ziel ist nicht Prompt Engineering als Selbstzweck. Das Ziel ist, dass die Arbeit stimmt und wir wissen, warum wir das behaupten dürfen.

## Kurzfassung – 15 Minuten

**1 → 2 → 3 → 4 → 5 → 7 → 8 → 9 → 10 → 12 → 15 → 16**

Wenn nur zehn Minuten da sind:

**1 → 2 → 3 → 4 → 5 → 8 → 9 → 15 → 16**

## Vor Teams

- Pages-Version einmal komplett neu laden.
- Prüfen, dass die drei alten Reaction-GIFs laden.
- Folie 9: L1-Auftrag einmal auf-/zuklappen.
- Folie 15: mindestens CSV-Import und Change-Review anklicken; Scrollbereich prüfen.
- Browserfenster statt kompletten Desktop teilen.
- Token-Chunks ausdrücklich als schematisch erklären.
- Next-Token-Balken ausdrücklich als Illustration, nicht echte Modellwahrscheinlichkeiten erklären.
