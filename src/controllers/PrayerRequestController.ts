import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { PrayerRequest } from '../entity/PrayerRequest';
import { Paginator } from '../utils/pagination';
import { createPrayerRequestService, deletePrayerRequestService, getPrayerRequestByIdService, getPrayerRequestService, updatePrayerRequestService } from './../services/prayerRequest';

class PrayerRequestController {
  static all = async (req: Request, res: Response) => {
    const { page, per_page } = req.query;

    try {
      const entity: any = await getPrayerRequestService();
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
      const entity: any = await getPrayerRequestByIdService(id);

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
    let { name } = req.body;

    // Create Entity Object
    let prayerRequest = new PrayerRequest();
    // prayerRequest.name = name;

    const errors = await validate(PrayerRequest); // TODO:

    if (errors.length > 0) {
      res.status(400).send({
        success: false,
        msg: errors,
      });
      return;
    }

    try {
      await createPrayerRequestService(PrayerRequest);

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
    const { name } = req.body;

    try {
      const entity: any = await getPrayerRequestByIdService(id);

      if (!entity.success) {
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      let prayerRequest: PrayerRequest = entity.data;
      // prayerRequest.name = name;

      const errors = await validate(PrayerRequest);

      if (errors.length > 0) {
        res.status(400).send({
          success: false,
          msg: errors,
        });
        return;
      }

      await updatePrayerRequestService(PrayerRequest);

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

  static delete = async (req: Request, res: Response) => {
    //Send the users object
    const id = req.params.id;

    try {
      const entity: any = await getPrayerRequestByIdService(id);

      if (!entity.success) {
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      await deletePrayerRequestService(id);

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

export default PrayerRequestController;
