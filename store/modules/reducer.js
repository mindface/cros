"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRootSelector = exports.rootReducer = void 0;
const redux_1 = require("redux");
const react_redux_1 = require("react-redux");
const post = __importStar(require("./data_action/post"));
const card = __importStar(require("./data_action/card"));
const modal = __importStar(require("./data_action/modal"));
// const initalState:RootStore = {
//   items:[],
//   modal: {
//     modalView: false,
//     viewId: 0,
//     selectId: 1,
//     isFetching: false,
//     isloading: false
//   },
//   card: {
//     type: "",
//     cards: [
//       {id:1, name: "title", x: 20, y: 20, content: "tetetetet", contentId : "1" },
//       {id:2, name: "title", x: 40, y: 80, content: "tetetetet", contentId : "1" },
//     ],
//     card: {},
//     setId: "0"
//   }
// }
const reducers = (0, redux_1.combineReducers)({
    items: post.postReducer,
    modal: modal.modalReducer,
    card: card.cardReducer,
});
const rootReducer = (state, action) => {
    if ((action === null || action === void 0 ? void 0 : action.type) === '') {
        state = undefined;
    }
    return reducers(state, action);
};
exports.rootReducer = rootReducer;
exports.useRootSelector = react_redux_1.useSelector;
