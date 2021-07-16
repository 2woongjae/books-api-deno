import {
  create,
  Header,
  getNumericDate,
  verify,
  Payload,
} from "https://deno.land/x/djwt@v2.2/mod.ts";
import { User } from "../models/User.ts";

const key = "markzzang";

const header: Header = {
  alg: "HS256",
  typ: "JWT",
};

export async function generate(user: User): Promise<string> {
  return await create(
    header,
    {
      iss: "mark",
      exp: getNumericDate(10 * 60 * 60),
      userId: user.userId,
      email: user.email,
    },
    key
  );
}

export async function validate(token: string): Promise<Payload> {
  return await verify(token, key, header.alg);
}
