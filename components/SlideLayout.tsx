import React from 'react';
import { SlideData, SlideType } from '../types';
import * as Icons from 'lucide-react';
import PromptComparison from './PromptComparison';

interface SlideLayoutProps {
  data: SlideData;
  isActive: boolean;
}

const SlideLayout: React.FC<SlideLayoutProps> = ({ data, isActive }) => {
  // Dynamic Icon rendering
  const IconComponent = data.icon && (Icons as any)[data.icon] ? (Icons as any)[data.icon] : Icons.HelpCircle;

  if (!isActive) return null;

  const renderContent = () => {
    switch (data.type) {
      case SlideType.TITLE:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-fadeIn">
             <div className="p-8 bg-red-600 rounded-full shadow-2xl mb-6">
                <IconComponent size={80} className="text-white" />
             </div>
            <h1 className="text-6xl font-bold text-gray-900 tracking-tight">{data.title}</h1>
            <h2 className="text-2xl text-gray-600 max-w-2xl font-light">{data.subtitle}</h2>
            <div className="mt-12 text-sm text-gray-400 uppercase tracking-widest">Remondis Internal Training</div>
          </div>
        );

      case SlideType.CONTENT:
      case SlideType.END:
        return (
          <div className="flex flex-col h-full animate-fadeIn">
            <div className="flex items-center space-x-4 mb-8 border-b-2 border-red-600 pb-4 w-fit">
              <IconComponent size={40} className="text-red-600" />
              <h2 className="text-4xl font-bold text-gray-800">{data.title}</h2>
            </div>
            
            <p className="text-xl text-gray-500 mb-12 italic">{data.subtitle}</p>

            <div className="space-y-6">
              {Array.isArray(data.content) ? (
                data.content.map((point, idx) => (
                  <div key={idx} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300 hover:border-red-500 transition-colors">
                    <div className="min-w-6 min-h-6 mt-1 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <p className="text-xl text-gray-800 leading-relaxed">{point}</p>
                  </div>
                ))
              ) : (
                <p className="text-xl text-gray-800 leading-relaxed">{data.content}</p>
              )}
            </div>
            
            {data.type === SlideType.END && (
              <div className="mt-auto pt-8 text-center text-gray-400">
                Danke für Ihre Aufmerksamkeit!
              </div>
            )}
          </div>
        );

      case SlideType.COMPARISON:
        return (
          <div className="flex flex-col h-full animate-fadeIn">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                 <IconComponent size={32} className="text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">{data.title}</h2>
            </div>
            <p className="text-lg text-gray-500 mb-6">{data.subtitle}</p>
            
            <div className="flex-grow">
               <PromptComparison 
                  standard={data.codeStandard || ''} 
                  optimized={data.codeOptimized || ''}
                  technique={data.technique || 'Optimierung'}
                  description={data.content as string}
               />
            </div>
          </div>
        );

      default:
        return <div>Unknown Slide Type</div>;
    }
  };

  return (
    <div className="h-full w-full max-w-6xl mx-auto p-8 md:p-12 bg-white shadow-2xl rounded-xl border border-gray-100 overflow-hidden relative">
        {/* Background decorative element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full filter blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        {renderContent()}
    </div>
  );
};

export default SlideLayout;