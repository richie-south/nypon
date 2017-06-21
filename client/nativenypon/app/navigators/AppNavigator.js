import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import LoginScreen from '../pages/LoginScreen'
import HomeScreen from '../pages/HomeScreen'

export const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: HomeScreen }

})

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
)

const mapStateToProps = state => ({
  nav: state.nav,
})

export default connect(mapStateToProps)(AppWithNavigationState)