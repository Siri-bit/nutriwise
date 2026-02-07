
export enum ActivityLevel {
  SEDENTARY = 'Sedentary (office job, little exercise)',
  LIGHT = 'Lightly Active (light exercise 1-3 days/week)',
  MODERATE = 'Moderately Active (moderate exercise 3-5 days/week)',
  VERY_ACTIVE = 'Very Active (hard exercise 6-7 days/week)',
  EXTRA_ACTIVE = 'Extra Active (very hard physical job/training)'
}

export enum Goal {
  HEALTHY_LIVING = 'Healthy Living',
  WEIGHT_LOSS = 'Weight Loss',
  MUSCLE_GAIN = 'Muscle Gain',
  ENERGY_BOOST = 'Energy Boost'
}

export enum DietPreference {
  ANY = 'No specific preference',
  VEGETARIAN = 'Vegetarian',
  VEGAN = 'Vegan',
  KETO = 'Keto',
  PALEO = 'Paleo',
  GLUTEN_FREE = 'Gluten-Free'
}

export interface UserProfile {
  age: number;
  gender: string;
  weight: number;
  height: number;
  activityLevel: ActivityLevel;
  goal: Goal;
  dietPreference: DietPreference;
}

export interface IngredientBenefit {
  ingredient: string;
  benefit: string;
}

export interface Meal {
  type: string;
  name: string;
  description: string;
  ingredients: string[];
  ingredientBenefits: IngredientBenefit[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  physicalBenefit: string; // Specific benefit for the body
  cognitiveBenefit: string;  // Specific benefit for the brain
  mentalHealthImpact: string;
}

export interface DietPlan {
  dailyCalories: number;
  macroRatio: {
    protein: number;
    carbs: number;
    fats: number;
  };
  meals: Meal[];
  generalTips: string[];
  scientificReasoning: string;
  brainHealthInsight: string;
  brainHealthScore: number; 
  neuroPowerIngredients: string[]; 
}

export interface PlanHistoryItem {
  timestamp: number;
  plan: DietPlan;
  profile: UserProfile;
}
