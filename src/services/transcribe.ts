import { getConnection, getRepository } from 'typeorm';
import { Transcribe } from './../entity/Transcribe';

export const getTranscribeService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM rm_Transcribe order by createdDate desc`;
      const entities = await getConnection().query(q);
      return resolve(entities);
    } catch (err) {
      return reject({ err, message: 'No entity found' });
    }
  });
};

export const getTranscribeByIdService = async (Id) => {
  const entityRepository = getRepository(Transcribe);
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

export const createTranscribeService = async (entity) => {
  const entityRepository = getRepository(Transcribe);
  return await entityRepository.save(entity);
};

export const updateTranscribeService = async (entity) => {
  const entityRepository = getRepository(Transcribe);
  return await entityRepository.save(entity);
};

export const deleteTranscribeService = async (id) => {
  const entityRepository = getRepository(Transcribe);
  return await entityRepository.delete(id);
};
