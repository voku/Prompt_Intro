import { GoogleGenAI } from "@google/genai";

export interface GenAIResponse {
  text: string;
  latencyMs: number;
  usage?: {
    promptTokens: number;
    candidatesTokens: number;
    totalTokens: number;
  };
}

// Initialize the API client
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is missing via process.env.API_KEY");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateResponse = async (prompt: string, modelId: string = "gemini-3-flash-preview"): Promise<GenAIResponse> => {
  const ai = getClient();
  const startTime = performance.now();
  
  if (!ai) {
    // Simulation for demo mode if no key is present
    return new Promise((resolve) => {
      setTimeout(() => {
        const endTime = performance.now();
        resolve({
            text: "⚠️ Demo Mode (No API Key detected): Hier würde eine echte Antwort von Gemini stehen. Bitte fügen Sie einen API Key in der Umgebungsvariable hinzu, um echte Live-Daten zu erhalten.\n\nSimulierte Antwort: Basierend auf Ihrem Prompt scheint es, als wollten Sie eine Optimierung testen. Ein LLM würde hier nun den Kontext analysieren...",
            latencyMs: endTime - startTime,
            usage: {
                promptTokens: Math.floor(prompt.length / 4),
                candidatesTokens: 45,
                totalTokens: Math.floor(prompt.length / 4) + 45
            }
        });
      }, 1500);
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
        // Enable Google Search tool to support "Optimized" prompts requiring web access
        tools: [{ googleSearch: {} }] 
      }
    });
    
    const endTime = performance.now();
    let text = response.text || "Keine Antwort erhalten.";

    // Check for grounding (search sources) and append them if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks && groundingChunks.length > 0) {
      text += "\n\n---\n🌐 **Verwendete Quellen:**\n";
      const uniqueLinks = new Set<string>();
      
      groundingChunks.forEach(chunk => {
        if (chunk.web?.uri && chunk.web?.title) {
           const link = `- [${chunk.web.title}](${chunk.web.uri})`;
           if (!uniqueLinks.has(link)) {
             uniqueLinks.add(link);
             text += `${link}\n`;
           }
        }
      });
    }

    const usage = response.usageMetadata;

    return {
        text,
        latencyMs: Math.round(endTime - startTime),
        usage: {
            promptTokens: usage?.promptTokenCount || 0,
            candidatesTokens: usage?.candidatesTokenCount || 0,
            totalTokens: usage?.totalTokenCount || 0
        }
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    const endTime = performance.now();
    return {
        text: `Fehler bei der Anfrage: ${(error as Error).message}`,
        latencyMs: Math.round(endTime - startTime),
        usage: { promptTokens: 0, candidatesTokens: 0, totalTokens: 0 }
    };
  }
};