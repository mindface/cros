import { combineReducers, createStore } from "redux";
import { rootReducer } from "./modules/reducer";

const combinedReducer = combineReducers({
  base: rootReducer,
});

export const setupStore = createStore(combinedReducer);
