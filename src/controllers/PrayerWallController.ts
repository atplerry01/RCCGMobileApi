import { Request, Response } from 'express';
import { PrayerWall } from '../entity/PrayerWall';
import { PrayerWallGroup } from '../entity/PrayerWallGroup';
import { logger } from '../startup/logger';
import { Paginator } from '../utils/pagination';
import { createPrayerWallSchema, formatYupError } from '../validations';
import { createPrayerWallGroupSchema } from '../validations/yup-schemas/prayerWallGroupSchema';
import { createPrayerWallGroupService, createPrayerWallService, deletePrayerWallGroupService, deletePrayerWallService, getDivisionGroupService, getPrayerWallByIdService, getPrayerWallGroupByIdService, getPrayerWallGroupService, getWallByDivisionIdService, getWallByGroupIdService } from './../services/prayerwall';

class PrayerWallController {

  static allGroups = async (req: Request, res: Response) => {
    const { page, per_page } = req.query;

    try {
      const entity: any = await getPrayerWallGroupService();
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

  static getOneById = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const { name } = req.body;

    try {
      const entity: any = await getPrayerWallByIdService(id);

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

  static allWallByGroupId = async (req: Request, res: Response) => {
    const { page, per_page } = req.query;
    const id: any = req.params.id;

    try {
      const entity: any = await getWallByGroupIdService(id);
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

  static getDivisionGroup = async (req: Request, res: Response) => {
    const { page, per_page } = req.query;
    const id: any = req.params.id;

    try {
      const entity: any = await getDivisionGroupService(id);
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

  static createWallGroup = async (req: Request, res: Response) => {
    const { title, description, prayer_date, start_time, end_time, division_id } = req.body;

    try {
      await createPrayerWallGroupSchema.validate(req.body, { abortEarly: false });
    } catch (error) {
      logger.log({ controller: 'PrayerWallGroupController:create', response: error, message: 'Error', level: 'error' });
      return res.status(400).json({ errors: formatYupError(error), message: "Validation Error" });
    }

    // Create Entity Object
    const prayerWall = new PrayerWallGroup();
    prayerWall.title = title;
    prayerWall.description = description;
    prayerWall.division_id = division_id;
    prayerWall.prayer_date = prayer_date;
    prayerWall.start_time = start_time;
    prayerWall.end_time = end_time;

    try {
      await createPrayerWallGroupService(prayerWall);

      return res.status(201).json({
        success: true,
      });
    } catch (error) {
      logger.log({ controller: 'PrayerWallGroupController:create', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };

  static createWall = async (req: Request, res: Response) => {
    const { title, summary, details, group_id, division_id, user_id, parishName } = req.body;

    try {
      await createPrayerWallSchema.validate(req.body, { abortEarly: false });
    } catch (error) {
      logger.log({ controller: 'PrayerWallController:create', response: error, message: 'Error', level: 'error' });
      return res.status(400).json({ errors: formatYupError(error), message: "Validation Error" });
    }

    // Create Entity Object
    const prayerWall = new PrayerWall();
    prayerWall.title = title;
    prayerWall.summary = summary;
    prayerWall.details = details;
    prayerWall.group_id = group_id;
    prayerWall.division_id = division_id;
    prayerWall.user_id = user_id;  
    prayerWall.parishName = parishName; 
    prayerWall.modified_by = user_id;

    try {
      await createPrayerWallService(prayerWall);

      return res.status(201).json({
        success: true,
      });
    } catch (error) {
      logger.log({ controller: 'PrayerWallController:create', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };

  static wallByDivisionId = async (req: Request, res: Response) => {
    const { page, per_page } = req.query;
    const id: any = req.params.id;

    try {
      const entity: any = await getWallByDivisionIdService(id);
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

  static delete = async (req: Request, res: Response) => {
    //Send the users object
    const id = req.params.id;

    try {
      const entity: any = await getPrayerWallByIdService(id);

      if (!entity.success) {
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      await deletePrayerWallService(id);

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      logger.log({ controller: 'PrayerWallController:create', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };

  // deleteGroups
  static deleteGroups = async (req: Request, res: Response) => {
    //Send the users object
    const id = req.params.id;

    try {
      const entity: any = await getPrayerWallGroupByIdService(id);

      if (!entity.success) {
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      await deletePrayerWallGroupService(id);

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      logger.log({ controller: 'PrayerWallController:create', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };
}

export default PrayerWallController;
