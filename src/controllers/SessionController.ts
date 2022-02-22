import express from 'express';
import mongoose from 'mongoose';
import logging from '../config/logging';
import Controller from './controller';
import { SessionSchema } from '../models/SessionSchema';
import ISession from '../interfaces/SessionInterface';

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
    logging.info(this.getName(), "Searching for all sessions");
    let Session = mongoose.model<ISession>('Session', SessionSchema);
    return Session.find({})
      .select("name")
      .then((result) => {

      })
      .catch((error) => {
        logging.error(this.getName(), `${error.message}`)
      })
  }
}
