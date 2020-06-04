import { createConnection } from "typeorm";
import { logger } from "./logger";

const dbConn = async () => {
  createConnection().then(async connection => {
    logger.info(`------------ Type orm connection successful! ----------`);
    // const config = await getConnectionOptions(process.env.NODE_ENV);
    // console.log(config);
  }).catch(error => logger.error(error));

  return null;
};

export default dbConn;