"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardReducer = exports.initalCardState = void 0;
function initalCardState() {
  return {
    type: "",
    cards: [
      {
        id: 1,
        path: "images/item1.png",
        name: "title",
        x: 0,
        y: 0,
        content: "tetetetet",
        contentId: "1",
      },
      {
        id: 2,
        path: "images/item1.png",
        name: "title",
        x: 0,
        y: 0,
        content: "tetetetet",
        contentId: "2",
      },
    ],
    card: {},
    setId: "0",
    setCotentId: 0,
    deleteId: "0",
  };
}
exports.initalCardState = initalCardState;
function cardReducer(state = initalCardState(), action) {
  switch (action.type) {
    case "card/add":
      return Object.assign(Object.assign({}, state), {
        cardView: true,
        cards: action.cards,
      });
    case "card/update":
      const card = action.card;
      const list = state.cards.map((item) => {
        if (item.id === action.card.id)
          return Object.assign(Object.assign({}, item), {
            name: card.name,
            content: card.content,
          });
        return item;
      });
      return Object.assign(Object.assign({}, state), { cards: list });
    case "card/delete":
      const items = state.cards.filter(
        (item) => String(item.id) !== action.deleteId
      );
      return Object.assign(Object.assign({}, state), { cards: items });
    case "card/setId":
      return Object.assign(Object.assign({}, state), { setId: action.setId });
    case "card/setCotentId":
      return Object.assign(Object.assign({}, state), {
        setCotentId: action.setCotentId,
      });
    default:
      return state;
  }
}
exports.cardReducer = cardReducer;
