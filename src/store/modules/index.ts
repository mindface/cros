import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { rootReducer } from "./reducer";
import thunk from "redux-thunk";

export const initStore = createStore(
  rootReducer,
  // applyMiddleware(thunk.withExtraArgument(reducers), logger)
  applyMiddleware(thunk)
);
