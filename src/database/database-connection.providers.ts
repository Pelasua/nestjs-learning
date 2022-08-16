import { ConfigType } from '@nestjs/config';
import { Connection, createConnection, Schema, model } from 'mongoose';
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

      conn.on('connected', () => {
        console.log('Conectado');
      });

      conn.on('error', console.error.bind(console, 'connection error:'));

      interface Iuser {
        id: number;
      }
      const schema = new Schema<Iuser>({
        id: { type: Number, required: true },
      });

      const prueba = model<Iuser>('users', schema);
      async function pruebaa() {
        console.log('first');
        const ala = await prueba.exists({ id: 1 });
        console.log(ala);
      }

      pruebaa();

      return conn;
    },
    inject: [mongodbConfig.KEY],
  },
];
