import {Application} from 'express-ws'
import bodyParser from 'body-parser'
import { findUserById, updatePostsAndUser } from '../repositories/userRepositories'
import { createPost, findLastPostByUser } from '../repositories/postRepositories'

export function postRoot(app: Application) {
    app.post('/', bodyParser.urlencoded(), async (req, res) => {
        // On vient récuperer le contenu du post stocké dans le corps de la requête 
        const content = req.body.content
        // On vient récuperer l'utilisateur
        const user = await findUserById(req.signedCookies.ssid)
        // Si  aucun utilisateur n'est trouvé on retourne une erreur
        if (!user) {
            res.status(401).send('Invalid user')
            return
        }
        // On vient créer le post et on redirige vers la page d'accueil
        if(await createPost(content, user.id)){
        // On vient récupérer le post que l'on vient de créer
            const lastPost = await findLastPostByUser(user.id)
            if(!lastPost){
                res.status(401).send('Error post creation')
                return
            }
            // on vient mettre à jour la liste des posts de l'utilisateur
            if(await updatePostsAndUser(lastPost.id, user.id)){
                res.status(200).send('Success')
                return
            }
            // Si une erreur survient lors de la mise à jour de la liste des posts de l'utilisateur on retourne une erreur
            res.status(401).send('Error update user')
            return
        }
        // Si une erreur survient lors de la création on retourne une erreur
        res.status(401).send('Error create post')
        return
    }
    )
}