import { Db } from 'mongodb';

import db from '../services/database.service';
import { Schema } from '../models';
import { CollectionsModel, UserRole } from '../../enums';

class UserSchema implements Schema {
  addSchema(db: Promise<Db>): void {
    db.then((instanceDb) => {
      instanceDb.command({
        collMod: CollectionsModel.USERS,
        validator: {
          $jsonSchema: {
            bsonType: ['array'],
            additionalProperties: false,
            items: {
              bsonType: ['object'],
              required: ['userId', 'consumerId', 'role'],
              description: '"users" collection represents of the list of all users signed up in system',
              properties: {
                userId: {
                  bsonType: 'string',
                  description: '"userId" points on the viber userID',
                },
                consumerId: {
                  bsonType: 'string',
                  description: '"consumerId" points to which consumer user belongs',
                },
                role: {
                  enum: [UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN],
                  description: '"role" is required and can only be one of the given enum values'
                }
              }
            }
          }
        }
      });
    });
  }
}

const user = new UserSchema();

export default user.addSchema(db);
