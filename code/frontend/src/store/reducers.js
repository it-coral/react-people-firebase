import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
import {locationReducer, datalayerReducer} from './location'
import { reducer as form } from 'redux-form'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    firebase,
    form,
    location: locationReducer,
    datalayerReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
