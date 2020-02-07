import { Dictionary } from "async";
import { TransformerAbstract } from "transformer-abstract-node";

export class SampleTransformer extends TransformerAbstract<any> { // Using any for now replace it with your entity's interface
  protected _map(sample: any): Dictionary<any> {
    return {
      id: sample._id,
      name: sample.name
    };
  }
}
