# Präsentationsnotizen – Prompt Engineering in der Praxis

> **Untertitel:** Wie wir aufhören, den Computer anzuschreien, und anfangen, echte Ergebnisse zu erzielen – von plausiblen Antworten zu belastbarer Arbeit.

---

## Ziel & roter Faden

Die Präsentation verbindet ein **praktisches Verständnis von Sprachmodellen** (Tokens, Plausibilität vs. Wahrheit) mit **konkreten Arbeitsweisen für den Arbeitsalltag**: klare Aufträge, passende Werkzeuge, überprüfbare Aussagen, wiederverwendbare Vorlagen und Compliance.

Die Botschaft ist ausdrücklich **nicht** „LLMs sind dumm“. Die Kernaussage lautet:

> **LLMs sind extrem mächtig darin, Muster zu erkennen, Kontext fortzusetzen und Tools zu bedienen.**
> Aber sie kennen unsere Gedanken nicht. Wer vage fragt, bekommt leicht plausible, aber unzuverlässige Antworten. Wer Ziel, Kontext, passende Werkzeuge und Prüfwege vorgibt, bekommt bessere Ergebnisse – und kann wichtige Aussagen nachvollziehen.

### Roter Faden: Verstehen → Führen → Prüfen → Wiederverwenden
Vier Trennfolien (Folien 4, 11, 18, 22) gliedern den Vortrag. Jede stellt die Leitfrage des Kapitels und zeigt, wo wir im Faden stehen. Die Segmente in der Fortschrittsleiste unten sind entsprechend gruppiert.

Kapitel 2 folgt außerdem der **Führungs-Treppe** (Folie 12): Stufe 2 Rolle/Kontext → Stufe 3 Struktur → Stufe 4 Werkzeuge. Jede Beispielfolie zeigt oben rechts, auf welcher Stufe sie steht.

### Pointen-Kette (Follow the white rabbit 🐇)
Auf den Folien 6–10, 16, 17 und 19–21 blendet der nächste Klick erst eine **Pointe** ein, bevor es weitergeht (← nimmt sie wieder weg). Bei Waschanlage, Unpuzzles, Rauschbild und VPN löst derselbe Klick auch das Bild auf (zweite Fahrspur, richtige Antwort, Stempel). Jede Pointe beantwortet das *Warum* der Folie; die 🐇-Zeile stellt die Frage, die die nächste Folie beantwortet:

Waschanlage (Muster überlagert Ziel) → Unpuzzle (dasselbe Muster, wissenschaftlich vermessen) → Rauschbild (Muster ohne Beobachtung) → Tokens (warum das Modell anders „sieht“) → Next Token (gemeinsame Wurzel: plausibel ≠ belegt) → *Kapitel Führen* → … → Mathe (Rechnen an Code abgeben) → Fakten (Quelle pro Aussage) → *Kapitel Prüfen* → VPN (Waschanlagen-Muster im Ticket) → Drei Fehler (wir schreiben das Muster selbst in die Frage) → CSV-Import (alles zusammen) → zurück zur Waschanlage.

Die Pointe vorlesen, die 🐇-Frage stellen, dann klicken – nicht vorab erklären.

### Ein wiederkehrendes Beispiel
Der „§ 7 der Betriebsvereinbarung“ taucht zweimal auf: auf Folie 5 als selbstbewusste Chat-Antwort, auf Folie 10 als gefährliche Fortsetzung. Beim zweiten Mal reicht ein „Da ist er wieder“.

---

**Vor dem Vortrag:**
* `P` drücken (Präsentationsmodus, kein Header) und – falls gewünscht – zusätzlich Vollbild. Steuerung erscheint, wenn die Maus den oberen oder unteren Rand berührt; `Esc` beendet den Modus.
* Jede Folie hat einen Link: `#12` springt zu Folie 12, `#vorlagen` zur Toolbox.
* Die Folien passen sich der Auflösung an: Ist der Beamer kleiner als 1920×1080, wird der Inhalt automatisch verkleinert statt abgeschnitten.
* **Boxen kommen nach und nach:** Auf der Titelfolie, den beiden Recap-Folien, der Aussage-Folie (5), den Folien mit Takeaway-Leiste (12, 20, 24) und der Fazit-Folie blendet jeder Klick die nächste Box ein (← nimmt sie wieder weg). Eine Pointe kommt immer als letzter Klick. Heißt: bei diesen Folien ein paar Klicks einplanen.
* Die Animationen starten beim Aufruf der Folie. Wer eine Folie nochmal sehen will: kurz zurück und wieder vor.

## Ablauf & Notizen pro Folie

### 1 – Vor langer Zeit, in einer LLM-Präsentation weit, weit entfernt … (Folie 1)
* Erst den alten Star Wars GIF wirken lassen.
* Kurze Brücke:
  > „Beim letzten Mal ging es um die Grundlagen: Text rein → plausible Antwort raus. Gut zum Zusammenfassen, Übersetzen, Coden. Das Modell lernt Muster und setzt Text plausibel fort.“

### 2 – Dann bekam der Chatbot plötzlich Fähigkeiten (Folie 2)
* Die beiden GIFs als Zeitmarker:
  - Links: Früher ging es überwiegend um Text-Antworten.
  - Rechts: Heute lesen Modelle Dateien, nutzen Suchmaschinen und APIs, schreiben und testen Code und führen mehrstufige Aufgaben aus.
* Der Schlüsselsatz:
  > „Der Fähigkeitssprung ist enorm. Aber mehr Fähigkeiten machen eine plausible Antwort nicht automatisch wahr. Die Frage lautet heute: Wie geben wir dem Modell Arbeit so, dass das Ergebnis nachweisbar belastbar ist?“

### 3 – Prompt Engineering in der Praxis (Folie 3 / Titel)
* Die eigentliche Titelfolie – hier steht meine Haltung, sie ist der rote Faden des Vortrags:
  > „Ich arbeite jeden Tag mit LLMs und vertraue ihnen echte Arbeit an. Vertrauen entsteht aber durch prüfbare Schritte – nicht durch eine überzeugende Antwort.“
* Ein eigenes Beispiel erzählen: wo mir ein LLM zuletzt richtig Arbeit abgenommen hat – und wo es mich reingelegt hätte.
* Rechts die Save-Game-Karte: „Level 1 // geschafft“ ist der letzte Vortrag („Willkommen in der Welt der LLMs!“), „Level 2 // lädt …“ ist dieser – das Sequel.

### 4 – Kapitel 1 – Verstehen (Folie 4)
* Trennfolie. Der rote Faden in vier Schritten: **Verstehen → Führen → Prüfen → Wiederverwenden**; erledigte Schritte sind abgehakt, der aktuelle leuchtet.
* Frage vorlesen: „Warum klingt das Modell richtig, auch wenn es falsch liegt?“ – die nächsten sechs Folien beantworten sie.

### 5 – Der selbstbewusste Praktikant (Folie 5)
* **Eine Aussage, groß:** „Ein LLM klingt genauso überzeugend, wenn es falsch liegt.“
* Rechts tippt sich eine Chat-Antwort ein: Frage nach „unserer Betriebsvereinbarung zum Einsatz künstlicher Intelligenz“, Antwort „Nur KI-Software von der Whitelist …“. Darunter: *Wie sicher es klingt* 100 %, *Was belegt ist* 0 % – das Dokument wurde nie hochgeladen.
* Das ist als **Illustration** markiert – nicht als Mitschnitt eines bestimmten Modells ausgeben.
* **Metapher:** Der überaus selbstbewusste Praktikant am ersten Arbeitstag: Statt „keine Ahnung“ kommt eine überzeugende Geschichte.
* Drei Punkte: gute Geschichte statt „keine Ahnung“ · Schwachstellen Rechnen, aktuelle Fakten, Zitate · Antwort: Werkzeuge und Leitplanken.

### 6 – 50 Meter? Laufen klingt super. Falsche Aufgabe. (Folie 6)
* Prompt: *„Ich will mein Auto waschen. Die Waschanlage ist 50 Meter entfernt. Laufen oder fahren?“*
* Die Szene spielt ab: Jemand läuft die 50 m zur Waschanlage – das Auto bleibt zu Hause („Angekommen. Ohne Auto.“). Darunter steht: „Was fehlt in dieser Szene?“ – kurz ins Publikum fragen.
* **Klick:** Die zweite Fahrspur erscheint, das Auto fährt in die Waschanlage, dazu die Pointe: „Starke Muster in Fragen können das eigentliche Ziel überlagern.“
  🐇 *„Und was passiert, wenn ein berühmtes Rätsel unbemerkt trivial wird?“* → Unpuzzles.
* Zwei Mini-Beispiele, je ein Satz, beide kommen später ausführlich:
  - *„Finde drei Fehler in diesem Code.“* – Die Zahl lenkt die Suche. (→ Folie 20)
  - *„Der Benutzer sagt, VPN geht wieder. Ticket schließen?“* – Klingt gelöst, ist aber kein Nachweis. (→ Folie 19)
* **Formulierung:** Nicht „das LLM macht nur Pattern Matching“ – zu grob. Besser:
  > „Das Modell arbeitet stark über gelernte sprachliche Muster. Ein starkes Muster in der Frage kann dabei das eigentliche Ziel überlagern.“

### 7 – Unpuzzles: Das Rätsel wird einfacher, das Modell schlechter (Folie 7)
* **Herkunft (sauber zitieren):** Malek, Ge, Lazic, Jin, György, Szepesvári (Google DeepMind), *„Frontier LLMs Still Struggle with Simple Reasoning Tasks“*, 2025 ([arXiv 2507.07313](https://arxiv.org/abs/2507.07313)). Datensatz mit 97 Rätselpaaren (Original + Unpuzzle) unter Apache-2.0: `github.com/google-deepmind/unpuzzles_and_simple_reasoning`.
* **Das Paar auf der Folie** („The Coin Weighing Puzzle“, Eintrag 9 in `datasets/unpuzzles.json`, deutsch frei übersetzt):
  - Original: 12 Münzen, eine ist falsch (schwerer *oder* leichter), Balkenwaage – wie viele Wägungen mindestens? → **3**.
  - Unpuzzle: derselbe Text plus *„Sie hat außerdem eine andere Farbe.“* → **0**. Auf der Folie leuchtet Münze 8 gelb – man sieht es einfach.
* **Ablauf:** Beide Texte zeigen, den markierten Satz benennen, das Publikum raten lassen. **Klick** → „Musterantwort: 3“ wird durchgestrichen, „Richtig: 0“ erscheint, dazu die Pointe.
* **Ehrlich bleiben:** Die Folie behauptet **nicht**, dass ein bestimmtes Modell hier „3“ sagt. Die Studie zeigt ein systematisches Muster über viele Modelle und Rätsel („tend to fail“, Bezug zum Auswendiglernen der Originale). Wer es live zeigen will: das Paar vorab im eigenen Modell testen und das tatsächliche Ergebnis erzählen.
* 🐇 *„Und wenn es gar kein Rätsel gibt – nur Rauschen?“* → Rauschbild.

### 8 – Da war nichts. Beide Modelle fanden trotzdem etwas. (Folie 8)
* Links läuft echtes TV-Rauschen. Rechts tippen sich nacheinander die beiden Modell-Antworten ein („I love you.“ / „Prompt-Injection … Rose“).
* **Merksatz:**
  > „Eine überzeugende Beschreibung ist keine Beobachtung. Wenn Belege fehlen, ist ‚offen‘ die richtige Antwort – nicht die schönere Geschichte.“
* **Klick:** Stempel „KEINE NACHRICHT“ über dem Rauschen + Pointe: „Da war gar keine Nachricht. Beide Modelle haben ein Muster vervollständigt – beobachtet hat keins.“
  🐇 *„Warum sieht es Dinge, die nicht da sind – und übersieht Buchstaben, die da sind?“*

### 9 – Buchstaben, Wörter, Tokens: nicht dasselbe (Folie 9)
* `strawberry` wechselt alle paar Sekunden zwischen „Wie wir lesen“ (10 Zeichen, die drei `r` leuchten) und „Wie das Modell liest“ (Buchstaben schnappen zu Token-Blöcken zusammen, die `r` sind weg). Die Buttons oben schalten auch manuell um.
* Die Aufteilung ist **schematisch** – das steht auf der Folie.
* Unten: `"strawberry".count("r")` → **3**. Wenn exaktes Zählen zählt: Code.
* **Klick → Pointe:** „Das Modell arbeitet mit Tokens, nicht mit Buchstaben. Exakte Zeichenarbeit gehört in Code.“
  🐇 *„Wenn es keine Buchstaben sieht – was macht es dann eigentlich mit dem Text?“*

### 10 – Plausible Fortsetzung ist keine Wahrheitsdatenbank (Folie 10)
* Oben „Der Himmel ist …“: Balken wachsen, „blau“ gewinnt – harmlos.
* Unten der gefährliche Fall: „Laut § 7 Abs. 2 der Betriebsvereinbarung dürfen Mitarbeitende nur KI-Software von der …“ → „Whitelist“ gewinnt mit 44 %. Darunter: „Passt perfekt. Belegt? Das Dokument lag nie vor.“ – der Praktikant von Folie 5 ist zurück.
* Die Prozente sind **Illustration**, keine echten Modellwahrscheinlichkeiten (steht auf der Folie).
* **Klick → Pointe:** „Es wählt, was zum Kontext passt – nicht, was belegt ist. Das ist die gemeinsame Wurzel all dieser Fallen.“
  🐇 *„Wie kommt dann Wahrheit rein? Mit genau so viel Führung, wie die Aufgabe braucht.“*

### 11 – Kapitel 2 – Führen (Folie 11)
* Überleitung von „plausibel ≠ belegt“ zu „dann müssen wir dem Modell Struktur und Werkzeuge geben“.
* Frage: „Wie briefe ich ein Modell so, dass es wirklich liefern kann?“

### 12 – Wie viel Führung braucht die Aufgabe? (Folie 12)
* Die Treppe baut sich auf: 1 Direkt fragen · 2 Rolle, Kontext, Ziel · 3 Struktur vorgeben · 4 Werkzeuge & Prüfung. Unten die Achse „Wenig hängt dran → Ergebnis muss halten“.
* Ausdrücklich **keine** Leiter vom Anfänger zum Profi: Die meisten Alltagsfragen sind auf Stufe 1 richtig. Mehr Prompt ist nicht automatisch besser.
* Ankündigen: Die nächsten fünf Folien gehen die Treppe einmal hoch – oben rechts steht jeweils die Stufe.

### 13 – Stufe 2: Rolle, Kontext, Ziel (Folie 13)
* **Szenario:** Tonnen nicht geleert wegen Glatteis – Mitteilung an die Kommune.
* Ohne Kontext: generische Standard-Entschuldigung. Mit Rolle, Kontext, Ziel und Ton: eine Mail, die man abschicken kann.

### 14 – Stufe 3: Erst analysieren, dann liefern (Folie 14)
* **Szenario:** Wartungsplan für Sortieranlage X.
* Die Struktur legt fest, was zuerst geklärt wird: Komponenten → Risiken → Plan → Lücken markieren.
* „Denk Schritt für Schritt“ ist kein Zauberspruch mehr – aktuelle Modelle denken ohnehin mit. Der Gewinn kommt daraus, dass *wir* die Reihenfolge festlegen.

### 15 – Aus dem Büro: Notizen → Protokoll (Folie 15)
* **Das Beispiel für alle, die nicht in der IT sitzen.** Links rohe Notizen einer Teamrunde, rechts der Prompt mit festem Tabellenformat und der Regel „fehlt etwas → ‚offen‘, nichts erfinden“.
* Darunter baut sich das Ergebnis als Tabelle auf; die „offen“-Felder leuchten gelb.
* **Pointe mündlich:** „Ohne Regeln sieht das Protokoll vollständig aus – samt ausgedachtem Termin fürs Sommerfest.“
* Für Technik-Publikum ergänzen: Per API lieber ein echtes JSON-Schema (Structured Output) – dann erzwingt das System das Format.

### 16 – Stufe 4: Rechnen mit Code (Folie 16)
* **Szenario:** Müllwagen, 32 L/100 km, 2 × 45 km/Tag, Diesel 1,70 €, November 2024 ohne Sonntage.
* Unter dem optimierten Prompt läuft die Skript-Ausgabe ein: 26 Werktage · 2340 km · 748,8 L · **1.272,96 €** (nachgerechnet).
* **Der eigentliche Gewinn steht in der letzten Zeile:** „Annahme: Feiertage nicht abgezogen (z. B. 1.11.)“. Allerheiligen ist in Baden-Württemberg, Bayern, NRW, Rheinland-Pfalz und dem Saarland Feiertag. Code macht nicht nur die Zahl prüfbar, sondern auch die Annahme sichtbar.
* **Vorher testen:** Aktuelle Reasoning-Modelle rechnen das oft richtig. Die Botschaft bleibt die Nachprüfbarkeit.
* **Klick → Pointe:** „Nicht dem Kopfrechnen des Modells vertrauen – den Rechenweg prüfbar machen.“
  🐇 *„Rechnen lässt sich an Code abgeben. Und Fakten?“*

### 17 – Stufe 4: Fakten mit Quelle (Folie 17)
* **Szenario:** „Wer sitzt aktuell im Vorstand der Siemens AG?“
* Ohne Suche: womöglich ein alter Vorstand oder erfundene Namen. Mit Suche auf der offiziellen Website + URL pro Person: nachprüfbar.
* **Klick → Pointe:** „Suche allein ist kein Beleg. Erst die Quelle pro Aussage macht die Antwort prüfbar.“
  🐇 *„Und wenn das Modell sagt ‚erledigt‘ – woher wissen wir, dass es stimmt?“*

### 18 – Kapitel 3 – Prüfen (Folie 18)
* Ab hier drei Praxisfälle aus dem IT-Alltag. Gemeinsamer Nenner: Wer sagt, dass es wirklich erledigt ist – und womit belegt er das?

### 19 – Benutzer sagt: „VPN geht wieder.“ Ticket zu? (Folie 19)
* Oben die Chatblase des Benutzers. Darunter füllt sich Zeile für Zeile die Prüftabelle: Anmeldung *belegt* · MFA *vermutet* (nur Benutzeraussage) · DNS *offen* · Fileshare *offen*. „Ticket schließen“ bleibt gesperrt.
* Rückbezug auf Folie 6: „Klingt gelöst → schließen“ ist genau so ein starkes Muster.
* **Klick:** Stempel „NOCH NICHT“ + Pointe: „‚Klingt gelöst → schließen‘ ist wieder das Waschanlagen-Muster: plausibel, aber nicht geprüft.“
  🐇 *„Und was, wenn wir das Muster selbst in die Frage schreiben?“*

### 20 – Bestell keine drei Fehler (Folie 20)
* Links „Nenn mir die 3 größten Risiken“: Die drei Plätze füllen sich – der dritte mit Füllmaterial, Stempel „AUFGEFÜLLT“.
* Rechts „Versuch den Plan 3× zu widerlegen“: 1 echter Fund, 2 sauber widerlegt – ehrliches Ergebnis. „Kein Problem gefunden“ ist gültig.
* Beide Spalten sind ein **beispielhafter** Change-Review.
* **Klick → Pointe:** „Wer drei Fehler bestellt, bekommt drei – ob es sie gibt oder nicht. Die Frage formt die Antwort.“
  🐇 *„Jetzt alles zusammen – an einem echten Freitagnachmittag.“*

### 21 – Freitag, 16:47 Uhr. 742 Benutzer. Ein verdächtiges Mapping. (Folie 21)
* Alles zusammen: Ziel, Grenzen, Prüfung, Erledigt-wenn – und vor der Aktion anhalten.
* Den daraus entstandenen Arbeitsauftrag aufklappen: erst Dry-Run, bestehende Konten schützen, jede Zeile belegen, fehlende Belege bleiben offen.
* **Klick → Pointe:** „Erst der Nachweis, dann die Aktion – und der Maßstab bleibt als Vorlage.“
  🐇 *„Zurück zur Waschanlage: Ziel, Prüfung und Belege sichtbar machen – und als Vorlage aufheben.“* – der Kreis schließt sich.

### 22 – Kapitel 4 – Wiederverwenden (Folie 22)
* Letzter Schritt: aus einem guten Prompt eine Vorlage machen und die Spielregeln klären.

### 23 – Kleine Vorlagen-Toolbox statt Mega-Prompt (Folie 23)
* Drei Karten: VPN-Fehler erst nachstellen · Volle Platte: erst Lücken klären · Schichtwechsel ohne Chatverlauf.
* Pro Karte läuft eine kurze Animation: Schnellschuss (durchgestrichen) → Vorlage + heutiger Fall → Arbeitsauftrag, Zeile für Zeile.
* „Nochmal abspielen“ wiederholt die Animation, „Vollständige Vorlage“ zeigt/kopiert den ganzen Prompt.

### 24 – Drei Schranken vor dem Einfügen (Folie 24)
* Ein Dokument wandert durch drei Schranken, jede leuchtet beim Passieren grün: **Dienst freigegeben?** · **Daten zulässig?** · **Mensch prüft?** – erst dann einfügen.
* Darunter: Im Zweifel IT-Security oder Datenschutz fragen.
* **Mündlich ergänzen (nicht auf der Folie, weil Open Source):** Welche Dienste bei uns konkret freigegeben sind und für welche Daten.

### 25 – Drei Dinge zum Mitnehmen (Folie 25)
* Drei Karten:
  1. Briefen wie eine kluge neue Kollegin: Rolle, Kontext, Ziel – und was „erledigt“ heißt.
  2. Abgeben, was Plausibilität nicht kann: Rechnen mit Code, Fakten mit Quelle.
  3. Sagen, was belegt, vermutet oder offen ist – und gute Prompts als Vorlage aufheben.
* Die Karten kommen mit je einem Klick. Aufgabe für morgen und QR-Code gibt es auf der Folie nicht mehr; die Toolbox bleibt über `#vorlagen` erreichbar – bei Bedarf mündlich nennen: „eine wiederkehrende Aufgabe als Arbeitsauftrag aufschreiben (Ziel, Kontext, Grenzen, Prüfung, Erledigt-wenn)“.
* Was früher hier stand und jetzt nur noch mündlich kommt: „Erst verstehen oder nachstellen, dann ändern“ und „Dreht sich die KI im Kreis? Nicht neu würfeln – neue Infos geben oder neu anfangen.“
