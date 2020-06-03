import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import "reflect-metadata";
import { createConnection } from 'typeorm';
import routes from './routes';

export const startServer = async () => {

  const app = express()
  const PORT: string | number = process.env.PORT || 5000;

  // Call midlewares
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({
    limit: '50mb'
  }));

  app.use('/api/', routes);

  // await createTypeOrmConn();
  await createConnection().then(async connection => {
    console.log(`------------ Type orm connection successful! ----------`);
  }).catch(error => console.log(error));

  app.use("*", (req, res) => {
    res.send("<h1>Welcome to your simple server! Awesome right</h1>");
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT} for REST APIs`);
  });

  return app;
}

startServer();