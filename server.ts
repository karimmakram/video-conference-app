import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { initSocket } from './Web/socketIo'
import http from 'http'
import { roomRoute } from './Web/route/room'
import { ExpressPeerServer } from 'peer'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(`${__dirname}/public`))
app.set('view engine', 'ejs')
app.use('/', roomRoute)
const server: http.Server = initSocket(app)
const peerServer = ExpressPeerServer(server)
app.use('/peerjs', peerServer)

const port = process.env.PORT || 3001
server.listen(port, () => {
  console.log('App run from port ', port)
})
