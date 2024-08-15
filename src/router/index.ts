import { Router } from "express";
import { UserRoute } from "../modules/user/singUser.routes";
import { logingRouter } from "../modules/auth/auth.routes";
import { carServiceRouter } from "../modules/service/carService.routes";

const router = Router()
const appRouterModel = [
    {
        path: '/auth',
        routerFile: UserRoute
    },
    {
        path: '/api',
        routerFile: carServiceRouter
    },
    {
        path: "/auth",
        routerFile: logingRouter
    }
]
appRouterModel.forEach((route) => router.use(route.path, route.routerFile))
export const Routers = router