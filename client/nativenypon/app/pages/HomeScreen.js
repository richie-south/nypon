import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    return <Text>Hello, Navigation!</Text>;
  }
}

export default HomeScreen