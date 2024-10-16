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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeController = void 0;
const Recipie_services_1 = require("./Recipie.services");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const AddRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Recipie = req.body;
    const result = yield Recipie_services_1.ReciepieServices.AddRecipeIntodb(Recipie);
    res.status(200).json({
        success: true,
        message: "Recipie Data created successfully!",
        data: result,
    });
}));
const GetUserRecipeData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const Result = yield Recipie_services_1.ReciepieServices.GetUserRecipeData(id);
    res.status(200).json({
        success: true,
        message: "Recipie Data retrieved successfully!",
        data: Result,
    });
}));
const GetAllRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, searchTerm, Rating, timeDuration, isPremiumMember } = req.query;
    console.log(Rating);
    console.log(timeDuration);
    console.log(isPremiumMember);
    const filters = {
        Rating: Rating,
        timeDuration: timeDuration,
    };
    console.log("page", page);
    const result = yield Recipie_services_1.ReciepieServices.GetAllRecipeIntoDb(page, searchTerm, filters, isPremiumMember);
    res.status(200).json({
        success: true,
        message: "Recipie Data retrieved successfully!",
        data: result,
    });
}));
const GetAllRecipeforAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Recipie_services_1.ReciepieServices.GetAllRecipeforAdminIntoDb();
    res.status(200).json({
        success: true,
        message: "admin Recipie Data retrieved successfully!",
        data: result,
    });
}));
const GetSingleRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield Recipie_services_1.ReciepieServices.GetSingleRecipeIntoDb(id);
    res.status(200).json({
        success: true,
        message: "Recipie Data retrieved successfully!",
        data: result,
    });
}));
const UpdateRecipeData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const UpdatedData = req.body;
    const result = yield Recipie_services_1.ReciepieServices.UpdateRecipeDataIntoDb(id, UpdatedData);
    res.status(200).json({
        success: true,
        message: "Recipie Updated successfully!",
        data: result,
    });
}));
const DeleteRecipeData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const RecipeId = req.params.id;
    const result = Recipie_services_1.ReciepieServices.DeleteRecipeDataIntoDb(RecipeId);
    res.status(200).json({
        success: true,
        message: "Recipie Deleted successfully!",
        data: result,
    });
}));
const userRecipieLike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const votedata = req.body;
    const result = yield Recipie_services_1.ReciepieServices.updaterecipieLikeintoDb(id, votedata);
    res.status(200).json({
        success: true,
        message: "Recipie Voted successfully!",
        data: result,
    });
}));
const adduserRecipeRating = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const ratting = req.body;
    const result = yield Recipie_services_1.ReciepieServices.AddRecipeRatingIntoDb(id, ratting);
    res.status(200).json({
        success: true,
        message: "Recipie Ratting successfully!",
        data: result,
    });
}));
const changeRecipieStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const status = req.body.status;
    console.log(id);
    console.log(status);
    const result = yield Recipie_services_1.ReciepieServices.ChangeRecipieStatusintodb(id, status);
    res.status(200).json({
        success: true,
        message: "Recipie Status Change successfully!",
        data: result,
    });
}));
const changeRecipiePrimiumstatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const primiumStatus = req.body.status;
    console.log(id, primiumStatus);
    const result = yield Recipie_services_1.ReciepieServices.ChangeRecipiePremiumStatusintodb(id, primiumStatus);
    res.status(200).json({
        success: true,
        message: "Recipie Premium Status Change successfully!",
        data: result,
    });
}));
exports.RecipeController = {
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
