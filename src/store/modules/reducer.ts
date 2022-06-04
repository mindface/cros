import { combineReducers } from "redux";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as rawUseSelector,
} from "react-redux";
import * as post from "./data_action/post";
import * as card from "./data_action/card";
import * as modal from "./data_action/modal";
import * as concept from "./data_action/concept";
import * as LevelsModels from "../../models/levels";
import * as ModalModels from "../../models/modal";
import * as CardModels from "../../models/card";
import * as ConceptModels from "../../models/concept";

export interface RootStore {
  items: LevelsModels.Levels[];
  modal: ModalModels.Modals;
  card: CardModels.Cards;
  concept: concept.ConceptState;
}

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

const reducers = combineReducers({
  items: post.postReducer,
  modal: modal.modalReducer,
  card: card.cardReducer,
  concept: concept.conceptReducer,
});

export const rootReducer = (state: RootStore | undefined, action: any) => {
  if (action?.type === "") {
    state = undefined;
  }
  return reducers(state, action);
};

export const useRootSelector: TypedUseSelectorHook<RootStore> = rawUseSelector;
