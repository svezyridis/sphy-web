import { createStore, combineReducers, applyMiddleware } from 'redux'
import { account, open } from './reducers'
import { initialState } from '../general/constants'

const logger = store => next => action => {
  console.groupCollapsed('dispatching', action.type)
  console.log('prev state', store.getState())
  console.log('action', action)
  next(action)
  console.log('next state', store.getState())
  console.groupEnd()
}

const saver = store => next => action => {
  const result = next(action)
  window.localStorage['redux-store'] = JSON.stringify(store.getState())
  return result
}

const storeFactory = () =>
  applyMiddleware(logger, saver)(createStore)(
    combineReducers({ account, open }),
    (window.localStorage['redux-store'])
      ? JSON.parse(window.localStorage['redux-store'])
      : initialState
  )
const store = storeFactory()

export default store