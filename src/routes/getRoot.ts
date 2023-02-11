import path from "path";
import {Application} from "express-ws";
import { findUserById } from "../repositories/userRepositories";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware"
import { findPost } from "../repositories/postRepositories";

export function getRoot(app: Application) {
  app.get('/', authenticationMiddleware, async (req, res) => {
    if (!req.signedCookies.ssid) {
      res.redirect('/login')
      return
    }

    const user = await findUserById(req.signedCookies.ssid)
    if(!user){
      res.clearCookie('ssid')
      res.redirect('/login')
      return
    }

    const posts = await findPost()
    res.sendFile(path.join(__dirname, '../../pages/index.html'))
  })
}
