import { Router } from "express";
import { UserRoute } from "../modules/user/singUser.routes";

const router = Router()
const appRouterModel = [
    {
        path: '/auth',
        routerFile: UserRoute
    }
]
appRouterModel.forEach((route) => router.use(route.path, route.routerFile))
export const Routers = router