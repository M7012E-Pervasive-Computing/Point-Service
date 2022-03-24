import express from 'express';

import logging from '../config/logging';
import config from '../config/config';

/**
 * Singleton used to log server requests
 */
export default class Route {
  private static instance: Route;
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  /**
   * @returns instance
   */
  public static getInstance(): Route {
    if (!Route.instance) {
      Route.instance = new Route('ROUTE');
    }
    return Route.instance;
  }

  /**
   * Middleware for logging
   */
  public logging(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
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
