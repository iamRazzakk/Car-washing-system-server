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
exports.main = main;
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const AppError_1 = __importDefault(require("./error/AppError"));
// For local development
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.URL);
            app_1.default.listen(config_1.default.PORT, () => {
                console.log(`Example app listening on port ${config_1.default.PORT}`);
            });
        }
        catch (error) {
            throw new AppError_1.default(500, ` error ${error}`);
        }
    });
}
// For Vercel deployment - export the app with database connection
let isConnected = false;
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    if (isConnected) {
        return;
    }
    try {
        yield mongoose_1.default.connect(config_1.default.URL);
        isConnected = true;
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Database connection error:', error);
        throw new AppError_1.default(500, `Database connection error: ${error}`);
    }
});
// Export for Vercel
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield connectToDatabase();
    return (0, app_1.default)(req, res);
});
// Run locally if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    main();
}
