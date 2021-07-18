import { Client } from "../deps.ts";
import { connectionOptions } from "../nessie.config.ts";

const client = await new Client().connect(connectionOptions);

export default client;
