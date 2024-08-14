import express, { Application, Request, Response } from "express"
import { UserRoute } from "./modules/user/user.route";
const app: Application = express()
// parser 
app.use(express.json())
// this route come from user route
app.use('/api/auth/signup', UserRoute)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

export default app;
