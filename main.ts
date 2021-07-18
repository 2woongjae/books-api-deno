import { config, Application } from "./deps.ts";
import errorHandler from "./middlewares/errorHandler.ts";
import router from "./middlewares/router.ts";
import notFound from "./middlewares/not_found.ts";

const env = config();
const port = Number(env.PORT) || 5000;

const app = new Application();

app.use(errorHandler);
app.use(router.routes());
app.use(notFound);

await app.listen({ port });
