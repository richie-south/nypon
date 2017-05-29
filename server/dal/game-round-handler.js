const GameRound = require('../model/game-round')

const newRoundData = abilitieTypeNumbers =>
  new GameRound({
    abilitieTypeNumbers,
  })

module.exports = {
  newRoundData,
}