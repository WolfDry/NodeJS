import {Application} from 'express-ws'
import bodyParser from 'body-parser'
import { findUserByEmail } from '../repositories/userRepositories'

export function postLogin(app: Application) {
    app.post('/login', bodyParser.urlencoded(), async (req, res) => {

        // On vient récuperer l'email stocké dans le corps de la requête 
        const email = req.body.email

        // On vient récuperer l'utilisateur associé à l'email
        const user = await findUserByEmail(email)

        // Si aucun utilisateur n'est trouvé, on retourne une erreur
        if (!user) {
            res.status(401).send('Invalid email')
            return
        }

        // Sinon on créer le cookie ssid et on redirige l'utilisateur vers la page d'accueil
        res.cookie('ssid', user.id, { signed: true, httpOnly: true, sameSite: true })
        res.redirect('/')
    })
}