import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { Paginator } from '../utils/pagination';
import { LiveReport } from './../entity/LiveReport';
import { createLiveReportService, deleteLiveReportService, getLiveReportByIdService, getLiveReportService, updateLiveReportService } from './../services/livereport';

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
      return false;
    }
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const { name } = req.body;

    try {
      const entity: any = await getLiveReportByIdService(id);

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
    const { title, summary, reportType, imagePath, thumbImagePath } = req.body;

    // Create Entity Object
    const liveReport = new LiveReport();

    liveReport.title = title;
    liveReport.summary = summary;
    liveReport.reportType = reportType;
    liveReport.imagePath = imagePath;
    liveReport.thumbImagePath = thumbImagePath;

    const errors = await validate(liveReport); // TODO:

    if (errors.length > 0) {
      res.status(400).send({
        success: false,
        msg: errors,
      });
      return;
    }

    try {
      await createLiveReportService(liveReport);

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
    const { title, summary, reportType, imagePath, thumbImagePath } = req.body;

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
      liveReport.summary = summary;
      liveReport.reportType = reportType;
      liveReport.imagePath = imagePath;
      liveReport.thumbImagePath = thumbImagePath;

      const errors = await validate(liveReport);

      if (errors.length > 0) {
        res.status(400).send({
          success: false,
          msg: errors,
        });
        return;
      }

      await updateLiveReportService(liveReport);

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
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };
}

export default LiveReportController;
