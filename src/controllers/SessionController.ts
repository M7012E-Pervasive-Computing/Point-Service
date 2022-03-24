import express from 'express';
import logging from '../config/logging';
import Controller from './Controller';
import Session from '../models/SessionSchema';

/**
 * Singleton Session Controller
 */
export default class SessionController extends Controller {
  private static instance: SessionController;

  private constructor() {
    super('SESSION');
  }

  /**
   * @returns instance of controller
   */
  public static getInstance(): SessionController {
    if (!SessionController.instance) {
      SessionController.instance = new SessionController();
    }
    return SessionController.instance;
  }

  /**
   * Get all the sessions in database
   * @returns Session names
   */
  public getSessions(req: express.Request, res: express.Response) {
    logging.info(this.getName(), 'Find all sessions');
    return Session.find()
      .select('sessionName')
      .exec()
      .then((result) => {
        logging.info(this.getName(), 'Successfully found sessions');
        return res.status(200).json({
          message: 'Succesfully found all the names of the sessions ',
          sessionNames: result
        });
      })
      .catch((error) => {
        logging.error(this.getName(), `${error.message}`);
        return res.status(500).json({
          message: `Could not find the names of the sessions, error: ${error.message}`
        });
      });
  }
}
