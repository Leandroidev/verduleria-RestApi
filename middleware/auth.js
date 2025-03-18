import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../Errors/error.js";

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Si no hay encabezado de autorización o no comienza con "Bearer", pasamos al siguiente middleware/controlador
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(); // Continúa con el siguiente middleware/controlador
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Adjuntar el ID del usuario a la solicitud
    next(); // Continúa con el siguiente middleware/controlador
  } catch (error) {
    // Si el token es inválido, también pasamos al siguiente middleware/controlador
    return next();
  }
};

export const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Invalid Token", 498);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Adjuntar el ID del usuario a la solicitud
    if (!decoded.isAdmin) {
      throw new UnauthorizedError("Invalid Admin", 498);
    }
    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid Token", 498);
  }
};
export const authenticateSession = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Invalid Token", 498);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.logged = true;

    next();
  } catch (error) {
    req.logged = false;

    throw new UnauthorizedError("Invalid Token", 498);
  }
};
export const authenticateAdminSession = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Invalid Token", 498);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      throw new UnauthorizedError("Invalid Admin", 498);
    }
    req.logged = true;

    next();
  } catch (error) {
    req.logged = false;

    throw new UnauthorizedError("Invalid Token", 498);
  }
};
