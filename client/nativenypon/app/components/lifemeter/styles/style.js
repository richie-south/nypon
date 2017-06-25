import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({

  // lifeMeter
  lifeMeterWrap: {

    borderRadius: 44,
    width: 50,
    height: 170,
    backgroundColor: '#F9F9F9'
  },

  lifeMeter: {
    borderRadius: 44,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#A3A3A3',
    width: 50
  },

  lifeHp: {
    marginTop: 8,
    color: '#FFFFFF',
    fontSize: 10,
    textAlign: 'center'
  },

})