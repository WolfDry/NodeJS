import {Application} from "express-ws";
import { deleteUser, findUserById } from "../repositories/userRepositories";

export function deleteProfile(app: Application) {
  app.post('/deleteProfile', async (req, res) => {
    // Si aucun cookie du nom de ssid n'est enregistré, on renvoie sur la page profile
    if (!req.signedCookies.ssid) {
      res.redirect('/profile')
      return
    }

    // On vient récupérer les informations de l'utilisateur
    let id = req.signedCookies.ssid
    let user = await findUserById(id)
    
    // Si aucun utilisateur n'est trouvé, on retourne une erreur
    if (!user) {
      res.status(401).send('Invalid user')
      return;
    }

    // On vient supprimer l'utilisateur
    if(await deleteUser(user.id)){
      res.clearCookie('ssid')
      res.redirect('/login')
      return
    }
    
    // Si une erreur survient lors de la suppression, on retourne une erreur
    res.status(401).send('delete error');
    return
    }
  )
}
