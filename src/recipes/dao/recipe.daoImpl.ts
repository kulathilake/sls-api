import { Service } from "typedi";
import { DynamodbCRUD } from "../../common/dao/dynamodb.crud.repo";
import { CreateRecipeDTO } from "../dtos/createRecipe.dto";
import { UpdateRecipeDTO } from "../dtos/updateRecipe.dto";
import { Recipe } from "../models/Recipe.model";

const RECIPE_TABLE_NAME = process.env.RECIPE_TABLE_NAME || 'recipeTable'

@Service()
export class RecipeRepo extends DynamodbCRUD<Recipe,CreateRecipeDTO,UpdateRecipeDTO> {
    constructor(){
        super(RECIPE_TABLE_NAME);
    }
}