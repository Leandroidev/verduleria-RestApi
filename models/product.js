import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { validateDiscount, calculateDiscount } from "../utils.js";
// Ruta al archivo JSON
const dataPath = path.join(process.cwd(), "./db/data.json");

// Función para leer los productos desde el archivo JSON
async function loadProducts() {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error.message);
    return [];
  }
}
// Función para guardar los productos en el archivo JSON
async function saveProducts(products) {
  try {
    await fs.writeFile(dataPath, JSON.stringify(products, null, 2), "utf-8");
  } catch (error) {
    console.error("Error al escribir en el archivo JSON:", error.message);
  }
}
export class ProductModel {
  static async getAll({ category }) {
    const products = await loadProducts();
    if (category) {
      return products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    return products;
  }
  static async create({ input }) {
    const products = await loadProducts();
    const newProduct = {
      id: randomUUID(),
      ...input,
    };

    products.push(newProduct);
    await saveProducts(products); // Guardar los cambios en el archivo JSON
    return newProduct;
  }
  static async delete({ id }) {
    const products = await loadProducts();
    const productIndex = products.findIndex((product) => product.id == id);
    if (productIndex === -1) {
      return false; // Producto no encontrado
    }
    products.splice(productIndex, 1);
    await saveProducts(products); // Guardar los cambios en el archivo JSON
    return true;
  }
  static async update({ id, input }) {
    const products = await loadProducts();

    const productIndex = products.findIndex((product) => product.id == id);
    if (productIndex === -1) {
      return false; // Producto no encontrado
    }

    const updatedProduct = {
      ...products[productIndex],
      ...input,
    };
    if (
      !validateDiscount(updatedProduct) &&
      updatedProduct.promoPrice &&
      updatedProduct.discountPercentage
    ) {
      throw new Error("Invalid discount");
    }
    calculateDiscount(updatedProduct);

    products[productIndex] = updatedProduct;

    await saveProducts(products); // Guardar los cambios en el archivo JSON
    return updatedProduct;
  }
}
