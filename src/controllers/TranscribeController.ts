import { Request, Response } from 'express';
import { Transcribe } from '../entity/Transcribe';
import { logger } from '../startup/logger';
import { Paginator } from '../utils/pagination';
import { createTranscribeSchema, formatYupError } from '../validations';
import { createTranscribeService, deleteTranscribeService, getTranscribeByIdService, getTranscribeService, updateTranscribeService } from './../services/transcribe';

class TranscribeController {

  static all = async (req: Request, res: Response) => {
    const { page, per_page } = req.query;

    try {
      const entity: any = await getTranscribeService();
      const result = await Paginator(entity, page, per_page);

      return res.status(200).json({
        success: true,
        result: result,
      });
    } catch (error) {
      logger.log({ message: 'Error', level: 'error', operation: 'all', controller: 'TranscribeController:all', response: error, status: 500 });
      return false;
    }
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: any = req.params.id;

    try {
      const entity: any = await getTranscribeByIdService(id);

      if (entity.success) {
        return res.status(200).json({
          success: entity.success,
          data: entity.data,
        });
      } else {
        logger.log({ controller: 'TranscribeController:getOneById', response: entity.msg, message: 'Error', level: 'error' });
        return res.status(400).json({
          success: entity.success,
          msg: entity.msg,
        });
      }
    } catch (error) {
      logger.log({ controller: 'TranscribeController:getOneById', response: error, message: 'Error', level: 'error' });
      return res.status(400).json({
        success: false,
        msg: error,
      });
    }
  };

  static create = async (req: Request, res: Response) => {
    const { subject, summary, details, filePath } = req.body;

    try {
      await createTranscribeSchema.validate(req.body, { abortEarly: false });
    } catch (error) {
      logger.log({ controller: 'TranscribeController:create', response: error, message: 'Error', level: 'error' });
      return res.status(400).json({ errors: formatYupError(error), message: "Validation Error" });
    }

    // Create Entity Object
    const transcribe = new Transcribe();

    transcribe.subject = subject;
    transcribe.summary = summary;
    transcribe.details = details;
    transcribe.filePath = filePath;

    try {
      await createTranscribeService(transcribe);

      return res.status(201).json({
        success: true,
      });
    } catch (error) {
      logger.log({ controller: 'TranscribeController:create', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };

  static update = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const { subject, summary, details, filePath, thumbImagePath } = req.body;

    try {
      const entity: any = await getTranscribeByIdService(id);

      if (!entity.success) {
        logger.log({ controller: 'TranscribeController:create', response: entity.msg, message: 'Error', level: 'error' });
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      const transcribe: Transcribe = entity.data;

      transcribe.subject = subject;
      transcribe.summary = summary;
      transcribe.details = details;
      transcribe.filePath = filePath;

      await updateTranscribeService(transcribe);

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      logger.log({ controller: 'TranscribeController:create', response: error, message: 'Error', level: 'error' });
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
      const entity: any = await getTranscribeByIdService(id);

      if (!entity.success) {
        logger.log({ controller: 'TranscribeController:create', response: entity.msg, message: 'Error', level: 'error' });
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      await deleteTranscribeService(id);

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      logger.log({ controller: 'TranscribeController:create', response: error, message: 'Error', level: 'error' });
      res.status(400).send({
        success: false,
        msg: 'something went wrong',
      });
      return;
    }
  };
}

export default TranscribeController;
