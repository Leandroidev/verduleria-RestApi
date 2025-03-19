import { load, save } from "../db/dbConnection.js";
export class ShopModel {
  static async toggleIsOpen() {
    const data = await load("data");
    data.isOpen = !data.isOpen;
    await save("data", data);

    return data;
  }
}
