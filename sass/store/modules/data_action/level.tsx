import axios from 'axios'
import { Action } from 'redux'
import { Levels } from '../../../models/levels'

export interface LevelPostAction extends Action {
  type: string;
  items: Levels[];
}

export interface LevelPostActionFailure extends Action {
  type: string;
  err: string
}

const getData = async function(){
  const res = await axios.get(`http://localhost:3003/api/levels`)
  if( res.status < 400 ){
    return res.data
  }
}

export function initalLevelState():any  {
  return {
    levelDataItem: getData(),
    levelStateItem: [],
    isFetching: false,
    isloading: false
  }
}

export function levelReducer(state:any = initalLevelState(), action:LevelPostAction) {
  switch (action.type) {
    case 'level/datastate':
      return {
       ...state,
         isFetching: false,
         levelStateItem: action['pyload']
       }
    case 'level/datapost':
      console.log(action['pyload'])
      axios.post('http://localhost:3003/api/levels/', action['pyload'])
        .then( (res) => {
          let redata = state.levelDataItem
          console.log(res)
          return {
            ...state,
              isFetching: true,
            }
        })
        return {
         ...state,
           isFetching: true,
         }
     case 'level/dataset':
       return　axios.get('http://localhost:3003/api/levels/')
        .then( (res) => {
          return {
           ...state,
             isFetching: false,
             levelDataItem: res.data
           }
        })
      case 'level/dataupdate':
        return　axios.patch(`http://localhost:3003/api/levels/${action['id']}`)
         .then( (res) => {
           return {
            ...state,
              isFetching: false,
              levelDataItem: res.data
            }
         })
       case 'level/datadelete':
         console.log(action['id'])
         axios.delete(`http://localhost:3003/api/levels/${action['id']}`)
         .then( (res) => {
           return {
             ...state,
               isFetching: true,
             }
         })
         return {
          ...state,
            isFetching: true
          }
      default:
        return state
    }
}
