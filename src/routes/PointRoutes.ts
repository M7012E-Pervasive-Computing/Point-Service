import Controller from '../controllers/controller';
import Routes from './Routes';
import express from 'express';
import PointController from '../controllers/PointController';

export default class PointRoutes extends Routes {
  constructor(router: express.Router, controller: Controller) {
    super(router, controller);
  }

  public configureRoutes(): void {
    this.router.post('/add/points', (req, res, next) =>
      (this.controller as PointController).addPoints(req, res)
    );
    this.router.get('/get/session/:name', (req, res, next) =>
      (this.controller as PointController).getSession(req, res)
    );
  }
}
