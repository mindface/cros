"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initStore = void 0;
const redux_1 = require("redux");
// import { composeWithDevTools } from 'redux-devtools-extension'
const reducer_1 = require("./reducer");
const redux_thunk_1 = __importDefault(require("redux-thunk"));
// import logger from 'redux-logger'
exports.initStore = (0, redux_1.createStore)(reducer_1.rootReducer, 
// applyMiddleware(thunk.withExtraArgument(reducers), logger)
(0, redux_1.applyMiddleware)(redux_thunk_1.default));
