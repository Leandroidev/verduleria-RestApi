import { Router } from "express";
import { ProductController } from "../controllers/products.js";
import { authenticateUser } from "../middleware/auth.js";
export const productsRouter = Router();

productsRouter.get("/", authenticateUser, (req, res, next) => {
  if (req.userId) {
    return ProductController.getAll(req, res, next);
  } else {
    return ProductController.getShop(req, res, next);
  }
});
productsRouter.post("/", authenticateUser, ProductController.create);
productsRouter.delete("/:id", authenticateUser, ProductController.delete);
productsRouter.patch("/:id", authenticateUser, ProductController.update);
