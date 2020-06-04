import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import * as path from 'path';
import "reflect-metadata";
import routes from './routes';
import dbConn from './startup/db';
import exceptionLogger from './startup/exception';
import { logger, morganOption } from './startup/logger';
var createError = require('http-errors');
// var morgan = require('morgan');

dotenv.config();

export const startServer = async () => {

  const app = express()
  const PORT: string | number = process.env.PORT || 5003;

  app.use(morgan('combined', morganOption));
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ limit: '50mb' }));

  app.use(express.static(path.join(__dirname, 'www')));
  app.set('view engine', 'html');

  app.use('/api/', routes);

  dbConn();
  exceptionLogger(app);

  app.listen(PORT, () => {
    logger.info(`🚀 Server ready at http://localhost:${PORT} for REST APIs`);
  });

  return app;
}


startServer();


  // error handler
  // catch 404 and forward to error handler
  // app.use(function (req, res, next) {
  //   // next(createError(404));
  // });
