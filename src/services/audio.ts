import { getConnection, getRepository } from 'typeorm';
import { Audio } from './../entity/Audio';

export const getAudioService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM Audio order by createdDate desc`;
      const entities = await getConnection().query(q);
      
      return resolve(entities);
    } catch (err) {
      return reject({ err, message: 'No entity found' });
    }
  });
};

export const getAudioByIdService = async (Id) => {
  const entityRepository = getRepository(Audio);

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

export const createAudioService = async (entity) => {
  const entityRepository = getRepository(Audio);
  return await entityRepository.save(entity);
};

export const updateAudioService = async (entity) => {
  const entityRepository = getRepository(Audio);
  return await entityRepository.save(entity);
};

export const deleteAudioService = async (id) => {
  const entityRepository = getRepository(Audio);
  return await entityRepository.delete(id);
};
