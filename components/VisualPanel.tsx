import React from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Ban,
  Bot,
  CheckCircle2,
  CircleHelp,
  FileCode2,
  FileLock2,
  FileSpreadsheet,
  GitBranch,
  KeyRound,
  SearchCheck,
  ServerCog,
  ShieldCheck,
  TicketCheck,
  TriangleAlert,
  UserRoundCog,
  XCircle,
} from 'lucide-react';
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

  if (kind === 'case-split') {
    return (
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <Box className="border-amber-700 bg-amber-950/20">
          <Label className="text-amber-300">{de ? 'HEUTE' : 'TODAY'}</Label>
          <div className="mt-4 space-y-2 font-mono text-sm text-slate-200"><div>SD-18427</div><div>users_2026-08-28.csv</div><div>Portal-Test</div><div>742 {de ? 'Zeilen' : 'rows'}</div></div>
        </Box>
        <ArrowRight className="mx-auto rotate-90 text-fuchsia-400 md:rotate-0" size={34} />
        <Box className="border-cyan-700 bg-cyan-950/20">
          <Label className="text-cyan-300">{de ? 'MORGEN' : 'TOMORROW'}</Label>
          <div className="mt-4 space-y-2 font-mono text-sm text-slate-200"><div>SD-18502</div><div>accounts_final_v7.csv</div><div>Portal-Prod</div><div>1.126 {de ? 'Zeilen' : 'rows'}</div></div>
        </Box>
        <div className="md:col-span-3 mt-2 grid gap-3 md:grid-cols-2">
          <div className="border-l-4 border-amber-500 bg-amber-950/20 px-4 py-3 text-amber-100"><strong>{de ? 'Veraltet:' : 'Expires:'}</strong> {de ? 'Ticket, Datei, System, Zahlen.' : 'ticket, file, system, numbers.'}</div>
          <div className="border-l-4 border-emerald-500 bg-emerald-950/20 px-4 py-3 text-emerald-100"><strong>{de ? 'Bleibt:' : 'Survives:'}</strong> {de ? 'Methode, Evidenzregeln, Grenzen.' : 'method, evidence rules, boundaries.'}</div>
        </div>
      </div>
    );
  }

  if (kind === 'compiler') {
    return (
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
        <Box className="border-fuchsia-700 bg-fuchsia-950/20"><Label className="text-fuchsia-300">L2</Label><div className="mt-3 text-lg font-black text-white">{de ? 'Bauanleitung' : 'Construction recipe'}</div><div className="mt-2 text-sm text-slate-400">{de ? 'Wie aus Kontext ein Auftrag entsteht.' : 'How context becomes a contract.'}</div></Box>
        <div className="flex justify-center text-3xl font-black text-slate-500">+</div>
        <Box className="border-cyan-700 bg-cyan-950/20"><Label className="text-cyan-300">{de ? 'AKTUELLER KONTEXT' : 'CURRENT CONTEXT'}</Label><div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300"><span>Ticket</span><span>Files</span><span>Runbook</span><span>State</span></div></Box>
        <ArrowRight className="mx-auto rotate-90 text-amber-300 lg:rotate-0" size={34} />
        <Box className="border-emerald-700 bg-emerald-950/20"><Label className="text-emerald-300">L1</Label><div className="mt-3 text-lg font-black text-white">{de ? 'Konkreter Auftrag' : 'Concrete contract'}</div><div className="mt-2 text-sm text-slate-400">{de ? 'Jetzt ausführbar und prüfbar.' : 'Executable and verifiable now.'}</div></Box>
      </div>
    );
  }

  if (kind === 'l1-stack') {
    const rows = de
      ? [['01', 'ZIEL', 'Was soll beobachtbar anders sein?'], ['02', 'KONTEXT', 'Welche aktuellen Fakten zählen?'], ['03', 'GRENZEN', 'Was darf nicht passieren?'], ['04', 'PRÜFUNG', 'Wie messen wir die Realität?'], ['05', 'FERTIG, WENN', 'Welches Ergebnis reicht?']]
      : [['01', 'GOAL', 'What must observably change?'], ['02', 'CONTEXT', 'Which current facts matter?'], ['03', 'CONSTRAINTS', 'What must not happen?'], ['04', 'VERIFICATION', 'How do we measure reality?'], ['05', 'DONE WHEN', 'Which result is enough?']];
    return <div className="space-y-2">{rows.map(([n, label, text], index) => <div key={label} className="grid grid-cols-[48px_170px_1fr] items-center gap-3 border-2 border-indigo-900 bg-slate-950/80 px-4 py-3"><span className="pixel-font text-[8px] text-amber-300">{n}</span><strong className={index === 3 ? 'text-cyan-300' : index === 4 ? 'text-emerald-300' : 'text-white'}>{label}</strong><span className="text-sm text-slate-400">{text}</span></div>)}</div>;
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
    const tools = [
      { icon: SearchCheck, name: 'discovery-first', de: 'Erst den aktuellen Stand beweisen.', en: 'Prove the current state first.' },
      { icon: BadgeCheck, name: 'reproduce-before-fix', de: 'Bug zuerst reproduzieren.', en: 'Reproduce the bug before fixing it.' },
      { icon: ShieldCheck, name: 'adversarial-review', de: 'Den Plan ernsthaft zu widerlegen versuchen.', en: 'Seriously try to falsify the plan.' },
      { icon: FileCode2, name: 'evidence-report', de: 'Nur behaupten, was beobachtet wurde.', en: 'Claim only what was observed.' },
      { icon: Bot, name: 'continue-until-done', de: 'Innerhalb der Freigabe weiterarbeiten.', en: 'Keep going inside current authority.' },
      { icon: UserRoundCog, name: 'production-ready-handoff', de: 'Frischen Agenten ohne Chat-Gedächtnis arbeitsfähig machen.', en: 'Make a fresh agent productive without chat memory.' },
    ];
    return <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{tools.map(({ icon: Icon, name, de: deText, en }) => <Box key={name} className="transition hover:-translate-y-1 hover:border-cyan-600"><Icon size={26} className="text-cyan-300" /><div className="mt-3 font-mono text-sm font-bold text-white">{name}</div><div className="mt-2 text-sm text-slate-400">{de ? deText : en}</div></Box>)}</div>;
  }

  if (kind === 'library') {
    return <div className="grid gap-4 md:grid-cols-3"><Box className="border-cyan-700"><FileSpreadsheet className="text-cyan-300" size={30} /><div className="mt-3 text-lg font-black text-white">{de ? 'Einmalig?' : 'One-off?'}</div><div className="mt-2 text-sm text-slate-400">{de ? 'Direkter Prompt reicht.' : 'Use a direct prompt.'}</div></Box><Box className="border-fuchsia-700"><GitBranch className="text-fuchsia-300" size={30} /><div className="mt-3 text-lg font-black text-white">{de ? 'Wiederkehrend?' : 'Recurring?'}</div><div className="mt-2 text-sm text-slate-400">{de ? 'Methode bauen, Fall ableiten.' : 'Build a method, derive the case.'}</div></Box><Box className="border-emerald-700"><ShieldCheck className="text-emerald-300" size={30} /><div className="mt-3 text-lg font-black text-white">{de ? 'Kritisch?' : 'Consequential?'}</div><div className="mt-2 text-sm text-slate-400">{de ? 'Evidenz und Befugnis explizit machen.' : 'Make evidence and authority explicit.'}</div></Box></div>;
  }

  return null;
};

export default VisualPanel;
