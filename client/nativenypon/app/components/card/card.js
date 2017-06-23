import React, { Component } from 'react'
import { AppRegistry, Text, Image, View, TouchableNativeFeedback } from 'react-native'
import styles from './styles/card-style.js'
import Stats from './stats'

const getCardBottom = (card) => {
  return (
    <View style={styles.statsHolder}>

      <View style={styles.statsWrap}>
        <Image
          source={require('../../images/sword_icon.png')}
          style={[styles.statsImage, { tintColor: 'rgba(255,255,255, 0.54)' }]} />
        <Stats type={'attack'} stats={card.stats.attack.attack} />
      </View>

      <View style={styles.statsWrap}>
        <Image
          source={require('../../images/bottle_icon.png')}
          style={[styles.statsImage, { tintColor: 'rgba(255,255,255, 0.54)' }]} />
        <Stats type={'heal'} stats={card.stats.heal.heal} />
      </View>

      <View style={styles.statsWrap}>
        <Image
          source={require('../../images/shield_icon.png')}
          style={[styles.statsImage, { tintColor: 'rgba(255,255,255, 0.54)' }]} />
        <Stats type={'block'} stats={card.stats.block.block} />
      </View>

    </View>
  )
}

export default ({ card }) => {
  if (!card.hasOwnProperty('name')) {
    return null
  }

  return (
    <View style={[styles.card, { backgroundColor: card.backgroundCardColor }]} >
      <Image
        source={{ uri: card.avatar }}
        style={styles.thumbnail}
      />
      <View style={styles.rightContainer}>
        <Text style={styles.name}>{card.name}</Text>
        {getCardBottom(card)}
      </View>
    </View>
  )
}