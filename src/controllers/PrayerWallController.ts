import { Request, Response } from 'express';
import { PrayerWall } from '../entity/PrayerWall';
import { logger } from '../startup/logger';
import { Paginator } from '../utils/pagination';
import { createPrayerWallSchema, formatYupError } from '../validations';
import { PrayerWallUser } from './../entity/PrayerWallUser';
import { createPrayerWallService, createPrayerWallUserService, deletePrayerWallService, getPrayerWallByIdService, getPrayerWallService, getPrayerWallUserIdService, getWallByDivisionIdService, updatePrayerWallService } from './../services/prayerwall';

class PrayerWallController {

  static all = async (req: Request, res: Response) => {
    const { page, per_page } = req.query;

    try {
      const entity: any = await getPrayerWallService();
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
        logger.log({ controller: 'PrayerWallController:getOneById', response: entity.msg, message: 'Error', level: 'error' });
        return res.status(400).json({
          success: entity.success,
          msg: entity.msg,
        });
      }
    } catch (error) {
      logger.log({ controller: 'PrayerWallController:getOneById', response: error, message: 'Error', level: 'error' });
      return res.status(400).json({
        success: false,
        msg: error,
      });
    }
  };

  static create = async (req: Request, res: Response) => {
    const { title, phone, details, division_id } = req.body;

    try {
      await createPrayerWallSchema.validate(req.body, { abortEarly: false });
    } catch (error) {
      logger.log({ controller: 'PrayerWallController:create', response: error, message: 'Error', level: 'error' });
      return res.status(400).json({ errors: formatYupError(error), message: "Validation Error" });
    }

    // Create Entity Object
    const prayerWall = new PrayerWall();
    prayerWall.title = title;
    prayerWall.phone = phone;
    prayerWall.details = details;
    prayerWall.division_id = division_id;

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

  static createWallUser = async (req: Request, res: Response) => {
    const { userId, fullName, name, email, phone, prayerWallId } = req.body;

    // If user already in the list
    const entity: any = await getPrayerWallUserIdService(prayerWallId, userId);

    if (entity && entity.success) {
      logger.log({ controller: 'PrayerWallController:create', response: 'User already added', message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'User already added',
      });
      return;
    }

    // TODO: // increase the prayerwall and update counts
    const prayWall = await getPrayerWallByIdService(prayerWallId);
    const prayerW: PrayerWall = prayWall.data;
    prayerW.userCount += 1;

    await updatePrayerWallService(prayerW);
    

    // Create Entity Object
    const prayerWallUser = new PrayerWallUser();
    prayerWallUser.fullName = fullName;
    prayerWallUser.userId = userId;
    prayerWallUser.prayerWallId = prayerWallId;

    try {
      await createPrayerWallUserService(prayerWallUser);
      // update wall count

      return res.status(201).json({
        success: true,
      });
    } catch (error) {
      logger.log({ controller: 'PrayerWallController:createWallUser', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };

  static update = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const { title, details, division_id } = req.body;

    try {

      const entity: any = await getPrayerWallByIdService(id);

      if (!entity.success) {
        logger.log({ controller: 'PrayerWallController:update', response: entity.msg, message: 'Error', level: 'error' });
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      const prayerWall: PrayerWall = entity.data;

      prayerWall.title = title;
      prayerWall.details = details;
      prayerWall.division_id = division_id;

      await updatePrayerWallService(prayerWall);

      return res.status(200).json({
        success: true
      });
    } catch (error) {
      logger.log({ controller: 'PrayerWallController:update', response: error, message: 'Error', level: 'error' });
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
      const entity: any = await getPrayerWallByIdService(id);

      if (!entity.success) {
        logger.log({ controller: 'PrayerWallController:delete', response: entity.msg, message: 'Error', level: 'error' });
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
      logger.log({ controller: 'PrayerWallController:delete', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };
}

export default PrayerWallController;
