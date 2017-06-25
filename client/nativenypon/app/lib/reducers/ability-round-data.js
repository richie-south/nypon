const initialState = {
  playerOne: [],
  playerTwo: [],
}

export const abilityRoundData = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ABILITY_CARD':
      return Object.assign({}, state, {
        playerOne: [ ...state.playerOne.filter(a => a.position !== action.payload.position), action.payload ]
      })
    case 'REMOVE_ABILITY_CARD':
      return Object.assign({}, state, {
        playerOne: state.playerOne.filter(a => a.position !== action.payload.position)
      })
    default:
      return state
  }
}

