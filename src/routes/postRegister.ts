import {Application} from "express-ws";
import bodyParser from "body-parser";
import { findUserByEmail, createUser } from "../repositories/userRepositories";

export function postRegister(app: Application) {
  app.post(
    '/register',
    bodyParser.urlencoded(),
    async (req, res) => {
    //   const email = req.body.email;
    //   const name = req.body.name;
      const {email, name} = req.body
      if(!email || !name){
        res.status(400).send('Bad Request')
        return
      }
      const user = await findUserByEmail(email)
      if (user) {
        res.status(401).send('Invalid email');
        return;
      }
      const newUser = await createUser(email, name)
      res.cookie(
        'ssid',
        newUser.id,
        { signed: true, httpOnly: true, sameSite: true }
      );
      res.redirect('/')
    }
  )
}
