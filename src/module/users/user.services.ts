import sentForgetPassLink from "../../Email/sentForgetPassLink";
import { TLoginData, TUser } from "./user.interface";
import { UserModel } from "./user.model";
import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import AppError from "../../Error/AppError";
import config from "../../app/config";
import bcrypt from "bcrypt";

const GetAllUsersIntoDb = async () => {
  const Result = await UserModel.find();

  return Result;
};

const UserStatusChangeIntoDb = async (id: string, status: string) => {
  const result = await UserModel.findByIdAndUpdate(id, { status: status });

  return result;
};

const deleteUserIntoDb = async (id: string) => {
  const result = await UserModel.findByIdAndDelete(id);

  console.log(result);

  return result;
};

const createUserIntoDb = async (userData: TUser) => {
  userData.role = "user";

  const result = await UserModel.create(userData);

  return result;
};

const LoginUser = async (userData: TLoginData) => {
  const FindUserData = await UserModel.findOne({ email: userData.email });

  return FindUserData;
};

const CheckUserInDb = async (email: string) => {
  const User = await UserModel.findOne({ email });

  console.log(User);

  return User;
};

const updateUserinDb = async (id: string, userData: Partial<TUser>) => {
  console.log(id);
  console.log(userData);

  const Result = await UserModel.findByIdAndUpdate(id, userData);

  console.log(Result);

  return Result;
};

const AddUserFollower = async (
  id: string,
  followerId: string,
  followType: string
) => {
  const session = await mongoose.startSession(); // Start the session
  session.startTransaction(); // Start the transaction

  try {
    let result, following;

    if (followType === "follow") {
      // Execute both updates inside the transaction
      result = await UserModel.findByIdAndUpdate(
        id,
        { $push: { followers: followerId } },
        { session }
      );
      following = await UserModel.findByIdAndUpdate(
        followerId,
        { $push: { following: id } },
        { session }
      );
    } else {
      // Unfollow logic
      result = await UserModel.findByIdAndUpdate(
        id,
        { $pull: { followers: followerId } },
        { session }
      );
      following = await UserModel.findByIdAndUpdate(
        followerId,
        { $pull: { following: id } },
        { session }
      );
    }

    // Commit the transaction if all operations succeed
    await session.commitTransaction();
    session.endSession(); // End the session

    return result;
  } catch (error) {
    // If any error occurs, abort the transaction
    await session.abortTransaction();
    session.endSession(); // End the session
    console.error("Error in AddUserFollower with transaction:", error);
    throw new Error(
      "Error in updating follower/following data with transaction."
    );
  }
};

const changeUserRoleIntoDb = async (id: string, role: string) => {
  const result = await UserModel.findByIdAndUpdate(id, { role });

  return result;
};

const changeUserMembership = async (id: string) => {
  console.log("id", id);

  const result = await UserModel.findByIdAndUpdate(id, {
    isPremiumMember: true,
  });

  return result;
};

const sendEmailforForgetPass = async (email: string) => {
  const IsUseExists: any = await UserModel.findOne({ email: email });

  console.log(IsUseExists);

  if (!IsUseExists) {
    throw new AppError(404, "this user not found", "");
  }

  if (IsUseExists?.status == "Block") {
    throw new AppError(404, "this user now Block", "");
  }

  const jwtPayload = {
    userid: IsUseExists._id,
    role: IsUseExists.role,
    email: email,
  };

  const token = JWT.sign(jwtPayload, config.jwtSecret as string, {
    expiresIn: "10m",
  });

  const resetLink = `https://recipenextclient.vercel.app/forget/${IsUseExists._id}/${token}`;

  const Result = await sentForgetPassLink(email, resetLink);

  return Result;
};

const changePasswordIntoDb = async (AuthData: any, userData: any) => {
  if (AuthData.userid !== userData.id) {
    throw new AppError(401, "you are not Authoriz User!");
  }

  const HashPass = await bcrypt.hash(userData.password, config.salt);

  const result = await UserModel.findByIdAndUpdate(userData.id, {
    password: HashPass,
  });

  return result;
};

const changePasswordWithOldPassInDb = async (
  email: string,
  password: any
) => {
  const Result = await UserModel.updateOne(
    { email: email },
    { $set: { password: password } }
  );

  return Result;
};

export const userServices = {
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
