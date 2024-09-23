import { Router } from "express";
import { UserRoute } from "../modules/user/singUser.routes";
import { logingRouter } from "../modules/auth/auth.routes";
import { carServiceRouter } from "../modules/service/carService.routes";
import { carSloteRouter } from "../modules/slot/carSlote.routes";
import { bookServiceRouter } from "../modules/bookService/bookService.routes";
import { orderRoutes } from "../modules/order/order.routes";
import { paymentRoutes } from "../modules/payment/payment.routes";

const router = Router();
const appRouterModel = [
  { path: "/auth", routerFile: logingRouter },
  { path: "/", routerFile: UserRoute },
  { path: "/services", routerFile: carServiceRouter },
  { path: "/services/slots", routerFile: carSloteRouter },  // For create and update also singGet
  { path: "/slots/availability", routerFile: carSloteRouter }, // Show all slots
  { path: "/bookings", routerFile: bookServiceRouter },
  { path: "/payments", routerFile: orderRoutes },
  { path: "/", routerFile: orderRoutes },
  { path: "/payments", routerFile: paymentRoutes },
];
appRouterModel.forEach((route) => router.use(route.path, route.routerFile));
export const Routers = router;
