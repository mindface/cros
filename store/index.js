"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupStore = void 0;
const redux_1 = require("redux");
const reducer_1 = require("./modules/reducer");
// import logger from 'redux-logger'
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
const combinedReducer = (0, redux_1.combineReducers)({
    base: reducer_1.rootReducer,
});
exports.setupStore = (0, redux_1.createStore)(combinedReducer);
