const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  fbId: { type: String, required: true },
  fbProfileImage: { type: String, required: true },
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
},
  {
    timestamps: true,
  })

const User = mongoose.model('User', userSchema)
module.exports = User