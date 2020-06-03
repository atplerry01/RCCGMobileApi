import { Request, Response } from 'express';

class TestController {
  static all = async (req: Request, res: Response) => {
    //Send the users object
    res.send('all');
  };

  static me = async (req: Request, res: Response) => {
    //Send the users object
    res.send('me');
  };
}

export default TestController;
