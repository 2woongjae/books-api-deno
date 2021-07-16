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

export async function getBooksByOwnerId(userId: string): Promise<Book[]> {
  const { rows } = await client.execute(
    `SELECT * FROM Books WHERE ownerId = '${userId}'`
  );
  if (rows === undefined) throw new Error();

  return rows;
}
