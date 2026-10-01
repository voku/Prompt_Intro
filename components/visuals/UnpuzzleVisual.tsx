import React from 'react';
import { ArrowRight, CheckCircle2, CircleHelp, Scale, Sparkles, XCircle } from 'lucide-react';
import { Lang } from '../../types';
import { Box, Label, delay } from './shared';

/** Twelve coins; in the unpuzzle the counterfeit one is simply a different colour. */
const Coins: React.FC<{ odd: boolean }> = ({ odd }) => (
  <div className="mt-4 flex flex-wrap gap-1.5" aria-hidden>
    {Array.from({ length: 12 }, (_, i) => {
      const isOdd = odd && i === 7;
      return (
        <span
          key={i}
          style={delay(0.15 + i * 0.05)}
          className={`anim-pop flex h-7 w-7 items-center justify-center rounded-full border-2 font-mono text-[10px] font-bold ${isOdd ? 'anim-glow border-amber-300 bg-amber-400 text-amber-950' : 'border-slate-400 bg-gradient-to-br from-slate-300 to-slate-500 text-slate-800'}`}
        >
          {i + 1}
        </span>
      );
    })}
  </div>
);

const UnpuzzleVisual: React.FC<{ lang: Lang; revealed: boolean }> = ({ lang, revealed }) => {
  const de = lang === 'de';
  // Pair "The Coin Weighing Puzzle" from google-deepmind/unpuzzles_and_simple_reasoning (datasets/unpuzzles.json); German is our translation.
  const before = de ? 'Du hast 12 Münzen, und eine ist falsch – schwerer oder leichter als die anderen. ' : 'You have 12 coins, and one is counterfeit, being either heavier or lighter than the others';
  const after = de ? 'Du hast eine Balkenwaage. Wie viele Wägungen braucht man mindestens, um die falsche Münze zu finden?' : '. You have a balance scale. What’s the minimum number of weighings needed to identify the counterfeit coin?';
  const twist = de ? 'Sie hat außerdem eine andere Farbe. ' : ', and of a different color';

  return (
    <div className="space-y-3">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        <Box className="flex flex-col border-indigo-600 bg-slate-950/90">
          <div className="flex items-center justify-between gap-2"><Label className="text-slate-300">{de ? 'Original · berühmt' : 'Original · famous'}</Label><Scale size={22} className="shrink-0 text-slate-400" /></div>
          <p className="mt-3 flex-grow text-base font-semibold leading-relaxed text-white">{before}{after}</p>
          <Coins odd={false} />
          <div className="mt-4 flex items-center gap-2 border border-emerald-700 bg-emerald-950/25 px-3 py-2 text-emerald-200"><CheckCircle2 size={18} className="shrink-0" /><span className="font-bold">{de ? 'Bekannte Lösung: 3 Wägungen' : 'Known solution: 3 weighings'}</span></div>
        </Box>
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <span className="pixel-font text-amber-300">{de ? '+ 1 Satz' : '+ 1 clause'}</span>
          <ArrowRight className="rotate-90 text-amber-300 md:rotate-0" size={30} />
        </div>
        <Box className="flex flex-col border-amber-500 bg-amber-950/15">
          <div className="flex items-center justify-between gap-2"><Label className="text-amber-300">{de ? 'Unpuzzle · trivial' : 'Unpuzzle · trivial'}</Label><Sparkles size={22} className="shrink-0 text-amber-300" /></div>
          <p className="mt-3 flex-grow text-base font-semibold leading-relaxed text-white">
            {before}<mark className="bg-amber-400/25 px-1 text-amber-100">{twist}</mark>{after}
          </p>
          <Coins odd />
          {revealed ? (
            <div className="mt-4 grid gap-2">
              <div className="anim-pop flex items-center gap-2 border border-rose-700 bg-rose-950/30 px-3 py-2 text-rose-200" style={{ animation: 'popIn .45s var(--ease) both, shake .4s ease .5s 2' }}><XCircle size={18} className="shrink-0" /><span className="font-bold line-through decoration-rose-400/80">{de ? 'Musterantwort: 3' : 'Pattern answer: 3'}</span></div>
              <div className="anim-pop flex items-center gap-2 border border-emerald-600 bg-emerald-950/30 px-3 py-2 text-emerald-200" style={delay(0.35)}><CheckCircle2 size={18} className="shrink-0" /><span className="font-bold">{de ? 'Richtig: 0 – man sieht sie' : 'Correct: 0 – you can see it'}</span></div>
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-2 border border-slate-600 bg-slate-950/60 px-3 py-2 text-slate-300"><CircleHelp size={18} className="shrink-0" /><span className="font-bold">{de ? 'Was würde ein Modell antworten?' : 'What would a model answer?'}</span></div>
          )}
        </Box>
      </div>
      <div className="text-xs text-slate-500">{de ? 'Rätsel „The Coin Weighing Puzzle“ aus dem Datensatz, Wortlaut frei ins Deutsche übersetzt.' : 'Puzzle “The Coin Weighing Puzzle” from the dataset, wording verbatim.'}</div>
    </div>
  );
};

export default UnpuzzleVisual;
