"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) throw new Error('Missing API KEY');
const genAI = new GoogleGenerativeAI(API_KEY);

export async function sendPrompt(history: Array<string>, prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const chat = model.startChat({
    history: history.map((msg, i) => {
      return {
        role: i % 2 === 0 ? "user" : 'model',
        parts: [{ text: msg }]
      }
    })
  })
  const res = await chat.sendMessage(prompt);
  const response = res.response;
  const text = response.text();
  return JSON.parse(JSON.stringify({ res: text as string }));
}
