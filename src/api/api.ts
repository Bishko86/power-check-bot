
import db from './services/database.service';
import './schema/main-counter.schema';
import './schema/consumer.schema';
import './schema/user.schema';

export class MongoDB {
  static async startConnection(): Promise<void> {
    const collection = await db;
  }
}
