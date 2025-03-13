import jwt from "jsonwebtoken";
// Ruta al archivo JSON
import { UnauthorizedError } from "../Errors/error.js";
export class AdminModel {
  static async logIn({ input }) {
    if (
      input.userName !== process.env.ADMIN_USER ||
      input.password !== process.env.ADMIN_PASSWORD
    ) {
      throw new UnauthorizedError("Invalid admin credentials");
    }
    //hashear el password y el username y comprararlo con el json de usuarios
    const token = jwt.sign(
      { userName: input.userName, isAdmin: true },
      process.env.JWT_SECRET
    );
    return token;
  }
}
