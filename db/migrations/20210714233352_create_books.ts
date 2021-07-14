import {
  AbstractMigration,
  Info,
  ClientMySQL,
} from "https://deno.land/x/nessie@2.0.0/mod.ts";

export default class extends AbstractMigration<ClientMySQL> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    await this.client.query(`
            CREATE TABLE Books (
                id int(11) NOT NULL AUTO_INCREMENT,
                ownerId varchar(36) NOT NULL,
                title varchar(255) NOT NULL,
                message varchar(255) NOT NULL,
                author varchar(255) NOT NULL,
                url varchar(255) NOT NULL,
                created_at timestamp NOT NULL DEFAULT current_timestamp,
                updated_at timestamp NOT NULL DEFAULT current_timestamp,
                PRIMARY KEY (id)
            );
        `);
  }

  /** Runs on rollback */
  async down(info: Info): Promise<void> {
    await this.client.query("DROP TABLE IF EXISTS Books");
  }
}
