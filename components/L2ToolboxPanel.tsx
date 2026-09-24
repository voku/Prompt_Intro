import React, { useState } from 'react';
import { ArrowRight, Check, ChevronDown, Copy, HardDrive, RotateCcw, Users, Wifi, Zap } from 'lucide-react';
import { L2_TOOLBOX_PROMPTS, L2ToolIcon } from '../l2Prompts';
import { Lang } from '../types';

interface L2ToolboxPanelProps {
  lang: Lang;
}

const TOOL_ICONS: Record<L2ToolIcon, React.FC<{ size?: number; className?: string }>> = {
  wifi: Wifi,
  harddrive: HardDrive,
  handoff: Users,
};

const Label: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = '', children }) => (
  <div className={`pixel-font text-[8px] uppercase tracking-wider ${className}`}>{children}</div>
);

/** Reveals children one after another; remounting (via key) replays the sequence. */
const appear = (delaySeconds: number): React.CSSProperties => ({
  animation: `fadeIn .35s steps(6,end) ${delaySeconds}s both`,
});

const L2ToolboxPanel: React.FC<L2ToolboxPanelProps> = ({ lang }) => {
  const de = lang === 'de';
  const [selectedToolId, setSelectedToolId] = useState(L2_TOOLBOX_PROMPTS[0].id);
  const [replayCount, setReplayCount] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);
  const selectedTool = L2_TOOLBOX_PROMPTS.find((tool) => tool.id === selectedToolId) ?? L2_TOOLBOX_PROMPTS[0];
  const text = de ? selectedTool.de : selectedTool.en;

  const selectTool = (id: string): void => {
    setSelectedToolId(id);
    setReplayCount((count) => count + 1);
    setShowPrompt(false);
  };

  const copyPrompt = (): void => {
    void navigator.clipboard.writeText(text.prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  // Timeline: quick fix → recipe → case → arrow → work order lines one by one.
  const recipeStart = 0.5;
  const caseStart = recipeStart + text.recipe.length * 0.25 + 0.2;
  const arrowStart = caseStart + text.caseFacts.length * 0.25 + 0.2;
  const workOrderStart = arrowStart + 0.4;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        {L2_TOOLBOX_PROMPTS.map((tool) => {
          const active = tool.id === selectedTool.id;
          const toolText = de ? tool.de : tool.en;
          const Icon = TOOL_ICONS[tool.icon];
          return (
            <button
              key={tool.id}
              type="button"
              onClick={() => selectTool(tool.id)}
              className={`retro-button p-4 text-left transition ${active ? 'border-cyan-400 bg-cyan-950/35' : 'border-indigo-800 bg-slate-950/90 hover:border-fuchsia-500'}`}
            >
              <div className="flex items-center justify-between gap-3">
                <Label className={active ? 'text-cyan-300' : 'text-fuchsia-300'}>{toolText.category}</Label>
                <Icon size={20} className={active ? 'text-cyan-300' : 'text-slate-500'} />
              </div>
              <div className="mt-2 text-base font-black text-white">{toolText.title}</div>
              <div className="mt-1 text-xs leading-relaxed text-slate-400">{toolText.when}</div>
            </button>
          );
        })}
      </div>

      <div key={`${selectedTool.id}-${replayCount}`} className="space-y-3">
        <div style={appear(0)} className="flex flex-wrap items-center gap-3 border-2 border-rose-900 bg-rose-950/20 px-4 py-2 text-sm text-rose-100">
          <Zap size={16} className="text-rose-300" />
          <span className="pixel-font text-[8px] text-rose-300">{de ? 'SCHNELLSCHUSS' : 'QUICK FIX'}</span>
          <span className="line-through decoration-rose-400/70">{text.quickFix}</span>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1.35fr] lg:items-stretch">
          <div className="border-2 border-fuchsia-700 bg-fuchsia-950/20 p-4">
            <Label className="text-fuchsia-300">{de ? 'VORLAGE · BLEIBT GLEICH' : 'TEMPLATE · REUSABLE'}</Label>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {text.recipe.map((line, index) => (
                <li key={line} style={appear(recipeStart + index * 0.25)} className="flex gap-2"><span className="text-fuchsia-400">▸</span>{line}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center text-3xl font-black text-slate-500">+</div>

          <div className="border-2 border-amber-700 bg-amber-950/20 p-4">
            <Label className="text-amber-300">{de ? 'HEUTIGER FALL' : 'TODAY’S CASE'}</Label>
            <ul className="mt-3 space-y-2">
              {text.caseFacts.map((fact, index) => (
                <li key={fact} style={appear(caseStart + index * 0.25)} className="border border-amber-800 bg-slate-950/60 px-2 py-1 font-mono text-xs text-amber-100">{fact}</li>
              ))}
            </ul>
          </div>

          <div style={appear(arrowStart)} className="flex items-center justify-center">
            <ArrowRight size={34} className="pixel-pulse rotate-90 text-emerald-300 lg:rotate-0" />
          </div>

          <div className="border-2 border-emerald-700 bg-emerald-950/20 p-4">
            <Label className="text-emerald-300">{de ? 'ARBEITSAUFTRAG · NUR FÜR HEUTE' : 'WORK ORDER · JUST FOR TODAY'}</Label>
            <dl className="mt-3 space-y-2 text-sm">
              {text.workOrder.map(({ label, text: value }, index) => (
                <div key={label} style={appear(workOrderStart + index * 0.35)} className="grid grid-cols-[7.5rem_1fr] gap-2">
                  <dt className="font-bold text-emerald-300">{label}</dt>
                  <dd className="text-slate-200">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setReplayCount((count) => count + 1)} className="retro-button flex items-center gap-2 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-200">
          <RotateCcw size={16} className="text-fuchsia-300" />{de ? 'NOCHMAL ABSPIELEN' : 'REPLAY'}
        </button>
        <button type="button" onClick={() => setShowPrompt((value) => !value)} className="retro-button flex items-center gap-2 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-200">
          <ChevronDown size={16} className={`text-cyan-300 transition ${showPrompt ? 'rotate-180' : ''}`} />{de ? 'VOLLSTÄNDIGE VORLAGE' : 'FULL TEMPLATE'}
        </button>
        <button type="button" onClick={copyPrompt} className="retro-button flex items-center gap-2 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-200">
          {copied ? <Check size={16} className="text-emerald-300" /> : <Copy size={16} className="text-cyan-300" />}
          {copied ? (de ? 'KOPIERT' : 'COPIED') : (de ? 'VORLAGE KOPIEREN' : 'COPY TEMPLATE')}
        </button>
      </div>

      {showPrompt && (
        <pre className="max-h-80 overflow-auto whitespace-pre-wrap border-2 border-cyan-800 bg-[#050816] p-5 font-mono text-[13px] leading-6 text-slate-200">{text.prompt}</pre>
      )}
    </div>
  );
};

export default L2ToolboxPanel;
