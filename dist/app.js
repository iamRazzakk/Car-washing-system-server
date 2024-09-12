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
const app = (0, express_1.default)();
// parser 
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173"
}));
// this is the main route for this application
app.use('/api', router_1.Routers);
app.get('/', (req, res) => {
    // res.send('Hello World!');
    res.json("Server is running");
});
// for not found route
app.use("*", notFound_1.NotFound);
// global error handler
app.use(globalErroHandler_1.default);
exports.default = app;
