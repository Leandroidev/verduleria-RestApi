import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../Errors/error.js";

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Invalid Token", 498);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Adjuntar el ID del usuario a la solicitud
    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid Token", 498);
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
