
export const signIn = user => ({
  type: 'SIGN_IN',
  payload: user,
}) 

export const addClientId = clientId => ({
  type: 'ADD_CLIENT_ID',
  payload: clientId
})