import mongoose from 'mongoose';

import config from '../config/config';
import logging from '../config/logging';
import Controller from './Controller';

export default class DatabaseController extends Controller {
  private static instance: DatabaseController;

  private constructor() {
    super('DATABASE');
    mongoose
      .connect(
        `mongodb://${config.database.hostname}:${config.database.port}/${config.database.name}`,
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          // auth: {
          //   authSource: 'admin',
          // },
          authSource: 'admin',
          user: config.database.user.toString(),
          pass: config.database.pass.toString(),
        })
      .then((_) => {
        logging.info(
          this.getName(),
          `Connected to ${config.database.hostname}:${config.database.port}`
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

  public close(): void {
    mongoose.connection
      .close()
      .then(() => {
        logging.info(
          this.getName(),
          `Closed connection on ${config.database.hostname}:${config.database.port}`
        );
      })
      .catch((error) => {
        logging.error(
          this.getName(),
          `Failed to close connection on ${config.database.hostname}:${config.database.port} caused by ${error}`
        );
      });
  }
}
