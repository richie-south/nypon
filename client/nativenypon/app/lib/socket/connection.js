import config from '../../../config'
import store from '../../lib/store'
import { addClientId } from '../action-creators/user'

if (window.navigator && Object.keys(window.navigator).length == 0) {
  window = Object.assign(window, { navigator: { userAgent: 'ReactNative' } });
}

const io = require('socket.io-client')
const socket = io(config.socketUrl, {
  transports: ['websocket'], forceNew: true
})

socket.on('connect', () => {
  console.log('Conected!')
  const { user: fbId } = store.getState()

  socket.emit('client-props', {
    fbId
  })

})

socket.on('connection-props', ({ clientId }) => {
  console.log('connection-props', clientId)
  store.dispatch(addClientId(clientId))
})

socket.on('join-new-challange', (data) => {
  console.log('join-new-challange', data)
})

export default socket