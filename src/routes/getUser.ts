import {Application} from "express-ws";
import { findUserById } from "../repositories/userRepositories";

export function getUser(app: Application) {
  // Récupère les informations d'un utilisateur en fonction du cookie enregistré
  app.get('/getuser', async (req, res) => {
    // Si aucun cookie du nom de ssid n'est enregistré, on renvoie sur la page d'accueil
    if (!req.signedCookies.ssid) {
      res.redirect('/')
      return
    }
    // Si il y a un cookie d'enregistré, on récupère et retourne les données de l'utilisateur 
    const user = await findUserById(req.signedCookies.ssid)
    res.json(user)
  })
}
