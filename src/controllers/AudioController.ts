import { Request, Response } from 'express';
import { logger } from '../startup/logger';
import { Paginator } from '../utils/pagination';
import { createAudioSchema, formatYupError } from '../validations';
import { Audio } from './../entity/Audio';
import { createAudioService, deleteAudioService, getAudioByIdService, getAudioService, updateAudioService } from './../services/Audio';

class AudioController {

  static all = async (req: Request, res: Response) => {
    const { page, per_page } = req.query;

    try {
      const entity: any = await getAudioService();
      const result = await Paginator(entity, page, per_page);

      return res.status(200).json({
        success: true,
        result: result,
      });
    } catch (error) {
      logger.log({ message: 'Error', level: 'error', operation: 'all', controller: 'AudioController:all', response: error, status: 500 });
      return false;
    }
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: any = req.params.id;

    try {
      const entity: any = await getAudioByIdService(id);

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
    const { subject, summary, details, source, filePath, thumbImagePath } = req.body;
    
    try {
      await createAudioSchema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ errors: formatYupError(err), message: "Validation Error" });
    }

    // Create Entity Object
    const audio = new Audio();

    audio.subject = subject;
    audio.summary = summary;
    audio.details = details;
    audio.filePath = filePath;
    audio.thumbImagePath = thumbImagePath;
    audio.source = source;

    try {
      
      await createAudioService(audio);

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
    const { subject, summary, details, source, filePath, thumbImagePath } = req.body;

    try {
      const entity: any = await getAudioByIdService(id);

      if (!entity.success) {
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      const audio: Audio = entity.data;

      audio.subject = subject;
      audio.summary = summary;
      audio.details = details;
      audio.filePath = filePath;
      audio.thumbImagePath = thumbImagePath;
      audio.source = source;

      await updateAudioService(audio);

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
      const entity: any = await getAudioByIdService(id);

      if (!entity.success) {
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      await deleteAudioService(id);

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

export default AudioController;
