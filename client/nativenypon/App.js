import { AppRegistry } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import store from './app/lib/store'

import AppWithNavigationState from './app/navigators/AppNavigator'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}

export default App
