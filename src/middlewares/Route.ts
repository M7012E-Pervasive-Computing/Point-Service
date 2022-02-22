
import express from 'express';

import logging from '../config/logging';
import config from '../config/config';

export default class Route {

    private static instance: Route;
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public static getInstance(): Route {
        if (!Route.instance) {
            Route.instance = new Route('ROUTE');
        }
        return Route.instance;
    }

    public logging(req: express.Request, res: express.Response, next: express.NextFunction) {
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

}
