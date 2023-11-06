import * as mongoDB from 'mongodb';
import { CollectionsModel } from '../../enums';
import { CollectionModelData } from '../models';

class DataBaseService {
  private static mongoClient: mongoDB.MongoClient;
  private static collections: CollectionModelData;
  private static db: mongoDB.Db

  private constructor() { }

  static async connectDB(): Promise<mongoDB.Db> {
    if (this.mongoClient) {
      return this.db;
    }

    this.mongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING ?? '');
    await this.mongoClient.connect();

    this.db = this.mongoClient.db(process.env.DB_NAME);
    this.collections = Object.fromEntries(Object.values(CollectionsModel).map((collectionName) => {
      return [collectionName, this.db.collection(collectionName)];
    })) as CollectionModelData;

    console.error(`The mongoDB "${this.db.namespace}" is successfully connected`);
    return this.db;
  }
}

export default DataBaseService.connectDB();