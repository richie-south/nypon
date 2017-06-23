import React from 'react'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  card: {
    
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 12.4, // 16
    marginBottom: 16,
    height: 216,
    width: 168,
    elevation: 8
  },

  thumbnail: {
    alignSelf: 'center',
    borderRadius: 50,
    width: 95,
    height: 95
  },

  name: {
    color: 'rgba(255,255,255, 0.74)',
    fontSize: 24,
    marginBottom: 4,
    textAlign: 'center'
  },

  rightContainer: {
    flex: 1,
  },

  statsWrap: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 4
  },

  statsHolder: {
    flex: 1,
    flexDirection: 'column',
  },

  statsImage: {
    height: 16,
    width: 16
  },
})