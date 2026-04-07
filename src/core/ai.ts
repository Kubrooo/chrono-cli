import { GoogleGenerativeAI  } from "@google/generative-ai";
import { getPreferences } from "./config";
import dotenv from "dotenv";
import { join } from 'path';
import { existsSync } from 'fs';

// Try to load .env from current working directory first
const cwd = process.cwd();
const cwdEnvPath = join(cwd, '.env');
if (existsSync(cwdEnvPath)) {
  dotenv.config({ path: cwdEnvPath });
} else {
  // Fallback to default dotenv behavior (checks package directory and system env)
  dotenv.config();
}

export const generateCommitMessage = async (diff: string) => {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        throw new Error(
            'GEMINI_API_KEY not found. Please set it in your .env file.\n' +
            'Get your API key from: https://aistudio.google.com/app/apikey'
        );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"})
    const { jiraPrefix } = await getPreferences();

    const prompt = `Analyze this git diff and generate a detailed commit message.
    ${jiraPrefix ? `IMPORTANT: Start the message with [${jiraPrefix}-X] where X is a placeholder for task number.` : ''}
    
    Format:
    - First line: type(scope): brief description (under 72 characters)
    - Blank line
    - Body: 2-3 sentences explaining what and why (optional but preferred for significant changes)
    - Blank line
    - Footer: Breaking changes or issue references if applicable (optional)
    
    Use conventional commits format for the first line.
    Return ONLY the commit message, no markdown formatting or code blocks.
    For small changes, a single line is fine. For larger changes, include body.

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