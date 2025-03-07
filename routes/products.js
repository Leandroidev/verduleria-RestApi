import { Router } from "express";
import { readJSON } from '../utils.js';


const products= readJSON('./data.json');

export const productsRouter = Router();

productsRouter.get('/', (req, res) => {
    return res.json(products);
});

