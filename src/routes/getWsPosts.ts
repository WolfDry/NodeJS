import { Application } from 'express-ws'
import { WebSocket } from 'ws'
import { findUserById } from '../repositories/userRepositories'

export function getWsPosts(app: Application, sockets: Map<string, WebSocket>) {
    app.ws('/wsPosts', async (ws, req) => {
        const user = await findUserById(req.signedCookies.ssid)
        console.log('user : ' + user )
        if (!user) {
            ws.close()
            return
        }
        sockets.set(user.id, ws)
        ws.on('message', (posts) => {
            console.log(posts)
            sockets.forEach((socket) => {
                socket.send(JSON.stringify({
                    type: 'post',
                    data: posts
                }))
            })
        })
        ws.on('close', () => {
            sockets.delete(user.id)
        })
    })
}
