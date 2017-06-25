export const initialLoading = (state = {isPresistDone: false, isConnectionDone: false}, action) => {
  switch (action.type) {
    case 'PRESIST_DONE':
      return { ...state, isPresistDone: true}
    case 'CONNECTION_DONE':
      return { ...state, isConnectionDone: true}
    default:
      return state
  }
}

