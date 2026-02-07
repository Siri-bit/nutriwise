
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, DietPlan } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDietPlan = async (profile: UserProfile): Promise<DietPlan> => {
  const prompt = `
    Generate a 1-day holistic diet plan for a ${profile.age}-year-old ${profile.gender} that EQUALLY BALANCES physical health and brain performance.
    
    Stats: Weight ${profile.weight}kg, Height ${profile.height}cm. Activity Level: ${profile.activityLevel}. Goal: ${profile.goal}. Preference: ${profile.dietPreference}.
    
    CULTURAL CORE: South Indian Cuisine (Idli, Ragi, Moringa, Turmeric, Coconut, Curry leaves, Pearl Millet/Bajra, etc.).
    
    STRICT REQUIREMENTS:
    1. EQUAL BALANCE: The plan must provide optimal physical fuel (calories/macros) and peak cognitive fuel (neuro-nutrition).
    2. DUAL BENEFITS: For EVERY meal, you must explicitly state the 'physicalBenefit' (body) and the 'cognitiveBenefit' (brain).
    3. NEURO-POWER: Include ingredients like Curcumin (Turmeric), Omega-3s, Anthocyanins, and Flavanols common in healthy South Indian diets.
    4. BRAIN SCORE: Provide a 'brainHealthScore' (0-100).
    5. List 3 'Neuro-Power' ingredients for the day.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: "You are a specialist in Integrative Neuro-Nutrition and South Indian culinary science. Provide high-quality JSON responses that highlight the synergy between body and brain health.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          dailyCalories: { type: Type.NUMBER },
          macroRatio: {
            type: Type.OBJECT,
            properties: {
              protein: { type: Type.NUMBER },
              carbs: { type: Type.NUMBER },
              fats: { type: Type.NUMBER }
            },
            required: ["protein", "carbs", "fats"]
          },
          meals: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                ingredientBenefits: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      ingredient: { type: Type.STRING },
                      benefit: { type: Type.STRING }
                    },
                    required: ["ingredient", "benefit"]
                  }
                },
                calories: { type: Type.NUMBER },
                protein: { type: Type.NUMBER },
                carbs: { type: Type.NUMBER },
                fats: { type: Type.NUMBER },
                physicalBenefit: { type: Type.STRING },
                cognitiveBenefit: { type: Type.STRING },
                mentalHealthImpact: { type: Type.STRING }
              },
              required: ["type", "name", "description", "ingredients", "ingredientBenefits", "calories", "protein", "carbs", "fats", "physicalBenefit", "cognitiveBenefit", "mentalHealthImpact"]
            }
          },
          generalTips: { type: Type.ARRAY, items: { type: Type.STRING } },
          scientificReasoning: { type: Type.STRING },
          brainHealthInsight: { type: Type.STRING },
          brainHealthScore: { type: Type.NUMBER },
          neuroPowerIngredients: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["dailyCalories", "macroRatio", "meals", "generalTips", "scientificReasoning", "brainHealthInsight", "brainHealthScore", "neuroPowerIngredients"]
      }
    }
  });

  if (!response.text) {
    throw new Error("No response content received from AI");
  }

  return JSON.parse(response.text);
};
