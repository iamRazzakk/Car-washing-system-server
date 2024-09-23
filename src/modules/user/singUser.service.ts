import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TSingUpUser } from "./singUser.interface"
import { UserModel } from "./singUser.model"

// Create a new user
const createUser = async (userData: TSingUpUser) => {
    try {
        // Create the user
        const newUser = await UserModel.create(userData);
        return newUser;
    } catch (error) {
        console.error('Failed to create user:', error);
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create user");
    }
};

// Get all users
const getAllUser = async () => {
    try {
        const users = await UserModel.find();
        return users;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        throw new Error('Failed to fetch users');
    }
};

const updateUserRole = async (userId: string, role: 'USER' | 'ADMIN') => {
    try {
        if (!['USER', 'ADMIN'].includes(role)) {
            throw new AppError(400, 'Invalid role');
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            throw new AppError(404, 'User not found');
        }

        user.role = role;
        await user.save();
        return user;
    } catch (error) {
        console.error('Failed to update user role:', error);
        throw new AppError(500, 'Failed to update user role');
    }
};

export const UserService = {
    createUser,
    getAllUser,
    updateUserRole
}