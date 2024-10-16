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
exports.userServices = void 0;
const sentForgetPassLink_1 = __importDefault(require("../../Email/sentForgetPassLink"));
const user_model_1 = require("./user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const config_1 = __importDefault(require("../../app/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const GetAllUsersIntoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const Result = yield user_model_1.UserModel.find();
    return Result;
});
const UserStatusChangeIntoDb = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findByIdAndUpdate(id, { status: status });
    return result;
});
const deleteUserIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findByIdAndDelete(id);
    console.log(result);
    return result;
});
const createUserIntoDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    userData.role = "user";
    const result = yield user_model_1.UserModel.create(userData);
    return result;
});
const LoginUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const FindUserData = yield user_model_1.UserModel.findOne({ email: userData.email });
    return FindUserData;
});
const CheckUserInDb = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const User = yield user_model_1.UserModel.findOne({ email });
    console.log(User);
    return User;
});
const updateUserinDb = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    console.log(userData);
    const Result = yield user_model_1.UserModel.findByIdAndUpdate(id, userData);
    console.log(Result);
    return Result;
});
const AddUserFollower = (id, followerId, followType) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession(); // Start the session
    session.startTransaction(); // Start the transaction
    try {
        let result, following;
        if (followType === "follow") {
            // Execute both updates inside the transaction
            result = yield user_model_1.UserModel.findByIdAndUpdate(id, { $push: { followers: followerId } }, { session });
            following = yield user_model_1.UserModel.findByIdAndUpdate(followerId, { $push: { following: id } }, { session });
        }
        else {
            // Unfollow logic
            result = yield user_model_1.UserModel.findByIdAndUpdate(id, { $pull: { followers: followerId } }, { session });
            following = yield user_model_1.UserModel.findByIdAndUpdate(followerId, { $pull: { following: id } }, { session });
        }
        // Commit the transaction if all operations succeed
        yield session.commitTransaction();
        session.endSession(); // End the session
        return result;
    }
    catch (error) {
        // If any error occurs, abort the transaction
        yield session.abortTransaction();
        session.endSession(); // End the session
        console.error("Error in AddUserFollower with transaction:", error);
        throw new Error("Error in updating follower/following data with transaction.");
    }
});
const changeUserRoleIntoDb = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findByIdAndUpdate(id, { role });
    return result;
});
const changeUserMembership = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("id", id);
    const result = yield user_model_1.UserModel.findByIdAndUpdate(id, {
        isPremiumMember: true,
    });
    return result;
});
const sendEmailforForgetPass = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const IsUseExists = yield user_model_1.UserModel.findOne({ email: email });
    console.log(IsUseExists);
    if (!IsUseExists) {
        throw new AppError_1.default(404, "this user not found", "");
    }
    if ((IsUseExists === null || IsUseExists === void 0 ? void 0 : IsUseExists.status) == "Block") {
        throw new AppError_1.default(404, "this user now Block", "");
    }
    const jwtPayload = {
        userid: IsUseExists._id,
        role: IsUseExists.role,
        email: email,
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwtSecret, {
        expiresIn: "10m",
    });
    const resetLink = `https://recipenextclient.vercel.app/forget/${IsUseExists._id}/${token}`;
    const Result = yield (0, sentForgetPassLink_1.default)(email, resetLink);
    return Result;
});
const changePasswordIntoDb = (AuthData, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (AuthData.userid !== userData.id) {
        throw new AppError_1.default(401, "you are not Authoriz User!");
    }
    const HashPass = yield bcrypt_1.default.hash(userData.password, config_1.default.salt);
    const result = yield user_model_1.UserModel.findByIdAndUpdate(userData.id, {
        password: HashPass,
    });
    return result;
});
const changePasswordWithOldPassInDb = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const Result = yield user_model_1.UserModel.updateOne({ email: email }, { $set: { password: password } });
    return Result;
});
exports.userServices = {
    createUserIntoDb,
    LoginUser,
    CheckUserInDb,
    updateUserinDb,
    AddUserFollower,
    GetAllUsersIntoDb,
    UserStatusChangeIntoDb,
    deleteUserIntoDb,
    changeUserRoleIntoDb,
    changeUserMembership,
    sendEmailforForgetPass,
    changePasswordIntoDb,
    changePasswordWithOldPassInDb,
};
