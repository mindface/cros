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
function SideSelect() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [contentId, contentIdSet] = (0, react_1.useState)(-1);
    const list = [
        { id: 1, path: "images/item1.png", name: "選択コンテンツ01" },
        { id: 2, path: "images/item2.png", name: "選択コンテンツ02" },
        { id: 3, path: "images/item3.png", name: "選択コンテンツ03" },
        { id: 4, path: "images/item4.png", name: "選択コンテンツ04" },
        { id: 5, path: "images/item5.png", name: "選択コンテンツ05" },
        { id: 6, path: "images/item6.png", name: "選択コンテンツ06" }
    ];
    const cardsList = (0, react_redux_1.useSelector)((state) => {
        return state.base.card.cards;
    });
    function addContent() {
        const cardData = {
            id: 0, name: "title", x: 40, y: 100, content: "tetetetet", contentId: String(contentId)
        };
        const list = cardsList;
        list.push(cardData);
        dispatch({ type: 'card/add', cards: [] });
        // domの更新がされないため初期に空の配列を追加している
        setTimeout(() => {
            dispatch({ type: 'card/add', cards: list });
        }, 600);
    }
    return (<div className="side p-10 boxShadow">
     {contentId !== -1 && <div className="add-box">
       <div className="add-box__btn p-10" onClick={() => addContent()}>コンテンツ追加</div>
     </div>}
     <ul className="list">
       {list.map((item) => {
            return (<li key={item.id} className={item.id === contentId ? 'item active' : 'item'} onClick={(e) => { contentIdSet(item.id); }}>
            <div className="img-box">
              <p className="caption">{item.name}</p>
            </div>
          </li>);
        })}
     </ul>
   </div>);
}
exports.default = SideSelect;
