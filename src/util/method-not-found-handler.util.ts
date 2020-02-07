import { errorHandler } from "./error-handler.util";
import { MethodNotFoundException } from "../exceptions/commons/method-not-found.exception";

export const methodNotFoundHandler = errorHandler(() => {
  throw new MethodNotFoundException();
});
