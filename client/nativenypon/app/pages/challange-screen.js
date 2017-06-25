import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { compose, withProps, withHandlers, withState } from 'recompose'
import { connect } from 'react-redux'
import styles from './styles/challange-screen-styles'
import {addAbilityCard} from '../lib/action-creators/ability-round-data'
import {decreaseAbilityCardsPlayerOne, increaseAbilityCardsPlayerOne, decreaseAbilityCardsPlayerTwo, increaseAbilityCardsPlayerTwo} from '../lib/action-creators/challange'
import store from '../lib/store'
import {sendIngameRoundAbilitiePoistion} from '../lib/socket/connection'
import { NavigationActions } from 'react-navigation'
import LifeMeter from '../components/lifemeter/lifemeter'
import AbilityCard from '../components/ability-card/ability-card'
import NotificationBoubble from '../components/notification-boubble/notification-boubble'
import PlaceholderCard from '../components/placeholder-card/placeholder-card'

/*const statelessChallange = ({ user }) => (
  <View style={styles.container}>
    <View style={styles.lifePosOpponent}>
      <LifeMeter maxLife={this.state.opponentStats.maxLife} life={this.state.opponentStats.life} />
    </View>
    <View style={styles.opponentCards}>
      <NotificationBoubble type={[0, 1]} stats={[this.state.opponentCard.stats.heal, `  +${this.state.opponentCard.stats.attackBoost}`]} bottom={true} widthMode={'large'} color={this.state.opponentCard.backgroundCardImg} >
        <ChallangeCard margin={4} shadow={true} render={true} type={0} nr={this.state.opponentStats.healCards} />
      </NotificationBoubble>

      <NotificationBoubble type={[1]} stats={[this.state.opponentCard.stats.attack]} bottom={true} color={this.state.opponentCard.backgroundCardImg} >
        <ChallangeCard margin={4} shadow={true} render={true} type={1} nr={this.state.opponentStats.attackCards} />
      </NotificationBoubble>

      <NotificationBoubble type={[2]} stats={[this.state.opponentCard.stats.block]} bottom={true} color={this.state.opponentCard.backgroundCardImg} >
        <ChallangeCard margin={4} shadow={true} render={true} type={2} nr={this.state.opponentStats.blockCards} />
      </NotificationBoubble>
    </View>

    <View style={styles.activeCards}>
      <View style={styles.opponentPlaceCards}>
        <PlaceholderCard>
          <ChallangeCard render={this.state.opponentCardOne} type={this.state.opponentCardOneType} renderX={this.state.isHidingCardOne} />
        </PlaceholderCard>

        <NotificationBoubble animate={true} doRender={[this.state.opponentCardOne]} cardBeforeType={[this.state.opponentCardOneType]} childCardType={this.state.opponentCardTwoType} type={[1]} reverse={true} stats={[`+${this.state.opponentCard.stats.attackBoost}`]} color={this.state.opponentCard.backgroundCardImg} >
          <PlaceholderCard>
            <ChallangeCard render={this.state.opponentCardTwo} type={this.state.opponentCardTwoType} renderX={this.state.isHidingCardTwo} />
          </PlaceholderCard>
        </NotificationBoubble>

        <NotificationBoubble animate={true} doRender={[this.state.opponentCardTwo, this.state.opponentCardOne]} cardBeforeType={[this.state.opponentCardTwoType, this.state.opponentCardOneType]} childCardType={this.state.opponentCardThreeType} type={[1]} reverse={true} stats={[`+${this.state.opponentCard.stats.attackBoost}`]} color={this.state.opponentCard.backgroundCardImg} >
          <PlaceholderCard>
            <ChallangeCard render={this.state.opponentCardThree} type={this.state.opponentCardThreeType} renderX={this.state.isHidingCardThree} />
          </PlaceholderCard>
        </NotificationBoubble>
      </View>

      <View style={styles.challangerPlaceCards}>
        <PlaceholderCard>
          <ChallangeCard render={this.state.challangerCardOne} type={this.state.challangerCardOneType} disableClick={this.state.disableClick} onClick={this.removeFromActiveCards.bind(this, 0)} />
        </PlaceholderCard>

        <NotificationBoubble animate={true} doRender={[this.state.challangerCardOne]} cardBeforeType={[this.state.challangerCardOneType]} childCardType={this.state.challangerCardTwoType} type={[1]} bottom={true} reverse={true} stats={[`+${this.state.challangerCard.stats.attackBoost}`]} color={this.state.challangerCard.backgroundCardImg} >
          <PlaceholderCard>
            <ChallangeCard render={this.state.challangerCardTwo} type={this.state.challangerCardTwoType} disableClick={this.state.disableClick} onClick={this.removeFromActiveCards.bind(this, 1)} />
          </PlaceholderCard>
        </NotificationBoubble>

        <NotificationBoubble animate={true} doRender={[this.state.challangerCardTwo, this.state.challangerCardOne]} cardBeforeType={[this.state.challangerCardTwoType, this.state.challangerCardOneType]} childCardType={this.state.challangerCardThreeType} type={[1]} bottom={true} reverse={true} stats={[`+${this.state.challangerCard.stats.attackBoost}`]} color={this.state.challangerCard.backgroundCardImg} >
          <PlaceholderCard>
            <ChallangeCard render={this.state.challangerCardThree} type={this.state.challangerCardThreeType} disableClick={this.state.disableClick} onClick={this.removeFromActiveCards.bind(this, 2)} />
          </PlaceholderCard>
        </NotificationBoubble>
      </View>
    </View>

    <View style={styles.challangerCards}>
      <NotificationBoubble type={[0, 1]} stats={[this.state.challangerCard.stats.heal, `  +${this.state.challangerCard.stats.attackBoost}`]} widthMode={'large'} color={this.state.challangerCard.backgroundCardImg} >
        <ChallangeCard margin={4} shadow={true} render={true} onClick={this.addToActiveCards.bind(this)} type={0} nr={this.state.challangerStats.healCards} />
      </NotificationBoubble>

      <NotificationBoubble type={[1]} stats={[this.state.challangerCard.stats.attack]} color={this.state.challangerCard.backgroundCardImg} >
        <ChallangeCard margin={4} shadow={true} render={true} onClick={this.addToActiveCards.bind(this)} type={1} nr={this.state.challangerStats.attackCards} />
      </NotificationBoubble>

      <NotificationBoubble type={[2]} stats={[this.state.challangerCard.stats.block]} color={this.state.challangerCard.backgroundCardImg} >
        <ChallangeCard margin={4} shadow={true} render={true} onClick={this.addToActiveCards.bind(this)} type={2} nr={this.state.challangerStats.blockCards} />
      </NotificationBoubble>
    </View>
    <CompleteButton doRender={[
      this.state.challangerCardOne,
      this.state.challangerCardTwo,
      this.state.challangerCardThree]}

      onClick={this.completedStage.bind(this)} />
    <View style={styles.lifePosChallanger}>
      <LifeMeter maxLife={this.state.challangerStats.maxLife} life={this.state.challangerStats.life} />
    </View>
  </View>
)
*/

const getAbilityCards = ({ wrap }, { backgroundCardColor, stats: { attack, heal, block } }, {attackCards, healCards, blockCards}, bottom = false, onClick = (e) => { console.log('ability click')}) =>
  <View style={wrap}>
    <NotificationBoubble type={[0, 1]} stats={[heal.heal, `  +${heal.bonusAttack}`]} bottom={bottom} widthMode={'large'} color={backgroundCardColor} >
      <AbilityCard margin={4} shadow={true} render={true} type={1} nr={healCards} onClick={onClick} />
    </NotificationBoubble>

    <NotificationBoubble type={[1]} stats={[attack.attack]} bottom={bottom} color={backgroundCardColor} >
      <AbilityCard margin={4} shadow={true} render={true} type={0} nr={attackCards} onClick={onClick} />
    </NotificationBoubble>

    <NotificationBoubble type={[2]} stats={[block.block]} bottom={bottom} color={backgroundCardColor} >
      <AbilityCard margin={4} shadow={true} render={true} type={2} nr={blockCards} onClick={onClick} />
    </NotificationBoubble>
  </View>

const orderRound = round => {
  const orderedRound = []
  const getPosition = (pos) => {
    return round.find(r => r ? r.p === pos : false)
  }
  orderedRound[0] = getPosition(0)
  orderedRound[1] = getPosition(1)
  orderedRound[2] = getPosition(2)
  
  return orderedRound
}

const getTypeOrNull = roundObject => 
  roundObject ? roundObject.type : null

// TODO patamerer this
const getPlacedCards = ({ wrap }, card, round, disableClick = true, renderX = false, onClick = () => { console.log('click on placed ability cards')}) => {
  const orderedRound = orderRound(round)

  return (
    <View style={wrap}>
      <PlaceholderCard>
        <AbilityCard render={!!orderedRound[0]} type={getTypeOrNull(orderedRound[0])} renderX={renderX} disableClick={disableClick} onClick={onClick.bind(null, 0)} />
      </PlaceholderCard>

      <NotificationBoubble animate={true} doRender={[!!orderedRound[0]]} cardBeforeType={[getTypeOrNull(orderedRound[0])]} childCardType={getTypeOrNull(orderedRound[1])} type={[1]} bottom={true} reverse={true} stats={[`+${card.stats.heal.bonusAttack}`]} color={card.backgroundCardColor} >
        <PlaceholderCard>
          <AbilityCard render={!!orderedRound[1]} type={getTypeOrNull(orderedRound[1])} renderX={renderX} disableClick={disableClick} onClick={onClick.bind(null, 1)} />
        </PlaceholderCard>
      </NotificationBoubble>

      <NotificationBoubble animate={true} doRender={[!!orderedRound[1], !!orderedRound[0]]} cardBeforeType={[getTypeOrNull(orderedRound[1]), getTypeOrNull(orderedRound[0])]} childCardType={getTypeOrNull(orderedRound[2])} type={[1]} bottom={true} reverse={true} stats={[`+${card.stats.heal.bonusAttack}`]} color={card.backgroundCardColor} >
        <PlaceholderCard>
          <AbilityCard render={!!orderedRound[2]} type={getTypeOrNull(orderedRound[2])} renderX={renderX} disableClick={disableClick} onClick={onClick.bind(null, 2)} />
        </PlaceholderCard>
      </NotificationBoubble>
    </View>)
}

/**
 * Gets position to place ability card on
 * @param {*} placedAbilityCards 
 */
const getAbilityPosition = (placedAbilityCards) => {
  const length = placedAbilityCards.length-1
  if(length >= 2) {
    return [-1, true]
  }
  return [placedAbilityCards.reduce((maybeAvailable, b) => 
    maybeAvailable.filter(a => 
      a !== b.position), [0, 1, 2])[0], false]
}

/**
 * Checks if users is allowed to place card, ex, has no more attack cards? 
 */
const canPlaceAbilityType = (type, props) => {
  const { attackCards, healCards, blockCards } = props
  switch(type) {
    case 0:
      return attackCards <= 0 ? false : true
    case 1:
      return healCards <= 0 ? false : true
    case 2:
      return blockCards <= 0 ? false : true
    default:
      return false
  }
}

const statelessChallange = ({challange, abilityRoundData, isPlaceholderLocked, doLockPlaceholder}) => {
  const ch = challange.challange
  return (
  <View style={styles.container}>

    <View style={styles.lifePosOpponent}>
      <LifeMeter maxLife={ch.playerTwoProps.maxLife} life={ch.playerTwoProps.life} />
    </View>
    
    {getAbilityCards({ wrap: styles.opponentCards }, ch.playerTwoCard, ch.playerTwoProps, true)}


    <View style={styles.activeCards}>

      {getPlacedCards({wrap: styles.opponentPlaceCards}, ch.playerTwoCard, abilityRoundData.playerTwo, true, true)}
      
      {getPlacedCards({wrap: styles.challangerPlaceCards}, ch.playerOneCard, abilityRoundData.playerOne, false, false, (type) => {
        console.log(type)
      })}

    </View>

    {getAbilityCards({ wrap: styles.challangerCards }, ch.playerOneCard, ch.playerOneProps, false, (type) => {
      const { playerOneProps } = ch 
      const { playerOne } = abilityRoundData
      
      const [position, isFull] = getAbilityPosition(playerOne)
      if(isFull){
        return
      }

      const canPlace = canPlaceAbilityType(type, playerOneProps)
      if(!canPlace){
        return
      }
      
      store.dispatch(addAbilityCard(type, position))
      store.dispatch(decreaseAbilityCardsPlayerOne(type))
      sendIngameRoundAbilitiePoistion(true, position)
    })}

    <View style={styles.lifePosChallanger}>
      <LifeMeter maxLife={ch.playerOneProps.maxLife} life={ch.playerOneProps.life} />
    </View>

    <Button 
      onPress={() => {
        store.dispatch(NavigationActions.back())
      }}
      title='BACK'
      color='#ff5722'
    />
    
  </View>)
}

const challangeScreen = compose(
  connect(({ challange, abilityRoundData }) => ({ challange, abilityRoundData })),
  withState('isPlaceholderLocked', 'doLockPlaceholder', false),
  WrappedComponent => ({...props}) => 
    !props.challange.hasOwnProperty('challange') ? null : <WrappedComponent {...props}/>
)(statelessChallange)

challangeScreen.navigationOptions = {
  title: 'Challange',
  header: null
}

export default challangeScreen