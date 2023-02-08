import {Application} from "express-ws";

export function logout(app: Application) {
  app.get('/logout', async (req, res) => {
        // Si aucun cookie du nom de ssid n'est enregistré, on renvoie sur la page profile
        if (!req.signedCookies.ssid) {
        res.redirect('/profile')
        return
        }

        // On vient déconnecter l'utilisateur en supprimant le cookie ssid, et on redirige vers la page login
        res.clearCookie('ssid')
        res.redirect('/login')
        return
    }
  )
}
