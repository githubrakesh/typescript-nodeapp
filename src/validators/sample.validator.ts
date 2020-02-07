import { BaseValidator } from "./base.validator";

export class SampleValidator extends BaseValidator {
  protected getSchemaName(): string {
    return "sample.schema.json";
  }
}
