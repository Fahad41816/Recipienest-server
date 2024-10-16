"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeModel = void 0;
const mongoose_1 = require("mongoose");
const ingredientSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    quantity: { type: String, required: true },
    isGathered: { type: Boolean, default: false },
});
const ratingSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
});
const recipeSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: [ingredientSchema], required: true },
    instructions: { type: [String], required: true },
    cookingTime: { type: Number, required: true },
    image: { type: String },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ['approval', 'pending'], default: 'approval' },
    ratings: { type: [ratingSchema], default: [] },
    tags: { type: [String], required: true },
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Comment" }],
    avgRating: { type: Number, default: 0 },
    upvotes: { type: [mongoose_1.Schema.Types.ObjectId], ref: "User", default: [] },
    downvotes: { type: [mongoose_1.Schema.Types.ObjectId], ref: "User", default: [] },
    isDeleted: { type: Boolean, default: false },
    isPremiumContent: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.RecipeModel = (0, mongoose_1.model)("Recipe", recipeSchema);
