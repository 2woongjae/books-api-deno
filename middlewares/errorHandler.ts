import { Middleware } from "../deps.ts";

const errorHandler: Middleware = async (context, next) => {
  try {
    await next();
  } catch (error) {
    context.response.status = error.status || 400;
    context.response.body = { error: error.message };
  }
};

export default errorHandler;
