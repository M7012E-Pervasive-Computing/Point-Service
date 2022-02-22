import express from 'express';
import Controller from './controller';

export default class SessionController extends Controller {
  private static instance: SessionController;

  private constructor() {
    super('SESSION');
  }

  public static getInstance(): SessionController {
    if (!SessionController.instance) {
      SessionController.instance = new SessionController();
    }
    return SessionController.instance;
  }

  public getSessions(req: express.Request, res: express.Response) {}
}
