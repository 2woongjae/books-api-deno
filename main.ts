import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";
import notFound from "./not_found.ts";

const env = config();
const port = Number(env.PORT) || 5000;

const app = new Application();

app.use(router.routes());

app.use(notFound);

await app.listen({ port });
