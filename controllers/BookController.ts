import { RouterContext, BodyForm } from "https://deno.land/x/oak/mod.ts";
import { validate } from "../utils/token.ts";
import { getBooksByOwnerId, createBook } from "../models/Book.ts";
import { UnauthorizedError, ParameterRequired } from "../utils/error.ts";

export default class BookController {
  public async createBook(context: RouterContext) {
    const authorization = context.request.headers.get("authorization");

    if (authorization === null) {
      throw new UnauthorizedError();
    }

    if (!authorization.startsWith("Bearer ")) {
      throw new UnauthorizedError();
    }

    const token = authorization.replace("Bearer ", "");

    const payload = await validate(token);

    const userId = payload.userId as string;

    if (userId === undefined) {
      throw new UnauthorizedError();
    }

    const { type, value } = (await context.request.body()) as BodyForm;
    const params = await value;

    const title = params.get("title");
    const message = params.get("message");
    const author = params.get("author");
    const url = params.get("url");

    if (title === null || message === null || author === null || url === null) {
      throw new ParameterRequired();
    }

    await createBook({ title, message, author, url }, userId);

    context.response.body = { success: true };
  }

  public async getBooks(context: RouterContext) {
    const authorization = context.request.headers.get("authorization");
    console.log(authorization);

    if (authorization === null) {
      throw new UnauthorizedError();
    }

    if (!authorization.startsWith("Bearer ")) {
      throw new UnauthorizedError();
    }

    const token = authorization.replace("Bearer ", "");
    console.log(token);

    const payload = await validate(token);
    console.log(payload);

    const userId = payload.userId as string;

    if (userId === undefined) {
      throw new UnauthorizedError();
    }

    const books = await getBooksByOwnerId(userId);

    context.response.body = books;
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
