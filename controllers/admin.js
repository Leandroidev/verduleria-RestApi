import { UnauthorizedError, ValidationError } from "../Errors/error.js";
import { AdminModel } from "../models/admin.js";
import { validateUser } from "../schemas/user.js";
export class AdminController {
  static async logIn(req, res, next) {
    try {
      const result = validateUser(req.body);
      if (result.error) {
        throw new ValidationError(
          "Validation Failed",
          422,
          JSON.parse(result.error.message)
        );
      }
      const token = await AdminModel.logIn({ input: result.data });

      if (!token) {
        throw new UnauthorizedError(
          "Invalid Credential",
          401,
          JSON.parse(result.message.error)
        );
      }
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }
}
