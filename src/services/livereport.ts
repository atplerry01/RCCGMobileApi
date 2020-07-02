import { getConnection, getRepository } from 'typeorm';
import { LiveReport } from './../entity/LiveReport';

export const getLiveReportService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM rm_livereport order by requestDate desc`;
      const entities = await getConnection().query(q);
      return resolve(entities);
    } catch (err) {
      return reject({ err, message: 'No entity found' });
    }
  });
};

export const getLiveReportByTypeService = async (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM rm_livereport where reportType = '${type}' order by requestDate desc`;
      const entities = await getConnection().query(q);
      return resolve(entities);
    } catch (err) {
      return reject({ err, message: 'No entity found' });
    }
  });
};

export const getLiveReportByIdService = async (Id) => {
  const entityRepository = getRepository(LiveReport);
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

export const createLiveReportService = async (entity) => {
  const entityRepository = getRepository(LiveReport);
  return await entityRepository.save(entity);
};

export const updateLiveReportService = async (entity) => {
  const entityRepository = getRepository(LiveReport);
  return await entityRepository.save(entity);
};

export const deleteLiveReportService = async (id) => {
  const entityRepository = getRepository(LiveReport);
  return await entityRepository.delete(id);
};
