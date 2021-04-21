import { Request, Response } from 'express';
import { PrayerRoom } from '../entity/PrayerRoom';
import { PrayerRoomUser } from '../entity/PrayerRoomUser';
import { createPrayerRoomService, createPrayerRoomUserService, deletePrayerRoomService, getAmInRoomService, getPrayerRoomByIdService, getPrayerRoomService, getRoomByDivisionIdService, getRoomUserByRoomIdService, getUserByRoomIdService, getUserInRoomService, updatePrayerRoomService } from '../services/prayerroom';
import { logger } from '../startup/logger';
import { Paginator } from '../utils/pagination';
import { formatYupError } from '../validations';
import { createPrayerRoomSchema } from '../validations/yup-schemas/prayerRoomSchema';
import { createPrayerRoomUserSchema } from '../validations/yup-schemas/prayerRoomUserSchema';

class PrayerRoomController {


  // getPrayerWallByGroup
  static all = async (req: Request, res: Response) => {
    const { page, per_page } = req.query;

    try {
      const entity: any = await getPrayerRoomService();
      const result = await Paginator(entity, page, per_page);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.log(error);
      logger.log({ controller: 'PrayerWallController:all', response: error, message: 'Error', level: 'error' });
      return false;
    }
  };

  static roomByDivisionId = async (req: Request, res: Response) => {
    const { page, per_page } = req.query;
    const id: any = req.params.id;

    try {
      const entity: any = await getRoomByDivisionIdService(id);
      const result = await Paginator(entity, page, per_page);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      logger.log({ controller: 'PrayerWallController:all', response: error, message: 'Error', level: 'error' });
      return false;
    }
  };

  // getRoomUsers
  static getUserByRoomId = async (req: Request, res: Response) => {
    const { page, per_page } = req.query;
    const id: any = req.params.roomId;

    try {
      const entity: any = await getUserByRoomIdService(id);
      const result = await Paginator(entity, page, per_page);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      logger.log({ controller: 'PrayerWallController:all', response: error, message: 'Error', level: 'error' });
      return false;
    }
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const { name } = req.body;

    try {
      const entity: any = await getPrayerRoomByIdService(id);

      if (entity.success) {
        return res.status(200).json({
          success: entity.success,
          data: entity.data,
        });
      } else {
        logger.log({ controller: 'PrayerRoomController:getOneById', response: entity.msg, message: 'Error', level: 'error' });
        return res.status(400).json({
          success: entity.success,
          msg: entity.msg,
        });
      }
    } catch (error) {
      logger.log({ controller: 'PrayerRoomController:getOneById', response: error, message: 'Error', level: 'error' });
      return res.status(400).json({
        success: false,
        msg: error,
      });
    }
  };

  static create = async (req: Request, res: Response) => {
    const { title, summary, details, division_id, user_id } = req.body;

    try {
      await createPrayerRoomSchema.validate(req.body, { abortEarly: false });
    } catch (error) {
      logger.log({ controller: 'PrayerRoomController:create', response: error, message: 'Error', level: 'error' });
      return res.status(400).json({ errors: formatYupError(error), message: "Validation Error" });
    }

    // Create Entity Object
    const prayerRoom = new PrayerRoom();
    prayerRoom.title = title;
    prayerRoom.summary = summary;
    prayerRoom.details = details;
    prayerRoom.division_id = division_id;
    prayerRoom.modified_by = user_id;

    try {
      await createPrayerRoomService(prayerRoom);

      return res.status(201).json({
        success: true,
      });
    } catch (error) {
      logger.log({ controller: 'PrayerRoomController:create', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };

  static delete = async (req: Request, res: Response) => {
    //Send the users object
    const id = req.params.id;

    try {
      const entity: any = await getPrayerRoomByIdService(id);

      if (!entity.success) {
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      await deletePrayerRoomService(id);

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      logger.log({ controller: 'PrayerRequestController:create', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };

  static createRoomUser = async (req: Request, res: Response) => {
    const { prayerRoomId, user_id, fullName, email, phone, parishName } = req.body;

    try {
      await createPrayerRoomUserSchema.validate(req.body, { abortEarly: false });
    } catch (error) {
      logger.log({ controller: 'PrayerRoomController:create', response: error, message: 'Error', level: 'error' });
      return res.status(400).json({ errors: formatYupError(error), message: "Validation Error" });
    }

    // Create Entity Object
    const prayerWall = new PrayerRoomUser();
    prayerWall.prayerRoomId = prayerRoomId;
    prayerWall.user_id = user_id;
    prayerWall.fullName = fullName;
    prayerWall.email = email;
    prayerWall.phone = phone;
    prayerWall.parishName = parishName;

    try {

      // check if user exist
      let checkUserInnRoom = await getUserInRoomService(user_id, prayerRoomId);

      if (checkUserInnRoom.success) {
        return res.status(200).json({
          success: false,
          msg: "User already exist"
        });
      } else {
        await createPrayerRoomUserService(prayerWall);

        // update PrayerRoom
        let prayerRoom = new PrayerRoom();
        var existingRoom = await getPrayerRoomByIdService(prayerRoomId);
        prayerRoom = existingRoom.data;
        prayerRoom.userCount += 1;

        await updatePrayerRoomService(prayerRoom);

        return res.status(201).json({
          success: true,
          msg: 'users added to prayer room'
        });
      }

    } catch (error) {
      logger.log({ controller: 'PrayerRoomUserController:create', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };

  static getRoomUserByRoomId = async (req: Request, res: Response) => {
    const id: any = req.params.roomId;
    const { page, per_page } = req.query;

    try {
      const entity: any = await getRoomUserByRoomIdService(id);
      const result = await Paginator(entity, page, per_page);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      logger.log({ controller: 'PrayerRoomUsersController:getOneById', response: error, message: 'Error', level: 'error' });
      return res.status(400).json({
        success: false,
        msg: error,
      });
    }
  };

  
  static getAmInRoom = async (req: Request, res: Response) => {
    const roomId: any = req.params.roomId;
    const userId: any = req.params.userId;
    const { page, per_page } = req.query;

    try {
      const entity: any = await getAmInRoomService(roomId, userId);
      const result = await Paginator(entity, page, per_page);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      logger.log({ controller: 'PrayerRoomUsersController:getAmInRoom', response: error, message: 'Error', level: 'error' });
      return res.status(400).json({
        success: false,
        msg: error,
      });
    }
  };


}

export default PrayerRoomController;
