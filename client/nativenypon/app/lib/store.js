import {compose, createStore} from 'redux'
import {AsyncStorage} from 'react-native'
import {persistStore, autoRehydrate} from 'redux-persist'
import rootReducer from './reducers/index'

const store = createStore(
  rootReducer,
  compose(
    autoRehydrate()
  )
)

persistStore(store, {storage: AsyncStorage})

export default store

