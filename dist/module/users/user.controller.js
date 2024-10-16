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
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_services_1 = require("./user.services");
const CreateToken_1 = __importDefault(require("../../utils/CreateToken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../app/config"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const user_model_1 = require("./user.model");
const userRegistration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserData = req.body;
    const Result = yield user_services_1.userServices.createUserIntoDb(UserData);
    if (Result) {
        return res.status(200).json({
            success: false,
            message: "User Register Successfully!",
        });
    }
}));
const UserLogin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const userExists = yield user_services_1.userServices.LoginUser(userData);
    if (userExists.status == 'Block') {
        return res.status(400).json({
            success: false,
            message: "ops! Your Account is Block! Contact With support",
        });
    }
    if (!userExists) {
        return res.status(400).json({
            success: false,
            message: "Invalid Password or Email!",
        });
    }
    const IsPasswordMatch = yield bcrypt_1.default.compare(userData.password, userExists.password);
    if (!IsPasswordMatch) {
        return res.status(400).json({
            success: false,
            message: "Invalid Password or Email!",
        });
    }
    const TokenCreateData = {
        _id: userExists._id,
        image: userExists.image,
        email: userExists.email,
        name: userExists.name,
        role: userExists.role,
        isPremiumMember: userExists.isPremiumMember
    };
    const Token = yield (0, CreateToken_1.default)(TokenCreateData);
    return res.status(200).json({
        success: true,
        message: "User Login Successfully!",
        data: `Bearer ${Token}`,
    });
}));
const CheckUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req === null || req === void 0 ? void 0 : req.user.email;
    const user = yield user_services_1.userServices.CheckUserInDb(userEmail);
    res.status(200).json({
        success: true,
        message: "User Retrive Successfully!",
        data: user,
    });
}));
const updateUserData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user._id;
    const UserData = req.body;
    const Result = yield user_services_1.userServices.updateUserinDb(id, UserData);
    res.status(200).json({
        success: true,
        message: "User updated Successfully!",
        data: Result,
    });
}));
const userFollowerManage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const followerid = req.body.followerid;
    const folowType = req.body.followType;
    const Result = yield user_services_1.userServices.AddUserFollower(id, followerid, folowType);
    res.status(200).json({
        success: true,
        message: "User updated Successfully!",
        data: Result,
    });
}));
const updateUerStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const status = req.body.status;
    const result = yield user_services_1.userServices.UserStatusChangeIntoDb(id, status);
    res.status(200).json({
        success: true,
        message: "User status updated Successfully!",
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_services_1.userServices.deleteUserIntoDb(id);
    res.status(200).json({
        success: true,
        message: "User Deleted Successfully!",
        data: result,
    });
}));
const GetAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.userServices.GetAllUsersIntoDb();
    res.status(200).json({
        success: true,
        message: "User data retrive Successfully!",
        data: result,
    });
}));
const ChangeUserRole = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const role = req.body.role;
    const result = yield user_services_1.userServices.changeUserRoleIntoDb(id, role);
    res.status(200).json({
        success: true,
        message: "User Role change Successfully!",
        data: result,
    });
}));
const Changeusermembership = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_services_1.userServices.changeUserMembership(id);
    res.status(200).json({
        success: true,
        message: "ChangeUser membership Successfully!",
        data: result,
    });
}));
const ForGetPassEmailSend = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const result = yield user_services_1.userServices.sendEmailforForgetPass(email);
    res.status(200).json({
        success: true,
        message: "Reset Link Genareted Successfully!",
    });
}));
const passwordChange = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const AuthToken = req.headers.authorization;
    console.log('authtoken', AuthToken);
    if (!AuthToken) {
        throw new AppError_1.default(402, "you are not Authrorize user", "");
    }
    const passwordData = req.body;
    console.log(passwordData);
    const AuthData = jsonwebtoken_1.default.verify(AuthToken, config_1.default.jwtSecret);
    if (!AuthData) {
        throw new AppError_1.default(402, "you are not Authrorize user", "");
    }
    const result = yield user_services_1.userServices.changePasswordIntoDb(AuthData, passwordData);
    res.status(200).json({
        success: true,
        message: "Password Reset Successfully!",
    });
}));
const changeUserPasswordWithOldPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.params.email;
    const PasswordData = req.body;
    const IsUserExists = yield user_model_1.UserModel.findOne({ email: userEmail });
    if (!IsUserExists) {
        return res.status(404).json({
            success: true,
            message: "this user not Exists!",
        });
    }
    const IsOldPassMatch = yield bcrypt_1.default.compare(PasswordData.oldPassword, IsUserExists.password);
    if (!IsOldPassMatch) {
        return res.status(402).json({
            success: true,
            message: "old Passwrd Not Match!",
        });
    }
    const HashPass = yield bcrypt_1.default.hash(PasswordData.newPassword, config_1.default.salt);
    const result = yield user_services_1.userServices.changePasswordWithOldPassInDb(userEmail, HashPass);
    res.status(200).json({
        success: true,
        message: "Password Change Successfully!",
    });
}));
exports.userController = {
    userRegistration,
    UserLogin,
    CheckUser,
    updateUserData,
    userFollowerManage,
    updateUerStatus,
    deleteUser,
    GetAllUsers,
    ChangeUserRole,
    Changeusermembership,
    ForGetPassEmailSend,
    passwordChange,
    changeUserPasswordWithOldPassword
};
