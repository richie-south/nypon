
const server = require('./app')

const port = process.env.PORT || 5001

server.listen(port, function () {
  console.log('Listening on port %d', server.address().port)
})