import {
  AbstractMigration,
  Info,
  ClientMySQL,
} from "https://deno.land/x/nessie@2.0.0/mod.ts";
import { v4 } from "https://deno.land/std@0.100.0/uuid/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";

export default class extends AbstractMigration<ClientMySQL> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    await this.client.query(`
            CREATE TABLE Users (
                userId varchar(36) NOT NULL,
                name varchar(255) NOT NULL,
                email varchar(255) NOT NULL,
                password varchar(255) NOT NULL,
                created_at timestamp NOT NULL DEFAULT current_timestamp,
                updated_at timestamp NOT NULL DEFAULT current_timestamp,
                PRIMARY KEY (userId)
            );
        `);

    const uuid = v4.generate();
    const name = "Mark Lee";
    const email = "2woongjae@gmail.com";
    const hashed = await bcrypt.hash("deno1234");

    await this.client.query(
      `INSERT INTO Users VALUES ('${uuid}', '${name}', '${email}', '${hashed}', DEFAULT, DEFAULT)`
    );
  }

  /** Runs on rollback */
  async down(info: Info): Promise<void> {
    await this.client.query("DROP TABLE IF EXISTS Users");
  }
}
