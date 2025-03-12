import express from "express";
import cors from "cors";
import { productsRouter } from "./routes/products.js";
import { userRouter } from "./routes/user.js";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/products", productsRouter);
app.use("/user", userRouter);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
