import { SlideType, SlideData } from './types';

export const SLIDES: SlideData[] = [
  {
    id: 1,
    type: SlideType.TITLE,
    title: "Prompt Engineering @ REMONDIS",
    subtitle: "Wie wir aufhören, den Computer anzuschreien, und anfangen, echte Ergebnisse zu erzielen.",
    icon: "BrainCircuit"
  },
  {
    id: 2,
    type: SlideType.CONTENT,
    title: "Das LLM-Problem",
    subtitle: "Warum ChatGPT manchmal wie ein sehr selbstbewusster, aber ahnungsloser Praktikant wirkt",
    content: [
      "LLMs (Large Language Models) wissen nichts. Sie raten nur das nächste Wort.",
      "Klassische Schwächen: Rechnen (Mathe), aktuelle Fakten (News), Zitate.",
      "Das Risiko: Halluzinationen. Das Modell lügt überzeugend, statt 'Ich weiß es nicht' zu sagen.",
      "Unsere Lösung: Wir müssen dem Modell Werkzeuge und Leitplanken geben."
    ],
    icon: "AlertTriangle"
  },
  {
    id: 3,
    type: SlideType.COMPARISON,
    title: "Beispiel: Logik & Mathe",
    subtitle: "LLMs sind schlecht im Kopfrechnen. Lassen wir sie Code schreiben.",
    technique: "Code-Aided Reasoning (PoT)",
    codeStandard: "Ein Müllwagen verbraucht 32L/100km. Er fährt täglich 2 Touren à 45km. Diesel kostet 1,70€. Wie hoch sind die Kosten im November (ohne Sonntage) im Jahr 2024?",
    codeOptimized: "Ziel: Berechne Treibstoffkosten.\nConstraint: Rechne NICHT selbst.\nAction: Schreibe ein Python-Skript, das:\n1. Die Anzahl der Werktage (Mo-Sa) im November 2024 ermittelt.\n2. Den Verbrauch basierend auf 90km/Tag berechnet.\n3. Die Gesamtkosten ausgibt.",
    content: "Der Standard-Prompt führt oft zu Flüchtigkeitsfehlern (z.B. falsche Anzahl Sonntage). Der optimierte Prompt zwingt das Modell, Python-Logik zu nutzen, die exakt ist.",
    icon: "Calculator"
  },
  {
    id: 4,
    type: SlideType.COMPARISON,
    title: "Beispiel: Fakten & Wissen",
    subtitle: "Fakten brauchen Quellen, keine Kreativität.",
    technique: "Fact Grounding & Tool Use",
    codeStandard: "Wer sitzt aktuell im Vorstand der REMONDIS Gruppe?",
    codeOptimized: "Nutze Google Search, um die aktuelle Vorstandsliste auf der Remondis-Website zu finden.\nListen Sie die Namen und Funktionen auf.\nZitieren Sie für jede Person die Quelle (URL).",
    content: "Ohne Search-Tool nennt das Modell oft Vorstände von 2021 oder erfindet Namen. Mit 'Google Search' erhalten wir verifizierte Echtzeit-Daten.",
    icon: "Globe"
  },
  {
    id: 5,
    type: SlideType.CONTENT,
    title: "Die Prompt-Hierarchie",
    subtitle: "Vom Anfänger zum Profi",
    content: [
      "Level 1: Zero-Shot (Einfache Frage ohne Kontext)",
      "Level 2: Few-Shot (Frage mit 2-3 Beispielen)",
      "Level 3: Chain of Thought ('Denk Schritt für Schritt')",
      "Level 4: Agentic (Nutze Tools, Python, Search)"
    ],
    icon: "Layers"
  },
  {
    id: 6,
    type: SlideType.COMPARISON,
    title: "Technik: Chain of Thought (CoT)",
    subtitle: "Komplexe Aufgaben in Schritte zerlegen",
    technique: "Chain of Thought",
    codeStandard: "Erstelle einen Plan für die Wartung der Sortieranlage X.",
    codeOptimized: "1. Analyse: Welche Komponenten hat Anlage X (Förderbänder, Sensoren...)?\n2. Risiken: Wo sind die häufigsten Ausfälle?\n3. Zeitplan: Erstelle basierend darauf einen Wartungsplan (Täglich, Wöchentlich, Monatlich).",
    content: "Zwingen Sie das Modell, erst zu 'denken' (planen), bevor es 'handelt' (schreibt). Das reduziert generische Antworten massiv.",
    icon: "ListOrdered"
  },
  {
    id: 7,
    type: SlideType.COMPARISON,
    title: "Technik: Persona & Kontext",
    subtitle: "Wer bin ich und was will ich?",
    technique: "North Star & Context",
    codeStandard: "Schreib eine Mail an die Kommune, dass die Tonnen nicht geleert wurden.",
    codeOptimized: "Rolle: Betriebsleiter Remondis.\nKontext: Glatteis verhinderte Zufahrt in Straße X.\nZiel: Informieren, dass wir morgen einen zweiten Versuch starten.\nTon: Professionell, sicherheitsbewusst, kooperativ.",
    content: "Kontext ist King. Ohne Kontext schreibt das Modell eine Standard-Entschuldigung. Mit Kontext ('Glatteis', 'Sicherheit') wirkt es professionell.",
    icon: "UserCog"
  },
  {
    id: 8,
    type: SlideType.COMPARISON,
    title: "Technik: Structured Output",
    subtitle: "Daten statt Prosa",
    technique: "XML Delimiters & JSON",
    codeStandard: "Lies diesen Unfallbericht und sag mir, was passiert ist.",
    codeOptimized: "<task>Extrahiere Unfalldaten</task>\n<format>\nAntworte NUR im JSON-Format:\n{\n  \"datum\": \"ISO-8601\",\n  \"unfallart\": \"string\",\n  \"verletzte\": \"integer\",\n  \"maßnahmen\": []\n}\n</format>\n<bericht>...</bericht>",
    content: "Ideal für die Weiterverarbeitung. Verhindert, dass das Modell Romane schreibt, wenn wir nur Daten brauchen.",
    icon: "Code"
  },
  {
    id: 9,
    type: SlideType.CONTENT,
    title: "Sicherheit & Compliance",
    subtitle: "KI verantwortungsvoll nutzen",
    content: [
        "Keine personenbezogenen Daten (DSGVO) in öffentliche Prompts eingeben.",
        "Keine sensiblen Betriebsgeheimnisse (Preise, Strategie) hochladen.",
        "Ergebnisse immer prüfen ('Human in the Loop').",
        "Im Zweifel: Die interne IT-Security konsultieren."
    ],
    icon: "ShieldAlert"
  },
  {
    id: 10,
    type: SlideType.END,
    title: "Zusammenfassung",
    subtitle: "Takeaways für den Arbeitsalltag",
    content: [
      "Seien Sie spezifisch: Rolle, Kontext, Ziel.",
      "Nutzen Sie 'Step-by-Step' für Planungsaufgaben.",
      "Verlangen Sie Code/Python für Rechenaufgaben.",
      "Nutzen Sie Google Search für Fakten.",
      "Behandeln Sie das LLM wie einen neuen, intelligenten Kollegen ohne Vorwissen."
    ],
    icon: "CheckCircle"
  }
];