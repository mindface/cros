"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
function ContentSets() {
    const store = (0, react_redux_1.useStore)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const modalSwitch = (0, react_redux_1.useSelector)(() => {
        return store.getState().base.modal.modalView;
    });
    const setId = (0, react_redux_1.useSelector)((state) => {
        return state.base.card.setId;
    });
    function closeAction() {
        dispatch({ type: 'modal/close' });
        document.getElementsByTagName('body')[0].className = "";
    }
    return (<div className={modalSwitch ? "modal view" : "modal"}>
     {modalSwitch && <div className="modal--inner">
       <button className='close boxShadow radius' onClick={() => closeAction()}>close</button>
       <h3 className="title">view</h3>
       <div className="box">
         <iframe src={`/contents0${setId}`} className='iframe'></iframe>
       </div>
     </div>}
   </div>);
}
exports.default = ContentSets;
