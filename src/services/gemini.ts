import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = 'gemini-2.5-flash';

export interface MagicResponse {
  keywords: string[];
  tamilRoots: string[];
  culturalNote: string;
}

export async function fetchMagicKeywords(query: string): Promise<MagicResponse> {
  if (!API_KEY) {
    throw new Error('Missing Gemini API Key');
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: MODEL_NAME,
    generationConfig: { responseMimeType: "application/json" }
  });

  const prompt = `You are an expert in Classical Tamil Etymology for the app "Peyar Amudham".
  Analyze the following search description and provide a Deep Semantic Discovery.
  Focus on Pure Tamil heritage, Sangam literature, and linguistic roots (Verchol).
  
  Return a JSON object with:
  1. "keywords": 5-10 English lowercase keywords (e.g., "star", "glow", "immortal").
  2. "tamilRoots": 3-5 Tamil root words or syllables (e.g., "விண்", "அண்டம்", "சீர்").
  3. "culturalNote": A one-sentence scholarly explanation of how these roots connect to the search.
  
  Description: "${query}"`;
  
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  try {
    const parsed = JSON.parse(text);
    return {
      keywords: (parsed.keywords || []).map((k: string) => k.trim().toLowerCase()),
      tamilRoots: (parsed.tamilRoots || []).map((r: string) => r.trim()),
      culturalNote: parsed.culturalNote || ""
    };
  } catch (e) {
    console.error("Failed to parse Gemini JSON:", text);
    return { keywords: [query], tamilRoots: [], culturalNote: "" };
  }
}
