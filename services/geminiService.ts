
import { GoogleGenAI, Type } from "@google/genai";
import { ElectricalLoad, FeedbackTip } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getEnergyFeedback = async (loads: ElectricalLoad[]): Promise<FeedbackTip[]> => {
  try {
    const consumptionSummary = loads.map(load => 
      `- ${load.name}: ${load.currentConsumption.toFixed(2)} kWh`
    ).join('\n');

    const totalConsumption = loads.reduce((sum, load) => sum + load.currentConsumption, 0);

    const prompt = `
      As an energy efficiency expert, analyze the following household energy consumption data and provide actionable, personalized feedback. The total consumption is ${totalConsumption.toFixed(2)} kWh.

      Current Consumption Breakdown:
      ${consumptionSummary}

      Based on this data, provide 3-5 concise, practical tips to help reduce energy usage. For each tip, provide a title, a brief suggestion, and a priority level ('High', 'Medium', or 'Low'). Return the response as a JSON array of objects.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: 'A short, catchy title for the tip.'
              },
              suggestion: {
                type: Type.STRING,
                description: 'A detailed but easy-to-understand suggestion for saving energy.'
              },
              priority: {
                type: Type.STRING,
                enum: ['High', 'Medium', 'Low'],
                description: 'The priority level of the tip based on potential savings and ease of implementation.'
              },
            },
            required: ["title", "suggestion", "priority"],
          },
        },
      },
    });
    
    const jsonString = response.text.trim();
    const feedback = JSON.parse(jsonString) as FeedbackTip[];
    return feedback;

  } catch (error) {
    console.error("Error fetching feedback from Gemini API:", error);
    throw new Error("Failed to generate AI feedback. Please check your API key and try again.");
  }
};
