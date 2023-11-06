import { Db } from 'mongodb';

import db from '../services/database.service';
import { Schema } from '../models';
import { CollectionsModel } from '../../enums';

class ConsumerSchema implements Schema {
  addSchema(db: Promise<Db>): void {
    db.then((instanceDb) => {
      instanceDb.command({
        collMod: CollectionsModel.CONSUMERS,
        validator: {
          $jsonSchema: {
            bsonType: ['array'],
            minItems: 1,
            maxItems: 50,
            items: {
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
                        description: 'Username is required and must be a string'
                      },
                      userId: {
                        bsonType: 'string',
                        description: 'UserID is required and must be a string'
                      },
                    }
                  }
                },
                houseNumber: {
                  bsonType: 'number',
                  description: 'is required, and represent the number of consumer'
                },
                data: {
                  bsonType: ['array'],
                  required: ['year', 'monthlyData'],
                  properties: {
                    year: {
                      bsonType: 'number',
                      description: 'is required and represent the year of data'
                    },
                    monthlyData: {
                      bsonType: ['array'],
                      required: ['counterData', 'consumedKW'],
                      properties: {
                        counterData: {
                          bsonType: 'number',
                          description: 'is required, point on the number of consumed electricity'
                        },
                        consumedKW: {
                          bsonType: 'number',
                          description: 'is required, point on the number of consumed electricity for the last month'
                        }
                      }
                    }
                  }
                }
              }
            },
          }
        }
      });
    });
  }
}

const consumer = new ConsumerSchema();

export default consumer.addSchema(db);
