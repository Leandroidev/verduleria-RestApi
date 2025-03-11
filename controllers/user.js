import { UserModel } from "../models/user.js";
import { validateUser } from "../schemas/user.js";

export class UserController {
  static async logIn(req, res) {
    const result = validateUser(req.body);
    if (result.error) {
      //Error of schema validation
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }

    const token = await UserModel.logIn({ input: result.data });
    if (!token) {
      return res.status(401).json({ error: "Invalid user or password" });
    }
    return res.json(token);
  }
  static async create(req, res) {
    const result = validateUser(req.body);

    if (result.error) {
      //Error of schema validation
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }

    const newUser = await UserModel.create({ input: result.data });
    return res.status(201).json(newUser);
  }
}
