import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);


export async function generateRecipe({ ingredients, mealType, diet, personQuantity, duration }) {
  // Use 'gemini-2.5-flash' which is the current stable model
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const mealTypeText = mealType.length > 0 ? mealType.join(' or ') : 'any meal type';
  const dietText = diet.length > 0 ? diet.join(' and ') : 'any diet';
  const typeForJson = mealType.length > 0 ? mealType[0].toLowerCase() : 'general';
  const dietForJson = diet.length > 0 ? diet[0].toLowerCase() : 'general';

  const prompt = `

You are top chef that knows how to create delicious and easy-to-make recipes, for the user's existing ingredients. 

IMPORTANT: IF YOU DONT GET REASONABLE INGREDIENTS, RETURN EMPTY ARRAY 

Generate 3 different ${dietText} ${mealTypeText} recipes for ${personQuantity} people using these ingredients: ${ingredients.join(', ')}. Target duration: approximately ${duration} minutes each (or less).

Return ONLY a valid JSON array with 3 recipe objects, each with this structure:
[
  {
    "name": "Recipe Name",
    "type": "${typeForJson}",
    "diet": "${dietForJson}",
    "personQuantity": ${personQuantity},
    "prepDurationInMinutes": ${duration},
    "ingredients": [{"name": "ingredient", "quantity": 100, "unit": "grams"}],
    "steps": ["Step 1", "Step 2"]
  }
]`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const recipes = JSON.parse(jsonMatch[0]);
      if (!Array.isArray(recipes) || recipes.length === 0) {
        throw new Error('Invalid recipe format or empty response');
      }
      return recipes;
    }
    throw new Error('No JSON found in response');
  } catch (error) {
    console.error('Error generating recipe:', error);
    if (error.message?.includes('API key')) {
      throw new Error('API key error. Please check your configuration.');
    } else if (error.message?.includes('quota')) {
      throw new Error('API quota exceeded. Please try again later.');
    } else if (error.message?.includes('network')) {
      throw new Error('Network error. Please check your connection.');
    } else if (error instanceof SyntaxError) {
      throw new Error('Failed to parse recipe data. Please try again.');
    }
    throw new Error(`Failed to generate recipes: ${error.message}`);
  }
}