import React from 'react';
import { CheckCircle2, CircleDashed, CircleHelp, Lock, MessageCircle } from 'lucide-react';
import { Lang } from '../../types';
import { Label, useSequence } from './shared';

type Status = 'proven' | 'assumed' | 'open';

const STATUS: Record<Status, { de: string; en: string; cls: string; icon: React.FC<{ size?: number; className?: string }> }> = {
  proven: { de: 'belegt', en: 'proven', cls: 'border-emerald-500 bg-emerald-950/40 text-emerald-200', icon: CheckCircle2 },
  assumed: { de: 'vermutet', en: 'assumed', cls: 'border-amber-500 bg-amber-950/40 text-amber-200', icon: CircleHelp },
  open: { de: 'offen', en: 'open', cls: 'border-rose-500 bg-rose-950/40 text-rose-200', icon: CircleDashed },
};

const ROWS: { de: [string, string, string]; en: [string, string, string]; status: Status }[] = [
  { de: ['Anmeldung', 'Login am Client', 'Tunnel steht'], en: ['Login', 'Client login', 'Tunnel is up'], status: 'proven' },
  { de: ['MFA', 'Push bestätigt?', 'nur Benutzeraussage'], en: ['MFA', 'Push confirmed?', 'user report only'], status: 'assumed' },
  { de: ['Internes DNS', 'nslookup intranet', 'kein Ergebnis erfasst'], en: ['Internal DNS', 'nslookup intranet', 'no result recorded'], status: 'open' },
  { de: ['Fileshare', 'Laufwerk öffnen', 'nicht getestet'], en: ['File share', 'Open the drive', 'not tested'], status: 'open' },
];

/** The user says "works again" – the board shows what was actually observed, row by row. */
const VpnStatusVisual: React.FC<{ lang: Lang; revealed: boolean }> = ({ lang, revealed }) => {
  const de = lang === 'de';
  const step = useSequence(ROWS.length + 2, 750, 900);
  const openCount = ROWS.filter((r) => r.status !== 'proven').length;
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-900/60 text-cyan-200"><MessageCircle size={20} /></div>
        <div className="relative rounded-2xl rounded-tl-sm border border-cyan-600/60 bg-cyan-950/40 px-5 py-3">
          <div className="text-xs text-cyan-300/80">{de ? 'Benutzer, Ticket #4711' : 'User, ticket #4711'}</div>
          <div className="text-xl font-bold text-white">{de ? '„VPN geht wieder, danke! Kann zu.“' : '“VPN works again, thanks! You can close it.”'}</div>
        </div>
      </div>

      <div className="relative overflow-hidden border-2 border-indigo-700 bg-slate-950/90">
        <div className="grid grid-cols-[1.1fr_1.2fr_1.4fr_auto] gap-3 border-b border-indigo-800 bg-indigo-950/40 px-4 py-2">
          {(de ? ['Kriterium', 'Test', 'Beobachtet', 'Status'] : ['Criterion', 'Test', 'Observed', 'Status']).map((h) => <Label key={h} className="text-indigo-300">{h}</Label>)}
        </div>
        {ROWS.map((row, i) => {
          const [name, test, observed] = de ? row.de : row.en;
          const visible = step > i;
          const s = STATUS[row.status];
          const Icon = s.icon;
          return (
            <div key={name} className={`grid grid-cols-[1.1fr_1.2fr_1.4fr_auto] items-center gap-3 border-b border-slate-800 px-4 py-3 transition-all duration-500 ${visible ? 'opacity-100' : 'translate-x-4 opacity-0'}`}>
              <span className="font-bold text-white">{name}</span>
              <span className="font-mono text-sm text-slate-300">{test}</span>
              <span className="text-sm text-slate-300">{observed}</span>
              <span className={`flex w-28 items-center justify-center gap-1.5 border px-2 py-1 text-sm font-bold ${s.cls}`}><Icon size={15} />{de ? s.de : s.en}</span>
            </div>
          );
        })}
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <span className="text-sm text-slate-400">{de ? `${openCount} von ${ROWS.length} Kriterien nicht belegt` : `${openCount} of ${ROWS.length} criteria not proven`}</span>
          <button type="button" disabled className="flex cursor-not-allowed items-center gap-2 border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-bold text-slate-500">
            <Lock size={15} />{de ? 'Ticket schließen' : 'Close ticket'}
          </button>
        </div>
        {revealed && (
          <div className="pointer-events-none absolute bottom-3 right-44">
            <div className="anim-stamp border-[5px] border-amber-400 bg-black/85 px-5 py-2 text-2xl font-black uppercase tracking-wider text-amber-300 shadow-[0_0_40px_rgba(251,191,36,.45)]">
              {de ? 'Noch nicht' : 'Not yet'}
            </div>
          </div>
        )}
      </div>
      <div className="text-xs text-slate-500">{de ? 'Beispielhafter Ticketverlauf.' : 'Illustrative ticket.'}</div>
    </div>
  );
};

export default VpnStatusVisual;
