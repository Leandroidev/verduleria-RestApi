import { ShopModel } from "../models/shop.js";
import {
  validateProduct,
  validatePartialProduct,
} from "../schemas/products.js";
import { ValidationError } from "../Errors/error.js";
export class ShopController {
  static async toggleIsOpen(req, res, next) {
    try {
      const shop = await ShopModel.toggleIsOpen();
      return res.json(shop);
    } catch (error) {
      next(error);
    }
  }
}
