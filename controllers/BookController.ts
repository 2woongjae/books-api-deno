import { RouterContext } from "https://deno.land/x/oak/mod.ts";

export default class BookController {
  public createBook(context: RouterContext) {
    context.response.body = "createBook";
  }

  public getBooks(context: RouterContext) {
    context.response.body = "getBooks";
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
