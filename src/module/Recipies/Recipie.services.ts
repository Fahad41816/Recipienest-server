import { RecipeModel } from "./Recipe.model";
import { TRecipe, TUpdateRecipe } from "./Recipie.interface";

const AddRecipeIntodb = async (Recipie: TRecipe) => {
  const Result: any = await RecipeModel.create(Recipie);

  return Result;
};
const GetAllRecipeIntoDb = async (
  page: number,
  searchTerm: string ,
  filters: { Rating?: string | number; timeDuration?: string | number } = {},
  isPremiumMember: any
) => {
  // Default page and pagination setup
  const Page = Number(page) || 1;
  const Limit = 6; // Number of recipes per page
  const Skip = (Page - 1) * Limit;

  // Destructure filter values for easier usage
  const { Rating, timeDuration } = filters;

  // Build a dynamic search query with added filters
  const searchQuery: any = {
    ...(searchTerm && {
      $or: [
        { title: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for title
        { description: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for description
        { "ingredients.name": { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for ingredient names
        { tags: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for tags
      ],
    }),
    ...(Rating ? { avgRating: {} } : {}),
    ...(timeDuration ? { cookingTime: {} } : {}), 
    status: "approval", 
  };

  // Apply the rating filters (if provided)
  if (Rating) {
    const ratingNum = Number(Rating);
    searchQuery.avgRating.$gte = ratingNum; // Ratings greater than or equal to the specified value
    searchQuery.avgRating.$lt = ratingNum + 1; // Ratings less than the next integer (e.g., 4.0 <= rating < 5.0)
  }
  if (timeDuration) searchQuery.cookingTime.$lte = timeDuration;
  if (isPremiumMember !== "false") {
    // Premium members can see both approved and premium recipes
    searchQuery.$or = [
      { status: "approval" }, // Show approved recipes
      { isPremiumContent: true }, // Show premium posts as well
    ];
  } else {
    // Non-premium members can only see approved and non-premium recipes
    searchQuery.isPremiumContent = false; // Exclude premium posts
  }
  
 

  try {
    // Fetch paginated and filtered results
    const Result = await RecipeModel.find(searchQuery).skip(Skip).limit(Limit);
  
    return Result;
  } catch (error) {
    console.error(
      "Error fetching recipes with filters, search, and pagination:",
      error
    );
    throw error;
  }
};

const GetAllRecipeforAdminIntoDb = async() => {

  const result = await RecipeModel.find()

  return result


}

const GetSingleRecipeIntoDb = async (id: string) => {
  const recipe = await RecipeModel.findById(id)
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  return recipe;
};

const GetUserRecipeData = async (user: string) => {
  const Result = await RecipeModel.find({ user });

  return Result;
};

const UpdateRecipeDataIntoDb = async (
  id: string,
  updateData: TUpdateRecipe
) => {
  const Result = await RecipeModel.findByIdAndUpdate(id, updateData);

  return Result;
};

const updaterecipieLikeintoDb = async (id: string, voteData: any) => {
  console.log(id, voteData);

  const updateQuery =
    voteData.vote === "upVote"
      ? {
          $push: { upvotes: voteData.user },
          $pull: { downvotes: voteData.user },
        }
      : {
          $pull: { upvotes: voteData.user },
          $push: { downvotes: voteData.user },
        };

  // Perform both upvote and downvote updates in a single query
  const updatedRecipe = await RecipeModel.findByIdAndUpdate(
    id,
    updateQuery,
    { new: true } // Return the updated document
  );

  return updatedRecipe;
};

const AddRecipeRatingIntoDb = async (id: string, ratingData: any) => {
  // Step 1: Find the recipe by ID and push the new rating into the ratings array
  const recipe = await RecipeModel.findByIdAndUpdate(
    id,
    { $push: { ratings: ratingData } },
    { new: true } // Return the updated recipe
  );

  if (!recipe) {
    throw new Error("Recipe not found");
  }

  // Step 2: Calculate the new average rating
  const totalRatings = recipe.ratings.length;
  const sumRatings = recipe.ratings.reduce((acc: number, curr: any) => acc + curr.rating, 0);
  const avgRating = sumRatings / totalRatings;

  // Step 3: Update the avgRating field in the recipe
  recipe.avgRating = avgRating;

  // Step 4: Save the updated recipe with the new average rating
  const updatedRecipe = await recipe.save();

  return updatedRecipe;
};


const DeleteRecipeDataIntoDb = async (id: string) => {
  // todo
  // update the data status cannot delete directly

  const Result = await RecipeModel.findByIdAndDelete(id);

  return Result;
};

const ChangeRecipieStatusintodb = async (id: string, status: string) => {

  console.log(id, status)

  const result = await RecipeModel.findByIdAndUpdate(id, { status });

  console.log(result)

  return result;
};

const ChangeRecipiePremiumStatusintodb = async(id: string, premium: boolean) => {

  const result = await RecipeModel.findByIdAndUpdate(id, { 
    isPremiumContent: premium });

  return result;

}

export const ReciepieServices = {
  AddRecipeIntodb,
  GetAllRecipeIntoDb,
  GetSingleRecipeIntoDb,
  UpdateRecipeDataIntoDb,
  DeleteRecipeDataIntoDb,
  GetUserRecipeData,
  updaterecipieLikeintoDb,
  AddRecipeRatingIntoDb,
  ChangeRecipieStatusintodb,
  ChangeRecipiePremiumStatusintodb,
  GetAllRecipeforAdminIntoDb
};
