import CatchAsync from "../../utils/catchAsync";
import { userServices } from "./user.services";
import CreateToken from "../../utils/CreateToken";
import bcrypt from "bcrypt";
import { Request, Response } from "express"; 
import jwt from 'jsonwebtoken'
import config from "../../app/config";
import AppError from "../../Error/AppError";
import { UserModel } from "./user.model";

const userRegistration = CatchAsync(async (req: any, res: any) => {
  const UserData = req.body;

  const Result = await userServices.createUserIntoDb(UserData);

  if (Result) {
    return res.status(200).json({
      success: false,
      message: "User Register Successfully!",
    });
  }
});

const UserLogin = CatchAsync(async (req: any, res: any) => {
  const userData = req.body;

  const userExists : any = await userServices.LoginUser(userData);

  if (!userExists) {
    return res.status(400).json({
      success: false,
      message: "Invalid Password or Email!",
    });
  }

  if(userExists.status == 'Block'){
    return res.status(400).json({
      success: false,
      message: "ops! Your Account is Block! Contact With support",
    });
  }



  const IsPasswordMatch = await bcrypt.compare(
    userData.password,
    userExists.password
  );

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
    isPremiumMember : userExists.isPremiumMember
  };

  const Token = await CreateToken(TokenCreateData);

  return res.status(200).json({
    success: true,
    message: "User Login Successfully!",
    data: `Bearer ${Token}`,
  });
});

const CheckUser = CatchAsync(async (req: any, res) => {
  const userEmail = req?.user.email;

  const user = await userServices.CheckUserInDb(userEmail);

  res.status(200).json({
    success: true,
    message: "User Retrive Successfully!",
    data: user,
  });
});

const updateUserData = CatchAsync(async (req: any, res: Response) => {

  const id : string = req.user._id;

  const UserData = req.body;

  const Result = await userServices.updateUserinDb(id, UserData);

  res.status(200).json({
    success: true,
    message: "User updated Successfully!",
    data: Result,
  });
});

const userFollowerManage = CatchAsync(async (req, res) => {
  const id = req.params.id;

  const followerid = req.body.followerid;

  const folowType = req.body.followType;

  const Result = await userServices.AddUserFollower(id, followerid, folowType);

  res.status(200).json({
    success: true,
    message: "User updated Successfully!",
    data: Result,
  });
});

const updateUerStatus = CatchAsync(async (req, res) => {
  const id = req.body.id;
  const status = req.body.status;

  const result = await userServices.UserStatusChangeIntoDb(id, status);

  res.status(200).json({
    success: true,
    message: "User status updated Successfully!",
    data: result,
  });
});

const deleteUser = CatchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await userServices.deleteUserIntoDb(id);

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully!",
    data: result,
  });
});

const GetAllUsers = CatchAsync(async (req, res) => {
   

  const result = await userServices.GetAllUsersIntoDb();

  res.status(200).json({
    success: true,
    message: "User data retrive Successfully!",
    data: result,
  });
});

const ChangeUserRole = CatchAsync(async(req, res) => {

  const id = req.body.id
  const role = req.body.role

  const result = await userServices.changeUserRoleIntoDb(id, role) 

  res.status(200).json({
    success: true,
    message: "User Role change Successfully!",
    data: result,
  });

})

const Changeusermembership = CatchAsync(async(req, res) => {

  const id : string = req.params.id
 
  const result = await userServices.changeUserMembership(id) 

  res.status(200).json({
    success: true,
    message: "ChangeUser membership Successfully!",
    data: result,
  });

})

const ForGetPassEmailSend = CatchAsync(async(req, res)=>{

     const email = req.body.email

     
     const result = await userServices.sendEmailforForgetPass(email)
     
     
      res.status(200).json({
        success: true,
        message: "Reset Link Genareted Successfully!",  
      });
      
})

const passwordChange = CatchAsync(async(req, res) =>{

  
  const AuthToken : any = req.headers.authorization

  console.log('authtoken' ,AuthToken)

  if(!AuthToken){
    throw new AppError(402, "you are not Authrorize user","")
  }

  const passwordData = req.body
 

  console.log(passwordData)

  const AuthData = jwt.verify(AuthToken, config.jwtSecret as string)
 
  if(!AuthData){

    throw new AppError(402, "you are not Authrorize user","")

  }

  const result = await userServices.changePasswordIntoDb(AuthData,passwordData)


  res.status(200).json({
    success: true,
    message: "Password Reset Successfully!",  
  });

  
})

const changeUserPasswordWithOldPassword = CatchAsync(async(req: any, res: any) => {

  const userEmail = req.params.email
  const PasswordData : any = req.body

  const IsUserExists = await UserModel.findOne({ email: userEmail });

  

  if (!IsUserExists) { 
    return res.status(404).json({
      success: true,
      message: "this user not Exists!",  
    });
  }

  const IsOldPassMatch = await bcrypt.compare(PasswordData.oldPassword, IsUserExists.password)
 
  if(!IsOldPassMatch){
    return res.status(402).json({
      success: true,
      message: "old Passwrd Not Match!",  
    });
    
  }

  const HashPass = await bcrypt.hash(PasswordData.newPassword, config.salt);

  const  result = await userServices.changePasswordWithOldPassInDb(userEmail, HashPass)

  res.status(200).json({
    success: true,
    message: "Password Change Successfully!",  
  });


})

export const userController = {
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
