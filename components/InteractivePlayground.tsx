import React, { useState } from 'react';
import { generateResponse, GenAIResponse } from '../services/geminiService';
import { Play, RotateCcw, Loader2, BarChart2, Zap, Database } from 'lucide-react';
import { Lang } from '../types';

interface RunRecord {
    id: number;
    label: string;
    metrics: GenAIResponse;
}

interface InteractivePlaygroundProps {
  lang: Lang;
}

const InteractivePlayground: React.FC<InteractivePlaygroundProps> = ({ lang }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [runHistory, setRunHistory] = useState<RunRecord[]>([]);

  const presets = [
    { 
      label: lang === 'de' ? 'Bug-Bericht (Std)' : 'Bug Report (Std)',
      text: "Read this bug report and tell me what went wrong.\n\n<report>App crashes on login after upgrading to v2.4.1.</report>"
    },
    { 
      label: lang === 'de' ? 'Bug-Bericht (Opt)' : 'Bug Report (Opt)',
      text: "<task>Extract bug report data</task>\n<format>\nReply ONLY in valid JSON:\n{\n  \"version\": \"string\",\n  \"severity\": \"low|medium|high|critical\",\n  \"component\": \"string\",\n  \"summary\": \"string (≤ 50 chars)\",\n  \"steps_to_reproduce\": []\n}\n</format>\n<report>App crashes on login after upgrading to v2.4.1.</report>"
    },
    { 
      label: lang === 'de' ? 'Berechnung (Std)' : 'Calculation (Std)',
      text: "A server handles 12,000 requests/day at peak. Each request needs 0.003 CPU-seconds. How many CPU cores are required with a 3× traffic spike buffer?"
    },
    { 
      label: lang === 'de' ? 'Berechnung (Opt)' : 'Calculation (Opt)',
      text: "Goal: Calculate required CPU cores.\nConstraint: Do NOT calculate yourself.\nAction: Write a Python snippet that:\n1. Defines peak_req_per_day=12000, cost_per_req_cpu_s=0.003, spike_factor=3.\n2. Computes required_cores with an explanation.\n3. Prints the result.\nReturn only the code block, no prose."
    }
  ];

  const labels = {
    placeholder: lang === 'de' ? 'Prompt hier eingeben…' : 'Enter your prompt here…',
    runButton:   lang === 'de' ? 'Prompt ausführen'     : 'Run Prompt',
    waiting:     lang === 'de' ? 'Auf Eingabe warten…'  : 'Waiting for input…',
    error:       lang === 'de' ? 'Fehler beim Abrufen der Antwort.' : 'Error fetching response.',
    perfTitle:   lang === 'de' ? 'Leistungsvergleich (Letzte 4)' : 'Performance Comparison (Last 4)',
    latency:     lang === 'de' ? 'Latenz' : 'Latency',
    tokens:      lang === 'de' ? 'Tokens' : 'Tokens',
  };

  const handleRun = async (labelOverride?: string) => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setResponse('');
    
    try {
      const res = await generateResponse(prompt);
      setResponse(res.text);
      
      const newRecord: RunRecord = {
          id: Date.now(),
          label: labelOverride || 'Custom',
          metrics: res
      };
      
      setRunHistory(prev => [newRecord, ...prev].slice(0, 4));
    } catch (e) {
      setResponse(labels.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
      setResponse('');
      setRunHistory([]);
  };

  const maxLatency = Math.max(...runHistory.map(r => r.metrics.latencyMs), 1);
  const maxTokens = Math.max(...runHistory.map(r => r.metrics.usage?.totalTokens || 0), 1);

  return (
    <div className="flex flex-col h-full space-y-4">
        <div className="flex flex-col md:flex-row h-[400px] gap-6">
            {/* Input Area */}
            <div className="w-full md:w-1/2 flex flex-col space-y-4">
                <div className="flex flex-wrap gap-2">
                    {presets.map((p, i) => (
                        <button 
                            key={i}
                            onClick={() => {
                                setPrompt(p.text);
                            }}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-xs rounded-full text-gray-700 transition-colors border border-gray-200 font-medium"
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
                <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={labels.placeholder}
                className="flex-grow w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none shadow-sm"
                />
                <button
                onClick={() => handleRun(presets.find(p => p.text === prompt)?.label)}
                disabled={isLoading || !prompt.trim()}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                {isLoading ? <Loader2 className="animate-spin" /> : <Play size={18} />}
                <span>{labels.runButton}</span>
                </button>
            </div>

            {/* Output Area */}
            <div className="w-full md:w-1/2 flex flex-col space-y-4">
                <div className="flex-grow bg-gray-900 rounded-lg p-6 overflow-auto border border-gray-800 relative shadow-inner">
                    <div className="absolute top-2 right-2 text-xs text-gray-500 uppercase font-mono tracking-widest">
                        AI Output
                    </div>
                    {response ? (
                    <pre className="text-green-400 font-mono text-xs md:text-sm whitespace-pre-wrap leading-relaxed">{response}</pre>
                    ) : (
                    <div className="h-full flex items-center justify-center text-gray-600 italic">
                        {labels.waiting}
                    </div>
                    )}
                    {response && (
                        <button 
                            onClick={handleClear} 
                            className="absolute bottom-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-colors border border-gray-700 shadow-sm"
                            title="Reset All"
                        >
                            <RotateCcw size={14} />
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/* Metrics Visualization */}
        {runHistory.length > 0 && (
            <div className="w-full bg-gray-50 rounded-lg border border-gray-200 p-4 animate-fadeIn">
                <div className="flex items-center space-x-2 mb-4 text-gray-700">
                    <BarChart2 size={20} />
                    <h3 className="font-bold text-sm uppercase tracking-wide">{labels.perfTitle}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {runHistory.map((run) => (
                        <div key={run.id} className="bg-white p-3 rounded border border-gray-100 shadow-sm flex flex-col space-y-3 relative overflow-hidden">
                             {/* Label */}
                             <div className="flex justify-between items-center z-10">
                                 <span className="font-bold text-xs text-gray-800 truncate" title={run.label}>{run.label}</span>
                                 <span className="text-[10px] text-gray-400 font-mono">{new Date(run.id).toLocaleTimeString()}</span>
                             </div>

                             {/* Latency Bar */}
                             <div className="space-y-1 z-10">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span className="flex items-center"><Zap size={10} className="mr-1 text-yellow-500"/> {labels.latency}</span>
                                    <span>{run.metrics.latencyMs}ms</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                    <div 
                                        className="bg-yellow-400 h-1.5 rounded-full transition-all duration-500" 
                                        style={{ width: `${(run.metrics.latencyMs / maxLatency) * 100}%` }}
                                    ></div>
                                </div>
                             </div>

                             {/* Token Bar */}
                             <div className="space-y-1 z-10">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span className="flex items-center"><Database size={10} className="mr-1 text-blue-500"/> {labels.tokens}</span>
                                    <span>{run.metrics.usage?.totalTokens || 0}</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                    <div 
                                        className="bg-blue-400 h-1.5 rounded-full transition-all duration-500" 
                                        style={{ width: `${((run.metrics.usage?.totalTokens || 0) / maxTokens) * 100}%` }}
                                    ></div>
                                </div>
                             </div>
                             
                             {/* Background Highlight for newest */}
                             {run.id === runHistory[0].id && (
                                 <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-bl-lg"></div>
                             )}
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  );
};

export default InteractivePlayground;