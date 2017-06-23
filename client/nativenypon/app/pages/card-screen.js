import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { compose, withProps, withHandlers, setStatic } from 'recompose'
import { connect } from 'react-redux'
import Card from '../components/card/card'
import store from '../lib/store'
import { TabNavigator } from 'react-navigation'
import CreateGame from './create-game'
import styles from './styles/card-screen-styles'

const statlessCardTab = ({ user }) => (
  <View style={styles.container}>
    <Card card={user.card}/>
  </View>
)

const CardScreen = compose(
  connect(({user}) => ({user})),
  WrappedComponent => ({...props}) => 
    props.user.hasOwnProperty('card') ? <WrappedComponent {...props}/> : null
    
)(statlessCardTab)

CardScreen.navigationOptions = {
  tabBarLabel: 'Card',
}

export default CardScreen