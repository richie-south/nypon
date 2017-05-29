
const mongoose = require('mongoose')

const challangeSchema = mongoose.Schema({
  playerOne: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  playerOneCard: { type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true },
  playerOneRounds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GameRound' }],

  playerOneProps: {
    healCards: { type: Number, min: 0, default: 4, required: true },
    attackCards: { type: Number, min: 0, default: 4, required: true },
    blockCards: { type: Number, min: 0, default: 4, required: true },
    maxLife: { type: Number, min: 100, default: 100, required: true },
    life: { type: Number, min: 0, default: 100, required: true },
  },

  // opponent
  playerTwo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  playerTwoCard: { type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true },
  playerTwoRounds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GameRound' }],

  playerTwoProps: {
    healCards: { type: Number, min: 0, default: 4, required: true },
    attackCards: { type: Number, min: 0, default: 4, required: true },
    blockCards: { type: Number, min: 0, default: 4, required: true },
    maxLife: { type: Number, min: 100, default: 100, required: true },
    life: { type: Number, min: 0, default: 100, required: true },
  },
},
  {
    timestamps: true,
  })

module.exports = mongoose.model('Challange', challangeSchema)