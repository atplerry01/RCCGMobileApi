import { getConnection, getRepository } from 'typeorm';
import { PrayerRequest } from './../entity/PrayerRequest';

export const getPrayerRequestService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM prayerrequest order by requestDate desc`;
      const entities = await getConnection().query(q);
      return resolve(entities);
    } catch (err) {
      return reject({ err, message: 'No entity found' });
    }
  });
};

export const getPrayerRequestByIdService = async (Id) => {
  const entityRepository = getRepository(PrayerRequest);
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

export const getUserPrayerRequestService = async (userId) => {
  const entityRepository = getRepository(PrayerRequest);
  try {
    const pwu = await entityRepository.findOneOrFail({ where: { userId }})

    return {
      success: true,
      data: pwu
    };
  } catch (error) {
    return {
      success: false,
      msg: 'Entity not found',
    };
  }
};

export const createPrayerRequestService = async (entity) => {
  const entityRepository = getRepository(PrayerRequest);
  return await entityRepository.save(entity);
};

export const updatePrayerRequestService = async (entity) => {
  const entityRepository = getRepository(PrayerRequest);
  return await entityRepository.save(entity);
};

export const deletePrayerRequestService = async (id) => {
  const entityRepository = getRepository(PrayerRequest);
  return await entityRepository.delete(id);
};
