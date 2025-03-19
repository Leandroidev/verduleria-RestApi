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
      const user = {
        token: token,
        userName: "owner",
        role: "owner",
      };
      if (!token) {
        throw new UnauthorizedError(
          "Invalid Credential",
          401,
          JSON.parse(result.message.error)
        );
      }
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  static async isLogged(req, res) {
    return res.json({ isLogged: req.logged, role: "owner" }); // Devuelve un objeto JSON con el estado de autenticación
  }
}
