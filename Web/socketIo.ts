import http from 'http'
import socketIo from 'socket.io'

export function initSocket(app): http.Server {
  const server = http.createServer(app)
  const io = socketIo(server)
  io.on('connection', (socket: socketIo.Socket) => {
    console.log('socket io Connection')
    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId)
      socket.to(roomId).broadcast.emit('user-connected', userId)
      socket.on('message', text => {
        socket.to(roomId).broadcast.emit('createMessage', text)
      })
    })
  })
  return server
}
