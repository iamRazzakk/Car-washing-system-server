import bcrypt from 'bcrypt';
import { UserModel } from "../user/singUser.model";
import { TUserLogin } from "./auth.interface";
import config from '../../config';
import jwt from "jsonwebtoken"

const LoginUser = async (loginData: TUserLogin) => {
    const { email, password } = loginData;
    const user = await UserModel.findOne({ email }).select("+password")
    // if don't match password or email
    if (!user) throw new Error("Invalid email or password");

    // verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");
    const token = jwt.sign(
        { _id: user._id, email: user.email, role: user.role },
        config.JWT_SECRET,
        { expiresIn: config.JWT_E_IN }
    );
    return { user, token }
}
export const AuthService = {
    LoginUser
}