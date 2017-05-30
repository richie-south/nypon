
const server = require('./app')
const socketConnection = require('./socket-routes/connection')
const port = process.env.PORT || 5001

const io = require('socket.io').listen(server.listen(port, () => {
  console.log('Listening on port ', server.address().port)
  socketConnection(io)
}),
  {
    log: false,
    origins: '*:*',
  })



