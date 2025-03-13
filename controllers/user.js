import { UnauthorizedError, ValidationError } from "../Errors/error.js";
import { UserModel } from "../models/user.js";
import { validateUser } from "../schemas/user.js";

export class UserController {
  static async getUsers(req, res, next) {
    try {
      const users = await UserModel.getUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const result = validateUser(req.body);
      if (result.error) {
        throw new ValidationError(
          "Validation Failed",
          422,
          JSON.parse(result.error.message)
        );
      }
      const newUserId = await UserModel.create({ input: result.data });

      return res.status(201).json(newUserId);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const result = await UserModel.delete({ id });
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
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
      const token = await UserModel.logIn({ input: result.data });

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
