import config from './config/config';
import logging from './config/logging';
import mongoose from 'mongoose';
import express, { NextFunction } from 'express';
import bodyParser from 'body-parser';
import http from 'http';

import PointRoutes from './routes/PointRoutes';
import PointController from './controllers/PointController';
import SessionRoutes from './routes/SessionRoutes';
import SessionController from './controllers/SessionController';

import RouteNotFound from './errors/RouteNotFound';

class Sever {
  private name: string;
  private app: express.Application;
  private router: express.Router;
  private server: http.Server;

  constructor(name: string) {
    this.name = name;
    this.app = express();
    this.router = express.Router();
    this.setupBodyParser();
    this.setApiRules();
    this.setupRoutes();
    // this.setupMongooseConnection();
    this.setupServer();
  }

  private setupBodyParser(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  private setApiRules(): void {
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );

        if (req.method == 'OPTIONS') {
          res.header(
            'Access-Control-Allow-Methods',
            'GET PATCH DELETE POST PUT'
          );
          return res.status(200).json({});
        }
        next();
      }
    );
  }

  private setupRoutes(): void {
    this.setupRouteLogging();

    // Setup the routes
    new PointRoutes(this.router, new PointController('POINT'));
    new SessionRoutes(this.router, new SessionController('SESSION'));
    this.app.use('/', this.router);

    // Route Not Found
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        const error = new RouteNotFound();
        return res.status(404).json({
          message: error.message
        });
      }
    );
  }

  private setupRouteLogging(): void {
    this.app.use(
      (req: express.Request, res: express.Response, next: NextFunction) => {
        logging.info(
          this.name,
          `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
        );

        res.on('finish', () => {
          logging.info(
            this.name,
            `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
          );
        });

        next();
      }
    );
  }

  private setupMongooseConnection(): void {
    mongoose
      .connect(
        `mongodb://${config.database.hostname}:${config.database.port}/${config.database.hostname}`
      )
      .then((_) => {
        logging.info(
          this.name,
          `Connected to ${config.database.hostname}:${config.database.port}!`
        );
      })
      .catch((error) => {
        logging.error(this.name, error.message);
      });
  }

  private setupServer(): void {
    this.server = http.createServer(this.app);
    this.server.listen(config.server.port, () =>
      logging.info(
        this.name,
        `Setup Server on ${config.server.hostname}:${config.server.port}`
      )
    );
  }
}

new Sever('SERVER');
