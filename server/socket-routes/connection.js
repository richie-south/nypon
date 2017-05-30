
const shortid = require('shortid')
const challange = require('./challange')
const clients = {}


const connection = io => {

  io.sockets.on('connection', function (socket) {

    const clientId = shortid.generate()
    clients[clientId] = {
      socketId: socket.id,
      fbId: null,
    }

    console.log('connected', socket.id, clientId)

    socket.on('client-props', function ({ fbId }) {
      clients[clientId].fbId = fbId

      socket.emit('connection-props', {
        clientId,
      })
    })

    socket.on('start-new-challange', async function ({ opponentClientId }) {
      const { socketId: playerOneSocketId, fbId: playerOneFbId } = clients[clientId]
      const { socketId: playerTwoSocketId, fbId: playerTwoFbId } = clients[opponentClientId]
      try {
        const dataToSend = await challange.newChallange(
          io,
          socket,
          playerOneSocketId,
          playerOneFbId,
          playerTwoSocketId,
          playerTwoFbId
        )

        socket.broadcast.to(playerOneSocketId).emit('start-new-challange', dataToSend)
        socket.broadcast.to(playerTwoSocketId).emit('start-new-challange', dataToSend)


      } catch (error) {
        console.log('ERROR: start-new-challange', error)
      }

    })

    socket.on('join-challange-room', async function ({ challangeRoomId }) {
      try {
        await challange.joinChallangeRoom(socket, challangeRoomId)
      } catch (error) {
        console.log('ERROR: join-challange-room', error)
      }
    })

    socket.on('disconnect', function () {
      console.log('dosconnected')
      delete clients[clientId]
    })
  })
}

module.exports = connection