import { Application } from "express-ws";
import { findPost } from "../repositories/postRepositories";

export function getPosts(app: Application) {
  // Récupère les informations d'un utilisateur en fonction du cookie enregistré
  app.get('/getposts', async (req, res) => {
    // Si aucun cookie du nom de ssid n'est enregistré, on renvoie sur la page d'accueil
    if (!req.signedCookies.ssid) {
      res.redirect('/')
      return
    }
    // Si il y a un cookie d'enregistré, on récupère et retourne les données des posts 
    const posts = await findPost()
    res.json(posts)
  })
}
