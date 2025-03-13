import express from "express";
import { AdminController } from "../controllers/admin.js";
const adminRouter = express.Router();

// Ruta para autenticar al administrador
adminRouter.post("/logIn", AdminController.logIn);

export default adminRouter;
