import React from 'react';
import { CheckCircle2, CircleHelp, GitBranch } from 'lucide-react';
import { Lang } from '../../types';
import { Box } from './shared';

/** Three everyday states, with the precise labels used in the templates as tags. */
const EvidenceBoardVisual: React.FC<{ lang: Lang }> = ({ lang }) => {
  const de = lang === 'de';
  const states = [
    { label: de ? 'BELEGT' : 'PROVEN', icon: CheckCircle2, note: de ? 'Gesehen, gemessen oder nachgelesen.' : 'Seen, measured or looked up.', tags: ['VERIFIED'], cls: 'border-emerald-600 text-emerald-300' },
    { label: de ? 'VERMUTET' : 'ASSUMED', icon: GitBranch, note: de ? 'Klingt plausibel, ist aber nicht geprüft.' : 'Sounds plausible, but not checked.', tags: ['INFERRED', 'ASSUMED'], cls: 'border-cyan-600 text-cyan-300' },
    { label: de ? 'OFFEN' : 'OPEN', icon: CircleHelp, note: de ? 'Beleg fehlt, Zugriff fehlt oder Quellen widersprechen sich.' : 'Evidence missing, no access, or sources disagree.', tags: ['UNKNOWN', 'BLOCKED', 'CONTRADICTED'], cls: 'border-amber-600 text-amber-300' },
  ];
  return (
    <div className="stagger grid gap-4 md:grid-cols-3">
      {states.map(({ label, icon: Icon, note, tags, cls }) => (
        <Box key={label} className={cls}>
          <div className="flex items-center gap-3"><Icon size={28} /><strong className="text-2xl">{label}</strong></div>
          <div className="mt-3 text-base text-slate-300">{note}</div>
          <div className="mt-4 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="border border-slate-600 px-2 py-1 font-mono text-xs text-slate-300">{tag}</span>)}</div>
        </Box>
      ))}
    </div>
  );
};

export default EvidenceBoardVisual;
