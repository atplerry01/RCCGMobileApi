import { Request, Response } from 'express';
import { PrayerRequest } from './../entity/PrayerRequest';
import { PrayerRequestUser } from './../entity/PrayerRequestUser';
import { createPrayerRequestService, createPrayerRequestUserService, deletePrayerRequestService, getPrayerRequestByIdService, getPrayerRequestService, getPrayerRequestUserIdService, getUserPrayerRequestService, updatePrayerRequestService } from './../services/prayerrequest';
import { logger } from './../startup/logger';
import { Paginator } from './../utils/pagination';
import { createPrayerRequestSchema, formatYupError } from './../validations';

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
      logger.log({ controller: 'PrayerRequestController:create', response: error, message: 'Error', level: 'error' });
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
      logger.log({ controller: 'PrayerRequestController:create', response: error, message: 'Error', level: 'error' });
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
      logger.log({ controller: 'PrayerRequestController:create', response: error, message: 'Error', level: 'error' });
      return res.status(400).json({
        success: false,
        msg: error,
      });
    }
  };

  static create = async (req: Request, res: Response) => {
    let { fullName, email, phone, details, division_id, userId } = req.body;

    try {
      await createPrayerRequestSchema.validate(req.body, { abortEarly: false });
    } catch (error) {
      logger.log({ controller: 'PrayerRequestController:create', response: error, message: 'Error', level: 'error' });
      return res.status(400).json({ errors: formatYupError(error), message: "Validation Error" });
    }

    // Create Entity Object
    let prayerRequest = new PrayerRequest();

    prayerRequest.fullName = fullName;
    prayerRequest.email = email;
    prayerRequest.phone = phone;
    prayerRequest.details = details;
    prayerRequest.division_id = division_id;

    prayerRequest.userId = userId;

    try {
      await createPrayerRequestService(prayerRequest);

      return res.status(201).json({
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

  static createRequestUser = async (req: Request, res: Response) => {
    const { userId, fullName, name, email, phone, prayerRequestId } = req.body;

    // If user already in the list
    const entity: any = await getPrayerRequestUserIdService(prayerRequestId, userId);

    if (entity && entity.success) {
      logger.log({ controller: 'PrayerWallController:create', response: 'User already added', message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'User already added',
      });
      return;
    }

    // TODO: // increase the prayerwall and update counts
    const prayRequest = await getPrayerRequestByIdService(prayerRequestId);

    const prayerW: PrayerRequest = prayRequest.data;
    prayerW.userCount += 1;

    const r = await updatePrayerRequestService(prayerW);
    
    // Create Entity Object
    const prayerRequestUser = new PrayerRequestUser();
    prayerRequestUser.fullName = fullName;
    prayerRequestUser.userId = userId;
    prayerRequestUser.prayerRequestId = prayerRequestId;

    try {
      await createPrayerRequestUserService(prayerRequestUser);
      // update wall count

      return res.status(201).json({
        success: true,
      });
    } catch (error) {
      logger.log({ controller: 'PrayerRequestController:createWallUser', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }


  };

  static update = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const { name, division_id } = req.body;

    try {
      const entity: any = await getPrayerRequestByIdService(id);

      if (!entity.success) {
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      let prayerRequest: PrayerRequest = entity.data;
      prayerRequest.division_id = division_id;

      await updatePrayerRequestService(PrayerRequest);

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
      logger.log({ controller: 'PrayerRequestController:create', response: error, message: 'Error', level: 'error' });
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
      logger.log({ controller: 'PrayerRequestController:create', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };
}

export default PrayerRequestController;
