import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

import {createNewUser, getUserCredentials, getFacebookProfile} from '../lib/dal/user-dal'
import store from '../lib/store'
import { signIn } from '../lib/action-creators/user'
const FBSDK = require('react-native-fbsdk')
import connect from '../lib/connect'
const {
  LoginButton,
  AccessToken
} = FBSDK

const createNewAccount = async ({id, first_name, last_name, picture: { data: { url } } }) => {
  return createNewUser(
    id,
    url,
    first_name,
    last_name
  )
}

const createOrFetchUserCredentials = async (data) => {
  console.log('data')
  console.log(data)
  const user = await getUserCredentials(data.id)
  if(user === 404){
    console.log('creating new usser')
    return createNewAccount(data)
  }
  return user
}

const LoginScreen = ({ navigation }) => (
  <View>
    <LoginButton
      permissions={['public_profile', 'email']}
      onLoginFinished={
        (error, result) => {
          if (error) {
            console.log("login has error: " + result.error)
          } else if (result.isCancelled) {
            console.log("login is cancelled.")
          } else {
            AccessToken.getCurrentAccessToken()
              .then(data => getFacebookProfile(data.accessToken))
              .then(data => createOrFetchUserCredentials(data))
              .then(user => {
                console.log(user)
                store.dispatch(signIn(user))
                navigation.dispatch({ type: 'Login' })
              })
          }
        }
      }
      onLogoutFinished={() => console.log("logout.")} />
  </View>
)

LoginScreen.navigationOptions = {
  title: 'Log In',
  headerLeft: null
}

export default LoginScreen