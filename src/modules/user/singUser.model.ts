import { Schema, model } from "mongoose";
import { TUser } from "./singUser.interface";
import bcrypt from "bcrypt";
const userSchema = new Schema<TUser>({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: { type: String, required: [true, "Email is required"], unique: true, trim: true },
    password: { type: String, required: [true, "Passowrd is required"], select: false, trim: true },
    phone: { type: String, required: [true, "Phone number is required"], trim: true, unique: true },
    role: { type: String, enum: ["admin", "user"], required: [true, "Role i s required"], trim: true },
    address: { type: String, required: true },
    passwordCreatedAt: {
        type: Date,
        trim: true,
    },
}, { timestamps: true });



userSchema.pre("save", async function (next) {
    try {
        const user = this;
        if (user.isModified("password")) {
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);

            // Set the hashed password
            user.password = hashedPassword;
        }
        next();
    } catch (error: any) {
        next(error);
    }
});



export const UserModel = model<TUser>("user", userSchema);