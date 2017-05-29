const mongoose = require('mongoose')

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

const arrayLimit = val => val.length > 3 || val.length < 3

module.exports = mongoose.model('GameRound', gameRoundSchema)