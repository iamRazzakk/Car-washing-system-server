import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import config from "../config";
import AppError from "../error/AppError";
import { TUserRole } from "../modules/user/singUser.interface";
import catchAsync from "../utils/catchAsync";
import { UserModel } from "../modules/user/singUser.model";

const auth = (...requiredUserRole: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.replace("Bearer ", "");

        // Check if token is present
        if (!token) {
            return next(new AppError(httpStatus.UNAUTHORIZED, "Bearer token is required"));
        }

        // Verify the token
        const decoded = jwt.verify(token, config.JWT_SECRET as string) as JwtPayload;
        const { email, role } = decoded;

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return next(new AppError(httpStatus.UNAUTHORIZED, "You are not authorized"));
        }

        // Check role authorization
        if (requiredUserRole.length > 0 && !requiredUserRole.includes(role)) {
            return next(new AppError(httpStatus.FORBIDDEN, "You have no access to this route"));
        }

        // Attach decoded user to request
        req.user = decoded;

        next();
    });
};

export default auth;
