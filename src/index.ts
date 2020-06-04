import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import * as path from 'path';
import "reflect-metadata";
import { createConnection, getConnectionOptions } from 'typeorm';
import routes from './routes';
import createTypeOrmConn from './startup/db';

dotenv.config();

export const startServer = async () => {

  const app = express()
  const PORT: string | number = process.env.PORT || 5003;

  console.log(process.env.NODE_ENV);
  
  // Call midlewares
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({
    limit: '50mb'
  }));

  app.use('/api/', routes);

  app.use(express.static(path.join(__dirname, 'www')));
  app.set('view engine', 'html');

  app.use("*", (req, res) => {
    res.send("<h1>Welcome to your simple server! Awesome right</h1>");
  });

  // // type ORM Connection
  // await createConnection().then(async connection => {
  //   console.log(`------------ Type orm connection successful! ----------`);
  //   const config = await getConnectionOptions(process.env.NODE_ENV);
  //   console.log(config);
  //   // return createConnection({
  //   //   ...config,
  //   //   // name: "default"
  //   // });
    
  // }).catch(error => console.log(error));
  createTypeOrmConn();

  // handle global exceptions
  process.on('uncaughtException', function (err) {
    console.error('global exception:', err.message);
  });
  
  process.on('unhandledRejection', function (reason: any, _promise) {
    console.error('unhandled promise rejection:', reason.message || reason);
  });


  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT} for REST APIs`);
  });

  return app;
}

// export const createTypeOrmConn = async () => {
//   createConnection().then(async connection => {
//     console.log(`------------ Type orm connection successful! ----------`);
//     const config = await getConnectionOptions(process.env.NODE_ENV);
//     console.log(config);
//   }).catch(error => console.log(error));

//   return null;
// };

startServer();