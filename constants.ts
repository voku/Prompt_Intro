import { SlideType, SlideData } from './types';

export const SLIDES: SlideData[] = [
  {
    id: 1,
    type: SlideType.TITLE,
    title: "Prompt Engineering: From Zero to Production",
    titleDE: "Prompt Engineering: Von null bis Produktion",
    subtitle: "Reliable, high-quality results from any LLM — best practices for 2025/2026",
    subtitleDE: "Verlässliche, hochwertige Ergebnisse aus jedem LLM — Best Practices für 2025/2026",
    icon: "BrainCircuit"
  },
  {
    id: 2,
    type: SlideType.CONTENT,
    title: "Understanding LLMs",
    titleDE: "LLMs verstehen",
    subtitle: "Why even powerful models still need carefully crafted prompts",
    subtitleDE: "Warum auch mächtige Modelle sorgfältig formulierte Prompts benötigen",
    content: [
      "LLMs predict the next token — they do not 'know' facts, they recognise patterns in training data.",
      "Key weaknesses: arithmetic, real-time data (after training cutoff), and precise verbatim citations.",
      "Hallucinations: the model confidently generates plausible-sounding but incorrect answers.",
      "Our tools: explicit constraints, structured output schemas, tool use, and human-in-the-loop review."
    ],
    contentDE: [
      "LLMs sagen das nächste Token vorher — sie \u201Ewissen\u201C keine Fakten, sie erkennen Muster in Trainingsdaten.",
      "Typische Schwächen: Arithmetik, Echtzeitdaten (nach dem Trainings-Cutoff) und wortgenaue Zitate.",
      "Halluzinationen: Das Modell generiert überzeugend klingende, aber falsche Antworten.",
      "Unsere Werkzeuge: Explizite Einschränkungen, strukturierte Ausgabeschemata, Tool-Einsatz und Human-in-the-Loop."
    ],
    icon: "AlertTriangle"
  },
  {
    id: 3,
    type: SlideType.COMPARISON,
    title: "Technique: Structured Output",
    titleDE: "Technik: Strukturierte Ausgabe",
    subtitle: "Enforce exact output schemas for reliable downstream processing",
    subtitleDE: "Exakte Ausgabeschemata für zuverlässige Weiterverarbeitung erzwingen",
    technique: "Structured Output / JSON Schema",
    techniqueDE: "Strukturierte Ausgabe / JSON-Schema",
    codeStandard: "Read this bug report and tell me what went wrong.",
    codeOptimized: "<task>Extract bug report data</task>\n<format>\nReply ONLY in valid JSON:\n{\n  \"date\": \"ISO-8601\",\n  \"severity\": \"low|medium|high|critical\",\n  \"component\": \"string\",\n  \"summary\": \"string (≤ 50 chars)\",\n  \"steps_to_reproduce\": []\n}\n</format>\n<report>...</report>",
    content: "The standard prompt returns unstructured prose. The optimised prompt enforces a strict JSON schema — making the output directly parseable by downstream code without any post-processing.",
    contentDE: "Der Standard-Prompt erzeugt unstrukturierten Fließtext. Der optimierte Prompt erzwingt ein striktes JSON-Schema — die Ausgabe ist direkt per Code weiterverarbeitbar, ohne manuelle Nachbearbeitung.",
    icon: "Code"
  },
  {
    id: 4,
    type: SlideType.COMPARISON,
    title: "Technique: Code-Aided Reasoning",
    titleDE: "Technik: Code-gestütztes Rechnen",
    subtitle: "Offload arithmetic to Python — models make errors, code does not",
    subtitleDE: "Rechenaufgaben an Python auslagern — Modelle rechnen falsch, Code nicht",
    technique: "Program of Thought (PoT)",
    techniqueDE: "Program of Thought (PoT)",
    codeStandard: "A server handles 12,000 requests/day at peak. Each request needs 0.003 CPU-seconds. How many CPU cores are required with a 3× traffic spike buffer?",
    codeOptimized: "Goal: Calculate required CPU cores.\nConstraint: Do NOT calculate yourself.\nAction: Write a Python snippet that:\n1. Defines peak_req_per_day, cost_per_req_cpu_s, and spike_factor = 3.\n2. Computes required_cores with an explanation.\n3. Prints the result.\nReturn only the code block, no prose.",
    content: "Direct calculation prompts often produce wrong answers due to the model's approximate arithmetic. Delegating the maths to Python guarantees correctness and makes the logic auditable.",
    contentDE: "Direkte Rechenaufgaben führen wegen der approximativen Arithmetik des Modells oft zu falschen Ergebnissen. Die Mathematik an Python zu delegieren garantiert Korrektheit und macht die Logik nachvollziehbar.",
    icon: "Calculator"
  },
  {
    id: 5,
    type: SlideType.CONTENT,
    title: "The Prompt Hierarchy",
    titleDE: "Die Prompt-Hierarchie",
    subtitle: "Choose the right technique for the complexity of the task",
    subtitleDE: "Die richtige Technik für die jeweilige Aufgabenkomplexität wählen",
    content: [
      "Level 1 — Zero-Shot: Direct instruction, no examples. Works for most routine tasks on modern models.",
      "Level 2 — Few-Shot: 2–5 input/output examples. Best for nonstandard formats or classification tasks.",
      "Level 3 — Chain of Thought (CoT): 'Reason step-by-step.' Best for complex logic and planning.",
      "Level 4 — Agentic (ReAct / Tool Use): Model reasons, calls external tools (search, code), and iterates."
    ],
    contentDE: [
      "Level 1 — Zero-Shot: Direkte Anweisung, keine Beispiele. Funktioniert bei modernen Modellen für Routineaufgaben.",
      "Level 2 — Few-Shot: 2–5 Input/Output-Beispiele. Am besten für ungewöhnliche Formate oder Klassifikation.",
      "Level 3 — Chain of Thought (CoT): \u201EDenke Schritt f\u00FCr Schritt.\u201C Ideal f\u00FCr komplexe Logik und Planung.",
      "Level 4 — Agentisch (ReAct / Tool-Einsatz): Modell denkt nach, ruft Werkzeuge auf und iteriert."
    ],
    icon: "Layers"
  },
  {
    id: 6,
    type: SlideType.COMPARISON,
    title: "Technique: Chain of Thought (CoT)",
    titleDE: "Technik: Chain of Thought (CoT)",
    subtitle: "Decompose complex tasks into explicit, verifiable reasoning steps",
    subtitleDE: "Komplexe Aufgaben in explizite, nachvollziehbare Denkschritte zerlegen",
    technique: "Chain of Thought",
    techniqueDE: "Chain of Thought",
    codeStandard: "Review this microservice architecture and tell me if it is good.",
    codeOptimized: "You are a senior software architect. Review this microservice architecture in three explicit steps:\n1. Identify: List each service, its single responsibility, and its direct dependencies.\n2. Analyse: Highlight bottlenecks, single points of failure, and tight coupling.\n3. Recommend: Propose concrete improvements ordered by business impact.\nUse bullet points. Be concise.",
    content: "Forcing the model to reason before it responds drastically reduces generic answers and produces actionable, structured output that can be reviewed step by step.",
    contentDE: "Das Modell zum Nachdenken vor der Antwort zu zwingen, reduziert generische Aussagen erheblich und erzeugt umsetzbare, strukturierte Ausgaben, die Schritt für Schritt nachvollzogen werden können.",
    icon: "ListOrdered"
  },
  {
    id: 7,
    type: SlideType.COMPARISON,
    title: "Technique: Role & Context",
    titleDE: "Technik: Rolle & Kontext",
    subtitle: "A concise role and explicit context dramatically improve output quality",
    subtitleDE: "Eine klare Rolle und expliziter Kontext verbessern die Ausgabequalität deutlich",
    technique: "Role Assignment & Context",
    techniqueDE: "Rollenzuweisung & Kontext",
    codeStandard: "Write an email to the client saying the project is delayed.",
    codeOptimized: "Role: Senior project manager at a software consultancy.\nContext: Sprint 4 is delayed by 5 days due to an unplanned database migration. The client is technical.\nGoal: Inform the client, propose a revised go-live date, and offer a 30-minute sync call.\nTone: Professional, transparent, solution-focused.\nConstraint: ≤ 120 words.",
    content: "Without context the model writes a vague apology. With an explicit role, cause, and constraints it produces a targeted, professional message that respects the reader's time.",
    contentDE: "Ohne Kontext schreibt das Modell eine vage Entschuldigung. Mit expliziter Rolle, Ursache und Einschränkungen entsteht eine zielgerichtete, professionelle Nachricht, die die Zeit des Lesers respektiert.",
    icon: "UserCog"
  },
  {
    id: 8,
    type: SlideType.COMPARISON,
    title: "Technique: Fact Grounding & Retrieval",
    titleDE: "Technik: Faktenverankerung & Retrieval",
    subtitle: "Ground the model in verified sources — never rely on parametric memory for facts",
    subtitleDE: "Modell auf verifizierte Quellen verankern — niemals auf das parametrische Gedächtnis für Fakten vertrauen",
    technique: "RAG / Grounded Generation",
    techniqueDE: "RAG / Faktenverankertes Generieren",
    codeStandard: "What are the current Node.js LTS versions?",
    codeOptimized: "Use the web search tool to fetch the official Node.js releases page.\nFrom the retrieved content, list:\n- All current Active LTS versions (name, version number, end-of-life date)\n- The current Maintenance LTS version\nCite the source URL for every fact.\nDo NOT answer from memory — only from the retrieved content.",
    content: "Without retrieval the model may cite outdated versions from its training data. With explicit tool use and mandatory source citation, every fact is verifiable and current.",
    contentDE: "Ohne Retrieval nennt das Modell möglicherweise veraltete Versionen aus seinen Trainingsdaten. Mit explizitem Tool-Einsatz und Pflichtquellenangabe ist jede Aussage verifizierbar und aktuell.",
    icon: "Globe"
  },
  {
    id: 9,
    type: SlideType.CONTENT,
    title: "Security & Responsible Use",
    titleDE: "Sicherheit & Verantwortungsvoller Einsatz",
    subtitle: "Prompts are code — apply the same rigour you apply to any code review",
    subtitleDE: "Prompts sind Code — mit der gleichen Sorgfalt behandeln wie jeden Code-Review",
    content: [
      "Never paste PII, passwords, API keys, or confidential IP into public LLM interfaces.",
      "Always keep a Human-in-the-Loop for high-stakes decisions (legal, financial, medical).",
      "Version-control your prompts in Git — diff, review, and roll back just like any code change.",
      "Validate model output programmatically; never trust it blindly in automated pipelines."
    ],
    contentDE: [
      "Niemals personenbezogene Daten, Passwörter, API-Schlüssel oder vertrauliches geistiges Eigentum in öffentliche LLM-Interfaces eingeben.",
      "Bei wichtigen Entscheidungen (rechtlich, finanziell, medizinisch) immer einen Menschen im Loop behalten.",
      "Prompts in Git versionieren — wie jeden Code-Change vergleichen, reviewen und zurückrollen.",
      "Modellausgaben programmatisch validieren; in automatisierten Pipelines niemals blind vertrauen."
    ],
    icon: "ShieldAlert"
  },
  {
    id: 10,
    type: SlideType.CONTENT,
    title: "Key Takeaways",
    titleDE: "Wichtigste Erkenntnisse",
    subtitle: "Practical rules for every prompt you write",
    subtitleDE: "Praktische Regeln für jeden Prompt",
    content: [
      "Be explicit: role, context, goal, constraints, and output format — in that order.",
      "Use Few-Shot examples for novel or non-standard output formats.",
      "Use Chain of Thought for multi-step reasoning and planning tasks.",
      "Delegate arithmetic and logic to code; delegate facts to retrieval tools.",
      "Treat prompts as code: version them, test them, and iterate."
    ],
    contentDE: [
      "Explizit sein: Rolle, Kontext, Ziel, Einschränkungen und Ausgabeformat — in dieser Reihenfolge.",
      "Few-Shot-Beispiele für neuartige oder nicht standardisierte Ausgabeformate verwenden.",
      "Chain of Thought für mehrstufige Denk- und Planungsaufgaben einsetzen.",
      "Arithmetik und Logik an Code delegieren; Fakten an Retrieval-Werkzeuge.",
      "Prompts wie Code behandeln: versionieren, testen und iterieren."
    ],
    icon: "CheckCircle"
  },
  {
    id: 11,
    type: SlideType.CONTENT,
    title: "Operational Prompts: The Core Shift",
    titleDE: "Operative Prompts: Die entscheidende Veränderung",
    subtitle: "Good prompts are small operational contracts — not motivational speeches",
    subtitleDE: "Gute Prompts sind kleine operative Verträge — keine Motivationsreden",
    content: [
      "Old approach: 'You are an expert senior engineer. Write clean, scalable, maintainable code.' — This constrains almost nothing.",
      "Good prompts allocate attention, constrain behavior, demand proof, and control stopping conditions.",
      "A strong coding-agent prompt defines: what the task is, what must not change, what evidence is required, and when the work is done.",
      "The prompt should frame the agent loop — not impersonate the engineer."
    ],
    contentDE: [
      "Alter Ansatz: 'Du bist ein erfahrener Senior-Engineer. Schreib sauberen, skalierbaren, wartbaren Code.' — Das schränkt fast nichts ein.",
      "Gute Prompts lenken Aufmerksamkeit, beschränken Verhalten, fordern Beweise und kontrollieren Abbruchbedingungen.",
      "Ein starker Coding-Agent-Prompt definiert: Was ist die Aufgabe, was darf sich nicht ändern, welche Beweise sind nötig, wann ist die Arbeit fertig.",
      "Der Prompt soll den Agenten-Loop rahmen — nicht den Ingenieur imitieren."
    ],
    icon: "AlertOctagon"
  },
  {
    id: 12,
    type: SlideType.CONTENT,
    title: "The Four-Part Prompt Shape",
    titleDE: "Die Vier-Teile-Prompt-Struktur",
    subtitle: "A reusable template that survives handoffs, retries, and tool execution",
    subtitleDE: "Eine wiederverwendbare Vorlage, die Übergaben, Wiederholungen und Werkzeugausführung übersteht",
    content: [
      "Goal — What should change? (Be precise and minimal.)",
      "Context — Which files, examples, specs, or errors matter?",
      "Constraints — What must not change? (Public API, existing tests, unrelated files.)",
      "Done when — What must be true before the agent stops? (Test output, static analysis, observable evidence.)"
    ],
    contentDE: [
      "Ziel — Was soll sich ändern? (Präzise und minimal formulieren.)",
      "Kontext — Welche Dateien, Beispiele, Spezifikationen oder Fehler sind relevant?",
      "Einschränkungen — Was darf sich nicht ändern? (Öffentliche API, bestehende Tests, nicht betroffene Dateien.)",
      "Fertig wenn — Was muss wahr sein, bevor der Agent stoppt? (Testausgabe, statische Analyse, nachweisbare Ergebnisse.)"
    ],
    icon: "LayoutList"
  },
  {
    id: 13,
    type: SlideType.COMPARISON,
    title: "Technique: Prompt Classes That Work",
    titleDE: "Technik: Prompt-Klassen, die funktionieren",
    subtitle: "Use constraint, verification, scope, and continuation prompts together",
    subtitleDE: "Einschränkungs-, Verifikations-, Scope- und Fortsetzungs-Prompts kombinieren",
    technique: "Constraint + Verification + Scope",
    techniqueDE: "Einschränkung + Verifikation + Scope",
    codeStandard: "Fix the concurrency bug in UserAccountService.",
    codeOptimized: "Goal: Fix the concurrency bug in UserAccountService.\nContext: Compare the failing path with tests in tests/Unit/UserAccountServiceTest.php and follow the immutable value-object pattern already used in src/Domain.\nConstraints: Keep the public API unchanged. Do not add static-analysis ignores. Do not modify unrelated files.\nDone when: Add one regression test that fails before the fix and passes after, static analysis max passes, and paste the raw output.\nRun the CI pipeline and fix all findings on the way — do not stop after the first acceptable-looking step.",
    content: "The weak prompt gives the agent no boundaries — it can rewrite half the repository. The strong version combines four prompt classes: constraint (what must not change), verification (evidence required), scope (minimum patch), and continuation (run until actually done).",
    contentDE: "Der schwache Prompt gibt dem Agenten keine Grenzen — er könnte halb das Repository umschreiben. Die starke Version kombiniert vier Prompt-Klassen: Einschränkung (was nicht geändert werden darf), Verifikation (erforderliche Nachweise), Scope (minimaler Patch) und Fortsetzung (laufen bis wirklich fertig).",
    icon: "ShieldCheck"
  },
  {
    id: 14,
    type: SlideType.COMPARISON,
    title: "Technique: Eliminate Hedge Words",
    titleDE: "Technik: Abschwächende Formulierungen eliminieren",
    subtitle: "Vague words give the model permission to do nothing — and narrate it confidently",
    subtitleDE: "Vage Wörter geben dem Modell die Erlaubnis, nichts zu tun — und es überzeugend zu beschreiben",
    technique: "Operational Constraints",
    techniqueDE: "Operative Einschränkungen",
    codeStandard: "Maybe try to improve this code. Perhaps consider cleaning it up a bit if possible.",
    codeOptimized: "Remove the three duplicated parsing steps in this module.\nKeep the public API unchanged.\nDo not touch unrelated files.\nRun the test suite and paste the output.\n\nIf the build fails three times in a row, stop.\nDo not attempt a fourth fix.\nSummarise the root cause and list what is still unknown.",
    content: "Hedge words ('maybe', 'try to', 'perhaps', 'if possible', 'should probably') silently weaken every constraint they appear in. Replace each one with a concrete action, a measurable outcome, or an explicit stopping condition.",
    contentDE: "Abschwächende Wörter ('vielleicht', 'versuche', 'falls möglich', 'sollte wahrscheinlich') schwächen jede Einschränkung, in der sie auftauchen. Jedes dieser Wörter durch eine konkrete Aktion, ein messbares Ergebnis oder eine explizite Abbruchbedingung ersetzen.",
    icon: "Eraser"
  },
  {
    id: 15,
    type: SlideType.COMPARISON,
    title: "Technique: Tests as Witnesses, Not Accomplices",
    titleDE: "Technik: Tests als Zeugen, nicht als Mittäter",
    subtitle: "Prompts must demand tests that challenge the code — not tests that confirm what already passes",
    subtitleDE: "Prompts müssen Tests fordern, die den Code herausfordern — nicht Tests, die bestätigen, was schon funktioniert",
    technique: "Test-Driven Verification",
    techniqueDE: "Testgetriebene Verifikation",
    codeStandard: "Write tests for this code and make sure they all pass.",
    codeOptimized: "Verify your changes with tests and correct the code if necessary;\ndo not just write tests to make them pass, but use them for validation.\n\nWe need tests in a TDD way: start with a failing test, implement only enough to pass, and repeat.\nDo not stop at the happy path — add edge and failure-path coverage.\nIf a new test does not expose a real broken assumption, missing edge case, or behavior drift, it is still too weak — keep going until one does.\n\nIf a test fails, fix the code — not the test.",
    content: "The weak prompt lets the agent retrofit tests to match whatever the code does. The strong version makes tests witnesses: they must challenge the code and expose risk. Changing tests to silence failures is a common agent failure mode.",
    contentDE: "Der schwache Prompt erlaubt dem Agenten, Tests nachträglich an den Code anzupassen. Die starke Version macht Tests zu Zeugen: Sie müssen den Code herausfordern und Risiken aufdecken. Tests zu verändern, um Fehler zu unterdrücken, ist ein häufiger Fehler von Agenten.",
    icon: "TestTube2"
  },
  {
    id: 16,
    type: SlideType.END,
    title: "Final Thesis",
    titleDE: "Abschlussthese",
    subtitle: "Talk to your agent. Check its assumptions. Encode what you learn.",
    subtitleDE: "Sprich mit deinem Agenten. Prüfe seine Annahmen. Halte fest, was du lernst.",
    content: [
      "Good prompts do not simulate expertise. They allocate attention, constrain behavior, demand proof, and control stopping conditions.",
      "Before starting: 'Do not implement yet. Tell me what files you will touch, what must not change, and the three main risks. Wait for confirmation.'",
      "After success: 'Update the Skills file or AGENTS.md to record the pattern used, the constraint that prevented the earlier mistake, and new conventions discovered.' — LLMs do not remember between sessions; you must encode the learning.",
      "Every successful task is an opportunity to raise the floor for the next session."
    ],
    contentDE: [
      "Gute Prompts simulieren keine Expertise. Sie lenken Aufmerksamkeit, beschränken Verhalten, fordern Beweise und kontrollieren Abbruchbedingungen.",
      "Vor dem Start: 'Noch nicht implementieren. Nenne mir die Dateien, die du anfassen willst, was sich nicht ändern darf, und die drei größten Risiken. Warte auf meine Bestätigung.'",
      "Nach dem Erfolg: 'Aktualisiere die Skills-Datei oder AGENTS.md mit dem verwendeten Muster, der Einschränkung, die den früheren Fehler verhindert hat, und neuen Konventionen.' — LLMs erinnern sich nicht zwischen Sitzungen; das Wissen muss in Dateien kodiert werden.",
      "Jede erfolgreiche Aufgabe ist eine Chance, die Ausgangsbasis für die nächste Sitzung zu verbessern."
    ],
    icon: "Lightbulb"
  }
];