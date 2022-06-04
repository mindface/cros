import axios from "axios";
import { Action } from "redux";
import { Users } from "../../../models/users";

export interface UserPostAction extends Action {
  type: string;
  items: Users[];
}

export interface LevelPostActionFailure extends Action {
  type: string;
  err: string;
}

const getData = async function () {
  const res = await axios.get(`http://localhost:3003/api/levels`);
  if (res.status < 400) {
    return res.data;
  }
};

export function initalUserState(): any {
  return {
    userDataItem: getData(),
    userStateItem: [],
    isFetching: false,
    isloading: false,
  };
}

export function userReducer(
  state: any = initalUserState(),
  action: UserPostAction
) {
  switch (action.type) {
    case "user/datastate":
      return {
        ...state,
        isFetching: false,
        levelStateItem: action["pyload"],
      };
    case "user/login":
      console.log(action["pyload"]);
      axios
        .post("http://localhost:3003/login", action["pyload"])
        .then((res) => {
          let redata = state.levelDataItem;
          console.log(res);
          return {
            ...state,
            isFetching: true,
          };
        });
      return {
        ...state,
        isFetching: true,
      };
    case "user/datapost":
      console.log(action["pyload"]);
      axios
        .post("http://localhost:3003/api/levels/", action["pyload"])
        .then((res) => {
          let redata = state.levelDataItem;
          console.log(res);
          return {
            ...state,
            isFetching: true,
          };
        });
      return {
        ...state,
        isFetching: true,
      };
    case "user/dataset":
      return axios.get("http://localhost:3003/api/levels/").then((res) => {
        return {
          ...state,
          isFetching: false,
          levelDataItem: res.data,
        };
      });
    case "user/dataupdate":
      return axios
        .patch(`http://localhost:3003/api/levels/${action["id"]}`)
        .then((res) => {
          return {
            ...state,
            isFetching: false,
            levelDataItem: res.data,
          };
        });
    case "user/datadelete":
      console.log(action["id"]);
      axios
        .delete(`http://localhost:3003/api/levels/${action["id"]}`)
        .then((res) => {
          return {
            ...state,
            isFetching: true,
          };
        });
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
}
