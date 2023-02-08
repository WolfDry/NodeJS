import {Application} from "express-ws";
import bodyParser from "body-parser";
import { findUserByEmail, createUser } from "../repositories/userRepositories";

export function postRegister(app: Application) {
  app.post('/register', bodyParser.urlencoded(), async (req, res) => {
      // On vient récuperer l'email et le nom stocké dans le corps de la requête
      const {email, name} = req.body

      // Si aucun email ou nom n'est trouvé, on retourne une erreur
      if(!email || !name){
        res.status(400).send('Bad Request')
        return
      }

      //On vérifie que l'email ne soit pas déjà utilisé par un autre utilisateur
      const user = await findUserByEmail(email)
      if (user) {
        res.status(401).send('Invalid email');
        return;
      }

      // On vient créer un nouvel utilisateur et on redirige vers la page d'accueil
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
