export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const data = err.data || null;
  res.status(statusCode).json({
    success: false,
    message,
    data,
    error: process.env.NODE_ENV === "development" ? err : undefined, // Muestra detalles solo en desarrollo
  });
}
