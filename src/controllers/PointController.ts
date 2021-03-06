import express from 'express';
import Session from '../models/SessionSchema';
import logging from '../config/logging';
import Controller from './Controller';

/**
 * Singleton point controller
 */
export default class PointController extends Controller {
  private static instance: PointController;

  private constructor() {
    super('POINT');
  }

  /**
   * @returns Point controller instance
   */
  public static getInstance(): PointController {
    if (!PointController.instance) {
      PointController.instance = new PointController();
    }
    return PointController.instance;
  }

  /**
   * Add points to session in database
   * @returns status
   */
  public addPoints(req: express.Request, res: express.Response) {
    const {name, data} = req.body
    return Session.exists({ sessionName: name })
      .then((exist: any) => {
        if (exist) {
          logging.info(
            this.getName(),
            `Attempt to add points for session ${name}`
          );
          return Session.updateOne(
            { sessionName: name },
            { $push: { points: { $each: data } } }
          )
            .exec()
            .then((_: any) => {
              logging.info(
                this.getName(),
                `Successfully added points to session ${name}`
              );
              return res.status(200).json({
                message: `Successfully added points to session ${name}`
              });
            })
            .catch((error: Error) => {
              logging.error(
                this.getName(),
                `Could not update session ${name} with new points, error: ${error.message}`
              );
              return res.status(500).json({
                message: `Could not add new points to session ${name}, error: ${error.message}`
              });
            });
        } else {
          logging.info(
            this.getName(),
            `Could not find session ${name}, attempt to create a new session`
          );
          const session = new Session({
            sessionName: name,
            points: data,
          });

          session
            .save()
            .then((_) => {
              logging.info(
                this.getName(),
                `Successfully created new session ${name}`
              );
              return res.status(201).json({
                message: `Successfully created a new session ${name}`
              });
            })
            .catch((error: Error) => {
              logging.error(
                this.getName(),
                `Could not create a new session, given error ${error.message}`
              );
              return res.status(500).json({
                message: `Could not create a new session, error: ${error.message}`
              });
            });
        }
      })
      .catch((error: Error) => {
        logging.error(
          this.getName(),
          `Cannot check if session ${name} exists, error: ${error.message}`
        );
        return res.status(500).json({
          message: `Cannot check if session ${name} exists, error: ${error.message}`
        });
      });
  }

  /**
   * Get points for a specific session given in the request
   * @returns Session points
   */
  public getSessionPoints(req: express.Request, res: express.Response) {
    logging.info(this.getName(), 'Getting session by Id');

    const sessionName: String =
      req.params.name != null ? req.params.name.toString() : '';

    return Session.exists({ sessionName: sessionName }).then((exist) => {
      if (exist) {
        logging.info(
          this.getName(),
          `Attempt to fetch points from session ${sessionName}`
        );
        return Session.findOne({ sessionName: sessionName })
          .select('points')
          .then((result) => {
            logging.info(
              this.getName(),
              `Successfully fetched points from session ${sessionName}`
            );
            return res.status(200).json({
              message: `Successfully added points to session ${sessionName}`,
              points: result.points
            });
          })
          .catch((error) => {
            logging.error(
              this.getName(),
              `Could not get points from session ${sessionName}, error: ${error.message}`
            );
            return res.status(500).json({
              message: `Could not get points from session ${sessionName}, error: ${error.message}`
            });
          });
      } else {
        logging.info(this.getName(), `Could not find session ${sessionName}`);
        return res.status(400).json({
          message: `Could not find session ${sessionName}`
        });
      }
    });
  }
}
