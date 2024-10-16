import { Request, Response } from "express";
import { ReciepieServices } from "./Recipie.services";
import { TRecipe } from "./Recipie.interface";
import CatchAsync from "../../utils/catchAsync";

const AddRecipe = CatchAsync(async (req: Request, res: Response) => {
  const Recipie: TRecipe = req.body;

  const result = await ReciepieServices.AddRecipeIntodb(Recipie);

  res.status(200).json({
    success: true,
    message: "Recipie Data created successfully!",
    data: result,
  });
});

const GetUserRecipeData = CatchAsync(async (req, res) => {
  const id = req.params.id;

  const Result = await ReciepieServices.GetUserRecipeData(id);

  res.status(200).json({
    success: true,
    message: "Recipie Data retrieved successfully!",
    data: Result,
  });
});

const GetAllRecipe = CatchAsync(async (req: Request, res: Response) => {
  const { page, searchTerm, Rating, timeDuration, isPremiumMember }: any = req.query;

  console.log(Rating);
  console.log(timeDuration);
  console.log(isPremiumMember)
  const filters = {
    Rating: Rating,
    timeDuration: timeDuration,
  };

  console.log("page", page);

  const result = await ReciepieServices.GetAllRecipeIntoDb(
    page,
    searchTerm,
    filters,
    isPremiumMember
  );

  res.status(200).json({
    success: true,
    message: "Recipie Data retrieved successfully!",
    data: result,
  });
});

const GetAllRecipeforAdmin = CatchAsync(async (req: Request, res: Response) => {
   
  const result = await ReciepieServices.GetAllRecipeforAdminIntoDb();

  res.status(200).json({
    success: true,
    message: "admin Recipie Data retrieved successfully!",
    data: result,
  });
});

const GetSingleRecipe = CatchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await ReciepieServices.GetSingleRecipeIntoDb(id);

  res.status(200).json({
    success: true,
    message: "Recipie Data retrieved successfully!",
    data: result,
  });
});

const UpdateRecipeData = CatchAsync(async (req, res) => {
  const id = req.params.id;

  const UpdatedData = req.body;

  const result = await ReciepieServices.UpdateRecipeDataIntoDb(id, UpdatedData);

  res.status(200).json({
    success: true,
    message: "Recipie Updated successfully!",
    data: result,
  });
});

const DeleteRecipeData = CatchAsync(async (req, res) => {
  const RecipeId = req.params.id;

  const result = ReciepieServices.DeleteRecipeDataIntoDb(RecipeId);

  res.status(200).json({
    success: true,
    message: "Recipie Deleted successfully!",
    data: result,
  });
});

const userRecipieLike = CatchAsync(async (req, res) => {
  const id = req.params.id;

  const votedata = req.body;

  const result = await ReciepieServices.updaterecipieLikeintoDb(id, votedata);

  res.status(200).json({
    success: true,
    message: "Recipie Voted successfully!",
    data: result,
  });
});

const adduserRecipeRating = CatchAsync(async (req, res) => {
  const id = req.params.id;

  const ratting = req.body;
 

  const result = await ReciepieServices.AddRecipeRatingIntoDb(id, ratting);

  res.status(200).json({
    success: true,
    message: "Recipie Ratting successfully!",
    data: result,
  });
});

const changeRecipieStatus = CatchAsync(async(req, res) => {

  

  const id = req.params.id
  const status = req.body.status

  console.log(id)
  console.log(status)

  const result = await ReciepieServices.ChangeRecipieStatusintodb(id, status)

  res.status(200).json({
    success: true,
    message: "Recipie Status Change successfully!",
    data: result,
  });

})

const changeRecipiePrimiumstatus = CatchAsync(async(req, res) => {

   

  const id = req.params.id
  const primiumStatus = req.body.status

  console.log(id, primiumStatus)

  const result = await ReciepieServices.ChangeRecipiePremiumStatusintodb(id, primiumStatus)

  res.status(200).json({
    success: true,
    message: "Recipie Premium Status Change successfully!",
    data: result,
  });

}) 

export const RecipeController = {
  AddRecipe,
  GetAllRecipe,
  GetSingleRecipe,
  UpdateRecipeData,
  DeleteRecipeData,
  GetUserRecipeData,
  userRecipieLike,
  adduserRecipeRating,
  changeRecipieStatus,
  changeRecipiePrimiumstatus,
  GetAllRecipeforAdmin
};
