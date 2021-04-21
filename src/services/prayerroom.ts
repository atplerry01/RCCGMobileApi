import { getConnection, getRepository } from 'typeorm';
import { PrayerRoom } from './../entity/PrayerRoom';
import { PrayerRoomUser } from './../entity/PrayerRoomUser';


export const getPrayerRoomService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM rm_prayerroom order by created desc`;
      const entities = await getConnection().query(q);
      return resolve(entities);
    } catch (err) {
      return reject({ err, message: 'No entity found' });
    }
  });
};

export const gettPrayerRoomByIdService = async (Id) => {
  const entityRepository = getRepository(PrayerRoom);
  
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


// getRoomByDivisionIdService
export const getRoomByDivisionIdService = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM rm_prayerroom where division_id = '${id}' order by created desc`;
      const entities = await getConnection().query(q);
      return resolve(entities);
    } catch (err) {
      return reject({ err, message: 'No entity found' });
    }
  });
};

export const getUserByRoomIdService = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM rm_prayerroomuser where prayerRoomId = '${id}'`;
      const entities = await getConnection().query(q);
      return resolve(entities);
    } catch (err) {
      return reject({ err, message: 'No entity found' });
    }
  });
};

// export const getUserInRoomService = async (userId, roomId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const q = `SELECT * FROM rm_prayerroomuser where prayerRoomId = ${roomId} and usr_id = '${userId}'`;
//       const entities = await getConnection().query(q);
//       return resolve(entities);
//     } catch (err) {
//       return reject({ err, message: 'No entity found' });
//     }
//   });
// };

export const getUserInRoomService = async (user_id, prayerRoomId) => {
  const entityRepository = getRepository(PrayerRoomUser);
  
  try {
    return {
      success: true,
      data: await entityRepository.findOneOrFail({ user_id, prayerRoomId}),
    };
  } catch (error) {
    console.log(error);
    
    return {
      success: false,
      msg: 'Entity not found',
    };
  }
};


export const createPrayerRoomService = async (entity) => {
  const entityRepository = getRepository(PrayerRoom);
  var result = await entityRepository.save(entity);
  return result; // await entityRepository.save(entity);
};





export const getPrayerRoomByIdService = async (Id) => {
  const entityRepository = getRepository(PrayerRoom);
  try {
    return {
      success: true,
      data: await entityRepository.findOneOrFail(Id, {
        // relations: ["PrayerRoomUsers"]
      }),
    };
  } catch (error) {
    return {
      success: false,
      msg: 'Entity not found',
    };
  }
};

export const getRoomUserByRoomIdService = async (prayerRoomId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM rm_prayerroomuser where prayerRoomId = '${prayerRoomId}'`;
      const entities = await getConnection().query(q);
      return resolve(entities);
    } catch (err) {
      return reject({ err, message: 'No entity found' });
    }
  });
};

export const getAmInRoomService = async (roomId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = `SELECT * FROM rm_prayerroomuser where prayerRoomId = '${roomId}' and user_id = '${userId}'`;
      console.log(q);
      const entities = await getConnection().query(q);
      return resolve(entities);
    } catch (err) {
      return reject({ err, message: 'No entity found' });
    }
  });
};

export const increasePrayerRoomUserCountService = async (PrayerRoomId, userId) => {
  const entityRepository = getRepository(PrayerRoomUser);

  try {
    const pwu = await entityRepository.findOneOrFail({ where: { PrayerRoomId, userId }});

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

export const createPrayerRoomUserService = async (entity) => {
  const entityRepository = getRepository(PrayerRoomUser);
  return await entityRepository.save(entity);
};

export const updatePrayerRoomService = async (entity) => {
  const entityRepository = getRepository(PrayerRoom);
  return await entityRepository.save(entity);
};

export const deletePrayerRoomService = async (id) => {
  const entityRepository = getRepository(PrayerRoom);
  return await entityRepository.delete(id);
};