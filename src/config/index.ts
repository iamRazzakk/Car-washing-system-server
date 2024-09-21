
// require('dotenv').config()

import { config } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryConfig = cloudinary;

config()
export default {
    PORT: process.env.PORT,
    URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    REFRESH_JWT_SECRET: process.env.Refresh_JWT_SECRET,
    JWT_E_IN: process.env.JWT_EXPIRES_IN,
    JWT_R_IN: process.env.REFRESH_IN,
    NODE_DEV: process.env.NODE_DEV,
    STORE_ID:process.env.STORE_ID,
    SIGNATURE_KEY:process.env.SIGNATURE_KEY,
    PAYMENT_URL:process.env.PAYMENT_URL
}