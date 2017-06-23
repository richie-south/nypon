import React, { Component } from 'react'
import { AppRegistry, View } from 'react-native'
import styles from './styles/stats-style'

const propAvailable = 'rgba(255,255,255, 0.54)'
const propUnAvailable = 'rgba(0,0,0, 0.44)'

export default class CardStats extends Component {
  constructor(props) {
    super(props)
  }

  /**
   * [determines background color of prop]
   * @param  {[number]} val [value of prop]
   * @param  {[number]} nr  [nr of prop]
   * @return {[object]}     [react style object]
   */
  getAttackColor(val, nr) {
    if (val >= 40 && nr === 0) {
      return propUnAvailable

    } else if (val >= 42 && nr === 1) {
      return propUnAvailable

    } else if (val >= 44 && nr === 2) {
      return propUnAvailable

    } else if (val >= 46 && nr === 3) {
      return propUnAvailable

    } else if (val >= 48 && nr === 4) {
      return propUnAvailable

    } else {
      return propAvailable
    }
  }

  /**
   * [determines background color of prop]
   * @param  {[number]} val [value of prop]
   * @param  {[number]} nr  [nr of prop]
   * @return {[object]}     [react style object]
   */
  getBlockColor(val, nr) {
    if (val >= 30 && nr === 0) {
      return propUnAvailable

    } else if (val >= 32 && nr === 1) {
      return propUnAvailable

    } else if (val >= 34 && nr === 2) {
      return propUnAvailable

    } else if (val >= 36 && nr === 3) {
      return propUnAvailable

    } else if (val >= 38 && nr === 4) {
      return propUnAvailable

    } else {
      return propAvailable
    }
  }

  /**
   * [determines background color of prop]
   * @param  {[number]} val [value of prop]
   * @param  {[number]} nr  [nr of prop]
   * @return {[object]}     [react style object]
   */
  getHealColor(val, nr) {
    if (val >= 20 && nr === 0) {
      return propUnAvailable

    } else if (val >= 22 && nr === 1) {
      return propUnAvailable

    } else if (val >= 24 && nr === 2) {
      return propUnAvailable

    } else if (val >= 26 && nr === 3) {
      return propUnAvailable

    } else if (val >= 28 && nr === 4) {
      return propUnAvailable
    } else {
      return propAvailable
    }
  }

  getColor(type, val, nr) {
    switch (type) {
      case 'attack':
        return this.getAttackColor(val, nr)
      case 'block':
        return this.getBlockColor(val, nr)
      case 'heal':
        return this.getHealColor(val, nr)
    }
  }

  render() {
    return (
      <View style={styles.pointsWrap}>
        <View style={[styles.prop, styles.propFirst,
          {backgroundColor: this.getColor(this.props.type, this.props.stats, 0)}]}>
        </View>

        <View style={[styles.prop, styles.propMiddle,
          {backgroundColor: this.getColor(this.props.type, this.props.stats, 1)}]}>
        </View>

        <View style={[styles.prop, styles.propMiddle,
          {backgroundColor: this.getColor(this.props.type, this.props.stats, 2)}]}>
        </View>

        <View style={[styles.prop, styles.propMiddle,
          {backgroundColor: this.getColor(this.props.type, this.props.stats, 3)}]}>
        </View>

        <View style={[styles.prop, styles.propLast,
          {backgroundColor: this.getColor(this.props.type, this.props.stats, 4)}]}>
        </View>
      </View>
    )
  }
}