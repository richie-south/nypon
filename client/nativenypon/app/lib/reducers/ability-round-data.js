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
        playerOne: [...state.playerOne.filter(a => a.position !== action.payload)]
      })

    case 'ADD_ABILITY_CARD_PLAYER_TWO':
      return Object.assign({}, state, {
        playerTwo: [ ...state.playerTwo.filter(a => a.position !== action.payload.position), action.payload ]
      })
    case 'REMOVE_ABILITY_CARD_PLAYER_TWO':
      return Object.assign({}, state, {
        playerTwo: [...state.playerTwo.filter(a => a.position !== action.payload)]
      })

    case 'CLEAR_ABILITY_CARDS':
      return initialState
    default:
      return state
  }
}

