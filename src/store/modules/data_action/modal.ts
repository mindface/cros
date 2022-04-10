import axios from 'axios'
import { Action, Dispatch } from 'redux'
import { Levels } from '../../../models/levels'

export interface ModalAction extends Action {
  type: string;
  modalView: boolean;
}

export interface ModalActionFailure extends Action {
  type: string;
  err: string
}

export function initalModalState():any  {
  return {
    modalView: false,
    levelStateItem: [],
    isFetching: false,
    isloading: false
  }
}

export function modalReducer(state:any = initalModalState(), action:ModalAction) {
  switch (action.type) {
    case 'modal/open':
      return {
       ...state,
         modalView: true
       }
    case 'level/close':
      return {
        ...state,
        modalView: false
        }
     case 'level/dataget':
      return {
        ...state,
          isFetching: false,
        }
    case 'level/dataerr':
      return {
        ...state,
          isFetching: false,
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
