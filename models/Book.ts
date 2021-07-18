import client from "./config.ts";

export interface Book {
  id: string;
  ownerId: string;
  title: string;
  message: string;
  author: string;
  url: string;
  created_at: Date;
  updated_at: Date;
}

export type BookPostData = Pick<Book, "title" | "message" | "author" | "url">;

export async function getBooksByOwnerId(userId: string): Promise<Book[]> {
  const { rows } = await client.execute(
    `SELECT * FROM Books WHERE ownerId = '${userId}'`
  );
  if (rows === undefined) throw new Error();

  return rows;
}

export async function createBook(
  book: BookPostData,
  ownerId: string
): Promise<void> {
  await client.execute(
    `INSERT INTO Books VALUES (DEFAULT, '${ownerId}', '${book.title}', '${book.message}', '${book.author}', '${book.url}', DEFAULT, DEFAULT)`
  );
}

export async function getBookById(id: number, ownerId: string): Promise<Book> {
  const { rows } = await client.execute(
    `SELECT * FROM Books WHERE ownerId = '${ownerId}' AND id = id`
  );
  if (rows === undefined) throw new Error();
  if (rows.length !== 1) throw new Error();

  return rows[0];
}
