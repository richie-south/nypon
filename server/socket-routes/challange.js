const challangeHandler = require('../dal/challange-handler')
const userHandler = require('../dal/user-handler')
const cardHandler = require('../dal/card-handler')
const gameRoundHandler = require('../dal/game-round-handler')
const challangeCalculator = require('../lib/challange-calculator')

const newChallange = async (playerOneFbId, playerTwoFbId) => {
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

    // TODO: validate none null

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
    return challange.toObject()
  } catch (error) {
    throw error
  }
}

const isPlayerOne = (challange, fbId) =>
  challange.playerOne.fbId.toString() === fbId

const shouldRunChallange = (challange) =>
  challange.playerOneRounds.length === challange.playerTwoRounds.length


const getLatestRounds = challange => {
  const latest = challange.playerOneRounds.length - 1
  return [
    challange.playerOneRounds[latest],
    challange.playerTwoRounds[latest]
  ]
}


const runChallange = async (socket, challangeId, players) => {
  try {
    const challange = await challangeHandler.getChallangeById(challangeId)
    const [playerOneRound, playerTwoRound] = getLatestRounds(challange)

    const roundResult = challangeCalculator.calculateChallange(
      challange,
      playerOneRound,
      playerTwoRound,
    )

    return roundResult
  } catch (error) {
    throw error
  }

  /*if (isPlayerOne(challange, players[0].fbId)) {
    const [
      {
        clientId: playerOneClientId,
        socketId: playerOneSocketId,
      },
      {
        clientId: playerTwoClientId,
        socketId: playerTwoSocketId,
      }
    ] = players

  } else {
    const [
      {
        clientId: playerTwoClientId,
        socketId: playerTwoSocketId,
      },
      {
        clientId: playerOneClientId,
        socketId: playerOneSocketId,
      }
    ] = players
  }*/

}

const addChallangeRoundData = async (challangeId, fbId, abilities) => {

  const [challange, pureChallange, gameRound] = await Promise.all([
    challangeHandler.getChallangeById(challangeId),
    challangeHandler.getChallangeByIdNoPopulate(challangeId),
    gameRoundHandler.newRoundData(abilities)]
  )
  const round = await gameRound.save()
  // TODO: check if valid game round 
  // if user has that many abilitie cards left

  if (isPlayerOne(challange, fbId)) {
    pureChallange.playerOneRounds.push(round)
  } else {
    pureChallange.playerTwoRounds.push(round)
  }

  await pureChallange.save()
  return pureChallange
}

module.exports = {
  newChallange,
  joinChallangeRoom,
  addChallangeRoundData,
  shouldRunChallange,
  runChallange,
}

