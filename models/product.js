import { randomUUID } from "node:crypto";
import { validateDiscount, calculateDiscount } from "../utils.js";
import { NotFoundError, ValidationError } from "../Errors/error.js";
import { load, save } from "../db/dbConnection.js";
export class ProductModel {
  static async getAll() {
    const data = await load("data");

    const products = data;
    return products;
  }
  static async getShop() {
    const data = await load("data");

    if (data.isOpen) return data;
    if (!data.isOpen) {
      const auxData = { isOpen: data.isOpen, products: [] };
      return auxData;
    }
  }

  static async create({ input }) {
    const data = await load("data");
    const newProduct = {
      id: randomUUID(),
      ...input,
    };
    if (!validateDiscount(newProduct)) {
      throw new ValidationError("Invalid discount", 422);
    }
    calculateDiscount(newProduct);

    data.products.push(newProduct);
    await save("data", data);
    return newProduct;
  }
  static async delete({ id }) {
    const data = await load("data");

    const productIndex = data.products.findIndex((product) => product.id == id);
    if (productIndex === -1) {
      throw new NotFoundError("Product not found", 404);
    }
    const deletedProduct = data.products[productIndex];
    data.products.splice(productIndex, 1);
    await save("data", data);
    return deletedProduct;
  }
  static async update({ id, input }) {
    const data = await load("data");

    const productIndex = data.products.findIndex((product) => product.id == id);
    if (productIndex === -1) {
      throw new NotFoundError("Product not found", 404);
    }

    const updatedProduct = {
      ...data.products[productIndex],
      ...input,
    };
    if (!validateDiscount(updatedProduct)) {
      throw new ValidationError("Invalid discount", 422);
    }
    calculateDiscount(updatedProduct);

    data.products[productIndex] = updatedProduct;

    await save("data", data);
    return updatedProduct;
  }
}
