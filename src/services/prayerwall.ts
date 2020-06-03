import { getConnection, getRepository } from 'typeorm';
import { PrayerWall } from './../entity/PrayerWall';

export const getPrayerWallService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM rccgmobile.prayerwall order by requestDate desc`;
      const entities = await getConnection().query(q);
      return resolve(entities);
    } catch (err) {
      return reject({ err, message: 'No entity found' });
    }
  });
};

export const getPrayerWallByIdService = async (Id) => {
  const entityRepository = getRepository(PrayerWall);
  try {
    return {
      success: true,
      data: await entityRepository.findOneOrFail(Id),
    };
  } catch (error) {
    return {
      success: false,
      msg: 'Entity not found',
    };
  }
};

export const createPrayerWallService = async (entity) => {
  const entityRepository = getRepository(PrayerWall);
  return await entityRepository.save(entity);
};

export const updatePrayerWallService = async (entity) => {
  const entityRepository = getRepository(PrayerWall);
  return await entityRepository.save(entity);
};

export const deletePrayerWallService = async (id) => {
  const entityRepository = getRepository(PrayerWall);
  return await entityRepository.delete(id);
};
