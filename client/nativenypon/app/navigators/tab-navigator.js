import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { compose, withProps, withHandlers, setStatic } from 'recompose'
import { TabNavigator } from 'react-navigation'
import CreateGame from '../pages/create-game'
import CardScreen from '../pages/card-screen'
import tabStyles from './styles/tab-styles'
import haderStyles from './styles/header-styles'

const TabNav = TabNavigator({
  MainTab: {
    screen: CardScreen,
    path: '/cardtab',
  },
  CreateGame: {
    path: '/creategame',
    screen: CreateGame,
  },
}, 
{
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    style: tabStyles,
  }
})

const statlessHome = () => (
    <TabNav/>
)

const TabScreen = compose(  
)(statlessHome)

TabScreen.navigationOptions = {
  title: 'Nypon',
  headerTintColor: '#FFFFFF',
  headerStyle: haderStyles,
}

export default TabScreen
