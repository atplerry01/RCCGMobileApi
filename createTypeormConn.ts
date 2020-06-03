import { createConnection } from "typeorm";

export const createTypeOrmConn = async () => {

  createConnection().then(async connection => {
    console.log(`------------ Type orm connection successful! ----------`);
  }).catch(error => console.log(error));

  return null;
};
