import express from 'express';
import logging from '../config/logging';
import Controller from '../controllers/Controller';

/**
 * Abstract class for all route classes
 */
export default abstract class Routes {
  protected router: express.Router;
  protected controller: Controller;

  constructor(router: express.Router, controller: Controller) {
    this.router = router;
    this.controller = controller;
    this.configureRoutes();
    logging.info(this.getName(), 'Setup route');
  }

  /**
   * Setup the routes
   */
  public abstract configureRoutes(): void;

  /**
   * @returns route name
   */
  public getName(): string {
    return this.controller.getName();
  }
}
