import serverless from 'serverless-http';
import express from 'express';
import Container from 'typedi';
import { RecipeService } from '../services/recipe.service';
import { CreateRecipeDTO } from '../dtos/createRecipe.dto';
import 'reflect-metadata';

const app = express();

const recipeService = Container.get(RecipeService);

/**
 * create route
 */
app.post('/create',

    async (req, res, next) => {
        try {
            console.log(process.env)
            const createRes = await recipeService.adminCreateRecipe(req.body as CreateRecipeDTO);
            if (createRes) {
                return res.status(201).json({
                    message: 'Recipe Created'
                })
            } else {
                throw new Error('Failed to create recipe')
            }
        } catch (error) {
            res.status(500).json({
                message: 'Server Error',
                error: (error as Error).message || error
            })
        }
    })

/**
 * update route
 */
app.put('/{recipe}', (req, res, next) => {

})


/**
 * fallback route
 */
app.use((req, res, next) => {
    return res.status(404).json({
        error: "Not Found",
    });
});


export const handler = serverless(app, {
    basePath: '/admin/recipe'
});