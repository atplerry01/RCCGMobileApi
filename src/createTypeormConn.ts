import { createConnection } from "typeorm";

const createTypeOrmConn = async () => {
  createConnection().then(async connection => {
    console.log(`------------ Type orm connection successful! ----------`);
  }).catch(error => console.log(error));

  return null;
};

export default createTypeOrmConn;