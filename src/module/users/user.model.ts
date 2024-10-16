import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../app/config";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Email must be unique
    password: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"]},
    bio: {type: String},
    isPremiumMember : {type: Boolean, default: false},
    role: { type: String, enum: ["admin", "user"] },
    status: { type: String, enum: ["in-progress", "pending", "deleted"], default: 'in-progress' },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this; 
  const PassHash = await bcrypt.hash(user.password, config.salt); 
  user.password = PassHash; 
  next();
});
 

export const UserModel = model("User", userSchema);
