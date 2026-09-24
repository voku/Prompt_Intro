import React, { useState } from 'react';
import { ArrowDown, ChevronDown, ChevronUp, FileClock, Sparkles, Wrench } from 'lucide-react';
import { Lang } from '../types';

interface PromptComparisonProps {
  standard: string;
  optimized: string;
  technique: string;
  description: string;
  lang: Lang;
  workOrder?: string;
}

const PromptComparison: React.FC<PromptComparisonProps> = ({ standard, optimized, technique, description, lang, workOrder }) => {
  const [showWorkOrder, setShowWorkOrder] = useState(false);
  const de = lang === 'de';

  const labels = {
    standardLabel: workOrder
      ? (de ? 'DIREKTER PROMPT · DIESER FALL' : 'DIRECT PROMPT · THIS CASE')
      : (de ? 'STANDARD-PROMPT' : 'STANDARD PROMPT'),
    optimizedLabel: workOrder
      ? (de ? 'WIEDERVERWENDBARE VORLAGE' : 'REUSABLE TEMPLATE')
      : (de ? 'OPTIMIERTER PROMPT' : 'OPTIMIZED PROMPT'),
    standardTags: workOrder
      ? (de ? ['Ticket-ID', 'Datei', 'Zahlen'] : ['ticket ID', 'file', 'numbers'])
      : (de ? ['Naiv', 'Ohne Führung'] : ['Naive', 'Unguided']),
    optimizedTags: workOrder
      ? (de ? ['Regeln', 'Evidenz', 'Stop-Grenze'] : ['rules', 'evidence', 'stop boundary'])
      : (de ? ['Mit Methode', 'Leitplanken'] : ['With Method', 'Guardrails']),
    showWorkOrder: de ? 'Daraus entstandenen Arbeitsauftrag zeigen' : 'Show generated work order',
    hideWorkOrder: de ? 'Arbeitsauftrag ausblenden' : 'Hide work order',
    workOrderLabel: de ? 'Vorlage + heutiger Fall → Arbeitsauftrag' : 'Template + current case → work order',
    workOrderNote: de ? 'Das ist der konkrete Auftrag, der dann wirklich ausgeführt wird.' : 'This is the concrete contract that is actually executed.',
  };

  const tag = (value: string, tone: 'amber' | 'cyan') => (
    <span key={value} className={`border px-2 py-1 font-mono text-xs ${tone === 'amber' ? 'border-amber-700 bg-amber-950/30 text-amber-200' : 'border-cyan-700 bg-cyan-950/30 text-cyan-200'}`}>{value}</span>
  );

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-3 border-l-4 border-fuchsia-500 bg-fuchsia-950/20 px-4 py-3 text-sm text-slate-200">
        <strong className="text-fuchsia-300">{technique}</strong>
        <span className="text-slate-600">//</span>
        <span>{description}</span>
      </div>

      <div className="grid flex-grow grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col overflow-hidden border-2 border-amber-700 bg-slate-950/90 shadow-[5px_5px_0_#020617]">
          <div className="border-b-2 border-amber-800 bg-amber-950/35 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <span className="pixel-font text-[8px] text-amber-300">{labels.standardLabel}</span>
              <FileClock size={20} className="text-amber-300" />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">{labels.standardTags.map((value) => tag(value, 'amber'))}</div>
          </div>
          <pre className="flex-grow whitespace-pre-wrap p-5 font-mono text-sm leading-6 text-slate-200">{standard}</pre>
        </div>

        <div className="flex flex-col overflow-hidden border-2 border-cyan-700 bg-slate-950/90 shadow-[5px_5px_0_#020617]">
          <div className="border-b-2 border-cyan-800 bg-cyan-950/30 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <span className="pixel-font text-[8px] text-cyan-300">{labels.optimizedLabel}</span>
              <Sparkles size={20} className="text-cyan-300" />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">{labels.optimizedTags.map((value) => tag(value, 'cyan'))}</div>
          </div>
          <pre className="flex-grow whitespace-pre-wrap p-5 font-mono text-sm leading-6 text-slate-200">{optimized}</pre>
        </div>
      </div>

      {workOrder && (
        <div>
          <div className="flex justify-center py-1"><ArrowDown size={24} className="text-fuchsia-400" /></div>
          <button
            type="button"
            onClick={() => setShowWorkOrder((value) => !value)}
            className="retro-button flex w-full items-center justify-between bg-fuchsia-950/50 px-4 py-3 text-sm font-bold text-fuchsia-100 hover:bg-fuchsia-950"
            aria-expanded={showWorkOrder}
          >
            <span className="flex items-center gap-2"><Wrench size={16} className="text-emerald-300" />{showWorkOrder ? labels.hideWorkOrder : labels.showWorkOrder}</span>
            {showWorkOrder ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showWorkOrder && (
            <div className="mt-3 overflow-hidden border-2 border-emerald-700 bg-emerald-950/15 shadow-[5px_5px_0_#020617]">
              <div className="border-b-2 border-emerald-800 px-4 py-3">
                <span className="pixel-font text-[8px] text-emerald-300">{labels.workOrderLabel}</span>
                <p className="mt-2 text-xs text-slate-400">{labels.workOrderNote}</p>
              </div>
              <pre className="whitespace-pre-wrap p-5 font-mono text-sm leading-6 text-slate-200">{workOrder}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromptComparison;
