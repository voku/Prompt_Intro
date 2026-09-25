# Präsentationsnotizen – Prompt Engineering in der Praxis

> **Untertitel:** Wie wir aufhören, den Computer anzuschreien, und anfangen, echte Ergebnisse zu erzielen – von plausiblen Antworten zu belastbarer Arbeit.

---

## Ziel & roter Faden

Die Präsentation verbindet ein **praktisches Verständnis von Sprachmodellen** (Tokens, Plausibilität vs. Wahrheit) mit **konkreten Arbeitsweisen für den Arbeitsalltag**: klare Aufträge, passende Werkzeuge, überprüfbare Aussagen, wiederverwendbare Vorlagen und Compliance.

Die Botschaft ist ausdrücklich **nicht** „LLMs sind dumm“. Die Kernaussage lautet:

> **LLMs sind extrem mächtig darin, Muster zu erkennen, Kontext fortzusetzen und Tools zu bedienen.**
> Aber sie kennen unsere Gedanken nicht. Wer vage fragt, bekommt leicht plausible, aber unzuverlässige Antworten. Wer Ziel, Kontext, passende Werkzeuge und Prüfwege vorgibt, bekommt bessere Ergebnisse – und kann wichtige Aussagen nachvollziehen.

### Pointen-Kette (Follow the white rabbit 🐇)
Auf den Folien 5–10, 16 und 17 blendet der nächste Klick erst eine **Pointe** ein, bevor es weitergeht (← nimmt sie wieder weg). Jede Pointe beantwortet das *Warum* der Folie; die 🐇-Zeile darunter stellt die Frage, die die nächste Folie beantwortet:

Waschanlage (Muster überlagert Ziel) → Rauschbild (Muster ohne Beobachtung) → Tokens (warum das Modell anders „sieht“) → Next Token (gemeinsame Wurzel: plausibel ≠ belegt) → Mathe (Rechnen an Code abgeben) → Fakten (Quelle pro Aussage) → … → VPN (Waschanlagen-Muster im Ticket) → Drei Fehler (wir schreiben das Muster selbst in die Frage) → zurück zur Waschanlage.

Die Pointe vorlesen, die 🐇-Frage stellen, dann klicken – nicht vorab erklären.

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
  2. **Erst analysieren**
  3. **Tools & Code**
  4. **Struktur & Sicherheit**

### 4 – Das LLM-Problem (Folie 4)
* **Metapher:** Der überaus selbstbewusste Praktikant am ersten Arbeitstag. Fragt man ihn nach etwas, das er nicht weiß, gibt er nicht zu: „Keine Ahnung“, sondern erfindet eine extrem überzeugend klingende Geschichte.
* Die 4 Punkte:
  - Das Modell selbst erzeugt aus seinem Kontext; Nachschlagen, Rechnen oder Systeme prüfen braucht bereitgestellte Werkzeuge.
  - Typische Risikofelder: exaktes Rechnen, aktuelle Fakten und Zitate.
  - Risiko: Halluzinationen.
  - Unsere Lösung: Werkzeuge und Leitplanken.

### 5 – 50 Meter? Laufen klingt super. Falsche Aufgabe. (Folie 5)
* Prompt: *„Ich will mein Auto waschen. Die Waschanlage ist 50 Meter entfernt. Laufen oder fahren?“*
* Muster benennen, nicht erklären, wie ein LLM funktioniert: „50 Meter“ triggert „kurze Strecke → laufen“. Das eigentliche Ziel steckt im Kontext: Das Auto muss in die Waschanlage.
* Zwei Mini-Beispiele, je ein Satz Beispiel + ein Satz Pointe, dann weiter (beide kommen später ausführlich):
  - *„Finde drei Fehler in diesem Code.“* – Die Zahl in der Formulierung lenkt die Suche. Vielleicht gibt es zwei, vielleicht sieben. (→ Folie 17)
  - *„Der Benutzer sagt, VPN geht wieder. Ticket schließen?“* – Klingt gelöst, ist aber noch kein technischer Nachweis. (→ Folie 16)
* **Klick → Pointe:** „Starke Muster in Fragen können das eigentliche Ziel überlagern.“
  🐇 *„Und wenn es gar kein Ziel gibt – nur Rauschen?“*
* **Überleitung:**
  > „Ein LLM versucht nicht automatisch herauszufinden, was ich wirklich gemeint habe. Es erzeugt eine passende Fortsetzung aus dem Kontext, den ich ihm gebe. Deshalb müssen Ziel, Prüfkriterien und benötigte Belege sichtbar werden.“
* **Formulierung:** Nicht „das LLM macht nur Pattern Matching“ sagen – zu grob. Besser:
  > „Das Modell arbeitet stark über gelernte sprachliche Muster. Ein starkes Muster in der Frage kann dabei das eigentliche Ziel überlagern.“
* **Zeitbudget:** ein bis zwei Minuten für alle drei Beispiele.

### 6 – Da war nichts. Beide Modelle fanden trotzdem etwas. (Folie 6)
* Das Rauschbild wirken lassen: Es enthält reines Rauschen.
* GPT und Claude halluzinieren trotzdem („I love you“, „Geheime Rose“).
* **Merksatz:**
  > „Eine überzeugende Beschreibung ist keine Beobachtung. Wenn Belege fehlen, ist UNKNOWN die richtige Antwort – nicht die schönere Geschichte.“
* **Klick → Pointe:** „Da war gar keine Nachricht. Beide Modelle haben ein Muster vervollständigt – beobachtet hat keins.“ (Die Ground-Truth-Box ist bis dahin versteckt.)
  🐇 *„Warum sieht es Dinge, die nicht da sind – und übersieht Buchstaben, die da sind?“*

### 7 – Buchstaben, Wörter, Tokens: nicht dasselbe (Folie 7)
* Auf `strawberry` und die drei `r` hinweisen.
* LLMs sehen Text in Token-Slices, nicht als Buchstabengitter.
* **Merksatz:**
  > „Wenn exaktes Zählen, String-Operationen oder Rechnen wichtig sind: Deterministische Tools (Python, Regex) nutzen.“
* **Klick → Pointe:** „Das Modell arbeitet mit Tokens, nicht mit Buchstaben. Exakte Zeichenarbeit gehört in Code.“
  🐇 *„Wenn es keine Buchstaben sieht – was macht es dann eigentlich mit dem Text?“*

### 8 – Plausible Fortsetzung ist keine Wahrheitsdatenbank (Folie 8)
* Plausibilität belohnt, was in den Kontext passt. Wahrheit braucht Evidenz.
* **Überleitung:**
  > „Genau hier kommen unsere ersten konkreten Werkzeuge ins Spiel: Mathe und Fakten.“
* **Klick → Pointe:** „Es wählt, was zum Kontext passt – nicht, was belegt ist. Das ist die gemeinsame Wurzel aller drei Fallen.“ (Waschanlage, Rauschbild, strawberry – hier laufen die Fäden zusammen.)
  🐇 *„Wie kommt dann Wahrheit rein? Wir geben die Teile ab, bei denen ‚plausibel‘ nicht reicht.“*

### 9 – Beispiel: Logik & Mathe (Code-Aided Reasoning / PoT) (Folie 9)
* **Szenario:** Müllwagen mit 32L/100km, 2 Touren à 45km/Tag, Diesel 1,70€ im November 2024 ohne Sonntage.
* Standard-Prompt: Modell verzählt sich bei Kalendertagen.
* Optimierter Prompt:
  - `Constraint: Rechne NICHT selbst.`
  - `Action: Schreibe ein Python-Skript...`
* **Takeaway:** Nicht „LLMs können nicht rechnen“, sondern: Code ist nachprüfbar, Kopfrechnen nicht.
* **Vorher testen:** Aktuelle Reasoning-Modelle rechnen das Beispiel oft richtig. Wenn es live klappt, ist das kein Problem – die Botschaft bleibt die Nachprüfbarkeit.
* **Klick → Pointe:** „Nicht dem Kopfrechnen des Modells vertrauen – den Rechenweg prüfbar machen.“
  🐇 *„Rechnen lässt sich an Code abgeben. Und Fakten?“*

### 10 – Beispiel: Fakten & Wissen (Fact Grounding & Tool Use) (Folie 10)
* **Szenario:** „Wer sitzt aktuell im Vorstand der Siemens AG?“
* Standard-Prompt: Nennt Vorstände von 2021 oder erfindet Namen.
* Optimierter Prompt: Google Search auf der offiziellen Firmenwebsite + URL-Quellenpflicht für jede Person.
* **Takeaway:** Suche allein ist noch kein Beleg. Erst die Quelle pro Aussage macht das Ergebnis nachprüfbar.
* **Klick → Pointe:** „Suche allein ist kein Beleg. Erst die Quelle pro Aussage macht die Antwort prüfbar.“
  🐇 *„Code, Suche, Quellen – braucht jede Frage das alles?“*

### 11 – Wie viel Führung braucht die Aufgabe? (Folie 11)
* Ausdrücklich **keine** Leiter vom Anfänger zum Profi. Die vier Punkte sind kombinierbare Bausteine; je nach Aufgabe reicht schon der erste.
* Die 4 Bausteine:
  1. **Direkt fragen:** einfache, unkritische Fragen.
  2. **Kontext und Beispiele:** Rolle, Ziel, gewünschter Stil.
  3. **Aufgabe strukturieren:** erst analysieren, dann Ergebnis erstellen.
  4. **Werkzeuge und Prüfung:** Code, Suche, Quellen – wenn das Ergebnis halten muss.
* **Merksatz:** Nicht jeder Prompt braucht alle vier Bausteine. Mehr Prompt ist nicht automatisch besser.

### 12 – Technik: Erst analysieren, dann Ergebnis erstellen (Folie 12)
* **Szenario:** Wartungsplan für Sortieranlage X.
* Standard-Prompt liefert beliebige, oberflächliche Tabellen.
* Die Struktur teilt auf: 1. Analyse der Komponenten → 2. Ausfallrisiken → 3. Zeitplan → 4. fehlende Informationen ausdrücklich markieren.
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

### 15 – Freitag, 16:47 Uhr. 742 Benutzer. Ein verdächtiges Mapping. (Folie 15)
* CSV-Benutzerimport: 742 Zeilen, neues Mapping `cost_center → department`.
* Den daraus entstandenen Arbeitsauftrag aufklappen: Vor dem Import erst Dry-Run, bestehende Konten schützen, jede Zeile belegen.

### 16 – Benutzer sagt: „VPN geht wieder.“ Ticket zu? (Folie 16)
* Drei Ebenen unterscheiden: Was das Ticket fordert, was der User sagt, was nachweisbar geprüft wurde.
* Benutzeraussage ist Input, kein Beweis.
* Rückbezug auf Folie 5: „Klingt gelöst → schließen“ ist genau so ein starkes Muster.
* **Klick → Pointe:** „‚Klingt gelöst → schließen‘ ist wieder das Waschanlagen-Muster: plausibel, aber nicht geprüft.“
  🐇 *„Und was, wenn wir das Muster selbst in die Frage schreiben?“*

### 17 – Bestell keine drei Fehler (Folie 17)
* Change-Review um 18:00 Uhr: Drei ernsthafte Falsifikationsversuche statt Fundquote. `CLEAN` ist ein gültiges Ergebnis.
* Rückbezug auf Folie 5: „Finde drei Fehler“ lenkt die Suche – das Modell liefert sonst eben drei.
* **Klick → Pointe:** „Wer drei Fehler bestellt, bekommt drei – ob es sie gibt oder nicht. Die Frage formt die Antwort.“
  🐇 *„Zurück zur Waschanlage: Ziel, Prüfkriterien und Belege sichtbar machen – und als Vorlage wiederverwenden.“* – der Kreis schließt sich, weiter zur Toolbox.

### 18 – Kleine Vorlagen-Toolbox statt Mega-Prompt (Folie 18)
* Drei Karten: VPN-Fehler erst nachstellen · Volle Platte: erst Lücken klären · Schichtwechsel ohne Chatverlauf.
* Pro Karte läuft eine kurze Animation: Schnellschuss (durchgestrichen) → Vorlage + heutiger Fall → Arbeitsauftrag, Zeile für Zeile.
* Botschaft: Die Vorlage bleibt gleich, nur der Fall wechselt. „Nochmal abspielen“ für die Wiederholung, „Vollständige Vorlage“ zeigt/kopiert den ganzen Prompt.

### 19 – Sicherheit & Compliance (Folie 19)
* **Kernformel:** freigegebener Dienst + zulässige Daten.
  1. Nur freigegebene KI-Dienste – ein privater Account ist kein Arbeitswerkzeug.
  2. Nur Daten, die für diesen Dienst zulässig sind; personenbezogene Daten und Betriebsgeheimnisse nur, wo ausdrücklich erlaubt.
  3. Ergebnisse immer gegenprüfen („Human in the Loop“) – die Verantwortung bleibt bei uns.
  4. Im Zweifel vor dem Einfügen IT-Security oder Datenschutz fragen.
* **Mündlich ergänzen (nicht auf der Folie, weil Open Source):** Welche Dienste bei uns konkret freigegeben sind und für welche Daten.

### 20 – Zusammenfassung & Takeaways (Folie 20)
* **Kernregeln:**
  1. Briefen wie einen klugen neuen Kollegen: Rolle, Kontext, Ziel.
  2. Rechnen mit Code, Fakten mit Quelle, erst analysieren, dann Ergebnis.
  3. Unsicherheit benennen: belegt, vermutet oder offen.
  4. Erst verstehen oder nachstellen, dann ändern.
  5. Dreht sich die KI im Kreis: nicht neu würfeln, sondern neue Infos geben oder neu anfangen (`retry-stop`).
  6. Wiederkehrende Aufgabe: Prompt als Vorlage aufheben – der Fall wechselt, die Vorlage bleibt.
