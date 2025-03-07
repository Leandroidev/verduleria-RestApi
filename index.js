import express from 'express';
import cors from 'cors';
import { productsRouter } from './routes/products.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/products', productsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});