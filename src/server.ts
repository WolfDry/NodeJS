import expressWs, {Application} from "express-ws";
import express, { NextFunction, Request, Response } from "express";
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import { getLogin } from "./routes/getLogin";
import { postLogin } from "./routes/postLogin";
import { getRegister } from "./routes/getRegister";
import { postRegister } from "./routes/postRegister";
import { getRoot } from "./routes/getRoot";
import { getWs } from "./routes/getWs";
import { getProfile } from "./routes/getProfile";
import { getUser } from "./routes/getUser";
import { updateProfile } from "./routes/postProfile";
import { deleteProfile } from "./routes/deleteProfile";
import { logout } from "./routes/logout";
import { getChat } from "./routes/getChat";
import { authenticationMiddleware } from "./middlewares/authenticationMiddleware";

const SECRET_KEY = 'MySecretKeyIsAwesome'

function main() {
  const app = express() as unknown as Application;
  expressWs(app);
  const sockets = new Map();

  app.use(cookieParser(SECRET_KEY))
  app.use(express.static(path.join(__dirname, '../public')))

  getLogin(app)
  postLogin(app)
  getRegister(app)
  postRegister(app)
  
  app.use(authenticationMiddleware)
  getRoot(app)
  getChat(app)
  getWs(app, sockets)
  getProfile(app)
  getUser(app)
  updateProfile(app)
  deleteProfile(app)
  logout(app)

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error)

    res.status(500).send('Internal Server Error')

    next()
  })

  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
}

main()
