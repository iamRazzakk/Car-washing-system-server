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
        const token = req.headers.authorization;
        // console.log("Authorization Header:", token)

        // Check if token is present
        if (!token || !token.startsWith("Bearer ")) {
            // console.log("Error: No token found or incorrect format");
            return next(new AppError(httpStatus.UNAUTHORIZED, "Bearer token is required"));
        }
        const extractedToken = token.replace("Bearer ", "");
        // console.log("Extracted Token:", extractedToken);

        try {
            // Verify the token
            const decoded = jwt.verify(extractedToken, config.JWT_SECRET as string) as JwtPayload;
            // console.log("Decoded Token:", decoded);

            const { email, role } = decoded;

            // Find user by email
            const user = await UserModel.findOne({ email });
            // console.log("User Found:", user);

            if (!user) {
                return next(new AppError(httpStatus.UNAUTHORIZED, "You are not authorized"));
            }

            // Check role authorization
            if (requiredUserRole.length > 0 && !requiredUserRole.includes(role)) {
                return next(new AppError(httpStatus.FORBIDDEN, "You have no access to this route"));
            }

            // Attach decoded user to request
            req.user = decoded;
            // console.log("User attached to request:", req.user);

            next();
        } catch (error) {
            return next(new AppError(httpStatus.UNAUTHORIZED, "Invalid token"));
        }
    });
};

export default auth;
