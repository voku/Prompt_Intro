import React from 'react';
import { CarFront, CircleHelp, Droplets, Home, PersonStanding, Route, Warehouse } from 'lucide-react';
import { Lang } from '../../types';
import { Box, Label, delay } from './shared';

/** One lane of the street scene: house on the left, car wash 50 m to the right. */
const Lane: React.FC<{ tone: 'amber' | 'emerald'; label: string; result: string; moving: 'walker' | 'car' }> = ({ tone, label, result, moving }) => {
  const amber = tone === 'amber';
  const border = amber ? 'border-amber-500/50 bg-amber-950/15' : 'border-emerald-500/60 bg-emerald-950/20';
  return (
    <div className={`relative border ${border} px-4 pb-4 pt-3`}>
      <div className="flex items-center justify-between gap-3">
        <Label className={amber ? 'text-amber-300' : 'text-emerald-300'}>{label}</Label>
        <span className={`anim-pop text-sm font-bold ${amber ? 'text-amber-200' : 'text-emerald-200'}`} style={delay(3.4)}>{result}</span>
      </div>
      <div className="relative mt-3 h-20">
        {/* road with 50 m marker */}
        <div className="absolute inset-x-[6%] bottom-3 h-[3px] bg-[repeating-linear-gradient(90deg,#64748b_0_14px,transparent_14px_26px)]" />
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs text-slate-400">← 50 m →</div>
        {/* house */}
        <div className="absolute bottom-3 left-0 flex flex-col items-center text-slate-400"><Home size={34} /></div>
        {/* car wash */}
        <div className="absolute bottom-3 right-0 flex flex-col items-center text-cyan-300">
          <div className="relative">
            <Warehouse size={38} />
            {[0, 0.6, 1.2].map((d, i) => (
              <Droplets key={i} size={12} className="absolute -top-2 text-cyan-300" style={{ left: 6 + i * 10, animation: `bubbleUp 1.8s ease-out ${d}s infinite` }} />
            ))}
          </div>
        </div>
        {moving === 'walker' ? (
          <>
            {/* the car stays at home … */}
            <div className="absolute bottom-3 left-[9%] text-slate-300"><CarFront size={30} /></div>
            <CircleHelp size={20} className="anim-pop absolute bottom-10 left-[11%] text-amber-300" style={delay(3.2)} />
            {/* … while the person walks */}
            <div className="absolute bottom-3 text-amber-300" style={{ animation: 'walkAcross 3s ease-in-out .3s both' }}>
              <PersonStanding size={30} className="anim-bob" />
            </div>
          </>
        ) : (
          <div className="absolute bottom-3 text-emerald-300" style={{ animation: 'driveAcross 2.6s cubic-bezier(.5,0,.3,1) .3s both' }}>
            <CarFront size={34} />
          </div>
        )}
      </div>
    </div>
  );
};

const CarwashVisual: React.FC<{ lang: Lang; revealed: boolean }> = ({ lang, revealed }) => {
  const de = lang === 'de';
  return (
    <div className="space-y-4">
      <Box className="border-cyan-700 bg-cyan-950/20">
        <Label className="text-cyan-300">PROMPT</Label>
        <div className="mt-3 text-xl font-bold text-white md:text-2xl">{de ? '„Ich will mein Auto waschen. Die Waschanlage ist 50 Meter entfernt. Laufen oder fahren?“' : '“I want to wash my car. The car wash is 50 metres away. Walk or drive?”'}</div>
      </Box>
      <Lane
        tone="amber"
        moving="walker"
        label={de ? 'Plausibles Muster: 50 m → laufen' : 'Plausible pattern: 50 m → walk'}
        result={de ? 'Angekommen. Ohne Auto.' : 'Arrived. Without the car.'}
      />
      {revealed ? (
        <Lane
          tone="emerald"
          moving="car"
          label={de ? 'Implizite Bedingung: Auto muss mit' : 'Implicit condition: the car must come'}
          result={de ? 'Auto in der Waschanlage.' : 'Car in the car wash.'}
        />
      ) : (
        <div className="flex items-center justify-center gap-3 border border-dashed border-slate-600 px-4 py-4 text-slate-400">
          <Route size={18} />
          <span className="font-semibold">{de ? 'Was fehlt in dieser Szene?' : 'What is missing in this scene?'}</span>
        </div>
      )}
    </div>
  );
};

export default CarwashVisual;
