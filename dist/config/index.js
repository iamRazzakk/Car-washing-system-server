"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// require('dotenv').config()
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = {
    PORT: process.env.PORT,
    URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_E_IN: process.env.JWT_EXPIRES_IN,
    NODE_DEV: process.env.NODE_DEV
};
