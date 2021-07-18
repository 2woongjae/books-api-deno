import { Router } from "https://deno.land/x/oak/mod.ts";
import UserController from "../controllers/UserController.ts";
import BookController from "../controllers/BookController.ts";
import auth from "./auth.ts";

const router = new Router();
const userController = new UserController();
const bookController = new BookController();

router
  .post("/login", userController.login)
  .delete("/logout", auth, userController.logout)
  .post("/book", auth, bookController.createBook)
  .get("/book", auth, bookController.getBooks)
  .get("/book/:id", auth, bookController.getBook)
  .patch("/book/:id", auth, bookController.updateBook)
  .delete("/book/:id", auth, bookController.deleteBook);

export default router;
