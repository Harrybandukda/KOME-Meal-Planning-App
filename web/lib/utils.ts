import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getServerURL() {
  return process.env.NEXT_PUBLIC_ENV === "development"
    ? "http://localhost:3123"
    : process.env.NEXT_PUBLIC_SERVER_URL;
}

export function buildURL(route: string) {
  return getServerURL() + route;
}

export function sendRequest<T>(url: string, method: string = 'GET', body: any = {}): Promise<T> {
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    }
  };

  if (method !== "GET") {
    options.method = method;
    options.body = JSON.stringify(body);
  }

  return fetch(buildURL(url), options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error during request: ", error);
    });
}

export function mapRecipe (apiResponse: any) {
  return {
    title: apiResponse.name,
    image: apiResponse.link,
    description: apiResponse.description,
    cookware: apiResponse.cookware,
    servings: apiResponse.servings,
    ingredients: apiResponse.Ingredients ? apiResponse.Ingredients.map((ingredient: any) => {
      return { name: ingredient.name, amount: ingredient.RecipeIngredients.amount, unit: ingredient.unit };
    }) : [],
    categories: apiResponse.Categories.map((category: any) => category.name),
    instructions: apiResponse.instructions.split('. ').map((text: string, step: number) => {
      return { step, text }; 
    }),
    nutrition: {
      calories: apiResponse.calories,
      carbs: apiResponse.carbs,
      fat: apiResponse.fat,
      protein: apiResponse.protein,
      fiber: 5,
      sodium: 210,
      cholesterol: 0,
    }
  };
}

export async function loadMealRecipe (recipeId: string) {
  const data = await sendRequest<any>(`/api/recipe/${recipeId}`);

  return mapRecipe(data);
};

export async function mapMealPlan (mealPlan: any) {
  const meal = {
    breakfast: await loadMealRecipe(mealPlan.breakfast),
    lunch: await loadMealRecipe(mealPlan.lunch),
    dinner: await loadMealRecipe(mealPlan.dinner),
  }

  return meal;
};
