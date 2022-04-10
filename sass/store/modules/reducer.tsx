
import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useDispatch , useSelector as rawUseSelector } from 'react-redux'
import * as Level from './data_action/level'
import * as User from './data_action/user'
import * as LevelsModels from '../../models/levels'
import * as UserModels from '../../models/users'

export interface RootStore {
  items: LevelsModels.Levels[]
  users: UserModels.Users[]
}

const initalState:RootStore = {
  items:[],
  users:[]
}

const reducers = combineReducers({
  items: Level.levelReducer,
  users: User.userReducer
})
 
export const rootReducer = (state, action) => {
  if(action?.type === ''){
     state = undefined
  }
  return reducers(state,action)
}

export const useRootSelector: TypedUseSelectorHook<RootStore> = rawUseSelector
