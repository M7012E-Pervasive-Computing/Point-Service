import express from 'express';
import logging from '../config/logging';
import Controller from '../controllers/controller';

export default abstract class Routes {
    router: express.Router;
    controller: Controller;

    constructor(router: express.Router, controller: Controller) {
        this.router = router;
        this.controller = controller;  
        this.configureRoutes();
        logging.info(controller.getName(), 'Creating route');
    }

    public abstract configureRoutes(): void; 
}