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



/*import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { compose, withProps, withHandlers, setStatic } from 'recompose'
import { StackNavigator } from 'react-navigation'
import LoginScreen from './app/pages/login'

const statlessHome = ({ hello }) => (
  <View style={styles.container}>
    <Text>Open up App.js to start working on your app!</Text>
    <Text>Changes you make will automatically reload.</Text>
    <Text>{hello}</Text>
  </View>
)

const HomeScreen = compose(
  withProps((props) => ({
    hello: 'world',
    title: 'home2',
  })),
  setStatic('navigationOptions', { title: 'home' })
)(statlessHome)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const App = StackNavigator({
  MyCard: { screen: HomeScreen },
  Home: { screen: LoginScreen }
})

export default App


*/