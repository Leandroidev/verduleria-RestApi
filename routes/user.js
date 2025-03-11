import { Router } from "express";
import { UserController } from "../controllers/user.js";

export const userRouter = Router();
userRouter.post("/register", UserController.create);
userRouter.post("/logIn", UserController.logIn);
