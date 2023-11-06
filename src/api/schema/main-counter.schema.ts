import { Db } from 'mongodb';

import db from '../services/database.service';
import { Schema } from '../models';
import { CollectionsModel } from '../../enums';

class MainCounterSchema implements Schema {
  addSchema(db: Promise<Db>): void {
    db.then((instanceDb) => {
      instanceDb.command({
        collMod: CollectionsModel.MAIN_COUNTER,
        validator: {
          $jsonSchema: {
            bsonType: ['object'],
            required: ['data', 'primaryPrice', 'actualPrice', 'consumedKW', 'submittedKW'],
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
                      description: '"year"is required and represent the year of data',
                    },
                    monthlyData: {
                      bsonType: 'object',
                      required: ['counterData', 'consumedKW'],
                      description: '"monthlyData" is required and must be a object',
                      properties: {
                        counterData: {
                          bsonType: 'number',
                          description: '"counterData" is required and represents the main counter state',
                        },
                        consumedKW: {
                          bsonType: 'number',
                          description: '"consumedKW" is required and represents the consumed electricity for the last month',
                        }
                      }
                    },
                  }
                }
              },
              primaryPrice: {
                bsonType: 'number',
                description: 'The market price property'
              },
              actualPrice: {
                bsonType: 'number',
                description: 'The actual price that consumer should pay, with all compensations'
              },
              consumedKW: {
                bsonType: 'number',
                description: 'Point on the general amount of the consumed kW'
              },
              submittedKW: {
                bsonType: 'number',
                description: 'Point on the general amount of the submitted kW'
              },
              residualBalance: {
                bsonType: 'number',
                description: 'The residual balance on the account'
              }
            }
          }
        }
      });
    });
  }
}

const mainCounter = new MainCounterSchema();

export default mainCounter.addSchema(db);
