import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import bcryt from "bcrypt";
import jwt from "jsonwebtoken";
// Ruta al archivo JSON
const dataPath = path.join(process.cwd(), "./db/user.json");

async function loadUser() {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error.message);
    return [];
  }
}
async function saveUser(user) {
  try {
    await fs.writeFile(dataPath, JSON.stringify(user, null, 2), "utf-8");
  } catch (error) {
    console.error("Error al escribir en el archivo JSON:", error.message);
  }
}
export class UserModel {
  static async create({ input }) {
    const hashedUserName = await bcryt.hash(input.userName, 10);
    const hashedPassword = await bcryt.hash(input.password, 10);
    const newUser = {
      id: randomUUID(),
      userName: hashedUserName,
      password: hashedPassword,
    };
    //hashear el password y el username y comprararlo con el json de usuarios
    await saveUser(newUser);
    return newUser.id;
  }
  static async logIn({ input }) {
    //hashear el password y el username y comprararlo con el json de usuarios
    const user = await loadUser();
    const isValidUser = await bcryt.compare(input.userName, user.userName);
    const isValidPassword = await bcryt.compare(input.password, user.password);
    if (isValidUser && isValidPassword) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h", // El token expira en 1 hora
      });
      return token;
    }
    return false;
  }
}
