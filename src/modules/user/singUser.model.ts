import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { TSingUpUser } from "./singUser.interface";

const userSchema = new Schema<TSingUpUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Passowrd is required"],
      select: false,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default:"USER",
      trim: true,
    },
    address: { type: String, trim:true, required:[true, "Address is required"] },
    passwordCreatedAt: {
      type: Date,
      trim: true,
    },
  },
  { timestamps: true }
);

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
  } catch (error) {
    next(error as Error);
  }
});

export const UserModel = model<TSingUpUser>("user", userSchema);
