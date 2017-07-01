import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { compose, withProps, withHandlers, withState } from 'recompose'
import { connect } from 'react-redux'
import styles from './styles/challange-screen-styles'
import {
  addAbilityCard,
  removeAbilityCard,
} from '../lib/action-creators/ability-round-data'
import {
  decreaseAbilityCardsPlayerOne,
  increaseAbilityCardsPlayerOne,
  decreaseAbilityCardsPlayerTwo,
  increaseAbilityCardsPlayerTwo,
} from '../lib/action-creators/challange'
import store from '../lib/store'
import {
  sendIngameRoundAbilitiePoistion,
  sendRound,
} from '../lib/socket/connection'
import { NavigationActions } from 'react-navigation'
import LifeMeter from '../components/lifemeter/lifemeter'
import AbilityCard from '../components/ability-card/ability-card'
import NotificationBoubble from '../components/notification-boubble/notification-boubble'
import PlaceholderCard from '../components/placeholder-card/placeholder-card'

const getAbilityCards = (
  { wrap },
  { backgroundCardColor, stats: { attack, heal, block } },
  { attackCards, healCards, blockCards },
  bottom = false,
  onClick = e => {
    console.log('ability click')
  }
) =>
  <View style={wrap}>
    <NotificationBoubble
      type={[1, 0]}
      stats={[heal.heal, `  +${heal.bonusAttack}`]}
      bottom={bottom}
      widthMode={'large'}
      color={backgroundCardColor}
    >
      <AbilityCard
        margin={4}
        shadow={true}
        render={true}
        type={1}
        nr={healCards}
        onClick={onClick}
      />
    </NotificationBoubble>

    <NotificationBoubble
      type={[0]}
      stats={[attack.attack]}
      bottom={bottom}
      color={backgroundCardColor}
    >
      <AbilityCard
        margin={4}
        shadow={true}
        render={true}
        type={0}
        nr={attackCards}
        onClick={onClick}
      />
    </NotificationBoubble>

    <NotificationBoubble
      type={[2]}
      stats={[block.block]}
      bottom={bottom}
      color={backgroundCardColor}
    >
      <AbilityCard
        margin={4}
        shadow={true}
        render={true}
        type={2}
        nr={blockCards}
        onClick={onClick}
      />
    </NotificationBoubble>
  </View>

/**
 * Orders round so postion: 1 is at position 1 in array, undefined for positions not found
 */
const orderRound = round => {
  const orderedRound = []
  const getPosition = pos => {
    return round.find(r => (r ? r.position === pos : false))
  }
  orderedRound[0] = getPosition(0)
  orderedRound[1] = getPosition(1)
  orderedRound[2] = getPosition(2)

  return orderedRound
}

const getTypeOrNull = roundObject => (roundObject ? roundObject.type : null)

// TODO patamerer this
const getPlacedCards = (
  { wrap },
  card,
  round,
  disableClick = true,
  renderX = false,
  bottom = true,
  reverse = true,
  onClick = () => {
    console.log('click on placed ability cards')
  }
) => {
  const orderedRound = orderRound(round)
  console.log('orderedRound', orderedRound)
  return (
    <View style={wrap}>
      <PlaceholderCard>
        <AbilityCard
          render={!!orderedRound[0]}
          type={getTypeOrNull(orderedRound[0])}
          renderX={false}
          disableClick={disableClick}
          onClick={onClick.bind(null, 0, getTypeOrNull(orderedRound[0]))}
        />
      </PlaceholderCard>

      <NotificationBoubble
        animate={true}
        doRender={[!!orderedRound[0]]}
        cardBeforeType={[getTypeOrNull(orderedRound[0])]}
        childCardType={getTypeOrNull(orderedRound[1])}
        type={[0]}
        bottom={bottom}
        reverse={reverse}
        stats={[`+${card.stats.heal.bonusAttack}`]}
        color={card.backgroundCardColor}
      >
        <PlaceholderCard>
          <AbilityCard
            render={!!orderedRound[1]}
            type={getTypeOrNull(orderedRound[1])}
            renderX={false}
            disableClick={disableClick}
            onClick={onClick.bind(null, 1, getTypeOrNull(orderedRound[1]))}
          />
        </PlaceholderCard>
      </NotificationBoubble>

      <NotificationBoubble
        animate={true}
        doRender={[!!orderedRound[1], !!orderedRound[0]]}
        cardBeforeType={[
          getTypeOrNull(orderedRound[1]),
          getTypeOrNull(orderedRound[0]),
        ]}
        childCardType={getTypeOrNull(orderedRound[2])}
        type={[0]}
        bottom={bottom}
        reverse={reverse}
        stats={[`+${card.stats.heal.bonusAttack}`]}
        color={card.backgroundCardColor}
      >
        <PlaceholderCard>
          <AbilityCard
            render={!!orderedRound[2]}
            type={getTypeOrNull(orderedRound[2])}
            renderX={false}
            disableClick={disableClick}
            onClick={onClick.bind(null, 2, getTypeOrNull(orderedRound[2]))}
          />
        </PlaceholderCard>
      </NotificationBoubble>
    </View>
  )
}

/**
 * Gets position to place ability card on
 * @param {*} placedAbilityCards 
 */
const getAbilityPosition = placedAbilityCards => {
  const length = placedAbilityCards.length - 1
  if (length >= 2) {
    return [-1, true]
  }
  return [
    placedAbilityCards.reduce(
      (maybeAvailable, b) => maybeAvailable.filter(a => a !== b.position),
      [0, 1, 2]
    )[0],
    false,
  ]
}

/**
 * Checks if users is allowed to place card, ex, has no more attack cards? 
 */
const canPlaceAbilityType = (type, props) => {
  const { attackCards, healCards, blockCards } = props
  switch (type) {
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

const abilityCardsClick = (type, { playerOneProps }, { playerOne }) => {
  const [position, isFull] = getAbilityPosition(playerOne)
  if (isFull) {
    return
  }

  const canPlace = canPlaceAbilityType(type, playerOneProps)
  if (!canPlace) {
    return
  }

  store.dispatch(addAbilityCard(type, position))
  store.dispatch(decreaseAbilityCardsPlayerOne(type))
  sendIngameRoundAbilitiePoistion(true, position)
}

const placedCardsClick = (position, cardType) => {
  store.dispatch(removeAbilityCard(position))
  store.dispatch(increaseAbilityCardsPlayerOne(cardType))
  sendIngameRoundAbilitiePoistion(false, position)
}

const statelessChallange = ({
  challange,
  abilityRoundData,
  isPlaceholderLocked,
  doLockPlaceholder,
  displaySendRoundbutton,
  setDisplaySendRoundbutton,
  disableClick,
  setDisableClick,
}) => {
  const ch = challange.challange
  return (
    <View style={styles.container}>
      <View style={styles.lifePosOpponent}>
        <LifeMeter
          maxLife={ch.playerTwoProps.maxLife}
          life={ch.playerTwoProps.life}
        />
      </View>

      {getAbilityCards(
        { wrap: styles.opponentCards },
        ch.playerTwoCard,
        ch.playerTwoProps,
        true
      )}
      <View style={styles.activeCards}>
        {getPlacedCards(
          { wrap: styles.opponentPlaceCards },
          ch.playerTwoCard,
          abilityRoundData.playerTwo,
          true,
          true,
          false,
          false
        )}
        {getPlacedCards(
          { wrap: styles.challangerPlaceCards },
          ch.playerOneCard,
          abilityRoundData.playerOne,
          disableClick,
          false,
          true,
          true,
          (position, cardType) => placedCardsClick(position, cardType)
        )}
      </View>
      {getAbilityCards(
        { wrap: styles.challangerCards },
        ch.playerOneCard,
        ch.playerOneProps,
        false,
        type => abilityCardsClick(type, ch, abilityRoundData)
      )}

      <View style={styles.lifePosChallanger}>
        <LifeMeter
          maxLife={ch.playerOneProps.maxLife}
          life={ch.playerOneProps.life}
        />
      </View>

      {displaySendRoundbutton &&
        abilityRoundData.playerOne.length === 3 &&
        <View style={styles.sendRoundButton}>
          <Button
            onPress={() => {
              setDisplaySendRoundbutton(false)
              setDisableClick(true)
              const { playerOne } = abilityRoundData
              const round = orderRound(playerOne).map(a => a.type)
              sendRound(round)
            }}
            color={ch.playerOneCard.backgroundCardColor}
            title="Send round"
          />
        </View>}

      <View style={styles.doneButton}>
        <Button
          onPress={() => {
            store.dispatch(NavigationActions.back())
          }}
          title="BACK"
          color="#ff5722"
        />
      </View>
    </View>
  )
}

const challangeScreen = compose(
  connect(({ challange, abilityRoundData }) => ({
    challange,
    abilityRoundData,
  })),
  withState('isPlaceholderLocked', 'doLockPlaceholder', false),
  withState('displaySendRoundbutton', 'setDisplaySendRoundbutton', true),
  withState('disableClick', 'setDisableClick', false),
  WrappedComponent => ({ ...props }) =>
    !props.challange.hasOwnProperty('challange')
      ? null
      : <WrappedComponent {...props} />
)(statelessChallange)

challangeScreen.navigationOptions = {
  title: 'Challange',
  header: null,
}

export default challangeScreen
