import React from 'react';
import { CircleHelp, Sparkles, TriangleAlert } from 'lucide-react';
import { Lang } from '../../types';
import { Box, Label, useSequence } from './shared';

interface Candidate { word: string; p: number }

/**
 * One generation step: candidate bars grow, the winner flies into the sentence.
 * step 0 = prompt only, 1 = bars, 2 = word appended.
 */
const Step: React.FC<{ prompt: string; candidates: Candidate[]; tail: string; step: number; tone: 'emerald' | 'rose' }> = ({ prompt, candidates, tail, step, tone }) => {
  const win = candidates[0];
  const winColor = tone === 'emerald' ? 'text-emerald-300' : 'text-rose-300';
  return (
    <div>
      <div className="text-xl font-bold leading-snug text-white md:text-2xl">
        {prompt}{' '}
        {step >= 2 ? (
          <span className={`anim-pop inline-block rounded px-1 ${tone === 'emerald' ? 'bg-emerald-500/20 text-emerald-200' : 'bg-rose-500/20 text-rose-200'}`}>{win.word}</span>
        ) : (
          <span className="caret text-slate-500">…</span>
        )}
        {step >= 2 && <span className="anim-pop text-white" style={{ animationDelay: '.3s' }}>{tail}</span>}
      </div>
      <div className={`mt-4 space-y-1.5 transition-opacity duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        {candidates.map((c, i) => (
          <div key={c.word} className="grid grid-cols-[6.5rem_1fr_3rem] items-center gap-3">
            <span className={`font-mono text-sm ${i === 0 ? winColor : 'text-slate-400'}`}>{c.word}</span>
            <div className="h-3.5 bg-slate-800/80">
              {step >= 1 && (
                <div
                  className={`bar-grow h-full ${i === 0 ? (tone === 'emerald' ? 'bg-emerald-400' : 'bg-rose-400') : 'bg-slate-500'}`}
                  style={{ width: `${c.p}%`, animationDelay: `${i * 0.12}s` }}
                />
              )}
            </div>
            <span className="text-right font-mono text-xs text-slate-500">{c.p}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const NextTokenVisual: React.FC<{ lang: Lang }> = ({ lang }) => {
  const de = lang === 'de';
  const step = useSequence(6, 1100, 500);
  return (
    <div className="space-y-4">
      <Box className="border-cyan-700 bg-cyan-950/15">
        <div className="mb-3 flex items-center justify-between gap-2"><Label className="text-cyan-300">{de ? 'Harmlos' : 'Harmless'}</Label><Sparkles size={18} className="text-cyan-300" /></div>
        <Step
          prompt={de ? 'Der Himmel ist' : 'The sky is'}
          candidates={de ? [{ word: 'blau', p: 82 }, { word: 'heute', p: 31 }, { word: 'grau', p: 18 }] : [{ word: 'blue', p: 82 }, { word: 'clear', p: 31 }, { word: 'grey', p: 18 }]}
          tail="."
          step={Math.min(step, 2)}
          tone="emerald"
        />
      </Box>
      <Box className={`border-rose-700 bg-rose-950/15 transition-opacity duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-25'}`}>
        <div className="mb-3 flex items-center justify-between gap-2"><Label className="text-rose-300">{de ? 'Gefährlich' : 'Dangerous'}</Label><TriangleAlert size={18} className="text-rose-300" /></div>
        <Step
          prompt={de ? 'Laut § 7 Abs. 2 der Betriebsvereinbarung dürfen Mitarbeitende nur KI-Software von der' : 'According to § 7(2) of the works agreement, employees may only use AI software from the'}
          candidates={de ? [{ word: 'Whitelist', p: 44 }, { word: 'IT-Liste', p: 35 }, { word: 'Zentrale', p: 9 }] : [{ word: 'whitelist', p: 44 }, { word: 'IT list', p: 35 }, { word: 'vendor', p: 9 }]}
          tail={de ? ' nutzen.' : '.'}
          step={Math.max(0, step - 3)}
          tone="rose"
        />
        <div className={`mt-4 flex items-center gap-2 border-l-4 border-rose-500 bg-rose-950/30 px-3 py-2 text-rose-100 transition-opacity duration-500 ${step >= 5 ? 'opacity-100' : 'opacity-0'}`}>
          <CircleHelp size={18} className="shrink-0 text-rose-300" />
          <strong>{de ? 'Passt perfekt. Belegt? Das Dokument lag nie vor.' : 'Fits perfectly. Evidence? The document was never provided.'}</strong>
        </div>
      </Box>
      <div className="text-xs text-slate-500">{de ? 'Illustration, keine echten Modellwahrscheinlichkeiten.' : 'Illustration, not real model probabilities.'}</div>
    </div>
  );
};

export default NextTokenVisual;
