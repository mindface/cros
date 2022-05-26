import axios from 'axios'
import { Action, Dispatch } from 'redux'
import { Concept } from "../../../models/concept";
import conceptJson from "./setState/concept.json";

export interface ConceptState  {
  type?: string;
  concepts: Concept[];
  concept: Concept;
}
export interface ConceptAction extends Action {
  type: string;
  concepts: Concept[];
  concept: Concept;
}

export interface ConceptActionFailure extends Action {
  type: string;
  err: string;
  id: string;
}

export function initalConceptState():ConceptState  {
  return {
    concepts: conceptJson,
    concept: {
      title: "",
      body: "",
      info: "",
    }
  }
}

export function conceptReducer(state:ConceptState = initalConceptState(), action:ConceptAction) {
  switch (action.type) {
    case 'concept/get':
      return {
       ...state,
         modalView: true,
         concepts: action.concepts
       }
    case 'concept/set':
      return {
        ...state,
        modalView: false
        }
     case 'concept/dataget':
      return {
        ...state,
          concepts: action.concepts
        }
    case 'concept/selectId':
      return {
        ...state,
          concept: action.concept,
        }
      // case 'level/dataupdate':
      //   return　axios.patch(`http://localhost:3003/api/levels/${action['id']}`)
      //    .then( (res) => {
      //      return {
      //       ...state,
      //         isFetching: false,
      //         levelDataItem: res.data
      //       }
      //    })
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
        return state
    }
}
