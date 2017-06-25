import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import LoginScreen from '../pages/LoginScreen'
import TabScreen from './tab-navigator'
import ChallangeScreen from '../pages/challange-screen'

export const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: TabScreen },
  Challange: {screen: ChallangeScreen}
}, {
  headerMode: 'screen'
})

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
)

const mapStateToProps = state => ({
  nav: state.nav,
})

export default connect(mapStateToProps)(AppWithNavigationState)