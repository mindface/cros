"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardReducer = exports.initalCardState = void 0;
function initalCardState() {
    return {
        type: "",
        cards: [
            { id: 1, name: "title", x: 20, y: 20, content: "tetetetet", contentId: "1" },
            { id: 2, name: "title", x: 40, y: 80, content: "tetetetet", contentId: "2" },
        ],
        card: {},
        setId: "0",
        deleteId: "0"
    };
}
exports.initalCardState = initalCardState;
function cardReducer(state = initalCardState(), action) {
    switch (action.type) {
        case 'card/add':
            return Object.assign(Object.assign({}, state), { cardView: true, cards: action.cards });
        case 'card/delete':
            const items = state.cards.filter((item) => String(item.id) !== action.deleteId);
            return Object.assign(Object.assign({}, state), { cards: items });
        case 'card/setId':
            return Object.assign(Object.assign({}, state), { setId: action.setId });
        default:
            return state;
    }
}
exports.cardReducer = cardReducer;
