import { SlideData, SlideType } from './types';

export const INTRO_SLIDES: SlideData[] = [
  {
    id: 100,
    type: SlideType.CONTENT,
    visual: 'legacy-recap',
    icon: 'History',
    title: 'A Long Time Ago, in an LLM Talk Far, Far Away …',
    titleDE: 'Vor langer Zeit, in einer LLM-Präsentation weit, weit entfernt …',
    subtitle: 'The last talk started with the basics: what an LLM is, what it can do, and why next-token prediction is surprisingly powerful.',
    subtitleDE: 'Beim letzten Vortrag ging es um die Grundlagen: Was ist ein LLM, was kann es – und warum ist Next-Token-Prediction erstaunlich mächtig?',
    content: [
      'Back then: text in → plausible text out.',
      'Useful for summarising, translating, writing and code generation.',
      'The core idea was already there: models learn patterns and continue context.',
    ],
    contentDE: [
      'Damals: Text rein → plausible Antwort raus.',
      'Gut für Zusammenfassen, Übersetzen, Schreiben und Code-Generierung.',
      'Der Kern war schon derselbe: Muster lernen und Kontext plausibel fortsetzen.',
    ],
  },
  {
    id: 101,
    type: SlideType.CONTENT,
    visual: 'legacy-timejump',
    icon: 'FastForward',
    title: 'Then the Chatbot Grew Hands',
    titleDE: 'Dann bekam der Chatbot plötzlich Hände',
    subtitle: 'Today models reason longer, inspect files, use tools, browse, write code and work through multi-step tasks.',
    subtitleDE: 'Heute denken Modelle länger nach, lesen Dateien, nutzen Tools, recherchieren, ändern Code und arbeiten mehrstufige Aufgaben ab.',
    content: [
      'The capability jump is real.',
      'But more capability did not magically turn plausibility into ground truth.',
      'So the interesting question changed: not “what can an LLM do?” but “how do we give it work safely and verifiably?”',
    ],
    contentDE: [
      'Der Fähigkeitssprung ist real.',
      'Aber mehr Fähigkeiten machen aus Plausibilität nicht automatisch Wahrheit.',
      'Darum lautet die spannendere Frage heute nicht mehr „Was kann ein LLM?“, sondern „Wie geben wir ihm Arbeit so, dass das Ergebnis belastbar wird?“',
    ],
  },
];
