import db from "./database.service";

import { DataIndicators, User } from "../models";
import { CollectionsModel } from "../../enums";
import { Db } from "mongodb";
import Catch from '../../utils/catch-decorator.util';
import { ConsumersService } from './consumers.service';
import { MongoDBService } from './mongo-db.service';


export class UserService extends MongoDBService {
  constructor(
    protected override db: Promise<Db>,
    private consumerService: ConsumersService) {
    super(db);
  }

  @Catch
  async saveUser(user: User): Promise<void> {
    const isUser = await this.mongoDb
      .collection(CollectionsModel.USERS)
      .findOne({ userId: user.userId });
    if (!isUser) {
      await this.mongoDb.collection(CollectionsModel.USERS).insertOne(user);
    } else {
      console.error("USER", isUser);
    }
  }

  @Catch
  async submitCounterData(userId: string, dayCounterData: number, nightCounterData: number = 0): Promise<void> {
    const user = await this.mongoDb
      .collection(CollectionsModel.USERS)
      .findOne({ userId }) as User | null;

    if (user) {
      const date = new Date().toISOString();
      const monthlyData: DataIndicators  = {
        date,
        dayCounterData,
        nightCounterData
      }

      this.consumerService.saveCounterData(user.consumerId, monthlyData);
    }
  }
}

const consumerService = new ConsumersService(db);

export default new UserService(db, consumerService);
