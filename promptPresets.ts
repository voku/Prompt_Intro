import { GuideMode, Lang } from './types';

export interface PromptPreset {
  label: string;
  text: string;
}

const ENGINEERING_PRESETS: Record<Lang, PromptPreset[]> = {
  en: [
    {
      label: 'Long but vague',
      text: 'Please perform a very detailed, comprehensive, professional, and careful review of our nightly backup situation. Think carefully and step by step, cover everything that might be useful, do not miss anything important, explain all technical and organisational aspects, and provide the best possible answer for management and the technical team. Be thorough and professional.',
    },
    {
      label: 'Small sufficient prompt',
      text: 'Assess restore readiness from the attached backup report and last restore-test log. Separate verified facts, gaps, and assumptions. Return the three highest risks plus the next evidence needed. Do not claim recoverability without a successful restore test.',
    },
    {
      label: 'Architecture decision',
      text: 'Goal: Compare the two proposed identity-sync designs for operability and failure isolation. Context: Use ADR-12, the current service map, and the last three sync incidents. Constraints: Preserve the existing AD contract and identify assumptions instead of inventing traffic data. Validation: Cite evidence for each trade-off. Output format: Decision table plus recommendation. Done when: The preferred option, rejected alternative, risks, and missing evidence are explicit.',
    },
    {
      label: 'Capacity calculation',
      text: 'Using the attached 90-day storage-growth export, calculate the exhaustion date with a reproducible script or spreadsheet. Show assumptions, raw result, and sensitivity at ±20% growth. Do not extrapolate from prose alone.',
    },
  ],
  de: [
    {
      label: 'Lang, aber vage',
      text: 'Bitte führe eine sehr detaillierte, umfassende, professionelle und sorgfältige Prüfung unserer nächtlichen Backup-Situation durch. Denke sorgfältig und Schritt für Schritt, decke alles möglicherweise Nützliche ab, übersehe nichts Wichtiges, erkläre alle technischen und organisatorischen Aspekte und liefere die bestmögliche Antwort für Management und Technik. Sei gründlich und professionell.',
    },
    {
      label: 'Kleinster ausreichender Prompt',
      text: 'Bewerte die Wiederherstellungsbereitschaft anhand des beigefügten Backup-Reports und des letzten Restore-Test-Logs. Trenne verifizierte Fakten, Lücken und Annahmen. Nenne die drei höchsten Risiken sowie die als Nächstes benötigte Evidenz. Behaupte keine Wiederherstellbarkeit ohne erfolgreichen Restore-Test.',
    },
    {
      label: 'Architekturentscheidung',
      text: 'Ziel: Die zwei vorgeschlagenen Identity-Sync-Designs auf Betriebsfähigkeit und Fehlerisolation vergleichen. Kontext: ADR-12, aktuelle Service Map und die letzten drei Sync-Incidents verwenden. Einschränkungen: Bestehenden AD-Vertrag erhalten und Annahmen benennen, statt Traffic-Daten zu erfinden. Validierung: Jeden Trade-off belegen. Ausgabeformat: Entscheidungstabelle plus Empfehlung. Fertig wenn: Bevorzugte Option, verworfene Alternative, Risiken und fehlende Evidenz explizit sind.',
    },
    {
      label: 'Kapazitätsberechnung',
      text: 'Berechne anhand des beigefügten 90-Tage-Exports zum Speicherwachstum das Erschöpfungsdatum mit einem reproduzierbaren Skript oder einer Tabelle. Zeige Annahmen, Rohresultat und Sensitivität bei ±20 % Wachstum. Nicht allein aus Fließtext extrapolieren.',
    },
  ],
};

const ITSM_PRESETS: Record<Lang, PromptPreset[]> = {
  en: [
    {
      label: 'Long ticket theatre',
      text: 'Please create a very comprehensive and polished ITSM ticket report. Include lots of detail about all tickets, explain every category, make it suitable for management, add recommendations, cover risks, trends, customer satisfaction, team performance, and everything else that might be useful. Be extremely thorough, professional, and detailed, and do not miss anything important.',
    },
    {
      label: 'Service outcome review',
      text: 'Using the monthly service data, identify the two largest threats to payroll-service availability. Separate incidents from recurring problems, cite the supporting measures, and propose one measurable improvement experiment. Do not use ticket volume as a proxy for service quality.',
    },
    {
      label: 'Problem analysis',
      text: 'Goal: Determine whether repeated invoice-service incidents justify a problem record. Evidence: Compare incident records with the service map, monitoring history, recent changes, dependency health, and known errors. Constraints: Separate observed patterns from root-cause hypotheses. Output format: Evidence, hypotheses, missing checks, recommendation. Done when: The recommendation is traceable to evidence and does not pretend the root cause is proven.',
    },
    {
      label: 'Change readiness',
      text: 'Review the proposed timeout change against the attached change policy and evidence. Identify missing impact analysis, rollback proof, approvals, dependencies, maintenance window, and post-change validation. Return readiness status, blockers, and questions. Do not make the change sound approved when evidence is missing.',
    },
    {
      label: 'Capacity and availability',
      text: 'Using the demand forecast, utilisation history, error budget, and scaling limits, calculate headroom for the autumn campaign. Show assumptions and three scenarios. Mark which missing data prevents a go/no-go recommendation.',
    },
  ],
  de: [
    {
      label: 'Langes Ticket-Theater',
      text: 'Bitte erstelle einen sehr umfassenden und professionellen ITSM-Ticketbericht. Füge viele Details zu allen Tickets ein, erkläre jede Kategorie, mache ihn managementtauglich, ergänze Empfehlungen und decke Risiken, Trends, Kundenzufriedenheit, Teamleistung sowie alles weitere Nützliche ab. Sei extrem gründlich, professionell und detailliert und übersehe nichts Wichtiges.',
    },
    {
      label: 'Service-Ergebnis prüfen',
      text: 'Identifiziere anhand der monatlichen Service-Daten die zwei größten Risiken für die Verfügbarkeit des Payroll-Services. Trenne Incidents von wiederkehrenden Problems, belege Aussagen mit Kennzahlen und schlage ein messbares Verbesserungs-Experiment vor. Ticketmenge nicht als Ersatzkennzahl für Service-Qualität verwenden.',
    },
    {
      label: 'Problem-Analyse',
      text: 'Ziel: Feststellen, ob wiederkehrende Incidents des Invoice-Services einen Problem Record rechtfertigen. Evidenz: Incident-Records mit Service Map, Monitoring-Historie, letzten Changes, Abhängigkeitszustand und Known Errors vergleichen. Einschränkungen: Beobachtete Muster von Root-Cause-Hypothesen trennen. Ausgabeformat: Evidenz, Hypothesen, fehlende Checks, Empfehlung. Fertig wenn: Die Empfehlung auf Evidenz zurückführbar ist und keine bewiesene Root Cause vortäuscht.',
    },
    {
      label: 'Change Readiness',
      text: 'Prüfe den vorgeschlagenen Timeout-Change gegen die beigefügte Change-Policy und Evidenz. Identifiziere fehlende Impact-Analyse, Rollback-Beleg, Freigaben, Abhängigkeiten, Wartungsfenster und Post-Change-Validierung. Gib Readiness-Status, Blocker und Fragen zurück. Den Change nicht genehmigt wirken lassen, wenn Evidenz fehlt.',
    },
    {
      label: 'Capacity und Availability',
      text: 'Berechne anhand von Demand Forecast, Auslastungshistorie, Error Budget und Scaling-Grenzen den Headroom für die Herbstkampagne. Zeige Annahmen und drei Szenarien. Markiere, welche fehlenden Daten eine Go/No-Go-Empfehlung verhindern.',
    },
  ],
};

export const PROMPT_PRESETS: Record<GuideMode, Record<Lang, PromptPreset[]>> = {
  coding: ENGINEERING_PRESETS,
  serviceOps: ITSM_PRESETS,
};

export const getDefaultPreset = (lang: Lang, guideMode: GuideMode): PromptPreset | undefined =>
  PROMPT_PRESETS[guideMode][lang][1] ?? PROMPT_PRESETS[guideMode][lang][0];
