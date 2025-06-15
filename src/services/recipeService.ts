
// Recipe search service for future API integrations
// Will integrate with Spoonacular, Edamam, or TheMealDB APIs

export interface Recipe {
  id: string;
  title: string;
  image?: string;
  readyInMinutes: number;
  servings: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  ingredients: string[];
  instructions: string[];
  diets: string[];
  cuisines: string[];
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

// Mock data for now - replace with real API calls
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Grilled Chicken Salad',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300',
    readyInMinutes: 20,
    servings: 2,
    nutrition: {
      calories: 350,
      protein: 35,
      carbs: 15,
      fat: 18,
      fiber: 8
    },
    ingredients: ['Chicken breast', 'Mixed greens', 'Cherry tomatoes', 'Olive oil', 'Lemon'],
    instructions: ['Grill chicken', 'Prepare salad', 'Add dressing'],
    diets: ['High Protein', 'Low Carb'],
    cuisines: ['Mediterranean']
  }
];

/**
 * Search for recipes by query
 * TODO: Integrate with Spoonacular API
 */
export const searchRecipes = async (query: string, diet?: string): Promise<Recipe[]> => {
  console.log('Searching recipes for:', query, diet);
  
  // Mock search - replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = mockRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(query.toLowerCase())) ||
        (diet && recipe.diets.includes(diet))
      );
      resolve(filtered);
    }, 500);
  });
};

/**
 * Get recipe details by ID
 * TODO: Integrate with Spoonacular API
 */
export const getRecipeDetails = async (id: string): Promise<Recipe | null> => {
  console.log('Getting recipe details for:', id);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const recipe = mockRecipes.find(r => r.id === id);
      resolve(recipe || null);
    }, 300);
  });
};

/**
 * Get nutrition information for a recipe
 * TODO: Integrate with Edamam Nutrition API
 */
export const analyzeRecipeNutrition = async (ingredients: string[]): Promise<NutritionInfo> => {
  console.log('Analyzing nutrition for ingredients:', ingredients);
  
  // Mock analysis - replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        calories: 400,
        protein: 25,
        carbs: 30,
        fat: 15,
        fiber: 5,
        sugar: 8,
        sodium: 600
      });
    }, 800);
  });
};

/**
 * Search recipes by barcode (future feature)
 * TODO: Integrate with Open Food Facts API
 */
export const getRecipeByBarcode = async (barcode: string): Promise<Recipe | null> => {
  console.log('Searching recipe by barcode:', barcode);
  
  // Placeholder for barcode recipe lookup
  return null;
};

// Diet types for filtering
export const DIET_TYPES = [
  'Ketogenic',
  'Vegetarian',
  'Vegan',
  'Paleo',
  'Mediterranean',
  'DASH',
  'Low Carb',
  'High Protein',
  'Gluten Free',
  'Dairy Free'
];

// Cuisine types
export const CUISINE_TYPES = [
  'American',
  'Italian',
  'Mexican',
  'Asian',
  'Mediterranean',
  'Indian',
  'French',
  'Thai',
  'Japanese',
  'Greek'
];
