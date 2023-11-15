import db from "./database.service";

import { User } from "../models";
import { CollectionsModel } from "../../enums";
import { Db } from "mongodb";

export class UserService {
  private mongoDb: Db;
  constructor(private db: Promise<Db>) {
    this.getMongoDb();
  }

  async saveUser(user: User): Promise<void> {
    const isUser = this.mongoDb
      .collection(CollectionsModel.USERS)
      .findOne({ userId: user.userId });

    if (!isUser) {
      await this.mongoDb.collection(CollectionsModel.USERS).insertOne(user);
    } else {
      console.error("USER", isUser);
    }
  }

  private getMongoDb(): void {
    this.db.then((db) => {
      this.mongoDb = db;
    });
  }
}

export default new UserService(db);
