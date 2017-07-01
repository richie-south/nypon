import config from '../../../config'
import store from '../../lib/store'
import {connectionDone} from '../../lib/action-creators/initial-loading'
import {newChallange} from '../action-creators/challange'
import { addClientId } from '../action-creators/user'
import { addAbilityCardPlayerTwo, removeAbilityCardPlayerTwo, clearAbilityCards } from '../action-creators/ability-round-data'
import { decreaseAbilityCardsPlayerTwo, setPlayerOneLife, setPlayerTwoLife } from '../action-creators/challange'

import { NavigationActions } from 'react-navigation'


if (window.navigator && Object.keys(window.navigator).length == 0) {
  window = Object.assign(window, { navigator: { userAgent: 'ReactNative' } });
}

const io = require('socket.io-client')
const socket = io(config.socketUrl, {
  transports: ['websocket'], forceNew: true
})

socket.on('connect', () => {
  console.log('Conected!')
  
  store.dispatch(connectionDone())
  // using this way becaus async presitStorage meesses things up
  let unsubscribe = store.subscribe(() => {
    const { user, initialLoading } = store.getState()
    if(initialLoading.isPresistDone){
      unsubscribe()
      console.log('fbId', user.fbId)
      socket.emit('client-props', {
        fbId: user.fbId
      })
    }
  })
  
})

socket.on('disconnect', () => {
  console.log('socket disconnect');
})

socket.on('connection-props', ({ clientId }) => {
  console.log('connection-props', clientId)
  store.dispatch(addClientId(clientId))
})

socket.on('join-new-challange', (data) => {
  console.log('join-new-challange', data)

  // move this server side
  socket.emit('join-challange-room', { challangeRoomId: data._id })
  store.dispatch(newChallange(data))
  store.dispatch(NavigationActions.navigate({ routeName: 'Challange' }))
})

socket.on('ingame-round-abilitie-poistion', ({isAdd, position}) => {
  console.log('reciving: ingame-round-abilitie-poistion', isAdd, position)
  if(isAdd){
    return store.dispatch(addAbilityCardPlayerTwo(3, position))
  }
  return store.dispatch(removeAbilityCardPlayerTwo(position))
})

socket.on('abilitie-round-result', ({round, position}) => {
  const type = round.abilities[1]
  const [playerOneLife, playerTwoLife] = round.roundResult
  store.dispatch(addAbilityCardPlayerTwo(type, position))
  store.dispatch(setPlayerOneLife(playerOneLife))
  store.dispatch(setPlayerTwoLife(playerTwoLife))
  store.dispatch(decreaseAbilityCardsPlayerTwo(type))
})

socket.on('abilitie-round-done', () => {
  store.dispatch(clearAbilityCards())
})

export const sendIngameRoundAbilitiePoistion = (isAdd, position) => {
  socket.emit('ingame-round-abilitie-poistion', {isAdd, position})
}

export const startNewChallange = opponentClientId => {
  socket.emit('start-new-challange', {opponentClientId})
}

export const sendRound = abilities => {
  socket.emit('challange-round-data', {abilities})
}


export default socket