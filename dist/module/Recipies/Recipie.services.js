"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReciepieServices = void 0;
const Recipe_model_1 = require("./Recipe.model");
const AddRecipeIntodb = (Recipie) => __awaiter(void 0, void 0, void 0, function* () {
    const Result = yield Recipe_model_1.RecipeModel.create(Recipie);
    return Result;
});
const GetAllRecipeIntoDb = (page_1, searchTerm_1, ...args_1) => __awaiter(void 0, [page_1, searchTerm_1, ...args_1], void 0, function* (page, searchTerm, filters = {}, isPremiumMember) {
    // Default page and pagination setup
    const Page = Number(page) || 1;
    const Limit = 6; // Number of recipes per page
    const Skip = (Page - 1) * Limit;
    // Destructure filter values for easier usage
    const { Rating, timeDuration } = filters;
    // Build a dynamic search query with added filters
    const searchQuery = Object.assign(Object.assign(Object.assign(Object.assign({}, (searchTerm && {
        $or: [
            { title: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for title
            { description: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for description
            { "ingredients.name": { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for ingredient names
            { tags: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for tags
        ],
    })), (Rating ? { avgRating: {} } : {})), (timeDuration ? { cookingTime: {} } : {})), { status: "approval" });
    // Apply the rating filters (if provided)
    if (Rating) {
        const ratingNum = Number(Rating);
        searchQuery.avgRating.$gte = ratingNum; // Ratings greater than or equal to the specified value
        searchQuery.avgRating.$lt = ratingNum + 1; // Ratings less than the next integer (e.g., 4.0 <= rating < 5.0)
    }
    if (timeDuration)
        searchQuery.cookingTime.$lte = timeDuration;
    if (isPremiumMember !== "false") {
        // Premium members can see both approved and premium recipes
        searchQuery.$or = [
            { status: "approval" }, // Show approved recipes
            { isPremiumContent: true }, // Show premium posts as well
        ];
    }
    else {
        // Non-premium members can only see approved and non-premium recipes
        searchQuery.isPremiumContent = false; // Exclude premium posts
    }
    try {
        // Fetch paginated and filtered results
        const Result = yield Recipe_model_1.RecipeModel.find(searchQuery).skip(Skip).limit(Limit);
        return Result;
    }
    catch (error) {
        console.error("Error fetching recipes with filters, search, and pagination:", error);
        throw error;
    }
});
const GetAllRecipeforAdminIntoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Recipe_model_1.RecipeModel.find();
    return result;
});
const GetSingleRecipeIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield Recipe_model_1.RecipeModel.findById(id)
        .populate("user")
        .populate({
        path: "comments",
        populate: {
            path: "user",
        },
    });
    return recipe;
});
const GetUserRecipeData = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const Result = yield Recipe_model_1.RecipeModel.find({ user });
    return Result;
});
const UpdateRecipeDataIntoDb = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const Result = yield Recipe_model_1.RecipeModel.findByIdAndUpdate(id, updateData);
    return Result;
});
const updaterecipieLikeintoDb = (id, voteData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, voteData);
    const updateQuery = voteData.vote === "upVote"
        ? {
            $push: { upvotes: voteData.user },
            $pull: { downvotes: voteData.user },
        }
        : {
            $pull: { upvotes: voteData.user },
            $push: { downvotes: voteData.user },
        };
    // Perform both upvote and downvote updates in a single query
    const updatedRecipe = yield Recipe_model_1.RecipeModel.findByIdAndUpdate(id, updateQuery, { new: true } // Return the updated document
    );
    return updatedRecipe;
});
const AddRecipeRatingIntoDb = (id, ratingData) => __awaiter(void 0, void 0, void 0, function* () {
    // Step 1: Find the recipe by ID and push the new rating into the ratings array
    const recipe = yield Recipe_model_1.RecipeModel.findByIdAndUpdate(id, { $push: { ratings: ratingData } }, { new: true } // Return the updated recipe
    );
    if (!recipe) {
        throw new Error("Recipe not found");
    }
    // Step 2: Calculate the new average rating
    const totalRatings = recipe.ratings.length;
    const sumRatings = recipe.ratings.reduce((acc, curr) => acc + curr.rating, 0);
    const avgRating = sumRatings / totalRatings;
    // Step 3: Update the avgRating field in the recipe
    recipe.avgRating = avgRating;
    // Step 4: Save the updated recipe with the new average rating
    const updatedRecipe = yield recipe.save();
    return updatedRecipe;
});
const DeleteRecipeDataIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // todo
    // update the data status cannot delete directly
    const Result = yield Recipe_model_1.RecipeModel.findByIdAndDelete(id);
    return Result;
});
const ChangeRecipieStatusintodb = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, status);
    const result = yield Recipe_model_1.RecipeModel.findByIdAndUpdate(id, { status });
    console.log(result);
    return result;
});
const ChangeRecipiePremiumStatusintodb = (id, premium) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Recipe_model_1.RecipeModel.findByIdAndUpdate(id, {
        isPremiumContent: premium
    });
    return result;
});
exports.ReciepieServices = {
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
