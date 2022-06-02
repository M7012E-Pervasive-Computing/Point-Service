import Controller from '../controllers/Controller';
import Routes from './Routes';
import express from 'express';
import SessionController from '../controllers/SessionController';

/**
 * Route class which handles sessions
 */
export default class PointRoutes extends Routes {
  constructor(router: express.Router, controller: Controller) {
    super(router, controller);
  }

  /**
   * Setup Session Routes
   */
  public configureRoutes(): void {
    this.router.get('/namees', (req, res, next) =>
      (this.controller as SessionController).getSessions(req, res)
    );
  }
}
