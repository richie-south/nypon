const mongoose = require('mongoose')
const cardAbilities = require('../lib/card-abilities')

const cardSchema = mongoose.Schema({
  _creator: { type: String, ref: 'User' },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  backgroundCardColor: { type: String, required: true },
  stats: {
    lvl: { type: Number, min: 0, max: 30, default: 0 },
    xp: { type: Number, default: 0 },

    attack: {
      type: mongoose.Schema.Types.Mixed, default: cardAbilities.ATTACK,
    },
    heal: {
      type: mongoose.Schema.Types.Mixed, default: cardAbilities.HEAL,
    },
    block: {
      type: mongoose.Schema.Types.Mixed, default: cardAbilities.BLOCK,
    },

  },
  pastUsers: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ],
  createdAt: { type: Date, required: true, default: Date.now },
},
  {
    timestamps: true,
  })

const Card = mongoose.model('Card', cardSchema)
module.exports = Card