import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import "reflect-metadata";
import { createTypeOrmConn } from '../createTypeOrmConn';

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


  await createTypeOrmConn();


  app.use("*", (req, res) => {
    res.send("<h1>Welcome to your simple server! Awesome right</h1>");
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT} for REST APIs`);
  });

  return app;
}

startServer();