import { Middleware } from "../deps.ts";

const notFound: Middleware = (context) => {
  context.response.status = 404;
  context.response.body = { error: "Not Found" };
};

export default notFound;
