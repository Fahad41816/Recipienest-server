"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeRoute = void 0;
const express_1 = __importDefault(require("express"));
const Recipies_controller_1 = require("./Recipies.controller");
const route = express_1.default.Router();
route.get('/AllRecipieForAdmin', Recipies_controller_1.RecipeController.GetAllRecipeforAdmin); //All Recipe Data get 
route.get('/', Recipies_controller_1.RecipeController.GetAllRecipe); //All Recipe Data get 
route.get('/:id', Recipies_controller_1.RecipeController.GetSingleRecipe); //single Recipe Data get 
route.get('/user/:id', Recipies_controller_1.RecipeController.GetUserRecipeData); //All Recipe Data get 
route.post('/', Recipies_controller_1.RecipeController.AddRecipe); //Add Recipe Data 
route.patch('/:id', Recipies_controller_1.RecipeController.UpdateRecipeData); //Update Recipe Data 
route.patch('/Like/:id', Recipies_controller_1.RecipeController.userRecipieLike); //Update Recipe Data 
route.patch('/Rating/:id', Recipies_controller_1.RecipeController.adduserRecipeRating); //Update Recipe Data 
route.patch('/Status/:id', Recipies_controller_1.RecipeController.changeRecipieStatus); //Update Recipe Data 
route.patch('/PrimiumStatus/:id', Recipies_controller_1.RecipeController.changeRecipiePrimiumstatus); //Update Recipe Data 
route.delete('/:id', Recipies_controller_1.RecipeController.DeleteRecipeData); //Delete Recipe Data 
exports.RecipeRoute = route;
