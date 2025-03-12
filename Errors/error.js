const createErrorFactory = function (ErrorName) {
  return class CustomError extends Error {
    constructor(message, statusCode = 500, data = null) {
      super(message);
      this.name = ErrorName;
      this.statusCode = statusCode;
      this.data = data;
    }
  };
};

export const ConnectionError = createErrorFactory("ConnectionError");
export const ValidationError = createErrorFactory("ValidationError");
export const NotFoundError = createErrorFactory("NotFoundError");
export const UnauthorizedError = createErrorFactory("UnauthorizedError");
