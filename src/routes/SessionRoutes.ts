import Controller from "../controllers/controller";
import Routes from './Routes';
import express from "express";
import SessionController from "../controllers/SessionController";

export default class PointRoutes extends Routes {

    constructor(router: express.Router, controller: Controller) {
        super(router, controller);
    }

    public configureRoutes(): void {
        this.router.get('/get/sessions', (req, res, next) => (this.controller as SessionController).getSessions(req, res))
    }
} 