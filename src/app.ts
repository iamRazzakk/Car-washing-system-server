import cors from "cors";
import express, { Application, Request, Response } from "express"
import { Routers } from "./router";
const app: Application = express()
// parser 
app.use(express.json())
app.use(cors());
// this is the main route for this application
app.use('/api', Routers)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});
// for test route
app.get('/test', (req: Request, res: Response) => {
    res.send("Test route is working!");
});

export default app;
