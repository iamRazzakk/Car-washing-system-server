"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
const notFound_1 = require("./middleware/notFound");
const globalErroHandler_1 = __importDefault(require("./middleware/globalErroHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = require("./modules/auth/auth.routes");
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "https://car-wash-booking-system-eight.vercel.app",
    // origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
// this is the main route for this application
app.use("/api", router_1.Routers);
app.use("/api/auth", auth_routes_1.logingRouter);
app.get("/", (req, res) => {
    // res.send('Hello World!');
    res.json("Server is running");
});
// for not found route
app.use("*", notFound_1.NotFound);
// global error handler
app.use(globalErroHandler_1.default);
exports.default = app;
