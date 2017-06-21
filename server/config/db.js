const mongoose = require('mongoose')
const mongodbUrl = process.env.MONGODB_URL
//const testURL = 'mongodb://localhost/nypon'
/**
 * [makes an mongoose databese connection]
 * [dispalys errors if any]
 */
const initilize = () => {
  const db = mongoose.connection

  db.on('error', (error) => {
    console.log('db error', error)
  })

  db.once('open', () => {
    console.log('db open')
  })

  process.on('SIGINT', () => {
    db.close(() => {
      console.log('Mongoose connection disconnected app termination.')
      process.exit(0)
    })
  })

  mongoose.connect(mongodbUrl)
}

module.exports = initilize