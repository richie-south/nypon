const challangeHandler = require('../dal/challange-handler')
const userHandler = require('../dal/user-handler')
const cardHandler = require('../dal/card-handler')


const newChallange = async (io, socket, playerOneSocketId, playerOneFbId, playerTwoSocketId, playerTwoFbId) => {
  try {
    /**
   * playerOne, playerOneCard, playerTwo, playerTwoCard
   */
    const playersAndCards = await Promise.all([
      userHandler.getUserByFbId(playerOneFbId),
      userHandler.getUserCardByFbId(playerOneFbId),
      userHandler.getUserByFbId(playerTwoFbId),
      userHandler.getUserCardByFbId(playerTwoFbId)
    ])

    // TODO: validate non null

    const challange = await challangeHandler.newChallange(...playersAndCards).save()

    // TODO: select custom props from challange
    return challange.toObject()
  } catch (error) {
    throw error
  }
}


const joinChallangeRoom = async (socket, challangeRoomId) => {
  try {
    const challange = await challangeHandler.getChallangeById(challangeRoomId)

    if (challange === null || challange === undefined) {
      throw new Error('Challange not found')
    }

    socket.join(challangeRoomId)
  } catch (error) {
    throw error
  }
}

module.exports = {
  newChallange,
  joinChallangeRoom,
}

