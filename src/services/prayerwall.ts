import { getConnection, getRepository } from 'typeorm';
import { PrayerWallGroup } from '../entity/PrayerWallGroup';
import { PrayerWall } from './../entity/PrayerWall';

export const getPrayerWallGroupService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM prayerwall_group order by created desc`;
      const entities = await getConnection().query(q);
      return resolve(entities);
    } catch (err) {
      return reject({ err, message: 'No entity found' });
    }
  });
};

export const getPrayerWallService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM prayerwall order by created desc`;
      const entities = await getConnection().query(q);
      return resolve(entities);
    } catch (err) {
      return reject({ err, message: 'No entity found' });
    }
  });
};

export const getWallByDivisionIdService = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM prayerwall where division_id = '${id}' order by created desc`;
      const entities = await getConnection().query(q);
      return resolve(entities);
    } catch (err) {
      return reject({ err, message: 'No entity found' });
    }
  });
};

// getPrayerWallByIdService
export const getPrayerWallByIdService = async (Id) => {
  const entityRepository = getRepository(PrayerWall);
  
  try {
    return {
      success: true,
      // data: await entityRepository.findOneOrFail(Id, { 
      //   // relations: ["transcribe", "blogVideos", "blogVideos.video", "blogAudios", "blogAudios.audio"]
      // }),
      data: await entityRepository.findOneOrFail(Id),
    };
  } catch (error) {
    console.log(error);
    
    return {
      success: false,
      msg: 'Entity not found',
    };
  }
};

export const getPrayerWallGroupByIdService = async (Id) => {
  const entityRepository = getRepository(PrayerWallGroup);
  
  try {
    return {
      success: true,
      data: await entityRepository.findOneOrFail(Id),
    };
  } catch (error) {
    console.log(error);
    
    return {
      success: false,
      msg: 'Entity not found',
    };
  }
};


// getWallByGroupIdService
export const getWallByGroupIdService = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM prayerwall where group_id = '${id}' order by created desc`;
      const entities = await getConnection().query(q);
      return resolve(entities);
    } catch (err) {
      return reject({ err, message: 'No entity found' });
    }
  });
};

export const getDivisionGroupService = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM prayerwall_group where division_id = '${id}' order by created desc`;
      const entities = await getConnection().query(q);
      return resolve(entities);
    } catch (err) {
      return reject({ err, message: 'No entity found' });
    }
  });
};

export const createPrayerWallService = async (entity) => {
  const entityRepository = getRepository(PrayerWall);
  var result = await entityRepository.save(entity);
  console.log(result);
  return result; // await entityRepository.save(entity);
};

export const createPrayerWallGroupService = async (entity) => {
  const entityRepository = getRepository(PrayerWallGroup);
  var result = await entityRepository.save(entity);
  console.log(result);
  return result; // await entityRepository.save(entity);
};

export const updatePrayerWallService = async (entity) => {
  const entityRepository = getRepository(PrayerWall);
  return await entityRepository.save(entity);
};

export const deletePrayerWallService = async (id) => {
  const entityRepository = getRepository(PrayerWall);
  return await entityRepository.delete(id);
};

export const deletePrayerWallGroupService = async (id) => {
  const entityRepository = getRepository(PrayerWallGroup);
  return await entityRepository.delete(id);
};