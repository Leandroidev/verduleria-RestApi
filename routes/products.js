import { Router } from "express";
import { ProductController } from "../controllers/products.js";

export const productsRouter = Router();

productsRouter.get('/', ProductController.getAll);
productsRouter.post('/', ProductController.create);
productsRouter.delete('/:id', ProductController.delete);
productsRouter.patch('/:id', ProductController.update);

