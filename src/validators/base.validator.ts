import { ValidatorAbstract, ValidatorService } from "request-validator-node";
import { validatorService } from "../services/factories/validator.service";

export abstract class BaseValidator extends ValidatorAbstract {
  protected getValidatorInstance(): ValidatorService {
    return validatorService;
  }
}
