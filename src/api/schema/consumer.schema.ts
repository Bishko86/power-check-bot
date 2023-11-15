import { Db } from 'mongodb';

import db from '../services/database.service';
import { Schema } from '../models';
import { CollectionsModel } from '../../enums';

class ConsumerSchema implements Schema {
  constructor(private db: Promise<Db>) {}

  async addSchema(): Promise<void> {
    const mongoDb = await this.db;

    mongoDb.command({
      collMod: CollectionsModel.CONSUMERS,
      validator: {
        $jsonSchema: {
          bsonType: ['object'],
          required: ['users', 'houseNumber', 'data'],
          description: '"consumers" collection represent the consumer data',
          properties: {
            users: {
              bsonType: ['array'],
              description: '"users" is required and is an array',
              items: {
                bsonType: ['object'],
                required: ['username', 'userId'],
                properties: {
                  username: {
                    bsonType: 'string',
                    description: 'Username is required and must be a string',
                  },
                  userId: {
                    bsonType: 'string',
                    description: 'UserID is required and must be a string',
                  },
                },
              },
            },
            houseNumber: {
              bsonType: 'number',
              description: 'is required, and represent the number of consumer',
            },
            data: {
              bsonType: ['array'],
              required: ['year', 'monthlyData'],
              properties: {
                year: {
                  bsonType: 'number',
                  description: 'is required and represent the year of data',
                },
                monthlyData: {
                  bsonType: ['array'],
                  required: ['dayData', 'nightData'],
                  properties: {
                    dayData: {
                      bsonType: 'number',
                      description:
                        'is required, point on the number of consumed electricity by the DAY tariff',
                    },
                    nightData: {
                      bsonType: 'number',
                      description:
                        'is not required, point on the number of consumed electricity by the NIGHT tariff',
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}

const consumer = new ConsumerSchema(db);

export default consumer.addSchema();
