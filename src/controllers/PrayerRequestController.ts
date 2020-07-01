import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { PrayerRequest } from '../entity/PrayerRequest';
import { Paginator } from '../utils/pagination';
import { createPrayerRequestService, deletePrayerRequestService, getPrayerRequestByIdService, getPrayerRequestService, getUserPrayerRequestService, updatePrayerRequestService } from './../services/prayerrequest';
import { createPrayerRequestSchema, formatYupError } from '../validations';

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

  static getUserRequest = async (req: Request, res: Response) => {
    const id: any = req.params.userId;
    const { name } = req.body;

    try {
      const entity: any = await getUserPrayerRequestService(id);

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
    let { fullName, email, phone, details, parishName, userId } = req.body;

    try {
      await createPrayerRequestSchema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ errors: formatYupError(err), message: "Validation Error" });
    }

    // Create Entity Object
    let prayerRequest = new PrayerRequest();

    prayerRequest.fullName = fullName;
    prayerRequest.email = email;
    prayerRequest.phone = phone;
    prayerRequest.details = details;
    prayerRequest.parishName = parishName;
    prayerRequest.userId = userId;

    try {
      await createPrayerRequestService(prayerRequest);

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

  static treatPrayerRequest = async (req: Request, res: Response) => {
    const id: any = req.params.id;

    try {
      const entity: any = await getPrayerRequestByIdService(id);

      if (!entity.success) {
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      let prayerRequest: PrayerRequest = entity.data;
      prayerRequest.isTreated = true;

      await updatePrayerRequestService(prayerRequest);

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
