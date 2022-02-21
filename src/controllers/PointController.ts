import express from 'express';
import Controller from './controller';

export default class PointController extends Controller {
  constructor(name: string) {
    super(name);
  }

  public addPoints(req: express.Request, res: express.Response) {
    return res.status(200).json({
      message: 'SUCCESS'
    });
  }

  public getSession(req: express.Request, res: express.Response) {
    return res.status(200).json({
      message: 'SUCCESS'
    });
  }
}
