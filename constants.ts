import { SlideData, SlideType } from './types';

export const SLIDES: SlideData[] = [
  {
    id: 1,
    type: SlideType.TITLE,
    icon: 'BrainCircuit',
    title: 'Prompt Engineering in der Praxis',
    titleDE: 'Prompt Engineering in der Praxis',
    subtitle: 'I trust LLMs with real work – but only with verifiable steps.',
    subtitleDE: 'Ich vertraue LLMs echte Arbeit an – aber nur mit prüfbaren Schritten.',
  },

  // ── Chapter 1: Understand ────────────────────────────────────────────────
  {
    id: 200,
    type: SlideType.CHAPTER,
    chapter: 1,
    icon: 'Eye',
    title: 'Understand',
    titleDE: 'Verstehen',
    subtitle: 'Why does the model sound right even when it is wrong?',
    subtitleDE: 'Warum klingt das Modell richtig, auch wenn es falsch liegt?',
  },
  {
    id: 2,
    type: SlideType.STATEMENT,
    icon: 'AlertTriangle',
    title: 'The overconfident intern',
    titleDE: 'Der selbstbewusste Praktikant',
    subtitle: 'An LLM sounds just as convincing when it is wrong.',
    subtitleDE: 'Ein LLM klingt genauso überzeugend, wenn es falsch liegt.',
    content: [
      'When it does not know, it tends to tell a good story instead of saying “no idea”.',
      'Typical weak spots: arithmetic, current facts, citations.',
      'Our answer: tools and guardrails.',
    ],
    contentDE: [
      'Weiß es etwas nicht, erzählt es eher eine gute Geschichte als „keine Ahnung“.',
      'Typische Schwachstellen: Rechnen, aktuelle Fakten, Zitate.',
      'Unsere Antwort: Werkzeuge und Leitplanken.',
    ],
  },
  {
    id: 3,
    type: SlideType.CONTENT,
    visual: 'carwash',
    icon: 'CarFront',
    title: '50 Metres? Walking Sounds Great. Wrong Task.',
    titleDE: '50 Meter? Laufen klingt super. Falsche Aufgabe.',
    topic: 'Make the real goal visible',
    topicDE: 'Das echte Ziel sichtbar machen',
    punchline: 'Strong patterns in questions can overshadow the actual goal.',
    punchlineDE: 'Starke Muster in Fragen können das eigentliche Ziel überlagern.',
    punchlineNext: 'And what happens when a famous puzzle quietly becomes trivial?',
    punchlineNextDE: 'Und was passiert, wenn ein berühmtes Rätsel unbemerkt trivial wird?',
    subtitle: 'A model can process the visible clue perfectly – and still miss the unspoken goal.',
    subtitleDE: 'Ein Modell kann die sichtbare Information sauber verarbeiten und trotzdem das unausgesprochene Ziel verfehlen.',
    content: [
      'The model does not get the assumptions in our head for free.',
      'For important work: make goal and constraints visible.',
    ],
    contentDE: [
      'Unsere unausgesprochenen Annahmen bekommt das Modell nicht mitgeliefert.',
      'Bei wichtiger Arbeit: Ziel und Randbedingungen sichtbar machen.',
    ],
  },
  {
    id: 204,
    type: SlideType.CONTENT,
    visual: 'unpuzzle',
    icon: 'Puzzle',
    title: 'Unpuzzles: Easier Puzzle, Worse Answer',
    titleDE: 'Unpuzzles: Das Rätsel wird einfacher, das Modell schlechter',
    topic: 'Pattern recognised, task missed',
    topicDE: 'Muster erkannt, Aufgabe übersehen',
    punchline: 'The more famous the original, the stronger the pull of the memorised solution – even when the puzzle has become trivial.',
    punchlineDE: 'Je berühmter das Original, desto stärker der Sog der auswendig gelernten Lösung – selbst wenn das Rätsel trivial geworden ist.',
    punchlineNext: 'And if there is no puzzle at all – only noise?',
    punchlineNextDE: 'Und wenn es gar kein Rätsel gibt – nur Rauschen?',
    subtitle: 'The car-wash trap, scientifically measured.',
    subtitleDE: 'Die Waschanlagen-Falle, wissenschaftlich vermessen.',
    content: [
      'Google DeepMind (Malek et al., 2025): 97 famous puzzles, each made trivial.',
      'Models often solve the original – and frequently fail the trivial version. Not every model on every puzzle.',
      'Dataset (Apache-2.0): github.com/google-deepmind/unpuzzles_and_simple_reasoning',
    ],
    contentDE: [
      'Google DeepMind (Malek et al., 2025): 97 berühmte Rätsel, jeweils trivial gemacht.',
      'Modelle lösen oft das Original – und scheitern häufig an der trivialen Variante. Nicht jedes Modell bei jedem Rätsel.',
      'Datensatz (Apache-2.0): github.com/google-deepmind/unpuzzles_and_simple_reasoning',
    ],
  },
  {
    id: 4,
    type: SlideType.CONTENT,
    visual: 'noise-hallucination',
    icon: 'ScanSearch',
    title: 'Nothing Was There. Both Models Found Something.',
    titleDE: 'Da war nichts. Beide Modelle fanden trotzdem etwas.',
    topic: 'Observation needs evidence',
    topicDE: 'Beobachtung braucht Belege',
    punchline: 'There was no message. Both models completed a pattern – neither observed anything.',
    punchlineDE: 'Da war gar keine Nachricht. Beide Modelle haben ein Muster vervollständigt – beobachtet hat keins.',
    punchlineNext: 'Why does it see things that are not there – and miss letters that are?',
    punchlineNextDE: 'Warum sieht es Dinge, die nicht da sind – und übersieht Buchstaben, die da sind?',
    subtitle: 'Pattern completion can sound exactly like observation – until someone checks reality.',
    subtitleDE: 'Mustererkennung kann exakt wie Beobachtung klingen – solange niemand gegen die Realität prüft.',
    content: [
      'A confident description is still only model output.',
      'If the source does not carry the claim, the right answer is “open” – not the nicer story.',
    ],
    contentDE: [
      'Eine selbstbewusste Beschreibung bleibt erstmal nur Modell-Output.',
      'Trägt die Quelle die Aussage nicht, ist „offen“ die richtige Antwort – nicht die schönere Geschichte.',
    ],
  },
  {
    id: 5,
    type: SlideType.CONTENT,
    visual: 'tokens',
    icon: 'Binary',
    title: 'Characters, Words, Tokens: Different Layers',
    titleDE: 'Buchstaben, Wörter, Tokens: nicht dasselbe',
    topic: 'Exactness needs tools',
    topicDE: 'Exaktheit braucht Werkzeuge',
    punchline: 'The model works on tokens, not letters. Exact character work belongs in code.',
    punchlineDE: 'Das Modell arbeitet mit Tokens, nicht mit Buchstaben. Exakte Zeichenarbeit gehört in Code.',
    punchlineNext: 'If it does not see letters – what does it actually do with the text?',
    punchlineNextDE: 'Wenn es keine Buchstaben sieht – was macht es dann eigentlich mit dem Text?',
    subtitle: 'A language model does not see text as the neat row of letters we see.',
    subtitleDE: 'Ein Sprachmodell sieht Text nicht als die saubere Buchstabenreihe, die wir vor Augen haben.',
    content: [
      'Tokenisation is model-specific – a token is not automatically a letter or a word.',
      'Counting, exact string work, arithmetic: use a deterministic tool.',
    ],
    contentDE: [
      'Tokenisierung ist modellabhängig – ein Token ist nicht automatisch ein Buchstabe oder ein Wort.',
      'Zählen, exakte Zeichenarbeit, Rechnen: deterministisches Werkzeug benutzen.',
    ],
  },
  {
    id: 6,
    type: SlideType.CONTENT,
    visual: 'next-token',
    icon: 'Sparkles',
    title: 'Plausible Continuation Is Not a Truth Database',
    titleDE: 'Plausible Fortsetzung ist keine Wahrheitsdatenbank',
    topic: 'Plausibility ≠ truth',
    topicDE: 'Plausibilität ≠ Wahrheit',
    punchline: 'It picks what fits the context – not what is proven. That is the common root of all these traps.',
    punchlineDE: 'Es wählt, was zum Kontext passt – nicht, was belegt ist. Das ist die gemeinsame Wurzel all dieser Fallen.',
    punchlineNext: 'So how does truth get in? With exactly as much guidance as the task needs.',
    punchlineNextDE: 'Wie kommt dann Wahrheit rein? Mit genau so viel Führung, wie die Aufgabe braucht.',
    subtitle: 'Generation rewards what fits. Truth needs evidence, search or tools.',
    subtitleDE: 'Generation belohnt, was passt. Wahrheit braucht Belege, Suche oder Werkzeuge.',
    content: [
      'That is why an invented claim can sound completely natural.',
      'Reasoning and tools help a lot – important claims still need evidence.',
    ],
    contentDE: [
      'Darum kann eine erfundene Behauptung völlig natürlich klingen.',
      'Reasoning und Tools helfen massiv – wichtige Aussagen brauchen trotzdem Belege.',
    ],
  },

  // ── Chapter 2: Guide ─────────────────────────────────────────────────────
  {
    id: 201,
    type: SlideType.CHAPTER,
    chapter: 2,
    icon: 'Compass',
    title: 'Guide',
    titleDE: 'Führen',
    subtitle: 'How do I brief a model so it can actually deliver?',
    subtitleDE: 'Wie briefe ich ein Modell so, dass es wirklich liefern kann?',
  },
  {
    id: 9,
    type: SlideType.CONTENT,
    visual: 'guidance-ladder',
    icon: 'Layers',
    title: 'How Much Guidance Does the Task Need?',
    titleDE: 'Wie viel Führung braucht die Aufgabe?',
    topic: 'As much as needed, no more',
    topicDE: 'So viel wie nötig, nicht mehr',
    subtitle: 'The more depends on the result, the higher you climb.',
    subtitleDE: 'Je mehr am Ergebnis hängt, desto weiter nach oben.',
    content: [
      'Most everyday questions are fine on step 1.',
      'The next slides climb the steps once – with one example each.',
    ],
    contentDE: [
      'Die meisten Alltagsfragen sind auf Stufe 1 gut aufgehoben.',
      'Die nächsten Folien gehen die Treppe einmal hoch – mit je einem Beispiel.',
    ],
  },
  {
    id: 11,
    type: SlideType.COMPARISON,
    step: 2,
    icon: 'UserCog',
    title: 'Step 2: Role, Context, Goal',
    titleDE: 'Stufe 2: Rolle, Kontext, Ziel',
    topic: 'Brief it like a new colleague',
    topicDE: 'Briefen wie eine neue Kollegin',
    subtitle: 'Who am I – and what do I want?',
    subtitleDE: 'Wer bin ich – und was will ich?',
    technique: 'Context',
    techniqueDE: 'Kontext',
    codeStandard: 'Write an email to the municipality that the bins were not emptied.',
    codeStandardDE: 'Schreib eine Mail an die Kommune, dass die Tonnen nicht geleert wurden.',
    codeOptimized: `Role: Operations manager at a waste-management company.
Context: Black ice blocked access to Street X.
Goal: Say we will make a second attempt tomorrow.
Tone: Professional, safety-conscious, cooperative.`,
    codeOptimizedDE: `Rolle: Betriebsleiter eines Entsorgungsbetriebs.
Kontext: Glatteis verhinderte die Zufahrt in Straße X.
Ziel: Informieren, dass wir morgen einen zweiten Versuch starten.
Ton: Professionell, sicherheitsbewusst, kooperativ.`,
    content: 'Without context: a generic apology. With “black ice” and “safety”: a mail you can send.',
    contentDE: 'Ohne Kontext: eine Standard-Entschuldigung. Mit „Glatteis“ und „Sicherheit“: eine Mail, die man abschicken kann.',
  },
  {
    id: 10,
    type: SlideType.COMPARISON,
    step: 3,
    icon: 'ListOrdered',
    title: 'Step 3: Analyse First, Then Produce',
    titleDE: 'Stufe 3: Erst analysieren, dann liefern',
    topic: 'Structure the task',
    topicDE: 'Aufgabe strukturieren',
    subtitle: 'Not a magic phrase – we decide what has to be clarified first.',
    subtitleDE: 'Kein Zauberspruch – wir legen fest, was zuerst geklärt wird.',
    technique: 'Structure',
    techniqueDE: 'Struktur',
    codeStandard: 'Create a maintenance plan for sorting plant X.',
    codeStandardDE: 'Erstelle einen Wartungsplan für die Sortieranlage X.',
    codeOptimized: `1. Analysis: Which components does plant X have?
2. Risks: Where do failures happen most often?
3. Plan: Based on that – daily, weekly, monthly.
4. Gaps: Mark what is not documented.`,
    codeOptimizedDE: `1. Analyse: Welche Komponenten hat Anlage X?
2. Risiken: Wo fällt am häufigsten etwas aus?
3. Plan: Darauf aufbauend – täglich, wöchentlich, monatlich.
4. Lücken: Markiere, was nicht dokumentiert ist.`,
    content: 'The plan then builds on this plant – not on a generic template.',
    contentDE: 'Der Plan baut dann auf dieser Anlage auf – nicht auf einer Standardvorlage.',
  },
  {
    id: 12,
    type: SlideType.COMPARISON,
    step: 3,
    icon: 'NotebookPen',
    title: 'Office Example: Notes → Minutes',
    titleDE: 'Aus dem Büro: Notizen → Protokoll',
    topic: 'Fixed format, nothing invented',
    topicDE: 'Festes Format, nichts erfinden',
    subtitle: 'Structure the output – and let gaps stay visible.',
    subtitleDE: 'Ausgabe strukturieren – und Lücken sichtbar lassen.',
    technique: 'Structured output',
    techniqueDE: 'Strukturierte Ausgabe',
    codeStandard: `Team meeting notes, 12 March:
- printer 2nd floor broken, Mr Kaya takes care
- summer party: date still open
- new holiday rule from July

Turn this into minutes.`,
    codeStandardDE: `Notizen Teamrunde 12.03.:
- Drucker 2. OG kaputt, Hr. Kaya kümmert sich
- Sommerfest: Termin klären
- neue Urlaubsregel ab Juli

Mach daraus ein Protokoll.`,
    codeOptimized: `Turn the notes into a table:
Topic | Decision/Task | Who | Due

Rules:
- Only what is in the notes.
- Missing owner or date → write “open”.
- Do not invent names or dates.`,
    codeOptimizedDE: `Mach aus den Notizen eine Tabelle:
Thema | Beschluss/Aufgabe | Wer | Bis wann

Regeln:
- Nur, was in den Notizen steht.
- Fehlt Verantwortliche/r oder Termin → „offen“.
- Keine Namen oder Termine erfinden.`,
    codeResult: `| Topic | Decision/Task | Who | Due |
| Printer 2nd floor | Fix printer | Mr Kaya | open |
| Summer party | Set a date | open | open |
| Holiday rule | Applies from July | – | 1 July |`,
    codeResultDE: `| Thema | Beschluss/Aufgabe | Wer | Bis wann |
| Drucker 2. OG | Drucker reparieren | Hr. Kaya | offen |
| Sommerfest | Termin festlegen | offen | offen |
| Urlaubsregel | gilt ab Juli | – | 01.07. |`,
    content: 'Without rules the minutes look complete – including a made-up date. “open” is honest.',
    contentDE: 'Ohne Regeln sieht das Protokoll vollständig aus – samt ausgedachtem Termin. „offen“ ist ehrlich.',
  },
  {
    id: 7,
    type: SlideType.COMPARISON,
    step: 4,
    icon: 'Calculator',
    title: 'Step 4: Calculate With Code',
    titleDE: 'Stufe 4: Rechnen mit Code',
    topic: 'Calculate with tools',
    topicDE: 'Rechnen mit Werkzeugen',
    punchline: 'Do not trust the model\'s mental arithmetic – make the calculation checkable.',
    punchlineDE: 'Nicht dem Kopfrechnen des Modells vertrauen – den Rechenweg prüfbar machen.',
    punchlineNext: 'Arithmetic can be handed to code. What about facts?',
    punchlineNextDE: 'Rechnen lässt sich an Code abgeben. Und Fakten?',
    subtitle: 'Code makes the calculation – and its assumptions – visible.',
    subtitleDE: 'Code macht den Rechenweg sichtbar – und seine Annahmen.',
    technique: 'Code-aided reasoning',
    techniqueDE: 'Rechnen per Code',
    codeStandard: 'A waste truck uses 32 L/100 km and drives 2 routes of 45 km a day. Diesel costs €1.70. What does November 2024 cost (excluding Sundays)?',
    codeStandardDE: 'Ein Müllwagen verbraucht 32 L/100 km und fährt täglich 2 Touren à 45 km. Diesel kostet 1,70 €. Was kostet der November 2024 (ohne Sonntage)?',
    codeOptimized: `Goal: fuel cost for November 2024.
Do NOT calculate in your head.
Write a Python script that:
1. counts the working days (Mon–Sat),
2. uses 90 km/day (2 routes × 45 km),
3. uses 32 L/100 km and €1.70 per litre,
4. prints days, litres and total cost.`,
    codeOptimizedDE: `Ziel: Treibstoffkosten November 2024.
Rechne NICHT im Kopf.
Schreib ein Python-Skript, das:
1. die Werktage (Mo–Sa) zählt,
2. mit 90 km/Tag rechnet (2 Touren × 45 km),
3. 32 L/100 km und 1,70 € pro Liter ansetzt,
4. Tage, Liter und Gesamtkosten ausgibt.`,
    codeResult: `$ python fuel.py
working days (Mon–Sat): 26
distance: 2340 km
diesel: 748.8 L
cost: €1,272.96
# assumption: public holidays not excluded (e.g. 1 Nov)`,
    codeResultDE: `$ python treibstoff.py
Werktage (Mo–Sa): 26
Strecke: 2340 km
Diesel: 748,8 L
Kosten: 1.272,96 €
# Annahme: Feiertage nicht abgezogen (z. B. 1.11.)`,
    content: 'The script shows not only the number but the assumption behind it – 1 November is a public holiday in five German states.',
    contentDE: 'Das Skript zeigt nicht nur die Zahl, sondern die Annahme dahinter – der 1.11. ist in fünf Bundesländern Feiertag.',
  },
  {
    id: 8,
    type: SlideType.COMPARISON,
    step: 4,
    icon: 'Globe',
    title: 'Step 4: Facts With Sources',
    titleDE: 'Stufe 4: Fakten mit Quelle',
    topic: 'Facts need sources',
    topicDE: 'Fakten brauchen Quellen',
    punchline: 'Search alone is not evidence. A source per claim makes the answer checkable.',
    punchlineDE: 'Suche allein ist kein Beleg. Erst die Quelle pro Aussage macht die Antwort prüfbar.',
    punchlineNext: 'And when the model says “done” – how do we know it is true?',
    punchlineNextDE: 'Und wenn das Modell sagt „erledigt“ – woher wissen wir, dass es stimmt?',
    subtitle: 'Facts need sources, not creativity.',
    subtitleDE: 'Fakten brauchen Quellen, keine Kreativität.',
    technique: 'Search & sources',
    techniqueDE: 'Suche & Quellen',
    codeStandard: 'Who is currently on the managing board of Siemens AG?',
    codeStandardDE: 'Wer sitzt aktuell im Vorstand der Siemens AG?',
    codeOptimized: `Search the official Siemens website for the current board.
List names and functions.
Give the source URL for each person.`,
    codeOptimizedDE: `Suche auf der offiziellen Siemens-Website den aktuellen Vorstand.
Liste Namen und Funktionen auf.
Nenne für jede Person die Quelle (URL).`,
    content: 'Without search the model may name an old board or invent names. With a source per name we can check it ourselves.',
    contentDE: 'Ohne Suche nennt das Modell womöglich einen alten Vorstand oder erfindet Namen. Mit Quelle pro Name können wir selbst nachprüfen.',
  },

  // ── Chapter 3: Verify ────────────────────────────────────────────────────
  {
    id: 202,
    type: SlideType.CHAPTER,
    chapter: 3,
    icon: 'ShieldCheck',
    title: 'Verify',
    titleDE: 'Prüfen',
    subtitle: 'When is something really done – and who says so?',
    subtitleDE: 'Wann ist etwas wirklich erledigt – und wer sagt das?',
  },
  {
    id: 15,
    type: SlideType.CONTENT,
    visual: 'vpn-status',
    icon: 'TicketCheck',
    title: 'User Says “VPN Works Again”. Can We Close It?',
    titleDE: 'Benutzer sagt: „VPN geht wieder.“ Ticket zu?',
    topic: 'Claim ≠ evidence',
    topicDE: 'Behauptung ≠ Nachweis',
    punchline: '“Sounds solved → close it” is the car-wash pattern again: plausible, but not checked.',
    punchlineDE: '„Klingt gelöst → schließen“ ist wieder das Waschanlagen-Muster: plausibel, aber nicht geprüft.',
    punchlineNext: 'And what if we write the pattern into the question ourselves?',
    punchlineNextDE: 'Und was, wenn wir das Muster selbst in die Frage schreiben?',
    subtitle: 'A user report is a valuable hint – not yet the acceptance test.',
    subtitleDE: 'Eine Benutzeraussage ist ein wertvoller Hinweis – aber noch keine Abnahme.',
    content: [
      'Per criterion: test → observed result → proven / assumed / open.',
      'A missing result is not a passed test.',
      'Close only when the observations carry the acceptance criteria.',
    ],
    contentDE: [
      'Pro Kriterium: Test → beobachtetes Ergebnis → belegt / vermutet / offen.',
      'Ein fehlendes Ergebnis ist kein bestandener Test.',
      'Erst schließen, wenn die Beobachtungen die Abnahme tragen.',
    ],
  },
  {
    id: 18,
    type: SlideType.CONTENT,
    visual: 'bug-quota',
    icon: 'SearchCheck',
    title: 'Don’t Order Three Bugs',
    titleDE: 'Bestell keine drei Fehler',
    topic: 'Disprove, don’t fill a quota',
    topicDE: 'Widerlegen statt Fundquote',
    punchline: 'Order three bugs and you get three – whether they exist or not. The question shapes the answer.',
    punchlineDE: 'Wer drei Fehler bestellt, bekommt drei – ob es sie gibt oder nicht. Die Frage formt die Antwort.',
    punchlineNext: 'Now everything together – on a real Friday afternoon.',
    punchlineNextDE: 'Jetzt alles zusammen – an einem echten Freitagnachmittag.',
    subtitle: 'The number belongs to the effort – not to the defects reality has to deliver.',
    subtitleDE: 'Die Zahl gehört zur Prüfleistung – nicht zu den Fehlern, die die Realität liefern soll.',
    content: [
      'Instead of “give me the three biggest risks”: “try to disprove the plan three serious ways”.',
      'Per attempt: hypothesis → trigger → evidence → smallest useful test.',
      '“No issue found” is a valid result.',
    ],
    contentDE: [
      'Statt „Nenn mir die drei größten Risiken“: „Versuch den Plan dreimal ernsthaft zu widerlegen.“',
      'Pro Versuch: Vermutung → Auslöser → Beleg → kleinster sinnvoller Test.',
      '„Kein Problem gefunden“ ist ein gültiges Ergebnis.',
    ],
  },
  {
    id: 14,
    type: SlideType.COMPARISON,
    icon: 'FileSpreadsheet',
    title: 'Friday, 16:47. 742 Users. One Suspicious Mapping.',
    titleDE: 'Freitag, 16:47 Uhr. 742 Benutzer. Ein verdächtiges Mapping.',
    topic: 'Proof before action',
    topicDE: 'Erst Nachweis, dann Aktion',
    punchline: 'First the evidence, then the action – and the quality bar survives as a template.',
    punchlineDE: 'Erst der Nachweis, dann die Aktion – und der Maßstab bleibt als Vorlage.',
    punchlineNext: 'Full circle to the car wash: make goal, checks and evidence visible – and keep it as a template.',
    punchlineNextDE: 'Zurück zur Waschanlage: Ziel, Prüfung und Belege sichtbar machen – und als Vorlage aufheben.',
    subtitle: 'Everything together: goal, limits, test, done-when – and stop before acting.',
    subtitleDE: 'Alles zusammen: Ziel, Grenzen, Prüfung, Erledigt-wenn – und vor der Aktion anhalten.',
    technique: 'CSV user import',
    techniqueDE: 'CSV-Benutzerimport',
    codeStandard: `SD-18427 must be ready today.
users_2026-08-28.csv → portal test, 742 rows.
New mapping: cost_center → department.

Check the import before anyone runs it.`,
    codeStandardDE: `SD-18427 muss heute noch vorbereitet werden.
users_2026-08-28.csv → Portal-Test, 742 Zeilen.
Neu im Mapping: cost_center → department.

Prüf den Import, bevor ihn jemand startet.`,
    codeOptimized: `From ticket, CSV, mapping docs and runbook, build a work order.

Do not overwrite existing accounts.
Never invent IDs, mappings or commands.
Missing evidence stays open – do not guess.
List “Verification” and “Done when” separately.

Stop after the work order. Do not import yet.`,
    codeOptimizedDE: `Erstelle aus Ticket, CSV, Mapping-Doku und Runbook einen Arbeitsauftrag.

Bestehende Konten nicht überschreiben.
Keine IDs, Mappings oder Befehle erfinden.
Fehlende Belege bleiben offen – nicht raten.
„Prüfung“ und „Erledigt, wenn“ getrennt aufführen.

Nach dem Arbeitsauftrag aufhören. Noch nichts importieren.`,
    codeWorkOrder: `Goal: validate SD-18427 before the import runs.
Context: users_2026-08-28.csv → portal test; 742 rows; new cost_center → department mapping.
Limits: no account overwrite; no invented employee IDs or mapping assumptions.
Verification: documented dry run + reconcile 742/742 rows + check new mapping against current docs.
Done when: every row is explained; zero unintended writes; new mapping proven or explicitly open with a reason.`,
    codeWorkOrderDE: `Ziel: SD-18427 prüfen, bevor der Import läuft.
Kontext: users_2026-08-28.csv → Portal-Test; 742 Zeilen; neues Mapping cost_center → department.
Grenzen: keine Konten überschreiben; keine Personalnummer oder Mapping-Annahme erfinden.
Prüfung: dokumentierter Dry-Run + 742/742 Zeilen abgleichen + neues Mapping gegen aktuelle Doku prüfen.
Erledigt, wenn: jede Zeile erklärt ist; 0 unbeabsichtigte Schreibzugriffe; Mapping belegt oder mit Grund offen.`,
    content: 'The direct prompt is fine for one ticket. The template keeps the quality bar for the next import.',
    contentDE: 'Für ein Ticket reicht der direkte Prompt. Die Vorlage hält den Maßstab auch beim nächsten Import.',
  },

  // ── Chapter 4: Reuse ─────────────────────────────────────────────────────
  {
    id: 203,
    type: SlideType.CHAPTER,
    chapter: 4,
    icon: 'Repeat',
    title: 'Reuse',
    titleDE: 'Wiederverwenden',
    subtitle: 'How does one good prompt become a safe, reusable template?',
    subtitleDE: 'Wie wird aus einem guten Prompt eine sichere, wiederverwendbare Vorlage?',
  },
  {
    id: 20,
    type: SlideType.CONTENT,
    visual: 'toolbox',
    icon: 'Library',
    anchor: 'vorlagen',
    title: 'Small Reusable Toolbox, Not One Mega-Prompt',
    titleDE: 'Kleine Vorlagen-Toolbox statt Mega-Prompt',
    subtitle: 'The template stays, the case changes – out comes a concrete work order.',
    subtitleDE: 'Die Vorlage bleibt, der Fall wechselt – heraus kommt ein konkreter Arbeitsauftrag.',
    content: 'A template is worth it only if it changes how you work – not every task needs every technique.',
    contentDE: 'Eine Vorlage lohnt sich nur, wenn sie das Vorgehen wirklich verändert – nicht jede Aufgabe braucht jede Technik.',
  },
  {
    id: 21,
    type: SlideType.CONTENT,
    visual: 'compliance-gates',
    icon: 'ShieldAlert',
    title: 'Three Gates Before You Paste',
    titleDE: 'Drei Schranken vor dem Einfügen',
    topic: 'Security & compliance',
    topicDE: 'Sicherheit & Compliance',
    subtitle: 'Approved service + permitted data + a human who checks.',
    subtitleDE: 'Freigegebener Dienst + zulässige Daten + ein Mensch, der prüft.',
    content: [
      'When in doubt: ask IT security or data protection before you paste.',
    ],
    contentDE: [
      'Im Zweifel: vor dem Einfügen IT-Security oder Datenschutz fragen.',
    ],
  },
  {
    id: 22,
    type: SlideType.END,
    icon: 'CheckCircle',
    title: 'Three Things to Take Home',
    titleDE: 'Drei Dinge zum Mitnehmen',
    subtitle: 'The goal is better work, not prettier prompts.',
    subtitleDE: 'Das Ziel ist bessere Arbeit, nicht hübschere Prompts.',
    content: [
      'Brief it like a smart new colleague: role, context, goal – and what “done” means.',
      'Hand over what plausibility cannot do: calculate with code, facts with sources.',
      'Say what is proven, assumed or open – and keep good prompts as templates.',
    ],
    contentDE: [
      'Briefen wie eine kluge neue Kollegin: Rolle, Kontext, Ziel – und was „erledigt“ heißt.',
      'Abgeben, was Plausibilität nicht kann: Rechnen mit Code, Fakten mit Quelle.',
      'Sagen, was belegt, vermutet oder offen ist – und gute Prompts als Vorlage aufheben.',
    ],
  },
];
