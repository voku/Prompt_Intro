import React from 'react';
import { XCircle, CheckCircle, ArrowRight } from 'lucide-react';

interface PromptComparisonProps {
  standard: string;
  optimized: string;
  technique: string;
  description: string;
}

const PromptComparison: React.FC<PromptComparisonProps> = ({ standard, optimized, technique, description }) => {
  return (
    <div className="h-full flex flex-col space-y-4">
      
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-blue-900 text-sm mb-2">
        <strong>Technik: {technique}</strong> — {description}
      </div>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        {/* Standard (Bad) */}
        <div className="flex flex-col border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50">
          <div className="bg-gray-200 px-4 py-3 flex items-center justify-between border-b border-gray-300">
            <span className="font-semibold text-gray-700 uppercase text-sm tracking-wider">Standard Prompt</span>
            <XCircle size={20} className="text-red-500" />
          </div>
          <div className="p-6 flex-grow font-mono text-sm text-gray-600 whitespace-pre-wrap">
            {standard}
          </div>
        </div>

        {/* Optimized (Good) */}
        <div className="flex flex-col border-2 border-green-500 rounded-xl overflow-hidden bg-white shadow-lg transform md:-translate-y-2 md:hover:-translate-y-3 transition-transform duration-300">
          <div className="bg-green-600 px-4 py-3 flex items-center justify-between">
            <span className="font-semibold text-white uppercase text-sm tracking-wider">Optimized Prompt</span>
            <CheckCircle size={20} className="text-white" />
          </div>
          <div className="p-6 flex-grow font-mono text-sm text-gray-800 whitespace-pre-wrap bg-green-50">
            {optimized}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center text-gray-400 text-sm italic">
        <ArrowRight className="inline mr-2" size={16} />
        Der optimierte Prompt liefert deterministische, verlässliche Ergebnisse.
      </div>
    </div>
  );
};

export default PromptComparison;