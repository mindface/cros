"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modalReducer = exports.initalCardState = void 0;
function initalCardState() {
  return {
    modalView: false,
    viewId: 0,
    selectId: 1,
    isFetching: false,
    isloading: false,
    canvasElement: document.createElement("canvas"),
  };
}
exports.initalCardState = initalCardState;
function modalReducer(state = initalCardState(), action) {
  switch (action.type) {
    case "modal/open":
      return Object.assign(Object.assign({}, state), {
        modalView: true,
        viewId: action.viewId,
      });
    case "modal/close":
      return Object.assign(Object.assign({}, state), { modalView: false });
    case "modal/dataget":
      return Object.assign(Object.assign({}, state), { isFetching: false });
    case "modal/selectId":
      return Object.assign(Object.assign({}, state), {
        selectId: action.selectId,
      });
    case "modal/setCanvas":
      return Object.assign(Object.assign({}, state), {
        canvasElement: action.canvasElement,
      });
    //  case 'level/datadelete':
    //    axios.delete(`http://localhost:3003/api/levels/${action['id']}`)
    //    .then( (res) => {
    //      return {
    //        ...state,
    //          isFetching: true,
    //        }
    //    })
    // return {
    // ...state,
    //   isFetching: true
    // }
    default:
      return state;
  }
}
exports.modalReducer = modalReducer;
