import { ConfigType } from '@nestjs/config';
import { Connection, createConnection, Schema, model } from 'mongoose';
import { isNumberObject } from 'util/types';
import mongodbConfig from '../config/mongodb.config';
import { DATABASE_CONNECTION } from './database.constants';

export const databaseConnectionProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (dbConfig: ConfigType<typeof mongodbConfig>): Connection => {
      const conn = createConnection(dbConfig.uri, {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
        //see: https://mongoosejs.com/docs/deprecations.html#findandmodify
        //useFindAndModify: false,
      });

      conn.on('error', console.error.bind(console, 'connection error:'));

      interface Iuser {
        name: string;
      }
      const schema = new Schema<Iuser>(
        {
          name: { type: String, required: true },
        },
        { collection: 'MyUsers' },
      );

      const MyUser = conn.model<Iuser>('MyUser', schema);

      const user = new MyUser({
        name: 'María',
      });

      user
        .save()
        .then(() => {
          console.log('Creado');
        })
        .catch((error) => {
          console.log(error);
        });

      return conn;
    },
    inject: [mongodbConfig.KEY],
  },
];
