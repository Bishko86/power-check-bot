import { Db } from 'mongodb';

import db from '../services/database.service';
import { Schema } from '../models';
import { CollectionsModel, UserRole } from '../../enums';

class UserSchema implements Schema {
  constructor(private db: Promise<Db>) {}

  async addSchema(): Promise<void> {
    const mongoDb = await this.db;

    mongoDb.command({
        collMod: CollectionsModel.USERS,
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['userId', 'consumerId'],
            properties: {
              userId: {
                bsonType: 'string',
                description: '"userId" points on the viber userID',
              },
              consumerId: {
                bsonType: 'string',
                description:
                  '"consumerId" points to which consumer user belongs',
              },
              role: {
                enum: [UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN],
                description:
                  '"role" is required and can only be one of the given enum values',
              },
            },
          },
        },
      });
  }
}

const user = new UserSchema(db);

export default user.addSchema();
