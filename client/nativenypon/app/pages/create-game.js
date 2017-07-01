import React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { compose, withProps, withHandlers, withState } from 'recompose'
import { connect } from 'react-redux'
//import store from '../lib/store'
import socket from '../lib/socket/connection'
import styles from './styles/create-game-styles'
//import { NavigationActions } from 'react-navigation'
import {startNewChallange} from '../lib/socket/connection'

const statlessCreateGame = ({ setText, inputText, clientId }) => (
  <View style={styles.container}>
    <Text>ID: {clientId}</Text>
    <TextInput
      style={styles.textInput}
      onChangeText={(text) => setText(text)}
      autoCapitalize={'none'}
      onSubmitEditing={() => { console.log('hey!')}}
    />
    <Button 
      onPress={() => {
        startNewChallange(inputText)
      }}
      title='Create Game'
      color='#ff5722'
    />
  </View>
)

const CreateGame = compose(
  connect(({ user }) => ({
    clientId: user.clientId
  })),
  withState('inputText', 'setText', ''),
  WrappedComponent => ({ ...props }) =>
    !props.clientId === ''
      ? null
      : <WrappedComponent {...props} />
  )(statlessCreateGame)

CreateGame.navigationOptions = {
  tabBarLabel: 'Create Game',
}

export default CreateGame
