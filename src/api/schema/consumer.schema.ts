import { Db } from 'mongodb';

import db from '../services/database.service';
import { Schema } from '../models';
import { CollectionsModel } from '../../enums';

class ConsumerSchema implements Schema {
  constructor(private db: Promise<Db>) { }

  async addSchema(): Promise<void> {
    const mongoDb = await this.db;

    mongoDb.command({
      collMod: CollectionsModel.CONSUMERS,
      validator: {
        $jsonSchema: {
          bsonType: ['object'],
          required: ['hasNightTariff', 'houseNumber', 'data'],
          description: '"consumers" collection represent the consumer data',
          properties: {
            hasNightTariff: {
              bsonType: 'bool',
              description: 'is required, and represent the number of consumer',
            },
            houseNumber: {
              bsonType: 'number',
              description: 'is required, and represent the number of consumer',
            },
            data: {
              bsonType: ['array'],
              items: {}
            },
          },
        },
      },
    });
  }
}

const consumer = new ConsumerSchema(db);

export default consumer.addSchema();
