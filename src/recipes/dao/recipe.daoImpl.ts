import { Update } from "@aws-sdk/client-dynamodb";
import { Service } from "typedi";
import { PageMeta, Page } from "../../common/common.types";
import { CRUDRepo } from "../../common/dao/crud.repo";
import { DynamodbCRUD } from "../../common/dao/dynamodb.crud.repo";
import { CreateRecipeDTO } from "../dtos/createRecipe.dto";
import { UpdateRecipeDTO } from "../dtos/updateRecipe.dto";
import { Recipe } from "../models/Recipe.model";

@Service()
export class RecipeRepo extends DynamodbCRUD<Recipe,CreateRecipeDTO,Update> {
    
}