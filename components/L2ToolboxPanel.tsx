import React, { useMemo, useState } from 'react';
import { Check, Copy, FileCode2 } from 'lucide-react';
import { L2_TOOLBOX_PROMPTS } from '../l2Prompts';
import { Lang } from '../types';

interface L2ToolboxPanelProps {
  lang: Lang;
}

const Label: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = '', children }) => (
  <div className={`pixel-font text-[8px] uppercase tracking-wider ${className}`}>{children}</div>
);

const L2ToolboxPanel: React.FC<L2ToolboxPanelProps> = ({ lang }) => {
  const de = lang === 'de';
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [copiedToolId, setCopiedToolId] = useState<string | null>(null);
  const selectedTool = useMemo(
    () => L2_TOOLBOX_PROMPTS.find((tool) => tool.id === selectedToolId) ?? null,
    [selectedToolId],
  );

  const copyPrompt = (id: string, prompt: string): void => {
    void navigator.clipboard.writeText(prompt);
    setCopiedToolId(id);
    window.setTimeout(() => setCopiedToolId((current) => current === id ? null : current), 1400);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {L2_TOOLBOX_PROMPTS.map((tool) => {
          const active = selectedToolId === tool.id;
          const category = de ? tool.categoryDE : tool.categoryEN;
          const title = de ? tool.titleDE : tool.titleEN;
          const description = de ? tool.descriptionDE : tool.descriptionEN;

          return (
            <button
              key={tool.id}
              type="button"
              onClick={() => setSelectedToolId(active ? null : tool.id)}
              className={`retro-button min-h-40 p-4 text-left transition ${active ? 'border-cyan-400 bg-cyan-950/35' : 'border-indigo-800 bg-slate-950/90 hover:border-fuchsia-500'}`}
            >
              <div className="flex items-center justify-between gap-3">
                <Label className={active ? 'text-cyan-300' : 'text-fuchsia-300'}>{category} // L2</Label>
                <FileCode2 size={20} className={active ? 'text-cyan-300' : 'text-slate-500'} />
              </div>
              <div className="mt-3 text-base font-black text-white">{title}</div>
              <div className="mt-2 text-xs leading-relaxed text-slate-400">{description}</div>
              <div className="mt-3 font-mono text-[10px] text-slate-600">{tool.sourceRecipe}</div>
            </button>
          );
        })}
      </div>

      {selectedTool ? (
        <div className="border-2 border-cyan-700 bg-[#050816] shadow-[6px_6px_0_#020617]">
          <div className="flex items-center justify-between gap-4 border-b-2 border-cyan-900 bg-cyan-950/25 px-4 py-3">
            <div>
              <Label className="text-cyan-300">{de ? 'KONKRETES L2-BEISPIEL' : 'CONCRETE L2 EXAMPLE'}</Label>
              <div className="mt-2 text-sm font-black text-white">{de ? selectedTool.titleDE : selectedTool.titleEN}</div>
              <div className="mt-1 font-mono text-[10px] text-slate-500">{de ? 'abgeleitet von' : 'adapted from'}: {selectedTool.sourceRecipe}</div>
            </div>
            <button
              type="button"
              onClick={() => copyPrompt(selectedTool.id, de ? selectedTool.promptDE : selectedTool.promptEN)}
              className="retro-button flex items-center gap-2 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-200"
            >
              {copiedToolId === selectedTool.id ? <Check size={16} className="text-emerald-300" /> : <Copy size={16} className="text-cyan-300" />}
              {copiedToolId === selectedTool.id ? (de ? 'KOPIERT' : 'COPIED') : (de ? 'KOPIEREN' : 'COPY')}
            </button>
          </div>
          <pre className="max-h-96 overflow-auto whitespace-pre-wrap p-5 font-mono text-[12px] leading-6 text-slate-200">{de ? selectedTool.promptDE : selectedTool.promptEN}</pre>
          <div className="border-t border-indigo-900 px-4 py-3 text-xs leading-relaxed text-slate-500">
            {de
              ? `Beispiel für diese Präsentation. Die Methode ist aus dem Recall-Rezept „${selectedTool.sourceRecipe}“ abgeleitet; Ticket, Systeme und Formulierungen sind bewusst auf IT-Support/Admin zugeschnitten.`
              : `Example adapted for this presentation from the Recall recipe “${selectedTool.sourceRecipe}”; the case and wording are intentionally tailored to IT support/admin work.`}
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-indigo-800 px-4 py-5 text-center text-sm text-slate-500">
          {de ? 'Auf eine Karte klicken → deutsches L2-Beispiel für einen konkreten IT-Fall öffnen.' : 'Click a card → open a concrete L2 example for an IT case.'}
        </div>
      )}
    </div>
  );
};

export default L2ToolboxPanel;
