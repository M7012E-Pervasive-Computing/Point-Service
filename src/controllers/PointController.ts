import express from 'express';
import { Session } from 'inspector';
import logging from '../config/logging';
import Controller from './controller';

export default class PointController extends Controller {
  constructor(name: string) {
    super(name);
  }

  public addPoints(req: express.Request, res: express.Response) {
    const {session, points} = req.body
    
    logging.info(this.getName(), "add points for session");
    
    // return Session.findOneAndUpdate(
    //   {id : id},
    //   { points },
    //   { new : true}
    // )
    // .exec()
    // .then((session) => {
    //   const message
    // })
    // return res.status(200).json({
    //   message: 'SUCCESS'
    // });
  }

  public getSession(req: express.Request, res: express.Response) {

    logging.info(this.getName(), "getting session by Id");
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
