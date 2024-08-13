"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
exports.default = {
    PORT: process.env.PORT,
    URL: process.env.DB_URL
};
