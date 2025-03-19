import { Router } from "express";
import { authenticateAdmin, authenticateUser } from "../middleware/auth.js";
import { ShopController } from "../controllers/shop.js";
export const shopRouter = Router();

shopRouter.post("/", authenticateUser, ShopController.toggleIsOpen);
