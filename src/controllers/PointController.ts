import express from 'express';
import Session from '../models/SessionSchema';;
import logging from '../config/logging';
import Controller from './controller';

export default class PointController extends Controller {
  private static instance: PointController;

  private constructor() {
    super('POINT');
  }

  public static getInstance(): PointController {
    if (!PointController.instance) {
      PointController.instance = new PointController();
    }
    return PointController.instance;
  }

  public addPoints(req: express.Request, res: express.Response) {
    const { sessionName, points } = req.body;
    return Session.findOne({ sessionName: sessionName })
      .exec()
      .then((_) => {
        logging.info(this.getName(), `Attempt to add points for session ${sessionName}`);
        return Session.updateOne({ sessionName: sessionName }, { $push: { points: { "$each": points} } })
          .exec()
          .then((_) => {
            logging.info(this.getName(), `Successfully added points to session ${sessionName}`);
            return res.status(200).json({
              message: `Successfully added points to session ${sessionName}` 
            });
          })
          .catch((error) => {
            logging.error(this.getName(), `Could not update session ${sessionName} with new points, error: ${error.message}`)
            return res.status(500).json({
              message: `Could not add new points to session ${sessionName}, error: ${error.message}`
            })
          });
      })
      .catch((_) => {
        logging.info(this.getName(), `Could not find session ${sessionName}, attempt to create a new session`);
        const session = new Session({
          sessionName: sessionName,
          points: points
        })

        session
          .save()
          .then((_) => {
            logging.info(this.getName(), `Successfully created new session ${sessionName}`);
            return res.status(201).json({
              message: `Successfully created a new session ${sessionName}`
            });
          })
          .catch((error) => {
            logging.error(this.getName(), `Could not create a new session, given error ${error.message}`);
            return res.status(500).json({
              message: `Could not add points to existing session or create a new session, error: ${error.message}`
            })
          });
      });

    
  }

  public getSessionPoints(req: express.Request, res: express.Response) {
    logging.info(this.getName(), 'getting session by Id');
    return res.status(200).json({
      message: 'SUCCESS'
    });

    //find by session id

    // return Session.findById(id)
    //   .exec()
    //   .then((session) => {
    //     return res.status(200).json({
    //       message: 'SUCCESS'
    //     });
    //   })
    //   .catch((error) => {
    //     return res.status(500),json({

    //     });
    //   })
  }
}
