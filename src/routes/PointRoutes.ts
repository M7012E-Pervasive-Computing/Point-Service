import Controller from '../controllers/Controller';
import Routes from './Routes';
import express from 'express';
import PointController from '../controllers/PointController';

/**
 * Route class which handles points
 */
export default class PointRoutes extends Routes {
  constructor(router: express.Router, controller: Controller) {
    super(router, controller);
  }

  /**
   * Setup routes for points
   */
  public configureRoutes(): void {
    this.router.post('/add/points', (req, res, next) =>
      (this.controller as PointController).addPoints(req, res)
    );
    this.router.get('/get/session/:name', (req, res, next) =>
      (this.controller as PointController).getSessionPoints(req, res)
    );
  }
}
