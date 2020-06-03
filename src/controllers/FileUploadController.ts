import { Request, Response } from 'express';
import { multiUploadService, singleUploadService } from './../services/fileUpload';

class FileUploadController {
  static all = async (req: Request, res: Response) => {
    res.sendFile(__dirname + '/index.html');
  };

  static me = async (req: Request, res: Response) => {
    //Send the users object
    res.send('me');
  };

  static singleUpload = async (req: Request, res: Response) => {
    try {
      const result = await singleUploadService(req, res) as any;      
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  static multipleUpload = async (req: Request, res: Response) => {
    try {
      const result = await multiUploadService(req, res) as any;      
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  };

}

export default FileUploadController;
