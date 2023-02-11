import path from 'path'
import {Application} from 'express-ws'
import { findUserById } from '../repositories/userRepositories'
import { authenticationMiddleware } from '../middlewares/authenticationMiddleware'

export function getRoot(app: Application) {
    app.get('/', authenticationMiddleware, async (req, res) => {

        // Si l'utilisateur n'est pas connecté on vient rediriger vers la page login
        if (!req.signedCookies.ssid) {
            res.redirect('/login')
            return
        }

        // On vient vérifier que l'utilisateur existe
        // Si il n'existe pas on supprime le cookie et on redirige vers la page login
        const user = await findUserById(req.signedCookies.ssid)
        if(!user){
            res.clearCookie('ssid')
            res.redirect('/login')
            return
        }

        // On redirige vers la page d'accueil
        res.sendFile(path.join(__dirname, '../../pages/index.html'))
    })
}