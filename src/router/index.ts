import { Router } from "express";
import { UserRoute } from "../modules/user/singUser.routes";
import { logingRouter } from "../modules/auth/auth.routes";
import { carServiceRouter } from "../modules/service/carService.routes";
import { carSloteRouter } from "../modules/slot/carSlote.routes";
import { bookServiceRouter } from "../modules/bookService/bookService.routes";
import { orderRoutes } from "../modules/order/order.routes";
import { paymentRoutes } from "../modules/payment/payment.routes";

const router = Router()
const appRouterModel = [
    {
        path: '/auth',
        routerFile: UserRoute
    },
    {
        path: '/services',
        routerFile: carServiceRouter
    },
    {
        path: '/services/slots',
        routerFile: carSloteRouter
    },
    {
        path: '/slots/availability',
        routerFile: carSloteRouter
    },
    {
        path: '/services/slots',
        routerFile: carSloteRouter
    },
    {
        path: '/',
        routerFile: bookServiceRouter
    },
    {
        path: "/auth",
        routerFile: logingRouter
    },
    {
        path:"/payments",
        routerFile: orderRoutes
    },
    {
        path:"/payments",
        routerFile: paymentRoutes
    }
]
appRouterModel.forEach((route) => router.use(route.path, route.routerFile))
export const Routers = router