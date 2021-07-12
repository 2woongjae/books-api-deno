import { RouterContext } from "https://deno.land/x/oak/mod.ts";

export default class UserController {
  public login(context: RouterContext) {
    context.response.body = "login";
  }

  public logout(context: RouterContext) {
    context.response.body = "logout";
  }
}
