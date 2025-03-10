import { ProductModel } from "../models/product.js";
import {
  validateProduct,
  validatePartialProduct,
} from "../schemas/products.js";
import { calculateDiscount, validateDiscount } from "../utils.js";

export class ProductController {
  static async getAll(req, res) {
    const { category } = req.query;

    const products = await ProductModel.getAll({ category });

    return res.json(products);
  }
  static async create(req, res) {
    const result = validateProduct(req.body);

    if (result.error) {
      //Error of schema validation
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }
    if (
      !validateDiscount(result.data) &&
      result.data.promoPrice &&
      result.data.discountPercentage
    ) {
      return res.status(422).json({ error: "Invalid discount" }); //Error of data validation
    }
    calculateDiscount(result.data);

    const newProduct = await ProductModel.create({ input: result.data });
    return res.status(201).json(newProduct);
  }
  static async delete(req, res) {
    const { id } = req.params;

    const result = await ProductModel.delete({ id });
    if (!result) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.json({ message: "Product deleted" });
  }
  static async update(req, res) {
    let result = validatePartialProduct(req.body);
    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
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

    try {
      const { id } = req.params;
      const updatedProduct = await ProductModel.update({
        id,
        input: result.data,
      });
      return res.json(updatedProduct);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
