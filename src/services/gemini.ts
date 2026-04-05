import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = 'gemini-2.5-flash';

export async function fetchMagicKeywords(query: string): Promise<string[]> {
  if (!API_KEY) {
    throw new Error('Missing Gemini API Key');
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const prompt = `You are an expert in Classical Tamil Etymology for the app "Peyar Amudham". Extract exactly 5 to 10 distinct, simple English keywords or concepts related to the following description. Focus specifically on pure Tamil roots, nature, virtue, and ancestral heritage. Return ONLY a comma-separated list of lowercase words, with no punctuation or extra text. Description: "${query}"`;
  
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return text.split(',').map(k => k.trim().toLowerCase()).filter(k => k.length > 0);
}
