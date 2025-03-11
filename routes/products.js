import { Router } from "express";
import { ProductController } from "../controllers/products.js";
import { authenticate } from "../middleware/auth.js";
export const productsRouter = Router();

productsRouter.get("/", ProductController.getAll);
productsRouter.post("/", authenticate, ProductController.create);
productsRouter.delete("/:id", authenticate, ProductController.delete);
productsRouter.patch("/:id", authenticate, ProductController.update);
