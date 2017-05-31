
const shortid = require('shortid')
const challange = require('./challange')
const R = require('ramda')
const clients = {}

const getClientsByChallangeId = challangeId =>
  [R.filter(client => client.challangeId === challangeId, clients)]

const connection = io => {

  io.sockets.on('connection', function (socket) {

    const clientId = shortid.generate()
    clients[clientId] = {
      clientId,
      socketId: socket.id,
      fbId: null,
      challangeId: null,
    }

    console.log('connected', socket.id, clientId)

    /**
     * Recives clientId
     */
    socket.on('client-props', ({ fbId }) => {
      clients[clientId].fbId = fbId

      socket.emit('connection-props', {
        clientId,
      })
    })

    /**
     * Starts new challange, 
     * Sends new challange to both clients
     */
    socket.on('start-new-challange', async ({ opponentClientId }) => {
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

        socket.broadcast.to(playerOneSocketId).emit('join-new-challange', dataToSend)
        socket.broadcast.to(playerTwoSocketId).emit('join-new-challange', dataToSend)

      } catch (error) {
        console.log('ERROR: start-new-challange', error)
      }

    })

    /**
     * Clients connects to challange room with this
     */
    socket.on('join-challange-room', async ({ challangeRoomId }) => {
      try {
        const challangeProps = await challange.joinChallangeRoom(socket, challangeRoomId)
        clients[clientId].challangeId = challangeProps._id
      } catch (error) {
        console.log('ERROR: join-challange-room', error)
      }
    })

    /**
     * Recives position of abilitie card 
     * send to other client
     */
    socket.on('ingame-round-abilitie-poistion', ({ isAdd, position }) => {
      const { challangeId: roomId } = clients[clientId]

      socket.broadcast.to(roomId).emit('ingame-round-abilitie-poistion', { isAdd, position })
    })

    /**
     * Recives game round data 
     */
    socket.on('challange-round-data', async ({ abilities }) => {

      const { challangeId, socketId, fbId } = clients[clientId]
      try {
        const pureChallange = await challange.addChallangeRoundData(challangeId, fbId, abilities)

        if (challange.shouldRunChallange(pureChallange)) {
          const challangeResult = await challange.runChallange(
            socket,
            challangeId,
            getClientsByChallangeId(challangeId)
          )
        } else {
          // TODO: send timer event to opponent player
        }

      } catch (error) {
        console.log('ERROR: challange-round-data', error)
      }
    })

    socket.on('disconnect', function () {
      console.log('dosconnected')
      delete clients[clientId]
    })
  })
}

module.exports = connection