export class UnauthorizedError extends Error {
  status = 401;
  message = "Unauthorized Error";
}
