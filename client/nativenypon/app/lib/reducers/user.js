export const user = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return action.payload
    case 'ADD_CLIENT_ID':
      return Object.assign({}, state, {clientId: action.payload})
    default:
      return state
  }
}

