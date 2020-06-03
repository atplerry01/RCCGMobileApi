import { getConnection, getRepository } from 'typeorm';
import { PastorBlog } from './../entity/PastorBlog';

export const getPastorBlogService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM rccgmobile.pastorblog order by requestDate desc`;
      const entities = await getConnection().query(q);
      return resolve(entities);
    } catch (err) {
      return reject({ err, message: 'No entity found' });
    }
  });
};

export const getPastorBlogByIdService = async (Id) => {
  const entityRepository = getRepository(PastorBlog);
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

export const createPastorBlogService = async (entity) => {
  const entityRepository = getRepository(PastorBlog);
  return await entityRepository.save(entity);
};

export const updatePastorBlogService = async (entity) => {
  const entityRepository = getRepository(PastorBlog);
  return await entityRepository.save(entity);
};

export const deletePastorBlogService = async (id) => {
  const entityRepository = getRepository(PastorBlog);
  return await entityRepository.delete(id);
};
