
require('dotenv').config()
export default {
    PORT: process.env.PORT,
    URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_E_IN: process.env.JWT_EXPIRES_IN
}