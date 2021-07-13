import { RouterContext, BodyForm } from "https://deno.land/x/oak/mod.ts";
import { getUserByEmail } from "../models/User.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import { generate } from "../utils/token.ts";

export default class UserController {
  public async login(context: RouterContext) {
    const { type, value } = (await context.request.body()) as BodyForm;
    const params = await value;

    const email = params.get("email");
    const password = params.get("password");

    console.log(email, password); // 2woongjae@gmail.com deno1234

    if (email === null || password === null) {
      context.response.status = 422;
      context.response.body = { error: "email or password required" };
      return;
    }

    const user = await getUserByEmail(email);
    console.log(user);

    const match = await bcrypt.compare(password, user.password);
    console.log(match);

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
