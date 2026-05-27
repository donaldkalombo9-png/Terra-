/**
 * Domain structures for Food Recipes & Diet App Helper
 */

export interface NutrientStats {
  calories: number;   // kcal
  protein: number;    // grams
  carbs: number;      // grams
  fats: number;       // grams
  benefits: string[]; // key microscopic focus e.g. ["Zinc", "Vit B12", "Iron"]
}

export interface Recipe {
  id: string;
  name: string;
  duration: number; // minutes
  difficulty: "Easy" | "Medium" | "Advanced";
  imageUrl: string;
  category: string; // "vegetarian" | "sick" | "morning" | "gym"
  matchPercentage: number; // e.g., 98
  description: string;
  nutrients: NutrientStats;
  ingredients: string[];
  steps: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
  description: string;
  healthBenefit: string;
  targetCategory: "vegetarian" | "sick" | "morning" | "gym" | "all";
  allergenAlert: string;
  stockCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WarningGuide {
  title: string;
  urgency: "moderate" | "critical";
  message: string;
  subPoints: string[];
  allergenTriggers: string[];
}

export interface DietDetails {
  id: string;
  title: string;
  icon: string; // lucide icon identifier
  description: string;
  whyThisDiet: string;
  keyMantra: string;
  recommendedFoods: string[];
  avoidFoods: string[];
  essentialNutrientFocus: string[];
  warning: WarningGuide;
  recommendedBoosterTags: string[]; // match items in store e.g., ["Pea Protein", "Collab Tea"]
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}
