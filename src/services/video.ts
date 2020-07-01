import { getConnection, getRepository } from 'typeorm';
import { Video } from './../entity/Video';

export const getVideoService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM Video order by createdDate desc`;
      const entities = await getConnection().query(q);
      return resolve(entities);
    } catch (err) {
      return reject({ err, message: 'No entity found' });
    }
  });
};

export const getVideoByIdService = async (Id) => {
  const entityRepository = getRepository(Video);
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

export const createVideoService = async (entity) => {
  const entityRepository = getRepository(Video);
  return await entityRepository.save(entity);
};

export const updateVideoService = async (entity) => {
  const entityRepository = getRepository(Video);
  const res = await entityRepository.save(entity);
  console.log('#####', res);
  return res;
};

export const deleteVideoService = async (id) => {
  const entityRepository = getRepository(Video);
  return await entityRepository.delete(id);
};
