import {Application} from 'express-ws'
import bodyParser from 'body-parser'
import { findUserByEmail, updateUser } from '../repositories/userRepositories'

export function updateProfile(app: Application) {
    app.post('/profile', bodyParser.urlencoded(), async (req, res) => {
        // On vient récuperer l'ancien email de l'utilisateur stocké dans le corps de la requête 
        const email = req.body.oldEmail
        // On vient récuperer l'utilisateur associé à l'email
        const user = await findUserByEmail(email)
        // Si  aucun utilisateur n'est trouvé on retourne une erreur
        if (!user) {
            res.status(401).send('Invalid user')
            return
        }
        // On vient modifier l'utilisateur et on redirige vers la page profile
        if(await updateUser(user.id, req.body.name, req.body.email)){
            res.redirect('/profile')
            return
        }
        // Si une erreur survient lors de la modification on retourne une erreur
        res.status(401).send('Invalid parameters')
        return
    }
    )
}