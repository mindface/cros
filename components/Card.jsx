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
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
function Card(props) {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [card, setCard] = (0, react_1.useState)(() => props.card);
    const [moveTg, moveTgSet] = (0, react_1.useState)(false);
    const [infoView, infoViewSet] = (0, react_1.useState)(false);
    const [_x, _xSet] = (0, react_1.useState)(0);
    const [_y, _ySet] = (0, react_1.useState)(0);
    const boxwidth = 60;
    function modalAction(id) {
        dispatch({ type: 'modal/open' });
    }
    function mouseDown() {
        moveTgSet(true);
    }
    function mouseMove(e) {
        if (moveTg) {
            const element = e.target;
            const left = element.getBoundingClientRect().left;
            const top = element.getBoundingClientRect().top;
            const x = (e.clientX - boxwidth / 2) - 240;
            const y = (e.clientY - (20 + boxwidth * (card.id - 1))) - 55;
            console.log(left);
            console.log(e);
            _xSet(x);
            _ySet(y);
        }
    }
    function mouseOut() {
        moveTgSet(false);
        document.body.removeEventListener('mousedown', mouseDown);
        document.body.removeEventListener('mousemove', mouseMove);
        document.body.removeEventListener('mouseup', mouseOut);
    }
    function viewIng(e) {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: 'modal/open', viewId: card.id });
        dispatch({ type: 'card/setId', setId: card.contentId });
        document.getElementsByTagName('body')[0].className += "open-modal";
    }
    return (<div className={`card p-10 boxShadow radius card${card.id}`} onMouseDown={(e) => mouseDown()} onMouseMove={(e) => { mouseMove(e); }} onMouseUp={(e) => { mouseOut(); }} style={{ left: `${_x}px`, top: `${_y}px` }}>
      <div className="btn btn--control boxShadow radius" onClick={(e) => viewIng(e)}> + </div>
      <div className={infoView ? 'info-box boxShadow view' : 'info-box boxShadow'}>
        <h3 className="title" onClick={(e) => modalAction(card.id)}>{card.name}</h3>
        <div className="view-content">{card.content}</div>
      </div>
    </div>);
}
exports.default = Card;
