

import io from 'socket.io-client'

const socket = io('http://localhost:5001/')

socket.on('connect', () => {
  console.log('Conected!')

  socket.emit('client-props', {
    fbId: 'testID',
  })

  socket.emit('start-new-challange', {
    opponentClientId: 'blaa'
  })

})

// notifications
socket.on('connection-props', (data) => {
  console.log('connection-props', data)
})

socket.on('join-new-challange', (data) => {
  console.log('join-new-challange', data)
})