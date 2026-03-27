export interface GenAIResponse {
  text: string;
  latencyMs: number;
  usage?: {
    promptTokens: number;
    candidatesTokens: number;
    totalTokens: number;
  };
}

export const generateResponse = async (prompt: string): Promise<GenAIResponse> => {
  const startTime = performance.now();

  return new Promise((resolve) => {
    setTimeout(() => {
      const endTime = performance.now();
      resolve({
        text: "⚠️ Demo Mode: Hier würde eine echte Antwort eines KI-Modells stehen. Integrieren Sie Ihren bevorzugten KI-Dienst, um Live-Daten zu erhalten.\n\nSimulierte Antwort: Basierend auf Ihrem Prompt scheint es, als wollten Sie eine Optimierung testen. Ein LLM würde hier den Kontext analysieren...",
        latencyMs: Math.round(endTime - startTime),
        usage: {
          promptTokens: Math.floor(prompt.length / 4),
          candidatesTokens: 45,
          totalTokens: Math.floor(prompt.length / 4) + 45,
        },
      });
    }, 1500);
  });
};