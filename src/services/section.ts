import { getConnection, getRepository } from 'typeorm';
import { Section } from './../entity/Section';

export const getSectionService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM rccgmobile.section`;
      const entities = await getConnection().query(q);
      return resolve(entities);
    } catch (err) {
      return reject({ err, message: 'No entity found' });
    }
  });
};

export const getSectionByIdService = async (Id) => {
  const entityRepository = getRepository(Section);
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

export const createSectionService = async (entity) => {
  const entityRepository = getRepository(Section);
  return await entityRepository.save(entity);
};

export const updateSectionService = async (entity) => {
  const entityRepository = getRepository(Section);
  return await entityRepository.save(entity);
};

export const deleteSectionService = async (id) => {
  const entityRepository = getRepository(Section);
  return await entityRepository.delete(id);
};
