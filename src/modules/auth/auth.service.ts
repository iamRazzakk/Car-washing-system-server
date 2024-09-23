import bcrypt from "bcryptjs";
import { UserModel } from "../user/singUser.model";
import { TChangePassoword, TUserLogin } from "./auth.interface";
import config, { cloudinaryConfig } from "../../config";
import jwt from "jsonwebtoken";
const LoginUser = async (loginData: TUserLogin) => {
  const { email, password } = loginData;

  // Trim email to avoid issues with spaces
  const trimmedEmail = email.trim();

  const user = await UserModel.findOne({ email: trimmedEmail }).select(
    "+password"
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare the trimmed password
  const isMatch = await bcrypt.compare(password.trim(), user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const accessToken = jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    config.JWT_SECRET as string,
    { expiresIn: config.JWT_E_IN as string }
  );

  const refreshToken = jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    config.REFRESH_JWT_SECRET as string,
    { expiresIn: config.JWT_R_IN as string }
  );

  return { user, accessToken, refreshToken };
};

const passwordChangeIntoDB = async (payload: TChangePassoword) => {
  const { email, newPassword, oldPassword } = payload;

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("User does not exist");
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new Error("Old password is incorrect");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 12);

  await UserModel.findByIdAndUpdate(user._id, { password: hashedNewPassword }, { new: true });

  const updatedUser = await UserModel.findById(user._id);

return {
    success: true,
    message: "Password changed successfully",
    updatedUser: {
      _id: updatedUser._id !,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      address: updatedUser.address,
    },
  };
};


// todo upload img in cloudenary file 

const uploadAvatarToCloudinary = async (file: Express.Multer.File) => {
  try {
    const result = await cloudinaryConfig.uploader.upload(file.path, {
      folder: 'avatars',
      public_id: file.originalname.split('.')[0],
    });
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    throw new Error('Failed to upload image to Cloudinary: ' + error.message);
  }
};







const RefreshTokenService = async (refreshToken: string) => {
  try {
    const payload = jwt.verify(
      refreshToken,
      config.REFRESH_JWT_SECRET as string
    );
    const newAccessToken = jwt.sign(
      { _id: payload._id, email: payload.email, role: payload.role },
      config.JWT_SECRET as string,
      { expiresIn: config.JWT_E_IN as string }
    );
    console.log("New Access token", newAccessToken);

    return { accessToken: newAccessToken };
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};

export const AuthService = {
  LoginUser,
  passwordChangeIntoDB,
  uploadAvatarToCloudinary,
  RefreshTokenService,
};
