import { Types } from "mongoose";

export interface TIngredient {
    name: string;
    quantity: string;
    isGathered?: boolean;   
  }
  
  export interface TRating {
    user: Types.ObjectId;  
    rating: number;
  }

 
  
  export interface TRecipe {
    _id: string;   
    title: string;
    description: string;
    ingredients: TIngredient[];
    instructions: string[];
    cookingTime: number;  
    image: string;  
    user: Types.ObjectId;  
    ratings: TRating[];
    comments: Types.ObjectId[];
    avgRating: number; 
    status: 'approval' | 'pending';
    upvotes: [];   
    downvotes: [];   
    tags: string[];
    isPremiumContent: boolean; 
    isDeleted: boolean;
  }

  export interface TUpdateRecipe {
    _id?: string;   
    title?: string;
    description?: string;
    ingredients?: TIngredient[];
    instructions?: string[];
    cookingTime?: number;  
    image?: string;  
    user?: Types.ObjectId;   
    ratings?: TRating[];
    comments: Comment[];
    avgRating?: number;
    upvotes?: [];   
    downvotes?: [];   
    isPremiumContent?: boolean; 
  }
  