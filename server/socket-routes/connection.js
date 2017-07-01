
const shortid = require('shortid')
const challange = require('./challange')
const challangeHandler = require('../dal/challange-handler')
const R = require('ramda')
const plura = require('plura')
const words = require('simple-words')
const clients = {}

/*const getClientsByChallangeId = challangeId =>
  [R.filter(client => client.challangeId === challangeId, clients)]*/

const getClientsByChallangeId = challangeId =>
  plura.reduce((a, b) => {
      return a.concat(b)
    }, 
    [], 
    plura.filter(client => client.challangeId === challangeId, clients)
  )

const switchPlayerOneWithPlayerTwo = challange => {
  return Object.assign({}, challange, {
    playerOne: challange.playerTwo,
    playerOneCard: challange.playerTwoCard,
    playerOneProps: challange.playerTwoProps,
    playerOneRounds: challange.playerTwoRounds,
    playerTwo: challange.playerOne,
    playerTwoCard: challange.playerOneCard,
    playerTwoProps: challange.playerOneProps,
    playerTwoRounds: challange.playerOneRounds,
  })
}

const connection = io => {

  io.sockets.on('connection', function (socket) {

    //const clientId = shortid.generate().toLowerCase()
    const clientId = words.one()
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
      // TODO check fbId exists 
      socket.emit('connection-props', {
        clientId,
      })
    })

    /**
     * Starts new challange, 
     * Sends new challange to both clients
     */
    socket.on('start-new-challange', async ({ opponentClientId }) => {
      console.log('starting new challange', opponentClientId)

      try {
        const { socketId: playerOneSocketId, fbId: playerOneFbId } = clients[clientId]
        const { socketId: playerTwoSocketId, fbId: playerTwoFbId } = clients[opponentClientId]
        const dataToSend = await challange.newChallange(
          playerOneFbId,
          playerTwoFbId
        )
        io.sockets.connected[playerOneSocketId].emit('join-new-challange', dataToSend)
        io.sockets.connected[playerTwoSocketId].emit('join-new-challange', switchPlayerOneWithPlayerTwo(dataToSend))

      } catch (error) {
        // TODO: exit challange
        console.log('ERROR: start-new-challange', error)
      }

    })

    /**
     * Clients connects to challange room with this
     */
    socket.on('join-challange-room', async ({ challangeRoomId }) => {
      try {
        const challangeProps = await challange.joinChallangeRoom(socket, challangeRoomId)
        clients[clientId].challangeId = challangeProps._id.toString()
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
      console.log('challange-round-data', abilities)
      const { challangeId, socketId, fbId } = clients[clientId]

      try {
        const pureChallange = await challange.addChallangeRoundData(challangeId, fbId, abilities)
        const myChallange = await challangeHandler.getChallangeById(challangeId)

        if (challange.shouldRunChallange(pureChallange)) {

          const challangeResult = await challange.runChallange(challangeId)
          challange.sendRoundResults(
            io,
            challangeResult,
            getClientsByChallangeId(challangeId),
            myChallange
          )
        } else {
          // TODO: send timer event to opponent player
          console.log('not equal yet!')
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