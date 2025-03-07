import { Router } from "express";
import { ProductModel } from "../models/product.js";
import {validateProduct,validatePartialProduct} from "../schemas/products.js";
export const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    const {category} = req.query;
    
    const products = await ProductModel.getAll({category});
    
    return res.json(products);
});

productsRouter.post('/', async (req, res) => {
    console.log(req.body);
    
    const result = validateProduct(req.body);

    if(result.error){
        return res.status(422).json({ error : JSON.parse(result.error.message) });
    }   
    const newProduct = await ProductModel.create({input : result.data});
    return res.status(201).json(newProduct);
})
productsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await ProductModel.delete({id});
    if(!result){
        return res.status(404).json({ error: "Product not found"});
    }

    return res.json({ message: "Product deleted"});
    
})
productsRouter.patch('/:id', async (req, res) => {
    
    const result = validatePartialProduct(req.body);
    if(result.error){
        return res.status(422).json({ error : JSON.parse(result.error.message) });
    }
    const {id} = req.params;
    const updatedProduct = await ProductModel.update({id, input:result.data});
    return res.json(updatedProduct);
})