import JWT from "jsonwebtoken";
import config from "../app/config";
import { TUser } from "../module/users/user.interface";

const CreateToken = async (userData: Partial<TUser>) => {
  const token = JWT.sign(userData, config.jwtSecret as string, {
    expiresIn: "24h",
  });

  return token;
};

export default CreateToken;
