"use server";

import { GoogleGenAI } from "@google/genai";
import { appInfo } from "@/data/appInfo";

export async function aiChat(msg: string) {
  try {
    const genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const systemPrompt = `
      You are a helpful assistant for an application called ChinguVerse.
      Your job is to answer questions about how the app works.
      Here is information about the application:
      ---
      ${appInfo}
      ---
      Only answer questions related to ChinguVerse, filters, the map, or the features in the app.
      If the question is not related, politely decline.
    `;

    const fullPrompt = `${systemPrompt}\n\nUser Question: ${msg}`;

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: [{ text: fullPrompt }],
    });

    // Extract text safely based on new SDK shape
    const reply =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response.";

    return { reply };
  } catch (error) {
    console.error("AI Chat Error:", error);
    return { error: "Something went wrong" };
  }
}
