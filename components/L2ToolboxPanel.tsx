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
  <div className={`pixel-font uppercase tracking-wider ${className}`}>{children}</div>
);

/** Reveals children one after another; remounting (via key) replays the sequence. */
const appear = (delaySeconds: number): React.CSSProperties => ({
  animation: `fadeIn .45s cubic-bezier(.22,.8,.24,1) ${delaySeconds}s both`,
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

  const stepBadge = (n: string, tone: string) => (
    <span className={`pixel-font flex h-7 w-9 items-center justify-center border ${tone}`}>{n}</span>
  );
  const connector = (symbol: React.ReactNode, delay?: number) => (
    <div style={delay === undefined ? undefined : appear(delay)} className="flex items-center justify-center py-1 lg:py-0">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-600 bg-slate-900 text-2xl font-black text-slate-300 shadow-[0_0_18px_rgba(34,211,238,.18)]">{symbol}</div>
    </div>
  );

  return (
    <div className="space-y-3">
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
              aria-pressed={active}
              className={`retro-button relative flex items-start gap-4 overflow-hidden px-4 py-3 text-left ${active ? 'border-cyan-300/70 bg-gradient-to-br from-cyan-950/70 to-indigo-950/60 shadow-[0_0_30px_-6px_rgba(34,211,238,.45)]' : 'bg-slate-950/80 opacity-80 hover:opacity-100 hover:border-fuchsia-400/70'}`}
            >
              {active && <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-fuchsia-400 to-cyan-300" />}
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center border ${active ? 'border-cyan-300/60 bg-cyan-900/40 text-cyan-300' : 'border-slate-700 bg-slate-900 text-slate-500'}`}><Icon size={24} /></span>
              <span className="min-w-0">
                <Label className={active ? 'text-cyan-300' : 'text-fuchsia-300'}>{toolText.category}</Label>
                <span className="mt-1.5 block text-lg font-bold leading-tight text-white">{toolText.title}</span>
                {active && <span className="mt-1 block text-sm leading-snug text-slate-300">{toolText.when}</span>}
              </span>
            </button>
          );
        })}
      </div>

      <div key={`${selectedTool.id}-${replayCount}`} className="space-y-3">
        <div style={appear(0)} className="flex flex-wrap items-center gap-3 border border-rose-500/40 bg-rose-950/20 px-4 py-2 text-base text-rose-100">
          <Zap size={18} className="text-rose-300" />
          <span className="pixel-font text-rose-300">{de ? 'SCHNELLSCHUSS' : 'QUICK FIX'}</span>
          <span className="line-through decoration-rose-400/70">{text.quickFix}</span>
          <span className="ml-auto text-sm font-semibold text-rose-300">{de ? 'klappt einmal – skaliert nicht' : 'works once – does not scale'}</span>
        </div>

        <div className="grid gap-2 lg:grid-cols-[1fr_auto_1fr_auto_1.4fr] lg:items-stretch">
          <div className="border border-fuchsia-500/50 bg-gradient-to-b from-fuchsia-950/35 to-fuchsia-950/10 p-4">
            <div className="flex items-center gap-3">{stepBadge('01', 'border-fuchsia-400/60 bg-fuchsia-900/40 text-fuchsia-200')}<Label className="text-fuchsia-300">{de ? 'VORLAGE · BLEIBT GLEICH' : 'TEMPLATE · REUSABLE'}</Label></div>
            <ul className="mt-3 space-y-2 text-base text-slate-200">
              {text.recipe.map((line, index) => (
                <li key={line} style={appear(recipeStart + index * 0.25)} className="flex gap-2.5"><span className="text-fuchsia-400">▸</span>{line}</li>
              ))}
            </ul>
          </div>

          {connector('+')}

          <div className="border border-amber-500/50 bg-gradient-to-b from-amber-950/35 to-amber-950/10 p-4">
            <div className="flex items-center gap-3">{stepBadge('02', 'border-amber-400/60 bg-amber-900/40 text-amber-200')}<Label className="text-amber-300">{de ? 'HEUTIGER FALL' : 'TODAY’S CASE'}</Label></div>
            <ul className="mt-3 space-y-1.5">
              {text.caseFacts.map((fact, index) => (
                <li key={fact} style={appear(caseStart + index * 0.25)} className="border border-amber-700/70 bg-slate-950/70 px-3 py-1.5 font-mono text-sm text-amber-100">{fact}</li>
              ))}
            </ul>
          </div>

          {connector(<ArrowRight size={22} className="pixel-pulse text-emerald-300" />, arrowStart)}

          <div className="border border-emerald-400/60 bg-gradient-to-b from-emerald-950/40 to-emerald-950/10 p-4 shadow-[0_0_34px_-10px_rgba(52,211,153,.5)]">
            <div className="flex items-center gap-3">{stepBadge('03', 'border-emerald-400/60 bg-emerald-900/40 text-emerald-200')}<Label className="text-emerald-300">{de ? 'ARBEITSAUFTRAG · NUR FÜR HEUTE' : 'WORK ORDER · JUST FOR TODAY'}</Label></div>
            <dl className="mt-3 space-y-2 text-base">
              {text.workOrder.map(({ label, text: value }, index) => (
                <div key={label} style={appear(workOrderStart + index * 0.35)} className="grid grid-cols-[8rem_1fr] gap-3 border-t border-emerald-900/60 pt-2.5 first:border-0 first:pt-0">
                  <dt className="font-bold text-emerald-300">{label}</dt>
                  <dd className="text-slate-100">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setReplayCount((count) => count + 1)} className="retro-button flex items-center gap-2 bg-slate-900/80 px-4 py-2.5 text-xs font-bold text-slate-200">
          <RotateCcw size={16} className="text-fuchsia-300" />{de ? 'NOCHMAL ABSPIELEN' : 'REPLAY'}
        </button>
        <button type="button" onClick={() => setShowPrompt((value) => !value)} aria-expanded={showPrompt} className="retro-button flex items-center gap-2 bg-slate-900/80 px-4 py-2.5 text-xs font-bold text-slate-200">
          <ChevronDown size={16} className={`text-cyan-300 transition ${showPrompt ? 'rotate-180' : ''}`} />{de ? 'VOLLSTÄNDIGE VORLAGE' : 'FULL TEMPLATE'}
        </button>
        <button type="button" onClick={copyPrompt} className="retro-button flex items-center gap-2 bg-slate-900/80 px-4 py-2.5 text-xs font-bold text-slate-200">
          {copied ? <Check size={16} className="text-emerald-300" /> : <Copy size={16} className="text-cyan-300" />}
          {copied ? (de ? 'KOPIERT' : 'COPIED') : (de ? 'VORLAGE KOPIEREN' : 'COPY TEMPLATE')}
        </button>
      </div>

      {showPrompt && (
        <pre className="max-h-80 overflow-auto whitespace-pre-wrap border border-cyan-500/40 bg-[#050816] p-5 font-mono text-sm leading-6 text-slate-200">{text.prompt}</pre>
      )}
    </div>
  );
};

export default L2ToolboxPanel;
