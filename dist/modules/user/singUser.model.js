"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
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
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = this;
            if (user.isModified("password")) {
                const saltRounds = 12;
                const hashedPassword = yield bcrypt_1.default.hash(user.password, saltRounds);
                // Set the hashed password
                user.password = hashedPassword;
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
exports.UserModel = (0, mongoose_1.model)("user", userSchema);
