import { Router } from "express";
import { UserController } from "../controllers/user.js";
import { authenticateAdmin } from "../middleware/auth.js";
import { authenticateUser } from "../middleware/auth.js";
export const userRouter = Router();
userRouter.post("/logIn", UserController.logIn);
userRouter.post("/", authenticateAdmin, UserController.create);

userRouter.get("/", authenticateAdmin, UserController.getUsers);
userRouter.delete("/:id", authenticateAdmin, UserController.delete);
userRouter.post("/sessionActive", authenticateUser, () => true);
