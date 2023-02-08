import {Application} from "express-ws";
import path from "path";

export function getProfile(app: Application) {
  app.get('/profile', (req, res) => {
    // On vérifie si l'utilisateur est connecté
    // Si l'utilisateur est connecté, on le renvoie vers la page d'accueil
    if (!req.signedCookies.ssid) {
      res.redirect('/')
      return
    }
    //Sinon on affiche la page profile
    res.sendFile(path.join(__dirname, '../../pages/profile.html'))
  })
}
