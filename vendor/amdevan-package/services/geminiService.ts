import { GoogleGenAI } from "@google/genai";
import { HEALTH_PACKAGES, ADDITIONAL_SERVICES } from "../constants";

// Safely access the API key (supports Vite env and Node env)
const getApiKey = (): string => {
  // Prefer Vite-style env when available (browser builds)
  const viteEnv = (typeof import.meta !== 'undefined' && (import.meta as any)?.env) || undefined;
  const viteKey = viteEnv?.VITE_GEMINI_API_KEY || viteEnv?.VITE_API_KEY;
  if (typeof viteKey === 'string' && viteKey.length > 0) return viteKey;

  // Fallback to Node-style env for SSR/build-time
  try {
    // @ts-ignore
    const nodeKey = (typeof process !== 'undefined' && process.env && (process.env.GEMINI_API_KEY || process.env.API_KEY)) || '';
    if (typeof nodeKey === 'string' && nodeKey.length > 0) return nodeKey;
  } catch (e) {
    // ignore
  }

  return '';
};

export const isConfigured = (): boolean => {
  return getApiKey().length > 0;
};

const apiKey = getApiKey();

// Context for the AI to understand the product catalog
const SYSTEM_INSTRUCTION = `
You are 'Devan AI', a helpful and empathetic AI health consultant for 'Vitality Health'.
Your goal is to help users find the best health package for their needs based on the following catalog:

${JSON.stringify(HEALTH_PACKAGES.map(p => ({ id: p.id, title: p.title, target: p.target, purpose: p.purpose })))}

And additional services: ${JSON.stringify(ADDITIONAL_SERVICES)}

Rules:
1. Only recommend packages from the provided list.
2. Be concise, friendly, and professional.
3. Ask clarifying questions if the user's need is vague (e.g., ask for age or specific concerns).
4. Use bullet points for readability when listing options.
5. Always emphasize that you are an AI and this is not medical advice; for emergencies, they should contact emergency services.
`;

let aiClient: GoogleGenAI | null = null;

export const initializeAI = () => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing.");
    return;
  }
  aiClient = new GoogleGenAI({ apiKey });
};

export const generateResponse = async (
  userMessage: string, 
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  if (!aiClient) initializeAI();
  if (!aiClient) return "I'm sorry, I'm currently offline due to configuration issues.";

  try {
    // Map history to the format expected by the SDK
    const chat = aiClient.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "I'm having trouble understanding. Could you rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I'm experiencing a temporary connection issue. Please try again later.";
  }
};