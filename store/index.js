"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupStore = void 0;
const redux_1 = require("redux");
const reducer_1 = require("./modules/reducer");
const combinedReducer = (0, redux_1.combineReducers)({
  base: reducer_1.rootReducer,
});
exports.setupStore = (0, redux_1.createStore)(combinedReducer);
