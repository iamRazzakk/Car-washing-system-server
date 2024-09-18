import AppError from "../../error/AppError";
import { TSingUpUser } from "./singUser.interface"
import { UserModel } from "./singUser.model"

// Create a new user
const createUser = async (payload: TSingUpUser) => {
    try {
        const user = await UserModel.create(payload);
        return user;
    } catch (error) {
        console.error('Failed to create user:', error);
        throw new Error('Failed to create user');
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
const updateUserProfile = async (userId: string, profileData: Partial<TSingUpUser>) => {
    const { name, phone, address, profilePic } = profileData;

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            name,
            phone,
            address,
            profilePic: profilePic || undefined,  // Update profilePic only if provided
        },
        { new: true }
    );

    if (!updatedUser) {
        throw new Error("User not found");
    }

    return updatedUser;
};
const updatePassword = async (userId: string, oldPassword: string, newPassword: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    // Check if the old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new Error("Old password is incorrect");
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.passwordCreatedAt = new Date();
    await user.save();

    return user;
};

export const UserService = {
    createUser,
    getAllUser,
    updateUserRole,
    updateUserProfile
}