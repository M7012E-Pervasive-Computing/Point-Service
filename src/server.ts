import config from './config/config';
import logging from './config/logging';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';

import PointRoutes from './routes/PointRoutes';
import SessionRoutes from './routes/SessionRoutes';

import RouteNotFoundError from './errors/RouteNotFoundError';

import PointController from './controllers/PointController';
import SessionController from './controllers/SessionController';
import DatabaseController from './controllers/DatabaseController';

import Route from './middlewares/Route';

/**
 * Singleton server
 */
class Server {
  private static instance: Server;
  private name: string;
  private app: express.Application;
  private router: express.Router;
  private server: http.Server;
  private database: DatabaseController;

  private constructor(name: string) {
    this.name = name;
    this.app = express();
    this.router = express.Router();
    this.database = DatabaseController.getInstance();
    this.setupBodyParser();
    this.setApiRules();
    this.setupRoutes();
    this.setupServer();
  }

  /**
   * @returns Server instance
   */
  public static getInstance(): Server {
    if (!Server.instance) {
      Server.instance = new Server(`SERVER`);
    }
    return Server.instance;
  }

  /**
   * Setup Body parser
   */
  private setupBodyParser(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  /**
   * Set API rules
   */
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

  /**
   * Setup the routes
   */
  private setupRoutes(): void {
    // this.setupRouteLogging();
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => Route.getInstance().logging(req, res, next)
    );

    // Setup the routes
    new PointRoutes(this.router, PointController.getInstance());
    new SessionRoutes(this.router, SessionController.getInstance());
    this.app.use('/', this.router);

    // Route Not Found
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        const error = new RouteNotFoundError();
        return res.status(404).json({
          message: error.message
        });
      }
    );
  }

  /**
   * Setup http server
   */
  private setupServer(): void {
    this.server = http.createServer(this.app);
    this.server.listen(config.server.port, () =>
      logging.info(
        this.name,
        `Setup Server on ${config.server.hostname}:${config.server.port}`
      )
    );
  }

  /**
   * Called on shutdown
   */
  public shutdown(): void {
    this.server.close();
    logging.info(
      this.name,
      `Shutdown Server on ${config.server.hostname}:${config.server.port}`
    );
  }
}

const server = Server.getInstance();

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  DatabaseController.getInstance().close();
  server.shutdown();
});

process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  DatabaseController.getInstance().close();
  server.shutdown();
});
