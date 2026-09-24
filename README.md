# Prompt Engineering in der Praxis

> **Von plausiblen Antworten zu belastbarer Arbeit:** Wie wir aufhören, den Computer anzuschreien, und anfangen, echte Ergebnisse zu erzielen.

🔗 **Live:** https://voku.github.io/Prompt_Intro/

## Übersicht & Storyline

Die interaktive React + TypeScript Präsentation verbindet ein **praktisches mentales Modell von LLMs** mit **konkreten Arbeitsweisen für den Alltag**: klare Aufträge, passende Werkzeuge, überprüfbare Aussagen und wiederverwendbare Vorlagen.

### 1. Brücke & Einstieg
1. **Vor langer Zeit, in einer LLM-Präsentation weit, weit entfernt …** — Rückblick auf die Grundlagen
2. **Dann bekam der Chatbot plötzlich Hände** — Der Sprung zu Werkzeugen, Datei-Inspektion, Code & Agents

### 2. Titelfolie & Kernproblem
3. **Prompt Engineering in der Praxis** — persönliche Haltung: Vertrauen entsteht durch prüfbare Schritte
4. **Das LLM-Problem** — Modell-Output ist nicht automatisch Beobachtung oder Wahrheit

### 3. Mentales Modell
5. **50 Meter? Laufen klingt super. Falsche Aufgabe.** — expliziter Hinweis vs. implizites Ziel
6. **Da war nichts. Beide Modelle fanden trotzdem etwas.** — Halluzination vs. Ground Truth
7. **Buchstaben, Wörter, Tokens: nicht dasselbe** — Tokenisierung vs. deterministische Werkzeuge
8. **Plausible Fortsetzung ist keine Wahrheitsdatenbank** — Kontextpassung vs. Evidenz

### 4. Werkzeuge statt Raten
9. **Beispiel: Logik & Mathe** — reproduzierbare Berechnung mit Code
10. **Beispiel: Fakten & Wissen** — aktuelle Fakten mit Suche und überprüfbaren Quellen

### 5. Führung nach Bedarf & Kerntechniken
11. **Wie viel Führung braucht die Aufgabe?** — direkt fragen → Kontext → Struktur → Werkzeuge & Prüfung
12. **Technik: Erst analysieren, dann Ergebnis erstellen** — Wartungsplan strukturiert erarbeiten
13. **Technik: Persona & Kontext** — Rolle, Ziel, Kontext und Ton explizit machen
14. **Technik: Strukturierte Ausgabe** — Chat-Format vs. echtes Schema per API

### 6. Belastbare Praxis
15. **Freitag, 16:47 Uhr. 742 Benutzer. Ein verdächtiges Mapping.** — CSV-Import als überprüfbarer Arbeitsauftrag
16. **Benutzer sagt: „VPN geht wieder.“ Ticket zu?** — Benutzeraussage vs. beobachtete Prüfung
17. **Bestell keine drei Fehler** — ernsthafte Falsifikationsversuche statt Fundquote
18. **Kleine Vorlagen-Toolbox statt Mega-Prompt** — Vorlage + heutiger Fall → konkreter Arbeitsauftrag

### 7. Sicherheit & Abschluss
19. **Sicherheit & Compliance** — freigegebener Dienst + zulässige Daten
20. **Zusammenfassung & Takeaways** — sechs Kernregeln für bessere, überprüfbare Arbeit

---

## Interaktive Features

- **Retro HUD & Keyboard-Navigation:** Vor/Zurück (Pfeiltasten, Leertaste), Touch-Swipe, Vollbild und Grid-Übersicht.
- **Bilingual (DE / EN):** Vollständig umschaltbar zwischen Deutsch und Englisch im HUD.
- **Interaktive Vorher/Nachher-Vergleiche:** Standard-Prompt vs. optimierter Prompt mit aufklappbaren Arbeitsaufträgen.
- **Klickbare Vorlagen-Toolbox:** Auf Folie 18 zeigen drei Fälle animiert, wie aus Vorlage und Fall ein Arbeitsauftrag wird; die Vorlagen lassen sich kopieren.
- **Visuelle Diagramme & Animationen:** Integrierte visuelle Panels für Waschanlage, Rauschbild, Tokens, Next-Token, Vorlage → Arbeitsauftrag, Scope-Map, Evidenzzustände und Agent-Loops.

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
| `constants.ts` | 18-Folien-Hauptdeck (Mentales Modell, Praxisfälle, IT-Methoden, Compliance) |
| `components/PromptComparison.tsx` | Gegenüberstellung von Standard-Prompt vs. optimiertem Prompt / Arbeitsauftrag |
| `components/SlideLayout.tsx` | Layout-Renderer für Titel, Visual Panels, leveled Content Cards und Comparisons |
| `components/VisualPanel.tsx` | Visuelle Render-Panels für Waschanlage, Rauschen, Tokens, Scope, etc. |
| `components/L2ToolboxPanel.tsx` | Animierte Vorlagen-Toolbox (Vorlage + Fall → Arbeitsauftrag) |
| `App.tsx` | Präsentationssteuerung, Progress-Tracking, Timer und Modals |
| `PRESENTATION-NOTES-DE.md` | Umfassende deutsche Vortragsnotizen für den Sprecher |
