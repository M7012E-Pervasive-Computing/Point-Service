import express from 'express';
import Controller from './controller';

export default class PointController extends Controller {
  private static instance: PointController;

  private constructor() {
    super('POINT');
  }

  public static getInstance(): PointController {
    if (!PointController.instance) {
      PointController.instance = new PointController();
    }
    return PointController.instance;
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
