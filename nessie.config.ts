import { ClientMySQL, NessieConfig } from "./deps.ts";

export const connectionOptions = {
  hostname: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  db: "books-api",
};

const client = new ClientMySQL(connectionOptions);

/** This is the final config object */
const config: NessieConfig = {
  client,
  migrationFolders: ["./db/migrations"],
  seedFolders: ["./db/seeds"],
};

export default config;
