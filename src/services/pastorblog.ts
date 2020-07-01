import { getConnection, getRepository } from 'typeorm';
import { BlogAudio } from '../entity/BlogAudio';
import { BlogVideo } from '../entity/BlogVideo';
import { PastorBlog } from './../entity/PastorBlog';

export const getPastorBlogService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM pastorblog order by requestDate desc`;
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
      data: await entityRepository.findOneOrFail(Id, { 
        relations: ["transcribe", "blogVideos", "blogVideos.video", "blogAudios", "blogAudios.audio"]
      }),
    };
  } catch (error) {
    return {
      success: false,
      msg: 'Entity not found',
    };
  }
};

export const getPastorBlogByIdOnlyService = async (Id) => {
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

export const createPastorBlogVideoService = async (entity) => {
  const entityRepository = getRepository(BlogVideo);
  return await entityRepository.save(entity);
};

export const createPastorBlogAudioService = async (entity) => {
  const entityRepository = getRepository(BlogAudio);
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
