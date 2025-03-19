import { ShopModel } from "../models/shop.js";
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
