import React from 'react'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  pointsWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: '#D8D8D8',
    //borderWidth: 1,
    //borderColor: '#979797',
    marginLeft: 2,
    padding: 1,
    paddingLeft: 2,
    height: 18,
    width: 124, //124
    borderRadius: 10
  },

  prop: {
    width: 23,
    height: 12
  },

  propFirst: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginRight: 1
  },

  propMiddle: {
    marginRight: 1
  },

  propLast: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginRight: 1

  },

});