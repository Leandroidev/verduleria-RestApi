import { readJSON } from "../utils.js";
import {randomUUID} from "node:crypto";



const products = readJSON("./data.json");

export class ProductModel {
  static async getAll({ category }) {
    if (category) {
      
      return products.filter((product) => product.category.toLowerCase() === category.toLowerCase());   
    }

    return products;
  }
  static async create ({input}){
    const newProduct = {
      id: randomUUID(),
      ...input
  }

  products.push(newProduct);
  return newProduct
  }
  static async delete ({id}){
    const productIndex= products.findIndex((product) => product.id === id);
    if(productIndex === -1){
        return false;
    }
    products.splice(productIndex, 1);
    return true;
  }
  static async update ({id, input}) {
    
    const productIndex = products.findIndex((product) => product.id == id);
    
    if (productIndex === -1) {
        return false;
    }
    const updatedProduct = {
        ...products[productIndex],
        ...input
    };
    products[productIndex] = updatedProduct;
    return updatedProduct;
  }
}
