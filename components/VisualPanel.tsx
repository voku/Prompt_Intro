import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Ban,
  Binary,
  Bot,
  CarFront,
  Check,
  CheckCircle2,
  CircleHelp,
  Copy,
  Cpu,
  Eye,
  FileCode2,
  FileLock2,
  FileSpreadsheet,
  Footprints,
  GitBranch,
  KeyRound,
  Route,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  TriangleAlert,
  XCircle,
} from 'lucide-react';
import { L2_TOOLBOX_PROMPTS } from '../l2Prompts';
import { Lang, VisualKind } from '../types';

interface VisualPanelProps { kind: VisualKind; lang: Lang; }

const Box: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = '', children }) => (
  <div className={`border-2 border-indigo-800 bg-slate-950/90 p-4 shadow-[5px_5px_0_#020617] ${className}`}>{children}</div>
);

const Label: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = '', children }) => (
  <div className={`pixel-font text-[8px] uppercase tracking-wider ${className}`}>{children}</div>
);

const VisualPanel: React.FC<VisualPanelProps> = ({ kind, lang }) => {
  const de = lang === 'de';
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [copiedToolId, setCopiedToolId] = useState<string | null>(null);
  const selectedTool = useMemo(
    () => L2_TOOLBOX_PROMPTS.find((tool) => tool.id === selectedToolId) ?? null,
    [selectedToolId],
  );

  if (kind === 'carwash') {
    return (
      <div className="space-y-4">
        <Box className="border-cyan-700 bg-cyan-950/20">
          <Label className="text-cyan-300">PROMPT</Label>
          <div className="mt-3 text-xl font-black text-white">{de ? '„Ich will mein Auto waschen. Die Waschanlage ist 50 Meter entfernt. Laufen oder fahren?“' : '“I want to wash my car. The car wash is 50 metres away. Walk or drive?”'}</div>
        </Box>
        <div className="grid gap-4 md:grid-cols-2">
          <Box className="border-amber-700 bg-amber-950/20">
            <div className="flex items-center gap-3"><Footprints className="text-amber-300" size={30} /><div><Label className="text-amber-300">{de ? 'PLAUSIBLES MUSTER' : 'PLAUSIBLE PATTERN'}</Label><div className="mt-2 font-black text-white">50 m → {de ? 'laufen' : 'walk'}</div></div></div>
            <div className="mt-4 text-sm text-slate-400">{de ? 'Kurze Strecke. Klingt vernünftig. Löst aber nicht zwingend die eigentliche Aufgabe.' : 'Short distance. Sounds reasonable. But it may solve the wrong task.'}</div>
          </Box>
          <Box className="border-emerald-700 bg-emerald-950/20">
            <div className="flex items-center gap-3"><CarFront className="text-emerald-300" size={30} /><div><Label className="text-emerald-300">{de ? 'IMPLIZITE BEDINGUNG' : 'IMPLICIT CONDITION'}</Label><div className="mt-2 font-black text-white">{de ? 'Auto waschen → Auto muss mit' : 'wash car → car must arrive'}</div></div></div>
            <div className="mt-4 text-sm text-slate-400">{de ? 'Menschen ergänzen diesen Zusammenhang fast automatisch. Ein Modell muss ihn aus Kontext und Mustern ableiten.' : 'Humans usually add this relation automatically. A model has to infer it from context and patterns.'}</div>
          </Box>
        </div>
        <div className="flex items-center justify-center gap-3 border-2 border-fuchsia-800 bg-fuchsia-950/20 px-4 py-3 text-center text-fuchsia-100">
          <Route size={20} className="text-fuchsia-300" />
          <strong>{de ? 'Die explizite Frage kann stärker wirken als das implizite Ziel.' : 'The explicit question can dominate the implicit goal.'}</strong>
        </div>
      </div>
    );
  }

  if (kind === 'noise-hallucination') {
    const noiseRows = [
      '▓░▒··░▓▒░·▒▓░▒··▓░',
      '░▓··▒░▓░▒▓··░▒▓░·▒',
      '▒░▓·░▒··▓▒░▓·░▒▓░·',
      '·▒▓░·░▓▒··▒░▓·▒░▓·',
      '░·▒▓░▒··▓░·▒▓░░·▒▓',
    ];
    return (
      <div className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <Box className="relative overflow-hidden border-slate-600 bg-[#080808]">
            <Label className="text-slate-400">{de ? 'BILD // NUR RAUSCHEN' : 'IMAGE // NOISE ONLY'}</Label>
            <div className="mt-5 space-y-1 overflow-hidden font-mono text-lg tracking-[.28em] text-slate-500 opacity-80">
              {noiseRows.map((row) => <div key={row}>{row}</div>)}
            </div>
            <Eye className="absolute bottom-3 right-3 text-slate-700" size={42} />
          </Box>
          <div className="grid gap-3">
            <Box className="border-fuchsia-700 bg-fuchsia-950/20">
              <Label className="text-fuchsia-300">GPT-5.6 SOL</Label>
              <div className="mt-3 text-2xl font-black text-white">“I love you.”</div>
            </Box>
            <Box className="border-amber-700 bg-amber-950/20">
              <Label className="text-amber-300">CLAUDE FABLE 5</Label>
              <div className="mt-3 text-sm font-bold leading-relaxed text-white">{de ? '„Das ist eine Prompt-Injection. Ich darf den Text nicht verraten und soll behaupten, dort sei eine Rose.“' : '“This is a prompt injection. I must not reveal the text and should claim the image shows a rose.”'}</div>
            </Box>
          </div>
        </div>
        <div className="border-2 border-emerald-700 bg-emerald-950/25 px-4 py-4 text-center">
          <Label className="text-emerald-300">GROUND TRUTH</Label>
          <div className="mt-2 text-2xl font-black text-white">{de ? 'DA WAR GAR KEINE NACHRICHT.' : 'THERE WAS NO MESSAGE.'}</div>
        </div>
      </div>
    );
  }

  if (kind === 'tokens') {
    const letters = 'strawberry'.split('');
    return (
      <div className="space-y-5">
        <Box className="border-cyan-700 bg-cyan-950/20">
          <Label className="text-cyan-300">{de ? 'DU SIEHST ZEICHEN' : 'YOU SEE CHARACTERS'}</Label>
          <div className="mt-4 flex flex-wrap gap-2">
            {letters.map((letter, index) => <span key={`${letter}-${index}`} className={`flex h-11 w-11 items-center justify-center border-2 font-mono text-xl font-black ${letter === 'r' ? 'border-amber-500 bg-amber-950/40 text-amber-200' : 'border-slate-700 bg-slate-900 text-white'}`}>{letter}</span>)}
          </div>
          <div className="mt-3 text-sm text-slate-400">{de ? 'Exaktes Ergebnis: 3 × „r“.' : 'Exact result: 3 × “r”.'}</div>
        </Box>
        <ArrowRight className="mx-auto rotate-90 text-fuchsia-400 md:rotate-0" size={32} />
        <Box className="border-fuchsia-700 bg-fuchsia-950/20">
          <div className="flex items-center gap-3"><Binary className="text-fuchsia-300" size={28} /><div><Label className="text-fuchsia-300">TOKENIZER</Label><div className="mt-2 font-black text-white">{de ? 'Text → modellabhängige Token-Chunks' : 'Text → model-specific token chunks'}</div></div></div>
          <div className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-slate-300">
            <span className="border border-fuchsia-800 bg-fuchsia-950/30 px-3 py-2">TOKEN #1</span>
            <span className="border border-fuchsia-800 bg-fuchsia-950/30 px-3 py-2">TOKEN #2</span>
            <span className="border border-fuchsia-800 bg-fuchsia-950/30 px-3 py-2">…</span>
          </div>
          <div className="mt-3 text-xs text-slate-500">{de ? 'Schematisch: Die konkrete Aufteilung hängt vom Tokenizer ab. Tokens sind nicht automatisch einzelne Buchstaben.' : 'Schematic: exact splitting depends on the tokenizer. Tokens are not automatically individual characters.'}</div>
        </Box>
        <div className="flex items-center gap-3 border-2 border-emerald-800 bg-emerald-950/20 px-4 py-3 text-emerald-100"><Cpu size={20} />{de ? 'Wenn exakte Zeichenarbeit zählt: Code/Tool benutzen, nicht Sprachgefühl.' : 'When exact character work matters: use code/tools, not language intuition.'}</div>
      </div>
    );
  }

  if (kind === 'next-token') {
    return (
      <div className="space-y-4">
        <Box className="border-cyan-700 bg-cyan-950/20">
          <Label className="text-cyan-300">{de ? 'GENERATION // SCHEMATISCH' : 'GENERATION // SCHEMATIC'}</Label>
          <div className="mt-4 text-2xl font-black text-white">{de ? '„Der Himmel ist …“' : '“The sky is …”'}</div>
          <div className="mt-5 space-y-2">
            <div className="grid grid-cols-[90px_1fr] items-center gap-3"><span className="font-mono text-emerald-300">blau</span><div className="h-4 bg-emerald-500/80" style={{width:'86%'}} /></div>
            <div className="grid grid-cols-[90px_1fr] items-center gap-3"><span className="font-mono text-cyan-300">heute</span><div className="h-4 bg-cyan-500/70" style={{width:'36%'}} /></div>
            <div className="grid grid-cols-[90px_1fr] items-center gap-3"><span className="font-mono text-slate-400">…</span><div className="h-4 bg-slate-700" style={{width:'18%'}} /></div>
          </div>
          <div className="mt-3 text-xs text-slate-500">{de ? 'Illustration, keine echten Modellwahrscheinlichkeiten.' : 'Illustration, not actual model probabilities.'}</div>
        </Box>
        <div className="grid gap-4 md:grid-cols-2">
          <Box className="border-fuchsia-700 bg-fuchsia-950/20"><Sparkles className="text-fuchsia-300" size={28} /><div className="mt-3 text-lg font-black text-white">{de ? 'Passt gut zum Kontext?' : 'Fits the context?'}</div><div className="mt-2 text-sm text-slate-400">{de ? 'Das ist Kernkompetenz.' : 'That is the core skill.'}</div></Box>
          <Box className="border-amber-700 bg-amber-950/20"><CircleHelp className="text-amber-300" size={28} /><div className="mt-3 text-lg font-black text-white">{de ? 'Ist es wirklich wahr?' : 'Is it actually true?'}</div><div className="mt-2 text-sm text-slate-400">{de ? 'Dafür braucht es Evidenz, Retrieval oder Tools.' : 'That requires evidence, retrieval or tools.'}</div></Box>
        </div>
        <div className="border-l-4 border-rose-500 bg-rose-950/20 px-4 py-3 text-rose-100"><strong>{de ? 'Gefährlicher Fall:' : 'Dangerous case:'}</strong> {de ? 'Auch eine erfundene Behauptung kann sprachlich perfekt in den Kontext passen.' : 'A fabricated claim can still fit the language context perfectly.'}</div>
      </div>
    );
  }

  if (kind === 'compiler') {
    return (
      <div className="space-y-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
          <Box className="border-fuchsia-700 bg-fuchsia-950/20"><Label className="text-fuchsia-300">L2</Label><div className="mt-3 text-lg font-black text-white">{de ? 'Bauanleitung' : 'Construction recipe'}</div><div className="mt-2 text-sm text-slate-400">{de ? 'Wie aus Kontext ein Auftrag entsteht.' : 'How context becomes a contract.'}</div></Box>
          <div className="flex justify-center text-3xl font-black text-slate-500">+</div>
          <Box className="border-cyan-700 bg-cyan-950/20"><Label className="text-cyan-300">{de ? 'AKTUELLER KONTEXT' : 'CURRENT CONTEXT'}</Label><div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300"><span>Ticket</span><span>Files</span><span>Runbook</span><span>State</span></div></Box>
          <ArrowRight className="mx-auto rotate-90 text-amber-300 lg:rotate-0" size={34} />
          <Box className="border-emerald-700 bg-emerald-950/20"><Label className="text-emerald-300">L1</Label><div className="mt-3 text-lg font-black text-white">{de ? 'Konkreter Auftrag' : 'Concrete contract'}</div><div className="mt-2 text-sm text-slate-400">{de ? 'Jetzt ausführbar und prüfbar.' : 'Executable and verifiable now.'}</div></Box>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
          {(de ? ['Ziel', 'Kontext', 'Grenzen', 'Prüfung', 'Fertig, wenn'] : ['Goal', 'Context', 'Constraints', 'Verification', 'Done When']).map((value, index) => <div key={value} className={`border px-3 py-3 text-center text-xs font-bold ${index === 3 ? 'border-cyan-700 text-cyan-200' : index === 4 ? 'border-emerald-700 text-emerald-200' : 'border-indigo-800 text-slate-300'}`}>{value}</div>)}
        </div>
      </div>
    );
  }

  if (kind === 'authority-map') {
    const nodes = [
      { icon: TicketCheck, title: 'Ticket', role: de ? 'Scope / Anforderung' : 'Scope / requirement', tone: 'text-amber-300 border-amber-700' },
      { icon: FileCode2, title: 'nginx.conf', role: de ? 'Kontext, evtl. Änderung' : 'Context, maybe edit', tone: 'text-cyan-300 border-cyan-700' },
      { icon: ServerCog, title: 'Logs', role: de ? 'Evidenz, nur lesen' : 'Evidence, read only', tone: 'text-emerald-300 border-emerald-700' },
      { icon: FileLock2, title: 'deploy.sh', role: de ? 'Abhängigkeit, kein Scope' : 'Dependency, no scope', tone: 'text-fuchsia-300 border-fuchsia-700' },
    ];
    return <div><div className="grid gap-3 md:grid-cols-4">{nodes.map(({ icon: Icon, title, role, tone }) => <Box key={title} className={tone}><Icon size={28} className="mb-3" /><div className="font-bold text-white">{title}</div><div className="mt-1 text-xs text-slate-400">{role}</div></Box>)}</div><div className="mt-4 flex items-center justify-center gap-3 border-2 border-rose-900 bg-rose-950/20 px-4 py-3 text-center text-sm text-rose-100"><Ban size={18} className="text-rose-300" />{de ? 'Relevant ≠ zum Ändern freigegeben' : 'Relevant ≠ approved for editing'}</div></div>;
  }

  if (kind === 'evidence-board') {
    const states = [
      { label: 'VERIFIED', icon: CheckCircle2, note: de ? 'belegt' : 'proven', cls: 'border-emerald-700 text-emerald-300' },
      { label: 'INFERRED', icon: GitBranch, note: de ? 'abgeleitet' : 'derived', cls: 'border-cyan-700 text-cyan-300' },
      { label: 'ASSUMED', icon: CircleHelp, note: de ? 'Annahme' : 'assumption', cls: 'border-indigo-700 text-indigo-300' },
      { label: 'UNKNOWN', icon: CircleHelp, note: de ? 'Beleg fehlt' : 'evidence missing', cls: 'border-slate-600 text-slate-300' },
      { label: 'BLOCKED', icon: KeyRound, note: de ? 'Zugriff/Befugnis fehlt' : 'access/authority missing', cls: 'border-amber-700 text-amber-300' },
      { label: 'CONTRADICTED', icon: XCircle, note: de ? 'Quellen widersprechen sich' : 'sources disagree', cls: 'border-rose-700 text-rose-300' },
    ];
    return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{states.map(({ label, icon: Icon, note, cls }) => <Box key={label} className={cls}><div className="flex items-center gap-3"><Icon size={24} /><strong>{label}</strong></div><div className="mt-2 text-sm text-slate-400">{note}</div></Box>)}</div>;
  }

  if (kind === 'agent-loop') {
    const steps = de ? ['Slice wählen', 'arbeiten', 'kleinste sinnvolle Prüfung', 'Befugnis + Evidenz prüfen'] : ['Choose slice', 'work', 'cheapest useful check', 'check authority + evidence'];
    return <div><div className="grid gap-3 md:grid-cols-4">{steps.map((step, index) => <Box key={step} className={index === 3 ? 'border-emerald-700' : 'border-indigo-800'}><Label className="text-fuchsia-300">0{index + 1}</Label><div className="mt-3 font-bold text-white">{step}</div></Box>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2"><div className="flex items-center gap-3 border-2 border-emerald-800 bg-emerald-950/20 px-4 py-3 text-emerald-100"><Bot size={22} />{de ? 'Befugnis gilt: automatisch weiter.' : 'Authority still holds: continue.'}</div><div className="flex items-center gap-3 border-2 border-amber-800 bg-amber-950/20 px-4 py-3 text-amber-100"><TriangleAlert size={22} />{de ? 'Neue Entscheidung nötig: BLOCKED.' : 'New decision required: BLOCKED.'}</div></div></div>;
  }

  if (kind === 'toolbox') {
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
            return (
              <button key={tool.id} type="button" onClick={() => setSelectedToolId(active ? null : tool.id)} className={`retro-button min-h-36 p-4 text-left transition ${active ? 'border-cyan-400 bg-cyan-950/35' : 'border-indigo-800 bg-slate-950/90 hover:border-fuchsia-500'}`}>
                <div className="flex items-center justify-between gap-3"><Label className={active ? 'text-cyan-300' : 'text-fuchsia-300'}>{tool.category} // L2</Label><FileCode2 size={20} className={active ? 'text-cyan-300' : 'text-slate-500'} /></div>
                <div className="mt-3 font-mono text-sm font-black text-white">{tool.title}</div>
                <div className="mt-2 text-xs leading-relaxed text-slate-400">{de ? tool.descriptionDE : tool.descriptionEN}</div>
              </button>
            );
          })}
        </div>

        {selectedTool ? (
          <div className="border-2 border-cyan-700 bg-[#050816] shadow-[6px_6px_0_#020617]">
            <div className="flex items-center justify-between gap-4 border-b-2 border-cyan-900 bg-cyan-950/25 px-4 py-3">
              <div><Label className="text-cyan-300">{selectedTool.category} // L2 // SOURCE PROMPT</Label><div className="mt-2 font-mono text-sm font-black text-white">{selectedTool.title}</div></div>
              <button type="button" onClick={() => copyPrompt(selectedTool.id, selectedTool.prompt)} className="retro-button flex items-center gap-2 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-200">{copiedToolId === selectedTool.id ? <Check size={16} className="text-emerald-300" /> : <Copy size={16} className="text-cyan-300" />}{copiedToolId === selectedTool.id ? (de ? 'KOPIERT' : 'COPIED') : (de ? 'KOPIEREN' : 'COPY')}</button>
            </div>
            <pre className="max-h-80 overflow-auto whitespace-pre-wrap p-5 font-mono text-[12px] leading-6 text-slate-200">{selectedTool.prompt}</pre>
            <div className="border-t border-indigo-900 px-4 py-2 text-xs text-slate-500">{de ? 'Quelle: aktueller agent-recall-compiler Katalog. Der Prompt bleibt hier absichtlich im Original.' : 'Source: current agent-recall-compiler catalog. The source prompt is intentionally shown verbatim.'}</div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-indigo-800 px-4 py-5 text-center text-sm text-slate-500">{de ? 'Auf eine Methode klicken → konkreten L2-Source-Prompt anzeigen.' : 'Click a method → show the concrete L2 source prompt.'}</div>
        )}
      </div>
    );
  }

  if (kind === 'library') {
    return <div className="grid gap-4 md:grid-cols-3"><Box className="border-cyan-700"><FileSpreadsheet className="text-cyan-300" size={30} /><div className="mt-3 text-lg font-black text-white">{de ? 'Einmalig?' : 'One-off?'}</div><div className="mt-2 text-sm text-slate-400">{de ? 'Direkter Prompt reicht.' : 'Use a direct prompt.'}</div></Box><Box className="border-fuchsia-700"><GitBranch className="text-fuchsia-300" size={30} /><div className="mt-3 text-lg font-black text-white">{de ? 'Wiederkehrend?' : 'Recurring?'}</div><div className="mt-2 text-sm text-slate-400">{de ? 'Methode bauen, Fall ableiten.' : 'Build a method, derive the case.'}</div></Box><Box className="border-emerald-700"><ShieldCheck className="text-emerald-300" size={30} /><div className="mt-3 text-lg font-black text-white">{de ? 'Kritisch?' : 'Consequential?'}</div><div className="mt-2 text-sm text-slate-400">{de ? 'Evidenz und Befugnis explizit machen.' : 'Make evidence and authority explicit.'}</div></Box></div>;
  }

  return null;
};

export default VisualPanel;
