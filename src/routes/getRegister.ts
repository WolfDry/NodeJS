import {Application} from "express-ws";
import path from "path";

export function getRegister(app: Application) {
    app.get('/register', (req, res) => {
        // On affiche la page d'inscription
        res.sendFile(path.join(__dirname, '../../pages/register.html'))
    })
}
  