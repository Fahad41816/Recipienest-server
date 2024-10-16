import { Types } from "mongoose";

export interface TUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  image: string; 
  address: string;   
  gender: 'Male' | 'Female' ; 
  role: 'admin' | 'user';
  bio: string;
  status: 'in-progress' | 'pending' | 'deleted' 
  followers: Types.ObjectId[];  // Array of user IDs
  following: Types.ObjectId[];  // Array of user IDs
  isPremiumMember : boolean
}

export interface TLoginData {
    email: string;
    password: string
}

 