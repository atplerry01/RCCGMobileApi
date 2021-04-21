import { getConnection, getRepository } from 'typeorm';
import { PrayerRequest } from './../entity/PrayerRequest';
import { PrayerRequestUser } from './../entity/PrayerRequestUser';

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
    console.log(error);
    
    return {
      success: false,
      msg: 'Entity not found',
    };
  }
};

export const getUserPrayerRequestService = async (user_Id) => {
  const entityRepository = getRepository(PrayerRequest);
  try {
    const pwu = await entityRepository.findOneOrFail({ where: { user_Id }})

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

  // console.log('xxxx', entityRepository);
  
  const result = await entityRepository.save(entity);

  console.log('@@', result);
  
  return result; // await entityRepository.save(entity);
};

export const updatePrayerRequestService = async (entity) => {
  const entityRepository = getRepository(PrayerRequest);
  return await entityRepository.save(entity);
};

export const getPrayerRequestUserIdService = async (prayerRequestId, user_Id) => {
  const entityRepository = getRepository(PrayerRequestUser);

  try {
    const pwu = await entityRepository.findOneOrFail({ where: { prayerRequestId, user_Id }})

    return {
      success: true,
      data: pwu,
    };
  } catch (error) {
    return {
      success: false,
      msg: 'Entity not found',
    };
  }
};

export const increasePrayerRequestUserCountService = async (prayerRequestId, user_Id) => {
  const entityRepository = getRepository(PrayerRequestUser);

  try {
    const pwu = await entityRepository.findOneOrFail({ where: { prayerRequestId, user_Id }});

    return {
      success: true,
      data: pwu,
    };
  } catch (error) {
    return {
      success: false,
      msg: 'Entity not found',
    };
  }
};

export const createPrayerRequestUserService = async (entity) => {
  const entityRepository = getRepository(PrayerRequestUser);
  return await entityRepository.save(entity);
};

export const deletePrayerRequestService = async (id) => {
  const entityRepository = getRepository(PrayerRequest);
  return await entityRepository.delete(id);
};
