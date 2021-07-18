import { Middleware } from "https://deno.land/x/oak/mod.ts";
import { UnauthorizedError } from "../utils/error.ts";
import { validate } from "../utils/token.ts";
import { getUserByUserId, User } from "../models/User.ts";

const auth: Middleware<{ user: User }> = async (context, next) => {
  const authorization = context.request.headers.get("authorization");

  if (authorization === null) {
    throw new UnauthorizedError();
  }

  if (!authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError();
  }

  const token = authorization.replace("Bearer ", "");

  const payload = await validate(token);

  const userId = payload.userId;

  if (typeof userId !== "string") {
    throw new UnauthorizedError();
  }

  const user = await getUserByUserId(userId);

  context.state.user = user;

  await next();
};

export default auth;
