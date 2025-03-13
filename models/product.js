import { randomUUID } from "node:crypto";
import { validateDiscount, calculateDiscount } from "../utils.js";
import { NotFoundError, ValidationError } from "../Errors/error.js";
import { load, save } from "../db/dbConnection.js";
export class ProductModel {
  static async getAll() {
    const products = await load("data");
    return products;
  }
  static async create({ input }) {
    const products = await load("data");
    const newProduct = {
      id: randomUUID(),
      ...input,
    };
    if (!validateDiscount(newProduct)) {
      throw new ValidationError("Invalid discount", 422);
    }
    calculateDiscount(newProduct);

    products.push(newProduct);
    await save("data", products);
    return newProduct;
  }
  static async delete({ id }) {
    const products = await load("data");
    const productIndex = products.findIndex((product) => product.id == id);
    if (productIndex === -1) {
      throw new NotFoundError("Product not found", 404);
    }
    const deletedProduct = products[productIndex];
    products.splice(productIndex, 1);
    await save("data", products);
    return deletedProduct;
  }
  static async update({ id, input }) {
    const products = await load("data");

    const productIndex = products.findIndex((product) => product.id == id);
    if (productIndex === -1) {
      throw new NotFoundError("Product not found", 404);
    }

    const updatedProduct = {
      ...products[productIndex],
      ...input,
    };
    if (!validateDiscount(updatedProduct)) {
      throw new ValidationError("Invalid discount", 422);
    }
    calculateDiscount(updatedProduct);

    products[productIndex] = updatedProduct;

    await save("data", products);
    return updatedProduct;
  }
}
