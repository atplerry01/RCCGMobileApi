import { createConnection, getConnectionOptions } from "typeorm";

const createTypeOrmConn = async () => {
  createConnection().then(async connection => {
    console.log(`------------ Type orm connection successful! ----------`);
    const config = await getConnectionOptions(process.env.NODE_ENV);
    // console.log(config);
  }).catch(error => console.log(error));

  return null;
};

export default createTypeOrmConn;