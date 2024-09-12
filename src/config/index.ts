
// require('dotenv').config()
import { config } from 'dotenv';
config()
export default {
    PORT: process.env.PORT,
    URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    REFRESH_JWT_SECRET: process.env.Refresh_JWT_SECRET,
    JWT_E_IN: process.env.JWT_EXPIRES_IN,
    JWT_R_IN: process.env.REFRESH_IN,
    NODE_DEV: process.env.NODE_DEV
}