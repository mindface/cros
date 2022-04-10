
import { combineReducers, createStore } from 'redux'
import { rootReducer } from './modules/reducer'
import logger from 'redux-logger'

// export const setupStore = (): EnhancedStore => {
//   const middlewares = [...getDefaultMiddleware()]

//   if(process.env.NODE_ENV === 'development' ) {
//     middlewares.push(logger)
//   }

//   return configureStore({
//     reducer: rootReducer,
//     middleware: middlewares,
//     devTools: true
//   })
// }

const combinedReducer = combineReducers({
  level: rootReducer
})

export const setupStore = createStore(combinedReducer)
