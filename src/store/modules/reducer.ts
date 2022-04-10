
import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useDispatch , useSelector as rawUseSelector } from 'react-redux'
import * as post from './data_action/post'
import * as modal from './data_action/modal'
import * as LevelsModels from '../../models/levels'

export interface RootStore {
  items: LevelsModels.Levels[],
  modal: boolean
}

const initalState:RootStore = {
  items:[],
  modal: false
}

const reducers = combineReducers({
  items: post.postReducer,
  modal: modal.modalReducer,
})
 
export const rootReducer = (state:(RootStore|undefined), action:any) => {
  if(action?.type === ''){
     state = undefined
  }
  return reducers(state,action)
}

export const useRootSelector: TypedUseSelectorHook<RootStore> = rawUseSelector
