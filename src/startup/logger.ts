import appRoot from 'app-root-path';
import { Options } from 'morgan';
import { createLogger, transports } from 'winston';
import 'winston-daily-rotate-file';

const LOG_FILE_PATH = `${appRoot}/logs/app-%DATE%.log`;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 5;

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'info',
    filename: LOG_FILE_PATH,
    handleExceptions: true,
    json: true,
    maxsize: MAX_FILE_SIZE,
    maxFiles: MAX_FILES,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

var dailyTransport = new transports.DailyRotateFile({
  filename: 'application-%DATE%.log',
  dirname: `${appRoot}/logs/`,
  level: 'info',
  handleExceptions: true,
  json: true,
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
})

// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
  transports: [
    // new transports.File(options.file),
    new transports.Console(options.console),
    dailyTransport
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export const morganOption: Options = {
  stream: {
    write: function (message: string) {
      logger.info(message.trim());
    },
  },
};

export { logger };

