import { Db } from 'mongodb';

import db from '../services/database.service';
import { Schema } from '../models';
import { CollectionsModel } from '../../enums';

class MainCounterSchema implements Schema {
  constructor(private db: Promise<Db>) {}

  async addSchema(): Promise<void> {
    const mongoDb = await this.db;

    mongoDb.command({
      collMod: CollectionsModel.MAIN_COUNTER,
      validator: {
        $jsonSchema: {
          bsonType: ['object'],
          required: [
            'data',
            'dayPrice',
            'nightPrice',
            'actualDayPrice',
            'actualNightPrice',
            'consumedDayKW',
            'consumedNightKW',
          ],
          additionalProperties: false,
          properties: {
            _id: {},
            data: {
              bsonType: ['array'],
              description: '"data" is required and is an array',
              items: {
                bsonType: ['object'],
                required: ['year', 'monthlyData'],
                properties: {
                  year: {
                    bsonType: 'number',
                    description:
                      '"year" is required and represent the year of data',
                  },
                  monthlyData: {
                    bsonType: 'object',
                    required: ['dayData', 'nightData'],
                    description:
                      '"monthlyData" is required and must be a object',
                    properties: {
                      dayData: {
                        bsonType: 'number',
                        description:
                          '"counterData" is required and represents the main counter state consumed by the day tariff',
                      },
                      nightData: {
                        bsonType: 'number',
                        description:
                          '"consumedKW" is required and represents the main counter state consumed by the night tariff',
                      },
                    },
                  },
                },
              },
            },
            dayPrice: {
              bsonType: 'number',
              description: 'The market price property for the DAY tariff',
            },
            nightPrice: {
              bsonType: 'number',
              description: 'The market price property for the NIGHT tariff',
            },
            actualDayPrice: {
              bsonType: 'number',
              description:
                'The actual price that the consumer should pay by the DAY tariff, with all compensations',
            },
            actualNightPrice: {
              bsonType: 'number',
              description:
                'The actual price that the consumer should pay by the NIGHT tariff, with all compensations',
            },
            consumedDayKW: {
              bsonType: 'number',
              description: 'Point on the general amount of the consumed kW by the day tariff',
            },
            consumedNightKW: {
              bsonType: 'number',
              description: 'Point on the general amount of the consumed kW by the night tariff',
            },
          },
        },
      },
    });
  }
}

const mainCounter = new MainCounterSchema(db);

export default mainCounter.addSchema();
