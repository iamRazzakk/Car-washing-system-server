"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routers = void 0;
const express_1 = require("express");
const singUser_routes_1 = require("../modules/user/singUser.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const carService_routes_1 = require("../modules/service/carService.routes");
const carSlote_routes_1 = require("../modules/slot/carSlote.routes");
const bookService_routes_1 = require("../modules/bookService/bookService.routes");
const router = (0, express_1.Router)();
const appRouterModel = [
    {
        path: '/auth',
        routerFile: singUser_routes_1.UserRoute
    },
    {
        path: '/services',
        routerFile: carService_routes_1.carServiceRouter
    },
    {
        path: '/services/slots',
        routerFile: carSlote_routes_1.carSloteRouter
    },
    {
        path: '/slots/availability',
        routerFile: carSlote_routes_1.carSloteRouter
    },
    {
        path: '/',
        routerFile: bookService_routes_1.bookServiceRouter
    },
    {
        path: "/auth",
        routerFile: auth_routes_1.logingRouter
    }
];
appRouterModel.forEach((route) => router.use(route.path, route.routerFile));
exports.Routers = router;
