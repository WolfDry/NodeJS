import {Application} from "express-ws";
import bodyParser from "body-parser";
import { findUserByEmail } from "../repositories/userRepositories";

export function postLogin(app: Application) {
  app.post(
    '/login',
    bodyParser.urlencoded(),
    async (req, res) => {
      const email = req.body.email;
      const user = await findUserByEmail(email)
      if (!user) {
        res.status(401).send('Invalid email');
        return;
      }
      res.cookie(
        'ssid',
        user.id,
        { signed: true, httpOnly: true, sameSite: true }
      );
      res.redirect('/')
    }
  )
}
