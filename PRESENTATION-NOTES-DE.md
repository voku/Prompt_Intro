# Präsentationsnotizen – Von plausiblen Antworten zu belastbarer Arbeit

## Ziel

Die Kollegen sollen zuerst verstehen, **warum** LLMs bestimmte Fehler machen. Danach wirken Prompt-Techniken, Evidenzregeln und L2 nicht wie Sonderregeln, sondern wie direkte Konsequenzen aus dem Werkzeug.

Nicht die Botschaft „LLMs sind dumm“ vermitteln. Die interessantere Aussage ist:

> LLMs sind extrem gut darin, plausible Fortsetzungen und Muster zu erzeugen. Genau deshalb können falsche Antworten so überzeugend aussehen.

## Ablauf

### 1 – Von plausiblen Antworten zu belastbarer Arbeit

> Letztes Mal ging es darum, was LLMs können. Heute schauen wir zuerst kurz darauf, warum sie manchmal komplett logisch klingenden Unsinn produzieren – und was wir daraus für unsere Arbeit ableiten.

### 2 – 50 Meter? Laufen klingt super. Falsche Aufgabe.

Prompt vorlesen:

> Ich will mein Auto waschen. Die Waschanlage ist 50 Meter entfernt. Laufen oder fahren?

Dann auf die beiden Karten zeigen.

> „50 Meter“ aktiviert ein sehr starkes Muster: kurze Strecke, also laufen. Aber unser eigentliches Ziel enthält eine implizite Bedingung: Das Auto muss zur Waschanlage.

Nicht behaupten, dass jedes Modell immer so antwortet. Die Pointe ist, dass die explizite Formulierung stärker wirken **kann** als die unausgesprochene Absicht.

**Brücke:**

> Genau deshalb sollten wichtige Ziele und Randbedingungen nicht nur in unserem Kopf existieren.

### 3 – Da war nichts. Beide Modelle fanden trotzdem etwas.

Das Rauschbild zuerst wirken lassen.

Dann die beiden Antworten zeigen:

- GPT-5.6 Sol: `I love you.`
- Claude Fable 5: imaginierte Prompt-Injection / Rose

Dann Ground Truth:

> Da war gar keine versteckte Nachricht.

**Merksatz:**

> Eine überzeugende Beschreibung ist noch keine Beobachtung.

Das ist später die direkte Brücke zu `UNKNOWN`, `VERIFIED` und echter Evidenz.

### 4 – Buchstaben, Wörter, Tokens

Auf `strawberry` zeigen und die drei `r` markieren.

> Wir sehen hier zehn Zeichen und können die drei r direkt zählen. Das Modell arbeitet intern aber nicht automatisch mit genau dieser Zeichenliste, sondern mit modellabhängigen Tokens.

Wichtig: Nicht behaupten, dass LLMs deshalb grundsätzlich keine Buchstaben zählen können. Moderne Modelle können das oft korrekt lösen, besonders mit Reasoning oder Tools.

**Punkt:**

> Wenn exakte String-Arbeit zählt, gebe ich einem Sprachmodell lieber ein deterministisches Tool, statt darauf zu hoffen, dass Sprachrepräsentation zufällig exakt genug ist.

### 5 – Plausible Fortsetzung ist keine Wahrheitsdatenbank

Die Balken ausdrücklich als **schematisch** bezeichnen.

> Sprachmodelle generieren passende Fortsetzungen. „Passt gut in den Kontext“ und „ist nachweislich wahr“ sind zwei unterschiedliche Fragen.

Dann:

> Eine erfundene Person kann deshalb eine fantastisch glaubwürdige Biografie bekommen. Sprachlich passt alles. Nur die Realität fehlt.

**Brücke:**

> Jetzt ergibt der ganze Evidenz-Kram plötzlich Sinn.

### 6 – Darum bauen wir einen Auftrag, keinen Zauberspruch

Das Bild erklären:

```text
L2 + aktueller Kontext/Evidenz → L1
```

Darunter die fünf L1-Bestandteile:

- Ziel
- Kontext
- Grenzen
- Prüfung
- Fertig, wenn

> L2 ist die wiederverwendbare Bauanleitung. Der Fall von heute kommt aus dem aktuellen Kontext. Das Ergebnis ist der konkrete Auftrag, den man gegenlesen und prüfen kann.

> Und der L2-Durchgang macht noch nichts kaputt. Er baut erstmal nur den Auftrag.

### 7 – Freitag, 16:47 Uhr. 742 Benutzer. Ein verdächtiges Mapping.

Hauptbeispiel.

Links: konkreter Prompt für `SD-18427`.

Rechts: Methode ohne die Falldaten.

Dann **„Daraus erzeugten L1-Auftrag zeigen“** öffnen.

> Links ist nichts schlecht. Für genau diesen Import ist das ein brauchbarer Prompt. Rechts steckt nur das drin, was auch beim nächsten Import noch gelten soll.

Das neue `cost_center → department`-Mapping als Beispiel für `UNKNOWN/BLOCKED` verwenden:

> Wenn wir den Beleg nicht haben, wird das Mapping nicht kreativ vervollständigt. Es bleibt sichtbar offen.

### 8 – Benutzer sagt: „VPN geht wieder.“ Ticket zu?

> Die Aussage des Benutzers ist echte Information und kann wertvolle Evidenz sein. Sie ersetzt aber nicht automatisch alle Abnahmekriterien.

Die drei Ebenen unterscheiden:

1. was das Ticket fordert,
2. was der Benutzer berichtet,
3. was wir tatsächlich geprüft/beobachtet haben.

### 9 – Kontext ist keine Erlaubnis

Auf Ticket / Logs / Config / Deploy-Skript zeigen.

> Ein Agent darf eine Datei brauchen, um die Ursache zu verstehen, ohne sie deshalb ändern zu dürfen.

**Merksatz:**

> Relevanz ist keine Schreibfreigabe.

### 10 – Unsicherheit braucht einen Namen

Die Zustände nicht akademisch durchdefinieren.

Die drei wichtigsten für den Vortrag:

- `VERIFIED` – belegt
- `UNKNOWN` – Beleg fehlt
- `BLOCKED` – wir wissen, was fehlt, kommen aber gerade nicht daran / dürfen es nicht

Die anderen Boxen nur kurz erwähnen.

> Der Nutzen ist: Das Modell muss eine Lücke nicht mehr mit einer schönen Geschichte füllen.

### 11 – Bestell keine drei Fehler

Links:

> Nenn mir die drei größten Risiken.

Dann rechts:

> Versuche den Plan drei Mal ernsthaft zu widerlegen.

**Merksatz:**

> Drei Funde sind eine Quote. Drei Falsifikationsversuche sind Arbeit.

`CLEAN` ausdrücklich als gültiges Ergebnis nennen.

### 12 – Auto-Agent ohne Selbstfreigabe

> Wir wollen nicht nach jedem kleinen Schritt „Soll ich weitermachen?“ lesen. Innerhalb der bestehenden Befugnis soll der Agent weiterarbeiten und nach jedem Slice sinnvoll prüfen.

Dann die Grenze:

> Eine neue Owner-, Security-, Risiko- oder destruktive Entscheidung kann der Agent sich aber nicht selbst genehmigen.

### 13 – Kleine L2-Toolbox statt Mega-Prompt

Hier wirklich klicken.

Empfohlene Reihenfolge:

1. `discovery-first`
2. `reproduce-before-fix`
3. `adversarial-review`
4. bei Interesse `production-ready-handoff`

> Das sind die echten aktuellen L2-Source-Prompts aus unserem agent-recall-compiler. Ein Klick zeigt den Prompt vollständig; wir müssen also nicht so tun, als wären drei Stichpunkte dasselbe wie die echte Methode.

Darauf hinweisen:

> `evidence-report` und `continue-until-done` fehlen hier absichtlich. Die sind im aktuellen Katalog Level 1 und nicht L2.

Bei langen Prompts nicht alles vorlesen. Struktur zeigen und ggf. kopieren.

### 14 – Bessere Arbeit, nicht hübschere Prompts

Mit den drei Karten enden:

- einmalig → direkter Prompt
- wiederkehrend → L2-Methode
- kritisch → Evidenz + Befugnis explizit

> Das Ziel ist nicht, dass ein Prompt nach Prompt Engineering aussieht. Das Ziel ist, dass die Arbeit stimmt und wir wissen, warum wir das behaupten dürfen.

## Kurzfassung – 15 Minuten

**1 → 2 → 3 → 5 → 6 → 7 → 8 → 10 → 13 → 14**

Wenn nur zehn Minuten da sind:

**1 → 2 → 3 → 5 → 6 → 7 → 13 → 14**

## Vor Teams

- Pages-Version einmal komplett neu laden.
- Folie 7: L1-Auftrag einmal auf-/zuklappen.
- Folie 13: mindestens `discovery-first` und `adversarial-review` anklicken; Scrollbereich prüfen.
- Browserfenster statt kompletten Desktop teilen.
- Beim Token-Beispiel ausdrücklich sagen, dass die Token-Chunks im Bild schematisch sind.
- Beim Next-Token-Beispiel ausdrücklich sagen, dass die Balken keine echten Modellwahrscheinlichkeiten darstellen.
