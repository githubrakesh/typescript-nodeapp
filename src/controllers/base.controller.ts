import { Dictionary } from "async";
import { UnprocessableEntityException } from "../exceptions/commons/unprocessable-entity.exception";

export class BaseController {
  static async validate(data: Dictionary<any>, validator: new () => any) {
    try {
      await new validator().validate(data);
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }

    return;
  }
}
