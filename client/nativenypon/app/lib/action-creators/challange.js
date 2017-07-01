
export const newChallange = challange => ({
  type: 'NEW_CHALLANGE',
  payload: challange,
}) 

export const decreaseAbilityCardsPlayerOne = type => ({
  type: 'DECREASE_ABILITY_CARDS_PLAYER_ONE',
  payload: type,
})

export const increaseAbilityCardsPlayerOne = type => ({
  type: 'INCREASE_ABILITY_CARDS_PLAYER_ONE',
  payload: type,
})

export const decreaseAbilityCardsPlayerTwo = type => ({
  type: 'DECREASE_ABILITY_CARDS_PLAYER_TWO',
  payload: type,
})

export const increaseAbilityCardsPlayerTwo = type => ({
  type: 'INCREASE_ABILITY_CARDS_PLAYER_TWO',
  payload: type,
})

// LIFE

export const setPlayerOneLife = life => ({
  type: 'SET_PLAYER_ONE_LIFE',
  payload: life,
})

export const setPlayerTwoLife = life => ({
  type: 'SET_PLAYER_TWO_LIFE',
  payload: life,
})