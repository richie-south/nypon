import { combineReducers } from 'redux'
import { user } from './user'
import { auth } from './auth'
import { NavigationActions } from 'react-navigation'
import { AppNavigator } from '../../navigators/AppNavigator'

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Main')
const tempNavState = AppNavigator.router.getStateForAction(firstAction)
const secondAction = AppNavigator.router.getActionForPathAndParams('Login')
const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState
)

function nav(state = initialNavState, action) {
  switch (action.type) {
    case 'Login':
      return AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      )
      break
    case 'Logout':
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      )
      break
    default:
      return AppNavigator.router.getStateForAction(action, state)
      break
  }
}

const rootReducer = combineReducers({
  nav,
  auth,
  user,
})

export default rootReducer