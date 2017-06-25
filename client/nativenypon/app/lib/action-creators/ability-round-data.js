
export const addAbilityCard = (type, position) => ({
  type: 'ADD_ABILITY_CARD',
  payload: {type, position},
}) 

export const removeAbilityCard = position => ({
  type: 'ADD_ABILITY_CARD',
  payload: {position},
}) 

