import { compose, createStore } from 'redux'
import { AsyncStorage } from 'react-native'
import { persistStore, autoRehydrate } from 'redux-persist'
import rootReducer from './reducers/index'
import { presistDone } from './action-creators/initial-loading'

const store = createStore(
  rootReducer,
  compose(
    autoRehydrate()
  )
)

// using this way becaus async persistStore meesses things up
let unsubscribe = store.subscribe(() => {
  const { initialLoading } = store.getState()

  if (initialLoading.isConnectionDone) {
    unsubscribe()

    const persistor = persistStore(store, {
      storage: AsyncStorage,
      whitelist: ['user', 'nav', 'auth']
    }, (error, state) => {
      console.log('persistStore done', store.getState())
      store.dispatch(presistDone())
    })

  }
})

export default store