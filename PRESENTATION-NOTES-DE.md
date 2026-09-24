# Präsentationsnotizen – Prompt Engineering in der Praxis

> **Untertitel:** Wie wir aufhören, den Computer anzuschreien, und anfangen, echte Ergebnisse zu erzielen – von plausiblen Antworten zu belastbarer Arbeit.

---

## Ziel & roter Faden

Die Präsentation verbindet das **fundierte Verständnis von Sprachmodellen** (Mental Model, Tokens, Plausibilität vs. Wahrheit) mit **konkreten Arbeitsweisen für den Arbeitsalltag** (von einfachen Prompts über Tools und CoT bis hin zu strukturierten Aufträgen, Evidence-Tracking und Compliance).

Die Botschaft ist ausdrücklich **nicht** „LLMs sind dumm“. Die Kernaussage lautet:

> **LLMs sind extrem mächtig darin, Muster zu erkennen, Kontext fortzusetzen und Tools zu bedienen.**
> Aber sie kennen unsere Gedanken nicht. Wer vage fragt, bekommt erfundene Plausibilität. Wer Rolle, Kontext, Denkschritte und Leitplanken vorgibt, bekommt exzellente, verlässliche Ergebnisse.

---

## Ablauf & Notizen pro Folie

### 1 – Vor langer Zeit, in einer LLM-Präsentation weit, weit entfernt … (Folie 1)
* Erst den alten Star Wars GIF wirken lassen.
* Kurze Brücke:
  > „Beim letzten Mal ging es um die Grundlagen: Text rein → plausible Antwort raus. Gut zum Zusammenfassen, Übersetzen, Coden. Das Modell lernt Muster und setzt Text plausibel fort.“

### 2 – Dann bekam der Chatbot plötzlich Hände (Folie 2)
* Die beiden GIFs als Zeitmarker:
  - Links: Früher ging es überwiegend um Text-Antworten.
  - Rechts: Heute lesen Modelle Dateien, nutzen Suchmaschinen und APIs, schreiben und testen Code und führen mehrstufige Aufgaben aus.
* Der Schlüsselsatz:
  > „Der Fähigkeitssprung ist enorm. Aber mehr Fähigkeiten machen eine plausible Antwort nicht automatisch wahr. Die Frage lautet heute: Wie geben wir dem Modell Arbeit so, dass das Ergebnis nachweisbar belastbar ist?“

### 3 – Prompt Engineering in der Praxis (Folie 3 / Titel)
* Die eigentliche Titelfolie – hier steht meine Haltung, sie ist der rote Faden des Vortrags:
  > „Ich arbeite jeden Tag mit LLMs und vertraue ihnen echte Arbeit an. Vertrauen entsteht aber durch prüfbare Schritte – nicht durch eine überzeugende Antwort.“
* Ein eigenes Beispiel erzählen: wo mir ein LLM zuletzt richtig Arbeit abgenommen hat – und wo es mich reingelegt hätte.
* Die 4 Bausteine im Retro-HUD rechts:
  1. **Rolle & Kontext**
  2. **Chain of Thought**
  3. **Tools & Code**
  4. **Struktur & Sicherheit**

### 4 – Das LLM-Problem (Folie 4)
* **Metapher:** Der überaus selbstbewusste Praktikant am ersten Arbeitstag. Fragt man ihn nach etwas, das er nicht weiß, gibt er nicht zu: „Keine Ahnung“, sondern erfindet eine extrem überzeugend klingende Geschichte.
* Die 4 Punkte:
  - LLMs „wissen“ nichts – sie raten statistisch das nächste Wort.
  - Schwächen: Kopfrechnen, aktuelle News, exakte Zitate.
  - Risiko: Halluzinationen.
  - Unsere Lösung: Werkzeuge und Leitplanken.

### 5 – 50 Meter? Laufen klingt super. Falsche Aufgabe. (Folie 5)
* Prompt: *„Ich will mein Auto waschen. Die Waschanlage ist 50 Meter entfernt. Laufen oder fahren?“*
* Die Falle: „50 Meter“ triggert das Muster „kurze Strecke → laufen“. Aber die implizite Bedingung war: Das Auto muss gewaschen werden!
* **Merksatz:**
  > „Wichtige Ziele und Randbedingungen dürfen nicht nur in unserem Kopf existieren.“

### 6 – Da war nichts. Beide Modelle fanden trotzdem etwas. (Folie 6)
* Das Rauschbild wirken lassen: Es enthält reines Rauschen.
* GPT und Claude halluzinieren trotzdem („I love you“, „Geheime Rose“).
* **Merksatz:**
  > „Eine überzeugende Beschreibung ist keine Beobachtung. Wenn Belege fehlen, ist UNKNOWN die richtige Antwort – nicht die schönere Geschichte.“

### 7 – Buchstaben, Wörter, Tokens: nicht dasselbe (Folie 7)
* Auf `strawberry` und die drei `r` hinweisen.
* LLMs sehen Text in Token-Slices, nicht als Buchstabengitter.
* **Merksatz:**
  > „Wenn exaktes Zählen, String-Operationen oder Rechnen wichtig sind: Deterministische Tools (Python, Regex) nutzen.“

### 8 – Plausible Fortsetzung ist keine Wahrheitsdatenbank (Folie 8)
* Plausibilität belohnt, was in den Kontext passt. Wahrheit braucht Evidenz.
* **Überleitung:**
  > „Genau hier kommen unsere ersten konkreten Werkzeuge ins Spiel: Mathe und Fakten.“

### 9 – Beispiel: Logik & Mathe (Code-Aided Reasoning / PoT) (Folie 9)
* **Szenario:** Müllwagen mit 32L/100km, 2 Touren à 45km/Tag, Diesel 1,70€ im November 2024 ohne Sonntage.
* Standard-Prompt: Modell verzählt sich bei Kalendertagen.
* Optimierter Prompt:
  - `Constraint: Rechne NICHT selbst.`
  - `Action: Schreibe ein Python-Skript...`
* **Takeaway:** Nicht „LLMs können nicht rechnen“, sondern: Code ist nachprüfbar, Kopfrechnen nicht.
* **Vorher testen:** Aktuelle Reasoning-Modelle rechnen das Beispiel oft richtig. Wenn es live klappt, ist das kein Problem – die Botschaft bleibt die Nachprüfbarkeit.

### 10 – Beispiel: Fakten & Wissen (Fact Grounding & Tool Use) (Folie 10)
* **Szenario:** „Wer sitzt aktuell im Vorstand der Siemens AG?“
* Standard-Prompt: Nennt Vorstände von 2021 oder erfindet Namen.
* Optimierter Prompt: Google Search auf der offiziellen Firmenwebsite + URL-Quellenpflicht für jede Person.
* **Takeaway:** Suche allein ist noch kein Beleg. Erst die Quelle pro Aussage macht das Ergebnis nachprüfbar.

### 11 – Wie viel Führung braucht die Aufgabe? (Folie 11)
* Ausdrücklich **keine** Leiter vom Anfänger zum Profi. Wer Level 4 für alles nutzt, verschwendet Zeit.
* Die 4 Stufen:
  1. **Direkt fragen:** einfache, unkritische Fragen.
  2. **Kontext und Beispiele:** Rolle, Ziel, gewünschter Stil.
  3. **Aufgabe strukturieren:** erst analysieren, dann Ergebnis erstellen.
  4. **Werkzeuge und Prüfung:** Code, Suche, Quellen – wenn das Ergebnis halten muss.

### 12 – Technik: Erst analysieren, dann Ergebnis erstellen (Folie 12)
* **Szenario:** Wartungsplan für Sortieranlage X.
* Standard-Prompt liefert beliebige, oberflächliche Tabellen.
* Die Struktur teilt auf: 1. Analyse der Komponenten → 2. Häufigste Ausfallrisiken → 3. Zeitplan.
* **Wichtig:** „Denk Schritt für Schritt“ ist kein Zauberspruch mehr – aktuelle Modelle denken ohnehin mit. Der Gewinn kommt daraus, dass *wir* festlegen, was zuerst geklärt werden muss.
* **Takeaway:** Erst analysieren, dann Ergebnis erstellen.

### 13 – Technik: Persona & Kontext (Folie 13)
* **Szenario:** Tonnen nicht geleert wegen Glatteis – Mitteilung an die Kommune.
* Ohne Kontext: Generische Standard-Entschuldigung.
* Mit Rolle (Betriebsleiter), Kontext (Glatteis), Ziel (Zweitversuch morgen) und Ton (sicherheitsbewusst): Professionelle, kooperative Lösung.

### 14 – Technik: Strukturierte Ausgabe (Folie 14)
* **Szenario:** Unfallbericht auswerten.
* Standard liefert Fließtext.
* Optimiert nutzt `<task>`, `<format>`, `<bericht>` und erzwingt reines JSON.
* **Im Chat** reicht das Format im Prompt. **Per API** besser ein echtes JSON-Schema (Structured Output) – dann erzwingt das System das Format, statt es nur zu erbitten.
* **Takeaway:** Ideal für Schnittstellen und Weiterverarbeitung ohne Nacharbeit.

### 15 – Darum bauen wir einen Auftrag – keinen Zauberspruch (Folie 15)
* `Vorlage (L2) + heutiger Fall → Arbeitsauftrag (L1)`
* Die 5 Bestandteile eines robusten IT-Auftrags:
  - Ziel (Goal)
  - Kontext (Context)
  - Grenzen (Constraints)
  - Prüfung (Verification)
  - Erledigt, wenn (Done When)

### 16 – Freitag, 16:47 Uhr. 742 Benutzer. Ein verdächtiges Mapping. (Folie 16)
* CSV-Benutzerimport: 742 Zeilen, neues Mapping `cost_center → department`.
* Den daraus entstandenen Arbeitsauftrag aufklappen: Vor dem Import erst Dry-Run, bestehende Konten schützen, jede Zeile belegen.

### 17 – Benutzer sagt: „VPN geht wieder.“ Ticket zu? (Folie 17)
* Drei Ebenen unterscheiden: Was das Ticket fordert, was der User sagt, was nachweisbar geprüft wurde.
* Benutzeraussage ist Input, kein Beweis.

### 18 – Kontext ist keine Erlaubnis (Folie 18)
* Relevanz beantwortet: „Muss ich das ansehen?“
* Befugnis beantwortet: „Darf ich das ändern?“

### 19 – Unsicherheit braucht einen Namen (Folie 19)
* Für den Vortrag drei Zustände: **belegt / vermutet / offen**. Die englischen Labels (`VERIFIED`, `UNKNOWN`, `BLOCKED` …) stehen nur klein darunter, weil sie auf anderen Folien auftauchen.
* Selbstsicherheit ist kein vierter Zustand. Eine Lücke darf eine Lücke bleiben.

### 20 – Bestell keine drei Fehler (Folie 20)
* Change-Review um 18:00 Uhr: Drei ernsthafte Falsifikationsversuche statt Fundquote. `CLEAN` ist ein gültiges Ergebnis.

### 21 – Auto-Agent ohne Selbstfreigabe (Folie 21)
* Innerhalb der Freigabe automatisch arbeiten.
* An echten Entscheidungsgrenzen (Security, Destruktiv, Risiko) stoppen und Mensch fragen.

### 22 – Kleine L2-Toolbox statt Mega-Prompt (Folie 22)
* Drei Karten: VPN-Fehler erst nachstellen · Volle Platte: erst Lücken klären · Schichtwechsel ohne Chatverlauf.
* Pro Karte läuft eine kurze Animation: Schnellschuss (durchgestrichen) → Vorlage (L2) + heutiger Fall → Arbeitsauftrag (L1), Zeile für Zeile.
* Botschaft: Die Vorlage bleibt gleich, nur der Fall wechselt. „Nochmal abspielen“ für die Wiederholung, „Vollständige Vorlage“ zeigt/kopiert den ganzen Prompt.

### 23 – Sicherheit & Compliance (Folie 23)
* **Kernformel:** freigegebener Dienst + zulässige Daten.
  1. Nur freigegebene KI-Dienste – ein privater Account ist kein Arbeitswerkzeug.
  2. Nur Daten, die für diesen Dienst zulässig sind; personenbezogene Daten und Betriebsgeheimnisse nur, wo ausdrücklich erlaubt.
  3. Ergebnisse immer gegenprüfen („Human in the Loop“) – die Verantwortung bleibt bei uns.
  4. Im Zweifel vor dem Einfügen IT-Security oder Datenschutz fragen.
* **Mündlich ergänzen (nicht auf der Folie, weil Open Source):** Welche Dienste bei uns konkret freigegeben sind und für welche Daten.

### 24 – Zusammenfassung & Takeaways (Folie 24)
* **Kernregeln:**
  1. Briefen wie einen klugen neuen Kollegen: Rolle, Kontext, Ziel.
  2. Rechnen mit Code, Fakten mit Quelle, erst analysieren, dann Ergebnis.
  3. Unsicherheit benennen: belegt, vermutet oder offen.
  4. Erst verstehen oder nachstellen, dann ändern.
  5. Dreht sich die KI im Kreis: nicht neu würfeln, sondern neue Infos geben oder neu anfangen (`retry-stop`).
  6. Wiederkehrende Aufgabe: Prompt als Vorlage aufheben – der Fall wechselt, die Vorlage bleibt.
