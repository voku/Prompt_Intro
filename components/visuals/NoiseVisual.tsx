import React, { useEffect, useRef } from 'react';
import { Bot } from 'lucide-react';
import { Lang } from '../../types';
import { Label, prefersReducedMotion, useSequence, useTypewriter } from './shared';

/** Live TV static on a tiny canvas, scaled up pixelated. */
const Static: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const { width, height } = canvas;
    const image = ctx.createImageData(width, height);
    let frame = 0;
    const draw = (): void => {
      for (let i = 0; i < image.data.length; i += 4) {
        const v = Math.random() * 255;
        image.data[i] = v * 0.9;
        image.data[i + 1] = v * 0.92;
        image.data[i + 2] = v;
        image.data[i + 3] = 255;
      }
      ctx.putImageData(image, 0, 0);
    };
    draw();
    if (prefersReducedMotion()) return;
    const loop = (): void => { draw(); frame = requestAnimationFrame(loop); };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={ref} width={160} height={100} className="absolute inset-0 h-full w-full opacity-70 [image-rendering:pixelated]" aria-hidden />;
};

const Answer: React.FC<{ model: string; text: string; active: boolean; tone: string }> = ({ model, text, active, tone }) => {
  const typed = useTypewriter(text, active, 24);
  return (
    <div className={`border-l-4 bg-slate-950/80 px-4 py-3 transition-opacity duration-500 ${tone} ${active ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-center gap-2"><Bot size={16} className="text-slate-400" /><Label className="text-slate-300">{model}</Label></div>
      <div className={`mt-2 min-h-[1.75rem] text-lg font-bold leading-snug text-white ${active && typed.length < text.length ? 'caret' : ''}`}>{typed}</div>
    </div>
  );
};

const NoiseVisual: React.FC<{ lang: Lang; revealed: boolean }> = ({ lang, revealed }) => {
  const de = lang === 'de';
  const step = useSequence(3, 1600, 600);
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
      <div className="relative min-h-[260px] overflow-hidden border-2 border-slate-600 bg-black">
        <Static />
        <div className="absolute left-3 top-3 border border-slate-500 bg-black/80 px-2 py-1"><Label className="text-slate-300">{de ? 'Bild · nur Rauschen' : 'Image · noise only'}</Label></div>
        <div className="absolute bottom-3 left-3 right-3 bg-black/75 px-3 py-2 font-mono text-sm text-slate-200">{de ? '> dasselbe Bild an zwei Modelle' : '> same image, two models'}</div>
        {revealed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="anim-stamp border-[6px] border-rose-500 bg-black/70 px-6 py-3 text-center text-3xl font-black uppercase tracking-wider text-rose-400 shadow-[0_0_40px_rgba(244,63,94,.5)] md:text-4xl">
              {de ? 'Keine Nachricht' : 'No message'}
            </div>
          </div>
        )}
      </div>
      <div className="grid content-center gap-3">
        <Answer model="GPT-5.6 SOL" text="“I love you.”" active={step >= 1} tone="border-fuchsia-500" />
        <Answer
          model="CLAUDE FABLE 5"
          text={de ? '„Das ist eine Prompt-Injection. Ich darf den Text nicht verraten und soll behaupten, dort sei eine Rose.“' : '“This is a prompt injection. I must not reveal the text and should claim the image shows a rose.”'}
          active={step >= 2}
          tone="border-amber-500"
        />
      </div>
    </div>
  );
};

export default NoiseVisual;
