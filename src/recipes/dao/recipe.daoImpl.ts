import { Service } from "typedi";
import { DynamodbCRUD } from "../../common/dao/dynamodb.crud.repo";
import { CreateRecipeDTO } from "../dtos/createRecipe.dto";
import { UpdateRecipeDTO } from "../dtos/updateRecipe.dto";
import { Recipe } from "../models/Recipe.model";
import { RecipeDBMapper } from "./recipe.db.mapper.class";

const RECIPE_TABLE_NAME = process.env.RECIPE_TABLE_NAME || 'recipeTable'

@Service()
export class RecipeRepo extends DynamodbCRUD<Recipe,CreateRecipeDTO,UpdateRecipeDTO> {
    tableReady:boolean = false;
    constructor(){
        super(RECIPE_TABLE_NAME);
        this.ensureTable(RecipeDBMapper)
        .then(()=>{
            this.tableReady = true;
        })
    }
}