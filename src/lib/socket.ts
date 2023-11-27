import { Server } from 'socket.io'
import express from 'express'
import http from 'http'
import cors from 'cors'

const app = express()
const server = http.createServer(app)
// add cors
app.use(cors())
const io = new Server(server, {
    cors: {
        origin: '*',
    },
})

io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('hi', (data) => {
        if (data.app === 'codebar-receiver' && data.version === 1 && data.uuid !== undefined) {
            // this is a valid codebar-receiver client
            // send back a welcome message
            console.log(data)

            socket.emit('hi', {
                status: 'ok',
            })
        } else {
            console.log('error: invalid client')
        }
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

const PORT = process.env.PORT || 3000

export function socketInit() {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}
