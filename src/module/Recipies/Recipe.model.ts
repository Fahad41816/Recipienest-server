import { model, Schema, Types } from "mongoose";
import { TIngredient, TRating, TRecipe } from "./Recipie.interface";

const ingredientSchema = new Schema<TIngredient>({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  isGathered: { type: Boolean, default: false },
});

const ratingSchema = new Schema<TRating>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

 
const recipeSchema = new Schema<TRecipe>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: [ingredientSchema], required: true },
    instructions: { type: [String], required: true },
    cookingTime: { type: Number, required: true },
    image: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {type: String, enum: ['approval' , 'pending'],  default: 'approval'},
    ratings: { type: [ratingSchema], default: [] },
    tags: { type: [String], required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    avgRating: { type: Number, default: 0 },
    upvotes: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
    downvotes: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
    isDeleted: {type: Boolean, default: false },
    isPremiumContent: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const RecipeModel = model("Recipe", recipeSchema);
