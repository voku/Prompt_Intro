# Prompt Engineering in der Praxis

> **Von plausiblen Antworten zu belastbarer Arbeit:** Wie wir aufhören, den Computer anzuschreien, und anfangen, echte Ergebnisse zu erzielen.

🔗 **Live:** https://voku.github.io/Prompt_Intro/

## Übersicht & Storyline

Die interaktive React + TypeScript Präsentation verbindet ein **praktisches mentales Modell von LLMs** mit **konkreten Arbeitsweisen für den Alltag**: klare Aufträge, passende Werkzeuge, überprüfbare Aussagen und wiederverwendbare Vorlagen.

### Prolog
1. **Vor langer Zeit, in einer LLM-Präsentation weit, weit entfernt …** — Rückblick auf den letzten Vortrag
2. **Dann bekam der Chatbot plötzlich Fähigkeiten** — der Sprung zu Werkzeugen, Dateien, Code & Agents
3. **Prompt Engineering in der Praxis** — Titelfolie, „Level 2 // lädt …“

### Kapitel 1 – Verstehen
4. *Kapitel-Trennfolie*
5. **Der selbstbewusste Praktikant** — „Ein LLM klingt genauso überzeugend, wenn es falsch liegt.“ (Chat-Illustration)
6. **50 Meter? Laufen klingt super. Falsche Aufgabe.** — animierte Waschanlagen-Szene
7. **Unpuzzles** — echtes Rätselpaar aus dem Google-DeepMind-Datensatz
8. **Da war nichts. Beide Modelle fanden trotzdem etwas.** — live TV-Rauschen + Stempel
9. **Buchstaben, Wörter, Tokens** — `strawberry` schnappt zu Tokens zusammen
10. **Plausible Fortsetzung ist keine Wahrheitsdatenbank** — animierte Wahrscheinlichkeitsbalken

### Kapitel 2 – Führen (entlang der Führungs-Treppe)
11. *Kapitel-Trennfolie*
12. **Wie viel Führung braucht die Aufgabe?** — Treppe: direkt fragen → Kontext → Struktur → Werkzeuge
13. **Stufe 2: Rolle, Kontext, Ziel** — Mail an die Kommune
14. **Stufe 3: Erst analysieren, dann liefern** — Wartungsplan
15. **Aus dem Büro: Notizen → Protokoll** — festes Format, Lücken bleiben „offen“
16. **Stufe 4: Rechnen mit Code** — mit Skript-Ausgabe und sichtbarer Annahme
17. **Stufe 4: Fakten mit Quelle** — Suche + Quelle pro Aussage

### Kapitel 3 – Prüfen
18. *Kapitel-Trennfolie*
19. **Benutzer sagt: „VPN geht wieder.“ Ticket zu?** — Prüftabelle belegt / vermutet / offen
20. **Bestell keine drei Fehler** — Fundquote vs. Widerlegungsversuche
21. **Freitag, 16:47 Uhr. 742 Benutzer.** — alles zusammen als Arbeitsauftrag

### Kapitel 4 – Wiederverwenden
22. *Kapitel-Trennfolie*
23. **Kleine Vorlagen-Toolbox statt Mega-Prompt** — Vorlage + Fall → Arbeitsauftrag (`#vorlagen`)
24. **Drei Schranken vor dem Einfügen** — Dienst, Daten, Mensch
25. **Drei Dinge zum Mitnehmen** — drei Karten, die nacheinander erscheinen

---

## Interaktive Features

- **Präsentationsmodus:** Taste `P` (oder Button im Header, oder `?present` an der URL) blendet Header und Fußleiste aus, vergrößert die Schrift auf großen Screens und versteckt den Mauszeiger. Maus an den oberen/unteren Rand blendet die Steuerung ein, eine dünne Linie unten zeigt den Fortschritt. `P` oder `Esc` beendet den Modus.
- **Passt auf jeden Beamer:** Der Folieninhalt wird automatisch verkleinert, wenn er nicht in den Bildschirm passt (getestet bei 1920×1080 und 1366×768).
- **Deep-Links:** `#12` öffnet Folie 12, `#vorlagen` die Toolbox; die Adresszeile folgt der aktuellen Folie.
- **Retro HUD & Keyboard-Navigation:** Vor/Zurück (Pfeiltasten, Leertaste), Touch-Swipe, Vollbild und Grid-Übersicht.
- **Bilingual (DE / EN):** Vollständig umschaltbar zwischen Deutsch und Englisch im HUD.
- **Interaktive Vorher/Nachher-Vergleiche:** Standard-Prompt vs. optimierter Prompt mit aufklappbaren Arbeitsaufträgen.
- **Klickbare Vorlagen-Toolbox:** Auf Folie 23 zeigen drei Fälle animiert, wie aus Vorlage und Fall ein Arbeitsauftrag wird; die Vorlagen lassen sich kopieren.
- **Unpuzzles-Folie:** Echtes Rätselpaar aus dem DeepMind-Datensatz (Original vs. trivial gemachte Variante) mit Reveal per Klick; Quelle und Lizenz stehen auf der Folie.
- **Boxen nach und nach:** Auf Titel-, Recap-, Aussage-, Takeaway- und Fazit-Folien blendet jeder Klick die nächste Box ein, eine Pointe kommt zuletzt (Schrittzahl pro Folie in `revealSteps.ts`, Zustand `revealStep` in `App.tsx`).
- **Pointen-Kette:** Auf den Folien 6–10, 16, 17 und 19–21 blendet der nächste Klick erst eine Pointe ein; eine 🐇-Frage leitet jeweils zur nächsten Folie über (Feld `punchline` / `punchlineNext` in `constants.ts`).
- **Animierte Visuals:** Waschanlagen-Szene, Münz-Rätsel, Live-Rauschen, Token-Animation, Wahrscheinlichkeitsbalken, Führungs-Treppe, VPN-Prüftabelle, Fundquote vs. Widerlegung, Compliance-Schranken. Alle respektieren `prefers-reduced-motion`.
- **Vorher/Nachher mit Ergebnis:** Vergleichsfolien zeigen optional die Ausgabe des guten Prompts – als Terminal oder als Tabelle mit hervorgehobenen „offen“-Feldern.

---

## Lokal ausführen

```bash
npm install
npm run typecheck
npm run dev
```

Production Build:

```bash
npm run typecheck
npm run build
```

---

## Relevante Dateien

| Datei | Zweck |
|---|---|
| `introSlides.ts` | 2-Folien-Brücke mit Reaction-GIFs aus dem vorherigen Vortrag |
| `constants.ts` | 23-Folien-Hauptdeck inkl. 4 Kapitel-Trennfolien (Verstehen → Führen → Prüfen → Wiederverwenden) |
| `components/ChapterSlide.tsx` | Kapitel-Trennfolie mit rotem Faden |
| `components/PromptComparison.tsx` | Gegenüberstellung von Standard-Prompt vs. optimiertem Prompt / Arbeitsauftrag |
| `components/SlideLayout.tsx` | Layout-Renderer für alle Folientypen (Titel, Kapitel, Aussage, Visual, Vergleich, Fazit) |
| `components/VisualPanel.tsx` | Verteiler auf die animierten Visuals in `components/visuals/` |
| `components/StatementSlide.tsx`, `components/EndSlide.tsx` | Aussage-Folie mit Chat-Illustration, Fazit mit drei Karten |
| `components/useFitToBox.ts` | Auto-Fit: verkleinert den Folieninhalt, bis er in den Bildschirm passt |
| `components/L2ToolboxPanel.tsx` | Animierte Vorlagen-Toolbox (Vorlage + Fall → Arbeitsauftrag) |
| `index.css`, `tailwind.config.js` | Lokal gebautes Tailwind plus Design-Tokens – keine CDN-Abhängigkeit, läuft offline |
| `public/images/` | Lokale Kopien der Reaction-GIFs (Schriften kommen über `@fontsource`) |
| `App.tsx` | Präsentationssteuerung, Progress-Tracking, Timer und Modals |
| `PRESENTATION-NOTES-DE.md` | Umfassende deutsche Vortragsnotizen für den Sprecher |
