export const challange = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_CHALLANGE':
      return { ...state, challange: action.payload }

    case 'DECREASE_ABILITY_CARDS_PLAYER_ONE': {
      const type = action.payload
      switch(type){
        case 0:
          return {
            ...state,
            challange: {
              ...state.challange,
              playerOneProps: {
                ...state.challange.playerOneProps,
                attackCards: state.challange.playerOneProps.attackCards-1
              }
            }
          }
        case 1:
        return {
          ...state,
            challange: {
              ...state.challange,
              playerOneProps: {
                ...state.challange.playerOneProps,
                healCards: state.challange.playerOneProps.healCards-1
              }
            }
          }
        case 2:
          return {
          ...state,
            challange: {
              ...state.challange,
              playerOneProps: {
                ...state.challange.playerOneProps,
                blockCards: state.challange.playerOneProps.blockCards-1
              }
            }
          }
      }
      return state
    }
    case 'INCREASE_ABILITY_CARDS_PLAYER_ONE': {
      const type = action.payload
      switch(type){
        case 0:
          return {
            ...state,
            challange: {
              ...state.challange,
              playerOneProps: {
                ...state.challange.playerOneProps,
                attackCards: state.challange.playerOneProps.attackCards+1
              }
            }
          }
        case 1:
        return {
          ...state,
            challange: {
              ...state.challange,
              playerOneProps: {
                ...state.challange.playerOneProps,
                healCards: state.challange.playerOneProps.healCards+1
              }
            }
          }
        case 2:
          return {
          ...state,
            challange: {
              ...state.challange,
              playerOneProps: {
                ...state.challange.playerOneProps,
                blockCards: state.challange.playerOneProps.blockCards+1
              }
            }
          }
      }
      return state
    }

    case 'DECREASE_ABILITY_CARDS_PLAYER_TWO': {
      const type = action.payload
      switch(type){
        case 0:
          return {
            ...state,
            challange: {
              ...state.challange,
              playerTwoProps: {
                ...state.challange.playerTwoProps,
                attackCards: state.challange.playerTwoProps.attackCards-1
              }
            }
          }
        case 1:
        return {
          ...state,
            challange: {
              ...state.challange,
              playerTwoProps: {
                ...state.challange.playerTwoProps,
                healCards: state.challange.playerTwoProps.healCards-1
              }
            }
          }
        case 2:
          return {
          ...state,
            challange: {
              ...state.challange,
              playerTwoProps: {
                ...state.challange.playerTwoProps,
                blockCards: state.challange.playerTwoProps.blockCards-1
              }
            }
          }
      }
      return state
    }
    case 'INCREASE_ABILITY_CARDS_PLAYER_TWO': {
      const type = action.payload
      switch(type){
        case 0:
          return {
            ...state,
            challange: {
              ...state.challange,
              playerTwoProps: {
                ...state.challange.playerTwoProps,
                attackCards: state.challange.playerTwoProps.attackCards+1
              }
            }
          }
        case 1:
        return {
          ...state,
            challange: {
              ...state.challange,
              playerTwoProps: {
                ...state.challange.playerTwoProps,
                healCards: state.challange.playerTwoProps.healCards+1
              }
            }
          }
        case 2:
          return {
          ...state,
            challange: {
              ...state.challange,
              playerTwoProps: {
                ...state.challange.playerTwoProps,
                blockCards: state.challange.playerTwoProps.blockCards+1
              }
            }
          }
      }
      return state
    }
    default:
      return state
  }
}