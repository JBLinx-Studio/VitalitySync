
// Comprehensive API integrations for nutrition and fitness data
// This file serves as a central hub for all external API integrations

/**
 * Free nutrition and fitness APIs that can be integrated:
 * 
 * 1. USDA FoodData Central (Already integrated)
 * 2. Open Food Facts (Barcode scanning)
 * 3. Spoonacular (Recipes) - Free tier: 150 requests/day
 * 4. Edamam (Nutrition analysis) - Free tier: 5000 requests/month
 * 5. TheMealDB (Free recipes)
 * 6. FatSecret Platform API (Comprehensive food database)
 * 7. MyFitnessPal API (Limited access)
 * 8. Nutritionix API (Food database)
 * 9. ExerciseDB (Exercise database)
 * 10. Wger (Open source fitness API)
 */

// API Configuration
export const API_CONFIGS = {
  USDA_FOOD_DATA: {
    baseUrl: 'https://api.nal.usda.gov/fdc/v1',
    apiKey: 'dp0h0fM6976oP9ecj0ludr9ZavnIa9Qg5ZelwKIN', // Your existing key
    description: 'Official USDA food nutrition database'
  },
  
  OPEN_FOOD_FACTS: {
    baseUrl: 'https://world.openfoodfacts.org/api/v0',
    apiKey: null, // No API key required
    description: 'Global food products database with barcode scanning'
  },
  
  SPOONACULAR: {
    baseUrl: 'https://api.spoonacular.com',
    apiKey: null, // User needs to provide
    description: 'Recipe search, meal planning, and nutrition analysis'
  },
  
  EDAMAM_NUTRITION: {
    baseUrl: 'https://api.edamam.com/api/nutrition-data/v2',
    apiKey: null, // User needs to provide
    description: 'Nutrition analysis for recipes and foods'
  },
  
  THEMEALDB: {
    baseUrl: 'https://www.themealdb.com/api/json/v1/1',
    apiKey: null, // Free, no key required
    description: 'Free recipe database'
  },
  
  EXERCISEDB: {
    baseUrl: 'https://exercisedb.p.rapidapi.com',
    apiKey: null, // User needs RapidAPI key
    description: 'Comprehensive exercise database with images and instructions'
  },
  
  WGER: {
    baseUrl: 'https://wger.de/api/v2',
    apiKey: null, // No API key required
    description: 'Open source workout and exercise database'
  }
};

/**
 * Open Food Facts - Barcode scanning
 */
export const searchByBarcode = async (barcode: string) => {
  try {
    const response = await fetch(`${API_CONFIGS.OPEN_FOOD_FACTS.baseUrl}/product/${barcode}.json`);
    const data = await response.json();
    
    if (data.status === 1) {
      const product = data.product;
      return {
        name: product.product_name || 'Unknown Product',
        brand: product.brands || '',
        calories: product.nutriments?.['energy-kcal_100g'] || 0,
        protein: product.nutriments?.proteins_100g || 0,
        carbs: product.nutriments?.carbohydrates_100g || 0,
        fat: product.nutriments?.fat_100g || 0,
        fiber: product.nutriments?.fiber_100g || 0,
        image: product.image_url,
        ingredients: product.ingredients_text || '',
        barcode
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching barcode data:', error);
    return null;
  }
};

/**
 * TheMealDB - Free recipes
 */
export const searchFreeRecipes = async (query: string) => {
  try {
    const response = await fetch(`${API_CONFIGS.THEMEALDB.baseUrl}/search.php?s=${encodeURIComponent(query)}`);
    const data = await response.json();
    
    if (data.meals) {
      return data.meals.map((meal: any) => ({
        id: meal.idMeal,
        name: meal.strMeal,
        category: meal.strCategory,
        cuisine: meal.strArea,
        instructions: meal.strInstructions,
        image: meal.strMealThumb,
        ingredients: Object.keys(meal)
          .filter(key => key.startsWith('strIngredient') && meal[key])
          .map(key => meal[key])
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

/**
 * Wger - Open source exercises
 */
export const searchFreeExercises = async (muscle?: string) => {
  try {
    const url = muscle 
      ? `${API_CONFIGS.WGER.baseUrl}/exercise/?muscles=${muscle}&language=2&limit=50`
      : `${API_CONFIGS.WGER.baseUrl}/exercise/?language=2&limit=50`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return data.results?.map((exercise: any) => ({
      id: exercise.id,
      name: exercise.name,
      description: exercise.description,
      category: exercise.category,
      muscles: exercise.muscles,
      equipment: exercise.equipment
    })) || [];
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }
};

/**
 * Future API integration helpers
 */
export const getApiStatus = () => {
  return {
    usda: { status: 'active', description: 'USDA Food Database' },
    openFoodFacts: { status: 'ready', description: 'Barcode Scanning' },
    themealdb: { status: 'ready', description: 'Free Recipes' },
    wger: { status: 'ready', description: 'Free Exercises' },
    spoonacular: { status: 'needs-key', description: 'Premium Recipes (API key required)' },
    edamam: { status: 'needs-key', description: 'Nutrition Analysis (API key required)' },
    exercisedb: { status: 'needs-key', description: 'Premium Exercise DB (API key required)' }
  };
};

export const validateApiKey = async (service: string, apiKey: string): Promise<boolean> => {
  // Add validation logic for each API service
  switch (service) {
    case 'spoonacular':
      try {
        const response = await fetch(`${API_CONFIGS.SPOONACULAR.baseUrl}/recipes/random?apiKey=${apiKey}&number=1`);
        return response.ok;
      } catch {
        return false;
      }
    case 'edamam':
      // Add Edamam validation
      return true;
    case 'exercisedb':
      // Add ExerciseDB validation
      return true;
    default:
      return false;
  }
};
