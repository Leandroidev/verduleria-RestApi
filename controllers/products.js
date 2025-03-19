import { ProductModel } from "../models/product.js";
import {
  validateProduct,
  validatePartialProduct,
} from "../schemas/products.js";
import { ValidationError } from "../Errors/error.js";
export class ProductController {
  static async getAll(req, res, next) {
    console.log("GetAll");

    try {
      const products = await ProductModel.getAll();
      return res.json(products);
    } catch (error) {
      next(error);
    }
  }
  static async getShop(req, res, next) {
    console.log("GetShop");

    try {
      const shop = await ProductModel.getShop();
      return res.json(shop);
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const result = validateProduct(req.body);

      if (result.error) {
        throw new ValidationError(
          "Validation failed",
          422,
          JSON.parse(result.error.message)
        );
      }

      const newProduct = await ProductModel.create({ input: result.data });
      return res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const result = await ProductModel.delete({ id });
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      let result = validatePartialProduct(req.body);
      if (result.error) {
        throw new ValidationError(
          "Validation failed",
          422,
          JSON.parse(result.error.message)
        );
      }
      if (
        result.data.discountPercentage !== undefined &&
        result.data.promoPrice === undefined
      ) {
        result.data = {
          ...result.data,
          promoPrice: 0,
        };
      }
      if (
        result.data.discountPercentage === undefined &&
        result.data.promoPrice !== undefined
      ) {
        result.data = {
          ...result.data,
          discountPercentage: 0,
        };
      }
      const { id } = req.params;
      const updatedProduct = await ProductModel.update({
        id,
        input: result.data,
      });
      return res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
}
