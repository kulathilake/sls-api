import { PageMeta } from "../../common/common.types";
import { CreateRecipeDTO } from "../dtos/createRecipe.dto";
import { UpdateRecipeDTO } from "../dtos/updateRecipe.dto";
import { Recipe } from "../models/Recipe.model";
import { Inject, Service } from "typedi";
import { RecipeRepo } from "../dao/recipe.daoImpl";
/**
 * Recipe Services
 */
@Service()
export class RecipeService{

    @Inject()
    recipeRepo!: RecipeRepo;
    
    /**
     * Creates a new Recipe and persists in 
     * datastore.
     */
    adminCreateRecipe(payload: CreateRecipeDTO):Promise<Recipe>{
        this.recipeRepo.create(payload)
        .then()
        throw new Error('method not implemented');
    }

    /**
     * Updates a recipe with a given set of values.
     * @param recipeId 
     * @param payload 
     */
    adminUpdateRecipe(recipeId: string, payload: UpdateRecipeDTO): Promise<Recipe> {
        throw new Error('method not implemented');
    }

    /**
     * Retrieves a recipe by a given Id from
     * data store.
     * @param id 
     */
    getRecipe(id:string):Promise<Recipe>{
        throw new Error('method not implemented');
    }

    /**
     * fetches a page of recipes
     * @param query query to match
     * @param page page of data required
     */
    getAllRecipes(query?: Map<string,string|number|boolean>, page?:PageMeta<Recipe>):Promise<Recipe> {
        throw new Error('method not implemented');
    }

}