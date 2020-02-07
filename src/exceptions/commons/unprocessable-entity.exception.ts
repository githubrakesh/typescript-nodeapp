import { ApiErrorCode, HttpException } from "./http.exception";

export class UnprocessableEntityException extends HttpException {
  private static MESSAGE = "Validation Error";

  constructor(
    errors: any,
    message: string = UnprocessableEntityException.MESSAGE,
    errorCode: ApiErrorCode = ApiErrorCode.GENERAL_VALIDATION,
    meta?: any) {

    super(message, errorCode, 422, errors, meta);
  }
}
