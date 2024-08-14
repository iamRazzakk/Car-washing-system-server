"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routers = void 0;
const express_1 = require("express");
const singUser_routes_1 = require("../modules/user/singUser.routes");
const router = (0, express_1.Router)();
const appRouterModel = [
    {
        path: '/auth',
        routerFile: singUser_routes_1.UserRoute
    }
];
appRouterModel.forEach((route) => router.use(route.path, route.routerFile));
exports.Routers = router;
