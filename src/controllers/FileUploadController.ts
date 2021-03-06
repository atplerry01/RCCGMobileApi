import { Request, Response } from 'express';
import { imageUploadService, multiUploadService } from '../services/imageUpload';
import { videoUploadService } from '../services/videoUpload';
import { logger } from '../startup/logger';

class FileUploadController {
  static all = async (req: Request, res: Response) => {
    res.sendFile(__dirname + '/index.html');
  };

  static me = async (req: Request, res: Response) => {
    //Send the users object
    res.send('me');
  };

  static imageUpload = async (req: Request, res: Response) => {
    try {
      const result = await imageUploadService(req, res) as any;      
      return res.status(200).json(result);
    } catch (error) {
      logger.log({ controller: 'FileUploadController:imageUpload', response: error, message: 'Error', level: 'error' });
      return res.status(400).json(error);
    }
  };

  static videoUpload = async (req: Request, res: Response) => {
    try {
      const result = await videoUploadService(req, res) as any;      
      return res.status(200).json(result);
    } catch (error) {
      logger.log({ controller: 'FileUploadController:videoUpload', response: error, message: 'Error', level: 'error' });
      return res.status(400).json(error);
    }
  };

  static multipleUpload = async (req: Request, res: Response) => {
    try {
      const result = await multiUploadService(req, res) as any;      
      return res.status(200).json(result);
    } catch (error) {
      logger.log({ controller: 'FileUploadController:multipleUpload', response: error, message: 'Error', level: 'error' });
      return res.status(400).json(error);
    }
  };

}

export default FileUploadController;
