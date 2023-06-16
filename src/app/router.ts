import { Router, Request, Response } from "express";
import { userRouter } from "../users/infrastructure/userRouter";

const appRouter = Router();

appRouter.get("/", (req: Request, res: Response) => {
    res.send("Hexagonal Architecture example!!");
});
appRouter.use("/users", userRouter)

export { appRouter };