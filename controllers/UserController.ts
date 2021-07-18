import { RouterContext, BodyForm, bcrypt } from "../deps.ts";
import { getUserByEmail } from "../models/User.ts";
import { generate } from "../utils/token.ts";

export default class UserController {
  public async login(context: RouterContext) {
    const { type, value } = (await context.request.body()) as BodyForm;
    const params = await value;

    const email = params.get("email");
    const password = params.get("password");

    if (email === null || password === null) {
      context.response.status = 422;
      context.response.body = { error: "email or password required" };
      return;
    }

    const user = await getUserByEmail(email);

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      context.response.body = { token: await generate(user) };
    } else {
      context.response.status = 400;
      context.response.body = { error: "wrong password" };
    }
  }

  public logout(context: RouterContext) {
    context.response.body = "logout";
  }
}
