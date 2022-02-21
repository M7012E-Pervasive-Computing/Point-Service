import express from 'express';
import Controller from './controller';

export default class PointController extends Controller {
  constructor(name: string) {
    super(name);
  }

  public getSessions(req: express.Request, res: express.Response) {}
}
