"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = {
    PORT: process.env.PORT,
    URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET,
    JWT_E_IN: process.env.JWT_E_IN,
    JWT_R_IN: process.env.JWT_R_IN,
    NODE_DEV: process.env.NODE_DEV,
    // Aamarpay
    STORE_ID: process.env.STORE_ID,
    SIGNATURE_KEY: process.env.SIGNATURE_KEY,
    PAYMENT_URL: process.env.PAYMENT_URL,
    PAYMENT_VERIFY_URL: process.env.PAYMENT_VERIFY_URL,
    BASE_URL: process.env.BASE_URL,
    SUCCESS_URL: process.env.SUCCESS_URL,
    // IMGBB
    IMGBB_API_KEY: process.env.IMGBBAPIKEY,
    IMGBB_API_URL: "https://api.imgbb.com/1/upload",
};
