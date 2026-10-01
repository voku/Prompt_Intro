import React, { useEffect, useState } from 'react';
import { Binary, Cpu, Eye } from 'lucide-react';
import { Lang } from '../../types';
import { Box, Label, prefersReducedMotion } from './shared';

const WORD = 'strawberry'.split('');
// Schematic split for the illustration only – real tokenizers differ.
const GROUP = [0, 0, 0, 1, 1, 2, 2, 2, 2, 2];
const GROUP_TONES = ['from-fuchsia-600/70 to-fuchsia-800/70', 'from-violet-600/70 to-violet-800/70', 'from-cyan-600/70 to-cyan-800/70'];

/** Letters that periodically snap together into token chunks – and back. */
const TokensVisual: React.FC<{ lang: Lang }> = ({ lang }) => {
  const de = lang === 'de';
  const [merged, setMerged] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const first = window.setTimeout(() => setMerged(true), 1400);
    const interval = window.setInterval(() => setMerged((m) => !m), 3200);
    return () => { window.clearTimeout(first); window.clearInterval(interval); };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2" role="tablist" aria-label="view">
          <button type="button" onClick={() => setMerged(false)} className={`retro-button flex items-center gap-2 px-3 py-1.5 text-xs font-bold ${!merged ? 'border-amber-400 bg-amber-950/50 text-amber-200' : 'bg-slate-900 text-slate-400'}`}><Eye size={14} />{de ? 'Wie wir lesen' : 'How we read'}</button>
          <button type="button" onClick={() => setMerged(true)} className={`retro-button flex items-center gap-2 px-3 py-1.5 text-xs font-bold ${merged ? 'border-fuchsia-400 bg-fuchsia-950/50 text-fuchsia-200' : 'bg-slate-900 text-slate-400'}`}><Binary size={14} />{de ? 'Wie das Modell liest' : 'How the model reads'}</button>
        </div>
        <span className="text-xs text-slate-500">{de ? 'Schematisch – die echte Aufteilung hängt vom Tokenizer ab.' : 'Schematic – the real split depends on the tokenizer.'}</span>
      </div>

      <Box className={`relative overflow-hidden transition-colors duration-700 ${merged ? 'border-fuchsia-700 bg-fuchsia-950/15' : 'border-amber-700 bg-amber-950/10'}`}>
        <div className="flex flex-wrap items-center justify-center py-6">
          {WORD.map((letter, i) => {
            const g = GROUP[i];
            const startOfGroup = i === 0 || GROUP[i - 1] !== g;
            const endOfGroup = i === WORD.length - 1 || GROUP[i + 1] !== g;
            const isR = letter === 'r';
            return (
              <span
                key={i}
                className={`flex h-16 w-14 items-center justify-center font-mono text-4xl font-black transition-all duration-700 md:h-20 md:w-16 md:text-5xl ${
                  merged
                    ? `bg-gradient-to-b ${GROUP_TONES[g]} text-white/90 ${startOfGroup ? 'rounded-l-md' : ''} ${endOfGroup ? 'mr-5 rounded-r-md' : ''}`
                    : `mr-2 rounded-md border-2 ${isR ? 'border-amber-400 bg-amber-500/25 text-amber-200 shadow-[0_0_18px_rgba(251,191,36,.45)]' : 'border-slate-600 bg-slate-900 text-white'}`
                }`}
              >
                {letter}
              </span>
            );
          })}
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className={`border px-4 py-3 transition-opacity duration-500 ${merged ? 'opacity-40' : 'opacity-100'} border-amber-700 bg-amber-950/20`}>
            <Label className="text-amber-300">{de ? 'Du siehst' : 'You see'}</Label>
            <div className="mt-1 text-2xl font-black text-white">{de ? '10 Zeichen · 3 × „r“' : '10 characters · 3 × “r”'}</div>
          </div>
          <div className={`border px-4 py-3 transition-opacity duration-500 ${merged ? 'opacity-100' : 'opacity-40'} border-fuchsia-700 bg-fuchsia-950/20`}>
            <Label className="text-fuchsia-300">{de ? 'Das Modell sieht' : 'The model sees'}</Label>
            <div className="mt-1 text-2xl font-black text-white">{de ? '3 Token-IDs · „r“? ' : '3 token IDs · “r”? '}<span className="text-fuchsia-300">¯\_(ツ)_/¯</span></div>
          </div>
        </div>
      </Box>

      <div className="flex items-center gap-3 border-2 border-emerald-700 bg-emerald-950/20 px-4 py-3 font-mono text-emerald-100">
        <Cpu size={20} className="shrink-0" />
        <span>&gt;&gt;&gt; &quot;strawberry&quot;.count(&quot;r&quot;)</span>
        <span className="ml-auto text-2xl font-black text-emerald-300">3</span>
      </div>
    </div>
  );
};

export default TokensVisual;
