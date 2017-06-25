import React from 'react'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  // game card
  playCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 78,
    width: 60
  },

  cardElevetion: {
    elevation: 2
  },

  noStyle: {
  },

  cardImage: {
    height: 44,
    width: 44
  },

  cardCounter: {
    position: 'absolute',
    top: 3,
    left: 3,
    color: 'rgba(99, 99, 99, 0.54)',
    fontSize: 11,
    fontWeight: 'bold'
  },

})