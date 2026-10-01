import React, { useState } from 'react';
import { ArrowDown, ArrowRight, ChevronDown, ChevronUp, FileClock, Sparkles, SquareTerminal, Table2, Wrench } from 'lucide-react';
import { Lang } from '../types';

interface PromptComparisonProps {
  standard: string;
  optimized: string;
  technique: string;
  description: string;
  lang: Lang;
  workOrder?: string;
  result?: string;
}

const PromptComparison: React.FC<PromptComparisonProps> = ({ standard, optimized, technique, description, lang, workOrder, result }) => {
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

  /** Script output as a terminal, `| a | b |` lines as a table with "open" cells highlighted. */
  const renderResult = (value: string) => {
    const lines = value.split('\n');
    const isTable = lines.every((line) => line.trim().startsWith('|'));
    if (isTable) {
      const rows = lines.map((line) => line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim()));
      const [head, ...body] = rows;
      return (
        <div className="anim-rise border-t-2 border-emerald-800 bg-emerald-950/15 p-4" style={{ animationDelay: '.4s' }}>
          <div className="mb-2 flex items-center gap-2"><Table2 size={16} className="text-emerald-300" /><span className="pixel-font text-emerald-300">{de ? 'Ergebnis' : 'Result'}</span></div>
          <table className="w-full border-collapse text-left text-base">
            <thead><tr>{head.map((cell) => <th key={cell} className="border-b border-emerald-800 px-2 py-1.5 font-bold text-emerald-200">{cell}</th>)}</tr></thead>
            <tbody>
              {body.map((row, r) => (
                <tr key={r} className="anim-rise" style={{ animationDelay: `${0.6 + r * 0.25}s` }}>
                  {row.map((cell, c) => {
                    const open = /^(offen|open)$/i.test(cell);
                    return <td key={c} className="border-b border-slate-800 px-2 py-1.5"><span className={open ? 'border border-amber-500 bg-amber-500/20 px-1.5 py-0.5 font-bold text-amber-200' : 'text-slate-100'}>{cell}</span></td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <div className="anim-rise border-t-2 border-emerald-800 bg-black p-4 font-mono text-sm leading-6" style={{ animationDelay: '.4s' }}>
        <div className="mb-2 flex items-center gap-2"><SquareTerminal size={16} className="text-emerald-300" /><span className="pixel-font text-emerald-300">{de ? 'Ausgabe' : 'Output'}</span></div>
        {lines.map((line, i) => (
          <div key={i} className={`anim-rise ${line.startsWith('$') ? 'text-slate-400' : line.startsWith('#') ? 'mt-1 font-bold text-amber-300' : 'text-emerald-200'}`} style={{ animationDelay: `${0.6 + i * 0.22}s` }}>{line}</div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 border-l-4 border-fuchsia-500 bg-fuchsia-950/20 px-4 py-3 text-base text-slate-200">
        <strong className="text-fuchsia-300">{technique}</strong>
        <span className="text-slate-600">//</span>
        <span>{description}</span>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-[.8fr_auto_1.2fr]">
        <div className="flex flex-col overflow-hidden border border-amber-500/40 bg-slate-950/80">
          <div className="flex items-center justify-between gap-3 border-b border-amber-800/70 bg-amber-950/30 px-4 py-3">
            <span className="pixel-font text-amber-300">{labels.standardLabel}</span>
            <FileClock size={20} className="text-amber-300" />
          </div>
          <div className="flex flex-wrap gap-2 px-5 pt-4">{labels.standardTags.map((value) => tag(value, 'amber'))}</div>
          <pre className={`flex-grow whitespace-pre-wrap px-5 pb-5 pt-3 font-mono text-slate-300 ${standard.length < 160 ? 'text-xl leading-9' : 'text-base leading-7'}`}>{standard}</pre>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/60 bg-cyan-950/60 text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,.35)]">
            <ArrowRight size={22} className="rotate-90 md:rotate-0" />
          </div>
        </div>

        <div className="flex flex-col overflow-hidden border border-cyan-400/60 bg-slate-950/90 shadow-[0_0_44px_-10px_rgba(34,211,238,.5)]">
          <div className="flex items-center justify-between gap-3 border-b border-cyan-800 bg-cyan-950/40 px-4 py-3">
            <span className="pixel-font text-cyan-300">{labels.optimizedLabel}</span>
            <Sparkles size={20} className="text-cyan-300" />
          </div>
          <div className="flex flex-wrap gap-2 px-5 pt-4">{labels.optimizedTags.map((value) => tag(value, 'cyan'))}</div>
          <pre className={`flex-grow whitespace-pre-wrap px-5 pb-5 pt-3 font-mono text-white ${optimized.length < 260 ? 'text-xl leading-9' : 'text-[17px] leading-8'}`}>{optimized}</pre>
          {result && renderResult(result)}
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
                <span className="pixel-font text-emerald-300">{labels.workOrderLabel}</span>
                <p className="mt-2 text-xs text-slate-400">{labels.workOrderNote}</p>
              </div>
              <pre className="whitespace-pre-wrap p-5 font-mono text-base leading-7 md:text-[17px] text-slate-200">{workOrder}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromptComparison;
