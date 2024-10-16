/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import config from "../app/config";
import jwt from "jsonwebtoken";
import AppError from "../Error/AppError";
import CatchAsync from "../utils/catchAsync";

const auth = (...RequiredRoles: string[]) => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers);

    const Token = req.headers.authorization;

    if (!Token) {
      throw new AppError(401, "You are not authorized!");
    }

    const decoded = jwt.verify(Token, config.jwtSecret as string,);

    console.log(decoded)

    const { role }: any = decoded;
    console.log(role)
    if (RequiredRoles && !RequiredRoles.includes(role)) {
      throw new AppError(401, "You have no access to this route");
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.user = decoded;
    next();
  });
};

export default auth;
