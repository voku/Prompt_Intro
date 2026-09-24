# Prompt Engineering in der Praxis

> **Von plausiblen Antworten zu belastbarer Arbeit:** Wie wir aufhören, den Computer anzuschreien, und anfangen, echte Ergebnisse zu erzielen.

🔗 **Live:** https://voku.github.io/Prompt_Intro/

## Übersicht & Storyline

Die interaktive React + TypeScript Präsentation vereint das **fundierte mentale Modell von LLMs** (Tokens, Muster, Halluzinationen) mit **praxisnahen Prompt-Techniken für den Arbeitsalltag** und robusten Methoden für anspruchsvolle IT-Arbeit:

### 1. Brücke & Einstieg
1. **Vor langer Zeit, in einer LLM-Präsentation weit, weit entfernt …** — Rückblick auf die Grundlagen (Text in → plausibler Text raus)
2. **Dann bekam der Chatbot plötzlich Hände** — Der Sprung zu Werkzeugen, Datei-Inspektion, Code & Agents

### 2. Titelfolie & Das Kernproblem
3. **Prompt Engineering in der Praxis** — Titelfolie mit Leitplanken, Werkzeugen und den 4 Kernsäulen
4. **Das LLM-Problem** — Warum ChatGPT wie ein selbstbewusster, aber ahnungsloser Praktikant wirkt

### 3. Mentales Modell (Warum LLMs so arbeiten)
5. **50 Meter? Laufen klingt super. Falsche Aufgabe.** — Expliziter Hinweis vs. implizites Ziel (Waschanlage)
6. **Da war nichts. Beide Modelle fanden trotzdem etwas.** — Halluzinierte Beobachtung im Rauschbild & Ground Truth
7. **Buchstaben, Wörter, Tokens: nicht dasselbe** — Tokenisierung vs. deterministische Werkzeuge
8. **Plausible Fortsetzung ist keine Wahrheitsdatenbank** — Kontextuelle Passung vs. Evidenz

### 4. Werkzeuge statt Raten (Mathe & Fakten)
9. **Beispiel: Logik & Mathe** — *Code-Aided Reasoning (PoT)*: Müllwagen-Dieselkosten mit Python berechnen
10. **Beispiel: Fakten & Wissen** — *Fact Grounding & Tool Use*: Vorstand einer Firma mit Google Search & Quellen-URLs

### 5. Führung nach Bedarf & Kerntechniken
11. **Wie viel Führung braucht die Aufgabe?** — Direkt fragen → Kontext & Beispiele → Aufgabe strukturieren → Werkzeuge & Prüfung
12. **Technik: Erst analysieren, dann Ergebnis erstellen** — Wartungsplan für Sortieranlage X strukturieren
13. **Technik: Persona & Kontext** — Glatteis-Mail an Kommune aus Sicht der Betriebsleitung eines Entsorgungsbetriebs
14. **Technik: Strukturierte Ausgabe** — Unfallbericht als JSON; im Chat per Prompt, per API per Schema

### 6. Robuste IT-Methoden (Auftrag, Evidenz, Agents)
15. **Darum bauen wir einen Auftrag – keinen Zauberspruch** — `Vorlage (L2) + heutiger Fall → Arbeitsauftrag (L1)`
16. **Freitag, 16:47 Uhr. 742 Benutzer. Ein verdächtiges Mapping.** — CSV-Benutzerimport mit konkretem Arbeitsauftrag
17. **Benutzer sagt: „VPN geht wieder.“ Ticket zu?** — Benutzeraussage vs. beobachtete Evidenz
18. **Kontext ist keine Erlaubnis** — Relevanz („Ansehen?“) vs. Befugnis („Ändern?“)
19. **Unsicherheit braucht einen Namen** — belegt / vermutet / offen
20. **Bestell keine drei Fehler** — Change-Review: Ernsthafte Falsifikation statt Fundquote
21. **Auto-Agent ohne Selbstfreigabe** — Autonomes Weiterarbeiten innerhalb der Freigabe
22. **Kleine L2-Toolbox statt Mega-Prompt** — Drei Alltagsfälle mit Animation: Vorlage + Fall → Arbeitsauftrag

### 7. Sicherheit & Abschluss
23. **Sicherheit & Compliance** — Freigegebener Dienst + zulässige Daten, Human in the Loop
24. **Zusammenfassung & Takeaways** — Sechs Kernregeln: bessere Arbeit, nicht hübschere Prompts

---

## Interaktive Features

- **Retro HUD & Keyboard-Navigation:** Vor/Zurück (Pfeiltasten, Leertaste), Touch-Swipe, Vollbild und Grid-Übersicht.
- **Bilingual (DE / EN):** Vollständig umschaltbar zwischen Deutsch und Englisch im HUD.
- **Interaktive Vorher/Nachher-Vergleiche:** Standard-Prompt vs. optimierter Prompt mit aufklappbaren L1-Aufträgen.
- **Klickbare L2-Toolbox:** Auf Folie 22 zeigen drei Fälle animiert, wie aus Vorlage und Fall ein Arbeitsauftrag wird; die Vorlagen lassen sich kopieren.
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
| `constants.ts` | 22-Folien-Hauptdeck (Mentales Modell, Praxisfälle, IT-Methoden, Compliance) |
| `components/PromptComparison.tsx` | Gegenüberstellung von Standard-Prompt vs. optimiertem Prompt / Arbeitsauftrag (L1) |
| `components/SlideLayout.tsx` | Layout-Renderer für Titel, Visual Panels, leveled Content Cards und Comparisons |
| `components/VisualPanel.tsx` | Visuelle Render-Panels für Waschanlage, Rauschen, Tokens, Scope, etc. |
| `components/L2ToolboxPanel.tsx` | Animierte L2-Toolbox (Vorlage + Fall → Arbeitsauftrag) |
| `App.tsx` | Präsentationssteuerung, Progress-Tracking, Timer und Modals |
| `PRESENTATION-NOTES-DE.md` | Umfassende deutsche Vortragsnotizen für den Sprecher |
