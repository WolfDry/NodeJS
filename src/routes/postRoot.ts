import {Application} from "express-ws";
import bodyParser from "body-parser";
import { findUserById, updateUser } from "../repositories/userRepositories";
import { createPost } from "../repositories/postRepositories";

export function postRoot(app: Application) {
  app.post('/', bodyParser.urlencoded(), async (req, res) => {
      // On vient récuperer le contenu du post stocké dans le corps de la requête 
      const content = req.body.content;
      // On vient récuperer l'utilisateur
      const user = await findUserById(req.signedCookies.ssid)
      // Si  aucun utilisateur n'est trouvé on retourne une erreur
      if (!user) {
        res.status(401).send('Invalid user')
        return;
      }
      // On vient créer le post et on redirige vers la page d'accueil
      if(await createPost(content, user.id)){
        res.redirect('/')
        return
      }
      // Si une erreur survient lors de la création on retourne une erreur
      res.status(401).send('Invalid parameters');
      return
    }
  )
}