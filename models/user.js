import { randomUUID } from "node:crypto";
import { load, save } from "../db/dbConnection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  UnauthorizedError,
  ValidationError,
  NotFoundError,
} from "../Errors/error.js";
// Ruta al archivo JSON

export class UserModel {
  static async getUsers() {
    const users = await load("user");
    const filteredUsers = users.map(({ id, userName }) => ({ id, userName }));

    return filteredUsers;
  }
  static async create({ input }) {
    // Validar que el usuario no exista previamente
    const users = await load("user");

    for (const user of users) {
      const userExists = await users.find(
        (user) => user.userName === input.userName
      );
      if (userExists) {
        throw new ValidationError("User alredy exist", 409);
      }
    }
    // Hashear el nombre de usuario y la contraseña
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Crear el nuevo usuario
    const newUser = {
      id: randomUUID(),
      userName: input.userName,
      password: hashedPassword,
    };
    users.push(newUser);

    await save("user", users);

    // Guardar el usuario en la base de datos

    return newUser.id;
  }

  static async delete({ id }) {
    const users = await load("user");
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundError("User not found");
    }
    const deletedUser = {
      id: users[userIndex].id,
      userName: users[userIndex].userName,
    };
    users.splice(userIndex, 1);
    await save("user", users);
    return deletedUser;
  }
  static async logIn({ input }) {
    //hashear el password y el username y comprararlo con el json de usuarios
    const users = await load("user");

    for (const user of users) {
      const userExists = await users.find(
        (user) => user.userName === input.userName
      );
      console.log(userExists);

      if (!userExists) {
        throw new UnauthorizedError("Invalid username or password", 401);
      }
      const isValidPassword = await bcrypt.compare(
        input.password,
        user.password
      );
      console.log(isValidPassword);

      if (!isValidPassword) {
        throw new UnauthorizedError("Invalid username or password", 401);
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      return token;
    }
  }
}
