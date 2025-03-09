import { ProductModel } from "../models/product.js";
import { validateProduct,validatePartialProduct } from "../schemas/products.js";
export class ProductController{
    static async getAll(req, res){
        const {category} = req.query;
        
        const products = await ProductModel.getAll({category});
        
        return res.json(products);
    }
    static async create(req, res){
        
        const result = validateProduct(req.body);
        
        if(result.error){
            return res.status(422).json({ error : JSON.parse(result.error.message) });
        }   
        
        const newProduct = await ProductModel.create({input : result.data});
        return res.status(201).json(newProduct);
    }
    static async delete(req, res){
        const { id } = req.params;
        console.log(id);
        
        const result = await ProductModel.delete({id});
        if(!result){
            return res.status(404).json({ error: "Product not found"});
        }
        return res.json({ message: "Product deleted"});

    }
    static async update(req, res){
        
        const result = validatePartialProduct(req.body);
        if(result.error){
            return res.status(422).json({ error : JSON.parse(result.error.message) });
        }
        const {id} = req.params;
        const updatedProduct = await ProductModel.update({id, input:result.data});
        return res.json(updatedProduct);
    }
}