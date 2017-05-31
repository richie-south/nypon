const mongoose = require('mongoose')

// TODO: check each value isNr and is eather 0, 1, 2
const arrayLimit = val => val.length === 3

const gameRoundSchema = mongoose.Schema({
  abilitieTypeNumbers: {
    type: [Number],
    required: true,
    validate: [arrayLimit, '{PATH} exceeds the limit of 3'],
  },
},
  {
    timestamps: true,
  })




module.exports = mongoose.model('GameRound', gameRoundSchema)