import { Db, Document, ObjectId, WithId } from "mongodb";
import { CollectionsModel } from "../../enums";
import Catch from '../../utils/catch-decorator.util';
import { DataIndicators } from '../models';
import { MongoDBService } from './mongo-db.service';

export class ConsumersService extends MongoDBService {

  constructor(protected override db: Promise<Db>) {
    super(db);
  }

  @Catch
  async getConsumerById(consumerId: string): Promise<WithId<Document> | null> {
    const consumer = await this.mongoDb
      .collection(CollectionsModel.CONSUMERS)
      .findOne({ consumerId });

    return consumer;
  }

  @Catch
  async saveCounterData(consumerId: string, counterData: DataIndicators): Promise<void> {
    const consumerObjectId = new ObjectId(consumerId);

    await this.mongoDb
      .collection(CollectionsModel.CONSUMERS)
      .updateOne({ _id: consumerObjectId }, { $push: { data: counterData } });
  }
}
