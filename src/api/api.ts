
import db from './services/database.service';
import './schema/main-counter.schema';
import './schema/consumer.schema';
import './schema/user.schema';
import { Db } from 'mongodb';

export class MongoDB {
  static startConnection(): Promise<Db> {
    return db;
  }
}
