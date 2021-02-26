import { Request, Response } from 'express';
import { logger } from '../startup/logger';
import { Paginator } from '../utils/pagination';
import { createLiveReportSchema, formatYupError } from '../validations';
import { LiveReport } from './../entity/LiveReport';
import { createLiveReportService, deleteLiveReportService, getLiveReportByAliasService, getLiveReportByIdService, getLiveReportByTypeService, getLiveReportService, updateLiveReportService, getReportByDivisionIdService } from './../services/livereport';

class LiveReportController {

  static all = async (req: Request, res: Response) => {
    const { page, per_page } = req.query;

    try {

      const entity: any = await getLiveReportService();
      const result = await Paginator(entity, page, per_page);

      return res.status(200).json({
        success: true,
        result: result,
      });
    } catch (error) {
      logger.log({ message: 'Error', level: 'error', operation: 'all', controller: 'LiveReportController:all', response: error, status: 500 });
      return false;
    }
  };

  static getReportByDivisionId = async (req: Request, res: Response) => {
    const { page, per_page } = req.query;
    const id: any = req.params.id;
    const type: any = req.params.type;

    try {
      const entity: any = await getReportByDivisionIdService(id, type);
      const result = await Paginator(entity, page, per_page);

      return res.status(200).json({
        success: true,
        result: result,
      });
    } catch (error) {
      logger.log({ message: 'Error', level: 'error', operation: 'all', controller: 'LiveReportController:all', response: error, status: 500 });
      return false;
    }
  };

  // reportType
  static reportByType = async (req: Request, res: Response) => {
    const { page, per_page } = req.query;
    const type: any = req.params.type;

    try {
      const entity: any = await getLiveReportByTypeService(type);
      const result = await Paginator(entity, page, per_page);

      return res.status(200).json({
        success: true,
        result: result,
      });
    } catch (error) {
      logger.log({ message: 'Error', level: 'error', operation: 'all', controller: 'LiveReportController:reportByType', response: error, status: 500 });
      return false;
    }
  };

  static reportByDivision = async (req: Request, res: Response) => {
    const { page, per_page } = req.query;
    const type: any = req.params.type;
    const divisionAlias: any = req.params.divisionAlias;

    try {
      const entity: any = await getLiveReportByAliasService(divisionAlias, type);
      const result = await Paginator(entity, page, per_page);

      return res.status(200).json({
        success: true,
        result: result,
      });
    } catch (error) {
      logger.log({ message: 'Error', level: 'error', operation: 'all', controller: 'LiveReportController:reportByType', response: error, status: 500 });
      return false;
    }
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: any = req.params.id;

    try {
      const entity: any = await getLiveReportByIdService(id);

      if (entity.success) {
        return res.status(200).json({
          success: entity.success,
          data: entity.data,
        });
      } else {
        logger.log({ controller: 'LiveReportController:getOneById', response: entity.msg, message: 'Error', level: 'error' });
        return res.status(400).json({
          success: entity.success,
          msg: entity.msg,
        });
      }
    } catch (error) {
      logger.log({ controller: 'LiveReportController:getOneById', response: error, message: 'Error', level: 'error' });
      return res.status(400).json({
        success: false,
        msg: error,
      });
    }
  };


  static create = async (req: Request, res: Response) => {
    const { title, details, reportType, imagePath, thumbImagePath, division_id } = req.body;

    try {
      await createLiveReportSchema.validate(req.body, { abortEarly: false });
    } catch (err) {
      logger.log({ controller: 'LiveReportController:create', response: err, message: 'Error', level: 'error' });
      return res.status(400).json({ success: false, errors: formatYupError(err), msg: "Validation Error" });
    }

    // Create Entity Object
    const liveReport = new LiveReport();

    liveReport.title = title;
    liveReport.details = details;
    liveReport.reportType = reportType;
    liveReport.imagePath = imagePath;
    liveReport.thumbImagePath = thumbImagePath;
    liveReport.division_id = division_id;

    try {
      await createLiveReportService(liveReport);

      return res.status(201).json({
        success: true,
      });
    } catch (error) {
      logger.log({ controller: 'LiveReportController:create', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };

  static update = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const { title, details, reportType, imagePath, thumbImagePath, division_id } = req.body;

    try {
      const entity: any = await getLiveReportByIdService(id);

      if (!entity.success) {
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      const liveReport: LiveReport = entity.data;
      // liveReport.name = name;

      liveReport.title = title;
      liveReport.details = details;
      liveReport.reportType = reportType;
      liveReport.imagePath = imagePath;
      liveReport.thumbImagePath = thumbImagePath;
      liveReport.division_id = division_id;

      await updateLiveReportService(liveReport);

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      logger.log({ controller: 'LiveReportController:create', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };

  static updateApproval = async (req: Request, res: Response) => {
    const id: any = req.params.id;

    try {
      const entity: any = await getLiveReportByIdService(id);

      if (!entity.success) {
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      const liveReport: LiveReport = entity.data;

      liveReport.isApproved = 1;
    
      await updateLiveReportService(liveReport);

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      logger.log({ controller: 'LiveReportController:create', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };

  static updateRejection = async (req: Request, res: Response) => {
    const id: any = req.params.id;

    try {
      const entity: any = await getLiveReportByIdService(id);

      if (!entity.success) {
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      const liveReport: LiveReport = entity.data;

      liveReport.isApproved = 2;
    
      await updateLiveReportService(liveReport);

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      logger.log({ controller: 'LiveReportController:create', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };

  // approve or reject post
  static delete = async (req: Request, res: Response) => {
    //Send the users object
    const id = req.params.id;

    try {
      const entity: any = await getLiveReportByIdService(id);

      if (!entity.success) {
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      await deleteLiveReportService(id);

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      logger.log({ controller: 'LiveReportController:create', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };
}

export default LiveReportController;
