import express from 'express'
import { RecipeController } from './Recipies.controller'

const route = express.Router()



route.get('/AllRecipieForAdmin', RecipeController.GetAllRecipeforAdmin) //All Recipe Data get 
route.get('/', RecipeController.GetAllRecipe) //All Recipe Data get 
route.get('/:id', RecipeController.GetSingleRecipe) //single Recipe Data get 
route.get('/user/:id', RecipeController.GetUserRecipeData) //All Recipe Data get 
route.post('/', RecipeController.AddRecipe) //Add Recipe Data 

route.patch('/:id', RecipeController.UpdateRecipeData) //Update Recipe Data 
route.patch('/Like/:id', RecipeController.userRecipieLike) //Update Recipe Data 
route.patch('/Rating/:id', RecipeController.adduserRecipeRating) //Update Recipe Data 

route.patch('/Status/:id', RecipeController.changeRecipieStatus) //Update Recipe Data 
route.patch('/PrimiumStatus/:id', RecipeController.changeRecipiePrimiumstatus) //Update Recipe Data 


route.delete('/:id', RecipeController.DeleteRecipeData) //Delete Recipe Data 


export const RecipeRoute = route