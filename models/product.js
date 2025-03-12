import { randomUUID } from "node:crypto";
import { validateDiscount, calculateDiscount } from "../utils.js";
import { NotFoundError, ValidationError } from "../Errors/error.js";
import { load, save } from "../db/dbConnection.js";
export class ProductModel {
  static async getAll() {
    const products = await load();
    return products;
  }
  static async create({ input }) {
    const products = await loadProducts();
    const newProduct = {
      id: randomUUID(),
      ...input,
    };
    if (!validateDiscount(newProduct)) {
      throw new ValidationError("Invalid discount", 422);
    }
    calculateDiscount(newProduct);

    products.push(newProduct);
    await saveProducts(products);
    return newProduct;
  }
  static async delete({ id }) {
    const products = await loadProducts();
    const productIndex = products.findIndex((product) => product.id == id);
    if (productIndex === -1) {
      throw new NotFoundError("Product not found");
    }
    const deletedProduct = products[productIndex];
    products.splice(productIndex, 1);
    await saveProducts(products);
    return deletedProduct;
  }
  static async update({ id, input }) {
    const products = await loadProducts();

    const productIndex = products.findIndex((product) => product.id == id);
    if (productIndex === -1) {
      throw new NotFoundError("Product not found");
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

    await saveProducts(products);
    return updatedProduct;
  }
}
