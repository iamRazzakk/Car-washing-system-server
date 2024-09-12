import cors from "cors";
import express, { Application, Request, Response } from "express"
import { Routers } from "./router";
import { NotFound } from "./middleware/notFound";
import globalErrorHandler from "./middleware/globalErroHandler";
import cookieParser from "cookie-parser";
const app: Application = express()
// parser 
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(cookieParser())
// this is the main route for this application
app.use('/api', Routers)

app.get('/', (req: Request, res: Response) => {
    // res.send('Hello World!');
    res.json(
        "Server is running"
    )
});
// for not found route
app.use("*", NotFound)

// global error handler
app.use(globalErrorHandler);

export default app;
