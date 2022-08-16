import { Connection } from 'mongoose';
import {
  DATABASE_CONNECTION,
  POST_MODEL,
  USER_MODEL,
} from './database.constants';
import { Post, createPostModel } from './post.model';
import { createUserModel } from './user.model';

export const databaseModelsProviders = [
  {
    provide: POST_MODEL,
    useFactory: (connection: Connection) => createPostModel(connection),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) => createUserModel(connection),
    inject: [DATABASE_CONNECTION],
  },
];
