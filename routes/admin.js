import express from "express";
import { AdminController } from "../controllers/admin.js";
import { authenticateAdminSession } from "../middleware/auth.js";
const adminRouter = express.Router();

// Ruta para autenticar al administrador
adminRouter.post("/logIn", AdminController.logIn);
adminRouter.post(
  "/sessionActive",
  authenticateAdminSession,
  AdminController.isLogged
);

export default adminRouter;
