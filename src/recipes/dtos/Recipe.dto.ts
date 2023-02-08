import { BaseDto, Media, TimeBreakdown } from "../../common/common.types";
import { QuantityByServeSize, RecipeInstructionStep } from "../types/recipe.types";
import { Ingredient } from "../models/Ingredient.model";

export interface RecipeDto extends BaseDto {
    recipeId: string;
    name: string;
    description: string;
    instructionVideo: Media | string;
    ingredients: {ingredient: Ingredient, quantity: QuantityByServeSize}[];
    instrctions: RecipeInstructionStep[];
    totalPrepTime: TimeBreakdown;
    customerScore: number;
    tags: string[];
    mealChecks: {
        isVeg: boolean;
        isLowCarb: boolean;
        isHighProtein: boolean;
        containsNuts: boolean;
        containsDairy: boolean;
        isHalal: boolean;
    }
    isAvailable: boolean;
}