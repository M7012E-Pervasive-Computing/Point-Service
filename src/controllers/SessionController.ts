import express from 'express';
import logging from '../config/logging';
import Controller from './controller';
import Session from '../models/SessionSchema';

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

  public getSessions(req: express.Request, res: express.Response) {
    logging.info(this.getName(), "Find all sessions");
    return Session.find()
      .select('session')
      .exec()
      .then((result) => {
        logging.info(this.getName(), "Successfully found sessions");
        logging.info(this.getName(), `${result}`);

      })
      .catch((error) => {
        logging.error(this.getName(), `${error.message}`)
      })
  }
}
