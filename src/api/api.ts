
import db from './services/database.service';
import './schema/main-counter.schema';
import './schema/consumer.schema';
import './schema/user.schema';

export class MongoDB {
  static startConnection(): void {
    const collection = db;
  }
}
