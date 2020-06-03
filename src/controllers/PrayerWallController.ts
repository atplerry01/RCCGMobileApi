import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { PrayerWall } from '../entity/PrayerWall';
import { Paginator } from '../utils/pagination';
import { createPrayerWallService, deletePrayerWallService, getPrayerWallByIdService, getPrayerWallService, updatePrayerWallService } from './../services/PrayerWall';

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
        return res.status(400).json({
          success: entity.success,
          msg: entity.msg,
        });
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        msg: error,
      });
    }
  };

  static create = async (req: Request, res: Response) => {
    const { title, summary, details, parishName } = req.body;

    // Create Entity Object
    const prayerWall = new PrayerWall();
    prayerWall.title = title;
    prayerWall.summary = summary;
    prayerWall.details = details;
    prayerWall.parishName = parishName;

    const errors = await validate(prayerWall); // TODO:

    if (errors.length > 0) {
      res.status(400).send({
        success: false,
        msg: errors,
      });
      return;
    }

    try {
      await createPrayerWallService(prayerWall);

      return res.status(201).json({
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };

  static update = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const { title, summary, details, parishName } = req.body;

    try {
      const entity: any = await getPrayerWallByIdService(id);

      if (!entity.success) {
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      const prayerWall: PrayerWall = entity.data;

      prayerWall.title = title;
      prayerWall.summary = summary;
      prayerWall.details = details;
      prayerWall.parishName = parishName;

      const errors = await validate(prayerWall);

      if (errors.length > 0) {
        res.status(400).send({
          success: false,
          msg: errors,
        });
        return;
      }

      await updatePrayerWallService(prayerWall);

      return res.status(200).json({
        success: true
      });
    } catch (error) {
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
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };
}

export default PrayerWallController;
