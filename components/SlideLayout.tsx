import React from 'react';
import PromptComparison from './PromptComparison';
import InteractivePlayground from './InteractivePlayground';
import { resolveIcon } from '../iconUtils';
import { Lang, SlideData, SlideType } from '../types';

interface SlideLayoutProps {
  data: SlideData;
  isActive: boolean;
  lang: Lang;
}

const SlideLayout: React.FC<SlideLayoutProps> = ({ data, isActive, lang }) => {
  const IconComponent = resolveIcon(data.icon);

  if (!isActive) {
    return null;
  }

  const t = (en: string | undefined, de: string | undefined): string | undefined =>
    lang === 'de' && de ? de : en;

  const tArr = (
    en: string | string[] | undefined,
    de: string | string[] | undefined,
  ): string | string[] | undefined => (lang === 'de' && de ? de : en);

  const title = t(data.title, data.titleDE) ?? data.title;
  const subtitle = t(data.subtitle, data.subtitleDE);
  const content = tArr(data.content, data.contentDE);
  const technique = t(data.technique, data.techniqueDE);

  const thanksLabel = lang === 'de' ? 'Danke für Ihre Aufmerksamkeit!' : 'Thank you for your attention!';
  const trainingLabel = lang === 'de' ? 'Operatives Prompting für die Praxis' : 'Operational Prompting for Real Software Work';

  const renderContent = () => {
    switch (data.type) {
      case SlideType.TITLE:
        return (
          <div className="flex h-full flex-col items-center justify-center space-y-8 text-center animate-fadeIn">
            <div className="mb-6 rounded-full bg-blue-600 p-8 shadow-2xl">
              <IconComponent size={80} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">{title}</h1>
            <h2 className="max-w-3xl text-xl font-light text-gray-600 md:text-2xl">{subtitle}</h2>
            <div className="mt-12 text-sm uppercase tracking-widest text-gray-400">{trainingLabel}</div>
          </div>
        );

      case SlideType.CONTENT:
      case SlideType.END:
        return (
          <div className="flex h-full flex-col animate-fadeIn">
            <div className="mb-8 flex w-fit items-center space-x-4 border-b-2 border-blue-600 pb-4">
              <IconComponent size={40} className="text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">{title}</h2>
            </div>

            {subtitle && <p className="mb-10 text-lg italic text-gray-500 md:text-xl">{subtitle}</p>}

            <div className="space-y-5">
              {Array.isArray(content) ? (
                content.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 rounded-lg border-l-4 border-gray-300 bg-gray-50 p-4 transition-colors hover:border-blue-500"
                  >
                    <div className="mt-1 flex min-h-6 min-w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                      {index + 1}
                    </div>
                    <p className="text-lg leading-relaxed text-gray-800 md:text-xl">{point}</p>
                  </div>
                ))
              ) : (
                <p className="text-lg leading-relaxed text-gray-800 md:text-xl">{content}</p>
              )}
            </div>

            {data.type === SlideType.END && <div className="mt-auto pt-8 text-center text-gray-400">{thanksLabel}</div>}
          </div>
        );

      case SlideType.COMPARISON:
        return (
          <div className="flex h-full flex-col animate-fadeIn">
            <div className="mb-4 flex items-center space-x-4">
              <div className="rounded-lg bg-blue-100 p-2">
                <IconComponent size={32} className="text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            </div>
            {subtitle && <p className="mb-6 text-lg text-gray-500">{subtitle}</p>}

            <div className="flex-grow">
              <PromptComparison
                standard={(lang === 'de' && data.codeStandardDE ? data.codeStandardDE : data.codeStandard) ?? ''}
                optimized={(lang === 'de' && data.codeOptimizedDE ? data.codeOptimizedDE : data.codeOptimized) ?? ''}
                technique={technique ?? (lang === 'de' ? 'Operativer Prompt' : 'Operational Prompt')}
                description={typeof content === 'string' ? content : ''}
                lang={lang}
                codeVokuprompt={lang === 'de' && data.codeVokupromptDE ? data.codeVokupromptDE : data.codeVokuprompt}
              />
            </div>
          </div>
        );

      case SlideType.PLAYGROUND:
        return (
          <div className="flex h-full flex-col animate-fadeIn">
            <div className="mb-4 flex items-center space-x-4">
              <div className="rounded-lg bg-blue-100 p-2">
                <IconComponent size={32} className="text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            </div>
            {subtitle && <p className="mb-6 text-lg text-gray-500">{subtitle}</p>}
            <InteractivePlayground lang={lang} />
          </div>
        );

      default:
        return <div>Unknown Slide Type</div>;
    }
  };

  return (
    <div className="relative mx-auto h-full w-full max-w-6xl overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-2xl md:p-12">
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-50 opacity-50 blur-3xl filter"></div>
      {renderContent()}
    </div>
  );
};

export default SlideLayout;
