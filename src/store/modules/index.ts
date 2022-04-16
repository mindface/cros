import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './reducer'
import thunk from 'redux-thunk'
// import logger from 'redux-logger'

export const initStore = createStore(
  rootReducer,
  // applyMiddleware(thunk.withExtraArgument(reducers), logger)
  applyMiddleware(thunk)
)
