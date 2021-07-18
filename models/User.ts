import client from "./config.ts";

export interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export async function getUserByEmail(email: string): Promise<User> {
  const { rows } = await client.execute(
    `SELECT * FROM Users WHERE email = '${email}'`
  );
  if (rows === undefined) throw new Error();
  if (rows.length !== 1) throw new Error();
  return rows[0];
}

export async function getUserByUserId(userId: string): Promise<User> {
  const { rows } = await client.execute(
    `SELECT * FROM Users WHERE userId = '${userId}'`
  );
  if (rows === undefined) throw new Error();
  if (rows.length !== 1) throw new Error();
  return rows[0];
}
