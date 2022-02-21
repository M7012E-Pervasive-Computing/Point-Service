import express from 'express';
import Controller from './controller';

export default class PointController extends Controller {
  constructor(name: string) {
    super(name);
  }

  public addPoints(req: express.Request, res: express.Response) {}

  public getSession(req: express.Request, res: express.Response) {}
}
