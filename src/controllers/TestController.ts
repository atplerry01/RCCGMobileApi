import { Request, Response } from 'express';

class TestController {
  static all = async (req: Request, res: Response) => {
    //Send the users object
    // try {
    //   logger.log('log', 'ok');
    //   // logger.log({
    //   //   message: 'Request recieved', level: 'info',
    //   //   transationId: 'one', correlationId: 'one',
    //   //   request: req.query,
    //   //   operation: 'demoFunction'
    //   // });
    // } catch (error) {
    //   logger.log({
    //     level: 'ERROR',
    //     message: 'Error',
    //     time: moment().format(),
    //     transationId: 'one',
    //     correlationId: 'one',
    //     response: error, 
    //     status: 500,
    //     operation: 'demoFunction'
    //   });
    // }

    res.send('all');
  };

  static me = async (req: Request, res: Response) => {
    //Send the users object
    res.send('me');
  };
}

export default TestController;
