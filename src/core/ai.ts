import { GoogleGenerativeAI  } from "@google/generative-ai";
import { getPreferences } from "./config";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const generateCommitMessage = async (diff: string) => {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        throw new Error(
            'GEMINI_API_KEY not found. Please set it in your .env file.\n' +
            'Get your API key from: https://aistudio.google.com/app/apikey'
        );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"})
    const { jiraPrefix } = await getPreferences();

    const prompt = `Analyze this git diff and write a concise commit message.
    ${jiraPrefix ? `IMPORTANT: Start the message with [${jiraPrefix}-X] where X is a placeholder for task number.` : ''}
    Use conventional commits format: type(scope): brief description
    Keep it under 72 characters if possible.
    Return ONLY the commit message, no markdown formatting or code blocks.

    Diff:
    ${diff}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let message = response.text().trim();
  
  // Remove markdown code blocks if present
  message = message.replace(/^```[\s\S]*?\n/, '').replace(/\n```$/, '');
  
  return message;
}