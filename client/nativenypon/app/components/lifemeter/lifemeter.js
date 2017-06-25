import React from 'react'
import { AppRegistry, StyleSheet, Text, Image, View, ListView } from 'react-native'
import { compose, withProps, withHandlers, defaultProps } from 'recompose'
import { connect } from 'react-redux'
import styles from './styles/style'

/**
   * [determines height of life bar]
   * @param  {[type]} max  [description]
   * @param  {[type]} life [description]
   * @return {[type]}      [description]
   */
const renderHeight = (max, life) => {
  // 170 = height of component
  const height = (1 - ((max - life) / max)) * 170 
  return {
    height
  }
}

const statelessLifeMeter = ({maxLife, life}) =>
  <View style={styles.lifeMeterWrap}>
    <View style={[styles.lifeMeter, renderHeight(maxLife, life)]}>
      <Text style={styles.lifeHp}>{life}hp</Text>
    </View>
  </View>

const LifeMeter = compose(
  defaultProps({
    maxLife: 100,
    life: 100,
  })    
)(statelessLifeMeter)

export default LifeMeter
