"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routers = void 0;
const express_1 = require("express");
const singUser_routes_1 = require("../modules/user/singUser.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const carService_routes_1 = require("../modules/service/carService.routes");
const carSlote_routes_1 = require("../modules/slot/carSlote.routes");
const bookService_routes_1 = require("../modules/bookService/bookService.routes");
const order_routes_1 = require("../modules/order/order.routes");
const payment_routes_1 = require("../modules/payment/payment.routes");
const review_routes_1 = require("../modules/reviews/review.routes");
const router = (0, express_1.Router)();
const appRouterModel = [
    { path: "/auth", routerFile: auth_routes_1.logingRouter },
    { path: "/", routerFile: singUser_routes_1.UserRoute },
    { path: "/services", routerFile: carService_routes_1.carServiceRouter },
    { path: "/services/slots", routerFile: carSlote_routes_1.carSloteRouter }, // For create and update also singGet
    { path: "/slots/availability", routerFile: carSlote_routes_1.carSloteRouter }, // Show all slots
    { path: "/bookings", routerFile: bookService_routes_1.bookServiceRouter },
    { path: "/payments", routerFile: order_routes_1.orderRoutes },
    { path: "/", routerFile: order_routes_1.orderRoutes },
    { path: "/payment", routerFile: payment_routes_1.paymentRoutes },
    { path: "/", routerFile: review_routes_1.ReviewRoute },
];
appRouterModel.forEach((route) => router.use(route.path, route.routerFile));
exports.Routers = router;
