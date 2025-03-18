import { Router } from "express";
import { ProductController } from "../controllers/products.js";
import { authenticateUser } from "../middleware/auth.js";
export const productsRouter = Router();

productsRouter.get("/", authenticateUser, ProductController.getAll);
productsRouter.get("/", ProductController.getShop);

productsRouter.post("/", authenticateUser, ProductController.create);
productsRouter.delete("/:id", authenticateUser, ProductController.delete);
productsRouter.patch("/:id", authenticateUser, ProductController.update);
