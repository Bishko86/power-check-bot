import { Db } from 'mongodb';

export class MongoDBService {
  protected mongoDb: Db;

  constructor(protected db: Promise<Db>) {
    this.getMongoDb();
  }

  private getMongoDb(): void {
    this.db.then((db) => {
      this.mongoDb = db;
    });
  }
}
