import fs from "node:fs/promises";
import path from "node:path";
import { ConnectionError } from "../Errors/error.js";

const dataPath = (entity) => path.join(process.cwd(), `./db/${entity}.json`);

export async function load(entity) {
  try {
    const filePath = dataPath(entity);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new ConnectionError(`Failed to load ${entity} from the database`);
  }
}

export async function save(entity, data) {
  try {
    const filePath = dataPath(entity);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    throw new ConnectionError(`Failed to save ${entity} to the database`);
  }
}
