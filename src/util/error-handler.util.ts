import { NextFunction, Request, Response } from "express";
import { ApiErrorCode, HttpException } from "../exceptions/commons/http.exception";
import { InternalException } from "../exceptions/commons/internal.exception";
import { ENV_ENVIRONMENT } from "./secrets.util";
import { ENVIRONMENT_DEV } from "./constants.util";
import logger from "./logger.util";

export const errorHandler = (method: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await method(req, res, next);
  } catch (error) {
    if (ENV_ENVIRONMENT === ENVIRONMENT_DEV) {
      logger.error(error);
    }

    let exception: HttpException;

    if (HttpException.prototype.isPrototypeOf(error)) {
      exception = error;
    } else {
      exception = new InternalException("Something went wrong...", ApiErrorCode.GENERAL_UNKNOWN, error);
    }

    res.status(exception.statusCode).json({
      message: exception.message,
      code: exception.errorCode,
      meta: exception.meta,
      errors: exception.errors
    });
  }
};
