import React, { Component } from 'react'
import { Text, Image, View, ListView } from 'react-native'
import { compose, withProps, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import styles from './styles/style'

const statelessPlaceHolderCard = ({children}) =>
  <View style={styles.placeholderCard}>
    <View style={styles.placeholderImageWrap}>
      <Image
        source={require('../../images/sword_icon.png')}
        style={[styles.placeholderImage, { tintColor: 'rgba(99, 99, 99, 0.54)' }]} />

      <Image
        source={require('../../images/bottle_icon.png')}
        style={[styles.placeholderImage, { tintColor: 'rgba(99, 99, 99, 0.54)' }]} />

      <Image
        source={require('../../images/shield_icon.png')}
        style={[styles.placeholderImage, { tintColor: 'rgba(99, 99, 99, 0.54)' }]} />

    </View>

    <View style={styles.cardInPlaceholder}>{children}</View>
  </View>

const PlaceholderCard = compose()(statelessPlaceHolderCard)

export default PlaceholderCard
