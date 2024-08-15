import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config";
import { TUserRole } from "../modules/user/singUser.interface";
import { UserModel } from "../modules/user/singUser.model";
const auth = (...requiredUserRole: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization
        if (!token || !token.startsWith("Bearer ")) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'Your are not Authorized!');
        }
        const tokenValue = token.split(" ")[1]
        const decoded = jwt.verify(tokenValue, config.JWT_SECRET as string) as { role: string }
        const { email, role, iat } = decoded;
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
        }
        if (requiredUserRole && !requiredUserRole.includes(role)) {
            throw new AppError(
                httpStatus.FORBIDDEN,
                "You have no access to this route",
            );
        }
        req.user = decoded as JwtPayload;
        next();
    });
};

export default auth;
