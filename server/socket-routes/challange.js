const challangeHandler = require('../dal/challange-handler')
const userHandler = require('../dal/user-handler')
const cardHandler = require('../dal/card-handler')
const gameRoundHandler = require('../dal/game-round-handler')
const challangeCalculator = require('../lib/challange-calculator')
const ATTACK = 0
const HEAL = 1
const BLOCK = 2

const newChallange = async (playerOneFbId, playerTwoFbId) => {
  try {
    console.log(playerOneFbId, playerTwoFbId)
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

const getAbilitieCardsToRemove = (playerOneRound, playerOneProps, playerTwoRound, playerTwoProps) => {
  const order = (round, props) => {
    const abilities = round.reduce((collection, abilitie) => {
      if (abilitie === ATTACK) {
        collection[0] = collection[0] + 1
      } else if (abilitie === HEAL) {
        collection[1] = collection[1] + 1
      } else {
        collection[2] = collection[2] + 1
      }
      return collection
    }, [0, 0, 0])

    abilities[0] = props.attackCards - abilities[0]
    abilities[1] = props.healCards - abilities[1]
    abilities[2] = props.blockCards - abilities[2]
    return abilities
  }

  return [
    ...order(playerOneRound, playerOneProps),
    ...order(playerTwoRound, playerTwoProps),
  ]
}

const switchRound = round => ({
  abilities: [
    round.abilities[1],
    round.abilities[0],
  ],
  roundResult: [
    round.roundResult[1],
    round.roundResult[0],
  ]
})

const sendRoundResults = (io, roundResult, players, challange) => {
  let playerOnePosition
  let playerTwoPosition
  if (isPlayerOne(challange, players[0].fbId)) {
    playerOnePosition = 0
    playerTwoPosition = 1
  } else {
    playerOnePosition = 1
    playerTwoPosition = 0
  }

  /**
   * 1. send each round result to each player seperatly
   *  - check if somone has won 
   *    - send gameover envent
   *  - is last round? 
   * 2. wait x times then do 1. again
   * 
   */

  const runTimer = (time, round, position, isRoundDone) =>
    setTimeout(() => {
      console.log('sends result', time, position, isRoundDone)
      io.sockets.connected[
        players[playerOnePosition].socketId
      ].emit('abilitie-round-result', {round, position})

      io.sockets.connected[
        players[playerTwoPosition].socketId
      ].emit('abilitie-round-result', {round: switchRound(round), position})

      if(isRoundDone){
        setTimeout(() => {
            io.sockets.connected[
              players[playerOnePosition].socketId
            ].emit('abilitie-round-done', {isRoundDone})
          io.sockets.connected[
              players[playerTwoPosition].socketId
            ].emit('abilitie-round-done', {isRoundDone})
        }, 2000)
      }
    }, time)

  roundResult.map((round, i) =>
    runTimer(2000 * (i === 0 ? 1 : i + 1), round, i, i === roundResult.length-1)
  )
}

const runChallange = async (challangeId) => {
  try {

    const challange = await challangeHandler.getChallangeById(challangeId)
    const [
      { abilitieTypeNumbers: playerOneRound }, { abilitieTypeNumbers: playerTwoRound }
    ] = getLatestRounds(challange)

    await challangeHandler.updateAbilitieCards(challangeId,
      ...getAbilitieCardsToRemove(
        playerOneRound,
        challange.playerOneProps,
        playerTwoRound,
        challange.playerTwoProps
      )
    )

    const updatedChallange = await challangeHandler.getChallangeById(challangeId)
    const roundResult = challangeCalculator.calculateChallange(
      updatedChallange,
      playerOneRound,
      playerTwoRound
    )

    await challangeHandler.updateLife(challangeId, ...roundResult[roundResult.length - 1].roundResult)
    return roundResult

  } catch (error) {
    throw error
  }
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
    // TODO: remove abilitie card nrs 
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
  sendRoundResults,
}

