import { Request, Response } from 'express';
import { logger } from '../startup/logger';
import { Paginator } from '../utils/pagination';
import { createVideoSchema, formatYupError } from '../validations';
import { Video } from './../entity/Video';
import { createVideoService, deleteVideoService, getVideoByIdService, getVideoService, updateVideoService } from './../services/video';

class VideoController {

  static all = async (req: Request, res: Response) => {
    const { page, per_page } = req.query;

    try {
      const entity: any = await getVideoService();
      const result = await Paginator(entity, page, per_page);

      return res.status(200).json({
        success: true,
        result: result,
      });
    } catch (error) {
      logger.log({ message: 'Error', level: 'error', operation: 'all', controller: 'VideoController:all', response: error, status: 500 });
      return false;
    }
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: any = req.params.id;

    try {
      const entity: any = await getVideoByIdService(id);

      if (entity.success) {
        return res.status(200).json({
          success: entity.success,
          data: entity.data,
        });
      } else {
        logger.log({ controller: 'VideoController:getOneById', response: entity.data, message: 'Error', level: 'error' });
        return res.status(400).json({
          success: entity.success,
          msg: entity.msg,
        });
      }
    } catch (error) {
      logger.log({ controller: 'VideoController:getOneById', response: error, message: 'Error', level: 'error' });
      return res.status(400).json({
        success: false,
        msg: error,
      });
    }
  };

  static create = async (req: Request, res: Response) => {
    const { subject, details, summary, source, filePath, thumbImagePath } = req.body;
    
    try {
      await createVideoSchema.validate(req.body, { abortEarly: false });
    } catch (error) {
      logger.log({ controller: 'VideoController:create', response: error, message: 'Error', level: 'error' });
      return res.status(400).json({ errors: formatYupError(error), message: "Validation Error" });
    }

    // Create Entity Object
    const video = new Video();

    video.subject = subject;
    video.summary = summary;
    video.details = details;
    video.filePath = filePath;
    video.thumbImagePath = thumbImagePath;
    video.source = source;

    try {
      await createVideoService(video);

      return res.status(201).json({
        success: true,
      });
    } catch (error) {
      logger.log({ controller: 'VideoController:create', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };

  static update = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const { subject, details, source, summary, filePath, imagePath, thumbImagePath } = req.body;

    try {
      const entity: any = await getVideoByIdService(id);

      if (!entity.success) {
        logger.log({ controller: 'VideoController:update', response: entity.msg, message: 'Error', level: 'error' });
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      const video: Video = entity.data;

      video.subject = subject;
      video.summary = summary;
      video.details = details;
      video.filePath = filePath;
      video.thumbImagePath = thumbImagePath;
      video.source = source;
      
      await updateVideoService(video);

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      logger.log({ controller: 'VideoController:create', response: error, message: 'Error', level: 'error' });
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
      const entity: any = await getVideoByIdService(id);

      if (!entity.success) {
        logger.log({ controller: 'VideoController:delete', response: entity.msg, message: 'Error', level: 'error' });
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      await deleteVideoService(id);

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      logger.log({ controller: 'VideoController:delete', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };
}

export default VideoController;
