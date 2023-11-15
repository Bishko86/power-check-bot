import { Db } from "mongodb";
import { CollectionsModel } from "../../enums";

export class ConsumersService {
  constructor(private mongoDb: Promise<Db>) {}

  getConsumerById(): any {
    //TODO add method body
  }
}
