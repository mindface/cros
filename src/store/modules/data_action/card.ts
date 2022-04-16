import { Action, Dispatch } from 'redux'
import { Card } from "../../../models/card";

export interface CardAction extends Action {
  type: string;
  cards: Card[];
  setCard: (Card | object) ;
  setId?: string;
  deleteId: string;
}

export interface CardState  {
  type: string;
  cards: Card[];
  card: (Card | object);
  setId: string;
  deleteId: string;
}

export function initalCardState():CardState  {
  return {
    type: "",
    cards: [
      {id:1, name: "title", x: 20, y: 20, content: "tetetetet", contentId : "1" },
      {id:2, name: "title", x: 40, y: 80, content: "tetetetet", contentId : "2" },
    ],
    card: {},
    setId: "0",
    deleteId: "0"
  }
}

export function cardReducer(state:any = initalCardState(), action:CardAction) {
  switch (action.type) {
    case 'card/add':
      return {
       ...state,
         cardView: true,
         cards: action.cards
       }
    case 'card/delete':
      const items = state.cards.filter((item:Card) => String(item.id) !== action.deleteId);
      return {
        ...state,
          cards: items,
        }
    case 'card/setId':
      return {
        ...state,
          setId: action.setId,
        }
    default:
      return state
    }
}
