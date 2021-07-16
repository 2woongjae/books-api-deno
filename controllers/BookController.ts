import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { validate } from "../utils/token.ts";
import { getBooksByOwnerId } from "../models/Book.ts";
export default class BookController {
  public createBook(context: RouterContext) {
    context.response.body = "createBook";
  }

  public async getBooks(context: RouterContext) {
    try {
      const authorization = context.request.headers.get("authorization");
      console.log(authorization);

      if (authorization === null) {
        throw new Error();
      }

      if (!authorization.startsWith("Bearer ")) {
        throw new Error();
      }

      const token = authorization.replace("Bearer ", "");
      console.log(token);

      const payload = await validate(token);
      console.log(payload);

      const userId = payload.userId as string;

      if (userId === undefined) {
        throw new Error();
      }

      const books = await getBooksByOwnerId(userId);

      context.response.body = books;
    } catch (error) {
      context.response.status = 401;
      context.response.body = { error: "Unauthorized" };
    }
  }

  public getBook(context: RouterContext) {
    const id = context.params.id;
    context.response.body = "getBook : " + id;
  }

  public updateBook(context: RouterContext) {
    const id = context.params.id;
    context.response.body = "updateBook : " + id;
  }

  public deleteBook(context: RouterContext) {
    const id = context.params.id;
    context.response.body = "deleteBook : " + id;
  }
}
