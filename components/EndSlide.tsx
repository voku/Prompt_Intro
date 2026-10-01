import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Rocket } from 'lucide-react';
import { Lang } from '../types';
import { Label } from './visuals/shared';

interface EndSlideProps {
  title: string;
  subtitle?: string;
  points: string[];
  action?: string;
  lang: Lang;
}

/** Deep link to the template toolbox of this very deck. */
const templatesUrl = (): string => `${window.location.origin}${window.location.pathname}#vorlagen`;

const EndSlide: React.FC<EndSlideProps> = ({ title, subtitle, points, action, lang }) => {
  const de = lang === 'de';
  const [svg, setSvg] = useState('');
  const url = templatesUrl();
  useEffect(() => {
    QRCode.toString(url, { type: 'svg', margin: 1, errorCorrectionLevel: 'M', color: { dark: '#0a0f22', light: '#ffffff' } })
      .then(setSvg)
      .catch(() => setSvg(''));
  }, [url]);

  return (
    <div className="flex min-h-full flex-col justify-center gap-8 animate-fadeIn">
      <div>
        <div className="pixel-font mb-3 text-emerald-300">{de ? 'Fazit // Level geschafft' : 'Summary // Level cleared'}</div>
        <h2 className="text-balance text-4xl font-bold tracking-tight text-white md:text-6xl">{title}</h2>
        {subtitle && <p className="lead-rule mt-5 pl-5 text-xl text-cyan-100/90 md:text-2xl">{subtitle}</p>}
      </div>

      <div className="stagger grid gap-4 lg:grid-cols-3">
        {points.map((p, i) => (
          <div key={p} className="relative flex flex-col justify-between overflow-hidden border border-indigo-500/40 bg-gradient-to-br from-indigo-950/70 to-slate-950 p-6">
            <span aria-hidden className="display pointer-events-none absolute -right-2 -top-6 text-[8rem] font-bold leading-none text-transparent" style={{ WebkitTextStroke: '2px rgba(129,140,248,.35)' }}>{i + 1}</span>
            <span className="pixel-font text-fuchsia-300">{String(i + 1).padStart(2, '0')}</span>
            <p className="relative mt-10 text-xl font-semibold leading-snug text-white md:text-2xl">{p}</p>
          </div>
        ))}
      </div>

      <div className="grid items-center gap-6 border border-emerald-400/50 bg-gradient-to-r from-emerald-950/60 to-cyan-950/40 p-5 shadow-[0_0_40px_-10px_rgba(52,211,153,.5)] md:grid-cols-[auto_1fr_auto]">
        <div className="flex h-14 w-14 items-center justify-center border border-emerald-300/60 bg-emerald-900/60 text-emerald-200"><Rocket size={28} /></div>
        <div>
          <Label className="text-emerald-300">{de ? 'Deine Aufgabe für morgen' : 'Your task for tomorrow'}</Label>
          <p className="mt-2 text-lg font-bold leading-snug text-white md:text-xl">{action}</p>
        </div>
        {svg && (
          <figure className="flex items-center gap-4">
            <div className="h-28 w-28 bg-white p-1 [&>svg]:h-full [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
            <figcaption className="max-w-[9rem] text-sm text-emerald-100">{de ? 'Alle Vorlagen zum Kopieren' : 'All templates to copy'}</figcaption>
          </figure>
        )}
      </div>

      <div className="pixel-font text-center text-emerald-300">{de ? 'Ende // Vielen Dank // Fragen & Diskussion' : 'End // Thank you // Questions & discussion'}</div>
    </div>
  );
};

export default EndSlide;
