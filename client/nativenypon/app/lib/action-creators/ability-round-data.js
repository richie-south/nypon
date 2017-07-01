
export const addAbilityCard = (type, position) => ({
  type: 'ADD_ABILITY_CARD',
  payload: {type, position},
}) 

export const removeAbilityCard = position => ({
  type: 'REMOVE_ABILITY_CARD',
  payload: position,
}) 

export const addAbilityCardPlayerTwo = (type, position) => ({
  type: 'ADD_ABILITY_CARD_PLAYER_TWO',
  payload: {type, position},
}) 

export const removeAbilityCardPlayerTwo = position => ({
  type: 'REMOVE_ABILITY_CARD_PLAYER_TWO',
  payload: position,
}) 

export const clearAbilityCards = () => ({
  type: 'CLEAR_ABILITY_CARDS'
})