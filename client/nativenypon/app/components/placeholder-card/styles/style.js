import React from 'react'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  // Placeholder
  placeholderCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(99, 99, 99, 0.54)',
    borderRadius: 8,
    margin: 4,
    height: 80.5,
    width: 62.5,
  },

  placeholderImage: {
    height: 15,
    width: 15,
    margin: 3
  },

  placeholderImageWrap: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardInPlaceholder: {
    position: 'absolute',
    top: 0,
  },

})