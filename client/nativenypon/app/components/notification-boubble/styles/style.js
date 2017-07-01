import React from 'react'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  // notification Boubble
  notificationBoubble: {
    position: 'absolute',
    height: 34
  },

  notificationBoubbleText: {
    fontSize: 13,
    marginRight: 1,
    color: '#FFFFFF'
  },

  notificationInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  notificationImage: {
    width: 14,
    height: 14
  },

  notificationBottom: {
    bottom: -34,
    right: 38,
    borderBottomLeftRadius: 44,
    borderBottomRightRadius: 44,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 0,
  },

  notificationBottomReverse: {
    bottom: -34,
    left: 38,
    borderBottomLeftRadius: 44,
    borderBottomRightRadius: 44,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 44,
  },

  notificationTop: {
    top: -34,
    right: 38,
    borderBottomLeftRadius: 44,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
  },

  notificationTopReverse: {
    top: -34,
    left: 38,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 44,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
  },

})