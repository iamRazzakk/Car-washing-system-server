import cors from "cors";
import express, { Application, Request, Response } from "express";
import { Routers } from "./router";
import { NotFound } from "./middleware/notFound";
import globalErrorHandler from "./middleware/globalErroHandler";
import cookieParser from "cookie-parser";
import { logingRouter } from "./modules/auth/auth.routes";
const app: Application = express();
// parser
app.use(express.json());
app.use(
  cors({
    // origin: "https://car-wash-booking-system-eight.vercel.app",
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());
// this is the main route for this application
app.use("/api", Routers);
app.use("/api/auth", logingRouter);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "🚀 Server is running successfully!",
    timestamp: new Date().toISOString(),
  });
});

// for not found route
app.use("*", NotFound);

// global error handler
app.use(globalErrorHandler);

export default app;
