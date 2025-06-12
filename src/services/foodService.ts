
const API_KEY = 'dp0h0fM6976oP9ecj0ludr9ZavnIa9Qg5ZelwKIN';
const BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

export interface Food {
  fdcId: string;
  description: string;
  foodNutrients: FoodNutrient[];
  servingSize?: number;
  servingSizeUnit?: string;
  brandName?: string;
}

export interface FoodNutrient {
  number?: string;
  name?: string;
  amount?: number;
  unitName?: string;
  nutrientId: number;
  nutrientName?: string;
  value?: number;
}

export const searchFoods = async (query: string): Promise<Food[]> => {
  try {
    const response = await fetch(`${BASE_URL}/foods/search?api_key=${API_KEY}&query=${encodeURIComponent(query)}&pageSize=25`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch foods');
    }
    
    const data = await response.json();
    return data.foods || [];
  } catch (error) {
    console.error('Error searching foods:', error);
    return [];
  }
};

export const getFoodDetails = async (fdcId: string): Promise<Food | null> => {
  try {
    const response = await fetch(`${BASE_URL}/food/${fdcId}?api_key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch food details');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching food details:', error);
    return null;
  }
};

export const extractNutrients = (food: Food) => {
  // Maps FDC nutrient IDs to names
  const NUTRIENT_IDS = {
    ENERGY: 1008, // Energy (kcal)
    PROTEIN: 1003, // Protein (g)
    FAT: 1004, // Total fat (g)
    CARBS: 1005, // Total carbohydrates (g)
    FIBER: 1079, // Fiber (g)
    SUGAR: 2000, // Total sugars (g)
    SODIUM: 1093, // Sodium (mg)
  };

  // Function to find a nutrient by its ID
  const findNutrient = (nutrientId: number) => {
    const nutrient = food.foodNutrients.find(n => 
      (n.nutrientId === nutrientId) || 
      (n.number && parseInt(n.number) === nutrientId)
    );
    return nutrient ? (nutrient.amount || nutrient.value || 0) : 0;
  };

  // Get the base nutrients per 100g
  const nutrientsPerHundredGrams = {
    calories: findNutrient(NUTRIENT_IDS.ENERGY),
    protein: findNutrient(NUTRIENT_IDS.PROTEIN),
    fat: findNutrient(NUTRIENT_IDS.FAT),
    carbs: findNutrient(NUTRIENT_IDS.CARBS),
    fiber: findNutrient(NUTRIENT_IDS.FIBER),
    sugar: findNutrient(NUTRIENT_IDS.SUGAR),
    sodium: findNutrient(NUTRIENT_IDS.SODIUM),
  };

  return {
    ...nutrientsPerHundredGrams,
    servingSize: food.servingSize || 100,
    servingSizeUnit: food.servingSizeUnit || 'g'
  };
};

// Calculate nutrients based on a specific weight in grams
export const calculateNutrientsByWeight = (
  baseNutrients: ReturnType<typeof extractNutrients>, 
  weightInGrams: number
) => {
  const ratio = weightInGrams / 100; // Nutrients are per 100g by default
  
  return {
    calories: Math.round(baseNutrients.calories * ratio),
    protein: Math.round(baseNutrients.protein * ratio * 10) / 10,
    fat: Math.round(baseNutrients.fat * ratio * 10) / 10,
    carbs: Math.round(baseNutrients.carbs * ratio * 10) / 10,
    fiber: Math.round(baseNutrients.fiber * ratio * 10) / 10,
    sugar: Math.round(baseNutrients.sugar * ratio * 10) / 10,
    sodium: Math.round(baseNutrients.sodium * ratio),
  };
};

// Calculate nutrients based on number of servings
export const calculateNutrientsByServings = (
  baseNutrients: ReturnType<typeof extractNutrients>, 
  servings: number
) => {
  return {
    calories: Math.round(baseNutrients.calories * servings),
    protein: Math.round(baseNutrients.protein * servings * 10) / 10,
    fat: Math.round(baseNutrients.fat * servings * 10) / 10,
    carbs: Math.round(baseNutrients.carbs * servings * 10) / 10,
    fiber: Math.round(baseNutrients.fiber * servings * 10) / 10,
    sugar: Math.round(baseNutrients.sugar * servings * 10) / 10,
    sodium: Math.round(baseNutrients.sodium * servings),
  };
};
