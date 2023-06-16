import { Router } from "express";
import { userController } from "../../app/dependencies";

const userRouter = Router();

// We use the bind method to create a new function and do not lose "this" reference from the userController object
userRouter.get("/:id", userController.getUser.bind(userController));

export { userRouter };