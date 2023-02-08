import { PageMeta } from "../../common/common.types";
import { CreateRecipeDTO } from "../dtos/createRecipe.dto";
import { UpdateRecipeDTO } from "../dtos/updateRecipe.dto";
import { Recipe } from "../models/Recipe.model";
import Container, { Inject, Service } from "typedi";
import { RecipeRepo } from "../dao/recipe.daoImpl";
import { RecipeDBMapper } from "../dao/recipe.db.mapper.class";
/**
 * Recipe Services
 */
@Service()
export class RecipeService{

    recipeRepo = Container.get(RecipeRepo);
    
    /**
     * Creates a new Recipe and persists in 
     * datastore.
     */
    async adminCreateRecipe(payload: CreateRecipeDTO):Promise<Recipe>{
        const mappedObj = Object.assign(new RecipeDBMapper(), payload);
        const isTableReady = await this.recipeRepo.ensureTable(RecipeDBMapper);
        if(isTableReady) {
            return await this.recipeRepo.create(mappedObj)
            .then(r=> {
                return r;
            })
        } else {
            throw new Error('sdsd')
        }

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