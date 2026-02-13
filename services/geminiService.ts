
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getFashionAdvice = async (history: ChatMessage[], userQuery: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        { role: 'user', parts: [{ text: userQuery }] }
      ],
      config: {
        systemInstruction: `You are an elite AI Fashion Stylist for ZYRAJO Fashion. 
        Your goal is to provide personalized styling advice, suggest outfits based on body types and occasions, 
        and help users navigate the ZYRAJO collection. 
        Keep your tone sophisticated, encouraging, and trend-aware.
        Always suggest at least one specific category (Formal, Casual, Evening, Loungewear) 
        and mention how specific fabrics or colors enhance the look.`,
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, my styling circuits are temporarily offline. How else can I assist you with your wardrobe today?";
  }
};

export const searchWithAI = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User is searching for: "${query}". Based on this, suggest 3 specific fashion attributes or style keywords that would help them find high-end clothing. Return as a JSON array of strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    return ["Linen", "Tailored", "Silk"];
  }
};

export const getRecommendations = async (preferences: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on these preferences: "${preferences}", suggest 3 types of clothing styles or specific items a user might like from an upscale boutique. Return as a JSON array of strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    return ["Tailored Suits", "Minimalist Knits", "Evening Gowns"];
  }
};
