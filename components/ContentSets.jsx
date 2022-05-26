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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const Card_1 = __importDefault(require("./Card"));
function ContentSets() {
    const [list, listSet] = (0, react_1.useState)([]);
    const selectId = (0, react_redux_1.useSelector)((state) => {
        return state.base.modal.selectId;
    });
    const cardsList = (0, react_redux_1.useSelector)((state) => {
        return state.base.card.cards;
    });
    function modalAction(id) {
    }
    function mouseDown(e) { }
    function mouseMove(e) { }
    function mouseOut(e) { }
    const CardsList = (0, react_1.useMemo)(() => cardsList.map((item) => (<Card_1.default card={item} key={item.id}/>)), [cardsList]);
    return (<div className="box--select p-10" style={{ backgroundImage: `url(images/item${selectId}.png)` }}>
     {cardsList.map((item) => (<Card_1.default card={item} key={item.id}/>))}
   </div>);
}
exports.default = ContentSets;
