import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";
import notFound from "./not_found.ts";

const port = 5000;

const app = new Application();

app.use(router.routes());

app.use(notFound);

await app.listen({ port });
