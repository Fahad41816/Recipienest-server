import { Types } from "mongoose";

export interface TComment{
    user: Types.ObjectId;
    recipie: Types.ObjectId;
    comment: string;
    date: string,
}