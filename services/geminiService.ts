
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available as an environment variable
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a concise summary for a given dataset using the Gemini API.
 * @param tableName The name of the database table the data comes from.
 * @param data The array of data objects to summarize.
 * @returns A string containing the AI-generated summary.
 */
export const generateSummary = async (tableName: string, data: any[]): Promise<string> => {
  if (!data || data.length === 0) {
    return "No data provided to summarize.";
  }

  // To keep the prompt concise, we'll only use a sample of the data if it's too large.
  const dataSample = data.length > 50 ? data.slice(0, 50) : data;
  const dataString = JSON.stringify(dataSample, null, 2);

  const prompt = `
    You are a helpful database assistant. Your task is to provide a brief, insightful summary of the provided JSON data.
    The data comes from a database table named "${tableName}".

    Based on the following data sample, provide a high-level summary. Focus on key statistics, trends, or important points.
    For example, if it's user data, mention the number of users and their roles. If it's equipment data, mention the status distribution.
    Keep the summary to 2-3 sentences.

    Data Sample from "${tableName}":
    ${dataString}

    Summary:
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.5,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 200,
        thinkingConfig: { thinkingBudget: 100 },
      },
    });

    if (!response.text) {
        throw new Error("The API returned an empty response.");
    }
    
    return response.text;
  } catch (error) {
    console.error("Error generating summary with Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate summary: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the AI service.");
  }
};
