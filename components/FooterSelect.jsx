"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
function FooterSelect() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const list = [
        { id: 1, path: "images/item1.png", name: "titile01" },
        { id: 2, path: "images/item2.png", name: "titile02" },
        { id: 3, path: "images/item3.png", name: "titile03" },
        { id: 4, path: "images/item4.png", name: "titile03" }
    ];
    function selectBg(id) {
        dispatch({ type: 'modal/selectId', selectId: id });
    }
    return (<div className="footer--select p-10 boxShadow">
     <ul className="list">
       {list.map((item) => {
            return (<li className="item" key={item.id} onClick={(e) => { selectBg(item.id); }}>
            <div className="img-box">
              <p className="caption">{item.name}</p>
              <img src={item.path} alt="" className="img"/>
            </div>
          </li>);
        })}
     </ul>
   </div>);
}
exports.default = FooterSelect;
