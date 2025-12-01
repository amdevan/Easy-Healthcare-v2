import { GoogleGenAI } from '@google/genai';

// Safely access the API key (supports Vite and Node env)
const getApiKey = (): string => {
  const viteEnv = (typeof import.meta !== 'undefined' && (import.meta as any)?.env) || undefined;
  const viteKey = viteEnv?.VITE_GEMINI_API_KEY || viteEnv?.VITE_API_KEY;
  if (typeof viteKey === 'string' && viteKey.length > 0) return viteKey;
  try {
    // @ts-ignore
    const nodeKey = (typeof process !== 'undefined' && process.env && (process.env.GEMINI_API_KEY || process.env.API_KEY)) || '';
    if (typeof nodeKey === 'string' && nodeKey.length > 0) return nodeKey;
  } catch {
    // ignore
  }
  return '';
};

const SYSTEM_INSTRUCTION = `You are an AI Pharmacist for Easy Health Care.
- Be safety-first and concise.
- Do not diagnose; advise consulting a doctor for serious issues.
- Verify when a medicine requires a prescription.
- Provide guidance on dosage forms and general precautions.
- Never provide illegal or harmful instructions.`;

let aiClient: GoogleGenAI | null = null;

export const startChatSession = () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn('Gemini API Key is missing. Pharmacist chat will use fallback responses.');
    aiClient = null;
    return;
  }
  aiClient = new GoogleGenAI({ apiKey });
};

export async function sendMessageToPharmacist(userText: string): Promise<string> {
  if (!aiClient) startChatSession();
  if (!aiClient) {
    return 'I can help with medicine guidance once AI is configured. Please set GEMINI_API_KEY.';
  }
  try {
    const chat = aiClient.chats.create({
      model: 'gemini-2.5-flash',
      config: { systemInstruction: SYSTEM_INSTRUCTION },
      history: [],
    });
    const result = await chat.sendMessage({ message: userText });
    return result.text || 'Sorry, I could not generate a response.';
  } catch (e) {
    console.error('PharmacistChat error:', e);
    return 'Sorry, there was an issue retrieving a response. Please try again later.';
  }
}