import mongoose from 'mongoose';

import config from '../config/config';
import logging from '../config/logging';
import Controller from './controller';

export default class DatabaseController extends Controller {
  private static instance: DatabaseController;

  private constructor() {
    super('DATABASE');
    mongoose
      .connect(
        `mongodb://${config.database.hostname}:${config.database.port}/${config.database.hostname}`
      )
      .then((_) => {
        logging.info(
          this.getName(),
          `Connected to ${config.database.hostname}:${config.database.port}!`
        );
      })
      .catch((error) => {
        logging.error(this.getName(), error.message);
      });
  }

  public static getInstance(): DatabaseController {
    if (!DatabaseController.instance) {
      DatabaseController.instance = new DatabaseController();
    }
    return DatabaseController.instance;
  }
}
