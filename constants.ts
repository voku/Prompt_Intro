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
    type: SlideType.END,
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
  }
];