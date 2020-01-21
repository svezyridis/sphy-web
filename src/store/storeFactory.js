import { createStore, combineReducers, applyMiddleware } from 'redux'
import { account, open, dark, quizes, categories, subjects } from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

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
  composeWithDevTools(
    applyMiddleware(logger, saver))(createStore)(
    combineReducers({ account, open, dark, quizes, categories, subjects }),
    window.localStorage['redux-store']
      ? JSON.parse(window.localStorage['redux-store'])
      : {}
  )
const store = storeFactory()

export default store
