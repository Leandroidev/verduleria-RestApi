import {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
} from "../Errors/error.js";

export function errorHandler(err, req, res, next) {
  //console.error(err.stack);

  const statusCode = err.statusCode;
  const message = err.message || "Internal Server Error";
  const data = err.data || null;
  res.status(statusCode).json({
    success: false,
    message,
    data,
    error: process.env.NODE_ENV === "development" ? err : undefined, // Muestra detalles solo en desarrollo
  });
}
