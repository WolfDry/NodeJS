import {Application} from 'express-ws'
import path from 'path'

export function getLogin(app: Application) {
    app.get('/login', (req, res) => {
    // On vérifie si l'utilisateur est connecté
    // Si l'utilisateur est connecté, on le renvoie vers la page d'accueil
        if (req.signedCookies.ssid) {
            res.redirect('/profile')
            return
        }

        // Sinon on affiche la page de connection
        res.sendFile(path.join(__dirname, '../../pages/login.html'))
    })
}