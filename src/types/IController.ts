import {Response, Request} from 'express';

export default interface IController {
  (req: Request, res: Response): Promise<any>;
}
