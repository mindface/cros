import axios from "axios";
import { Action } from "redux";
import { Levels } from "../../../models/levels";

export const FETCH_LEVEL_DATA_REQUEST = "FETCH_LEVEL_DATA_REQUEST";
export const FETCH_LEVEL_DATA_SUCCESS = "FETCH_LEVEL_DATA_SUCCESS";
export const FETCH_LEVEL_DATA_FAILURE = "FETCH_LEVEL_DATA_FAILURE";

export function initalLevelState(): any {
  return {
    levelDataItem: [],
  };
}

export interface LevelPostAction extends Action {
  type: string;
  items: Levels[];
}

export interface LevelPostActionFailure extends Action {
  type: string;
  err: string;
}

export function levelReducer(
  state: any = initalLevelState(),
  action: LevelPostAction
) {
  switch (action.type) {
    case FETCH_LEVEL_DATA_REQUEST:
      return {
        ...state,
        isFetching: true,
        levelDataItem: [],
      };
    case FETCH_LEVEL_DATA_SUCCESS:
      console.log(action);

      return {
        ...state,
        isFetching: false,
        levelDataItem: action["items"],
      };
    case FETCH_LEVEL_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        levelDataItem: [],
      };
    default:
      return state;
  }
}

export const levelFetchDataRequest = (): LevelPostAction => {
  return {
    type: FETCH_LEVEL_DATA_REQUEST,
    items: [],
  };
};

export const levelFetchDataSuccess = (data: Levels[]): LevelPostAction => {
  console.log("00000");
  return {
    type: FETCH_LEVEL_DATA_SUCCESS,
    items: data,
  };
};

export const levelFetchDataFailure = (err: string): LevelPostActionFailure => {
  console.log("00000");
  return {
    type: FETCH_LEVEL_DATA_FAILURE,
    err: err,
  };
};

export const AddLvelData = (sendData: any) => {
  const postSendData = sendData;
  // const host = 'http://interp.php.xdomain.jp/api';
  const host = "http://0.0.0.0:8003";
  const headers: object = {
    "Access-Control-Allow-Orgin": "*",
    "Content-Type": "application/json",
    Authorization: "Basic YWRtaW46YlI4WiA0N3o0IG5iSTUgMU1zbCBJZXhhIDhwRUo=",
  };
  try {
    //  const res = axios.post(`${host}/wp-json/jwt-auth/v1/token`, sendData, headers)
    //  const res = axios.post(`${host}/wp-json/wp/v2/posts`, JSON.stringify(sendData), headers)
    const res = axios.post(`${host}/sned.php`, sendData, headers);
    //  console.log(wrese)
    const getdata: any = res;
    console.log(getdata);
  } catch (err) {
    console.log(err);
  }
  return async (dispatch, getState, data) => {
    dispatch(levelFetchDataRequest());
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    const headers: object = {
      "Access-Control-Allow-Orgin": "*",
      "Content-Type": "application/json; charset=utf-8",
    };
    // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    console.log(sendData);
    try {
      const res = await axios.post(
        "http://interp.php.xdomain.jp/api/jwt-auth/v1/token",
        sendData,
        headers
      );
      const getdata: any = res.data;
      console.log(getdata);
      return dispatch(levelFetchDataSuccess(getdata));
    } catch (err) {
      return dispatch(levelFetchDataFailure(err));
    }
  };
};

export const postLevelData = (sendData: Levels) => {
  const postSendData = { level: sendData };
  console.log(postSendData);
  axios.defaults.xsrfCookieName = "csrftoken";
  // axios.defaults.baseURL = 'http://localhost:3000';
  // axios.defaults.xsrfHeaderName = "X-CSRFToken"
  axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
  const headers: object = {
    "Access-Control-Allow-Orgin": "*",
    "Content-Type": "application/json; charset=utf-8",
  };

  levelFetchDataRequest();
  const res = axios
    .post("http://localhost:3003/api/levels/", postSendData)
    .then((res) => {
      const getdata: any = res.data;
      return levelFetchDataSuccess(getdata);
    })
    .catch((err) => {
      console.log(err);
      return levelFetchDataFailure(err);
    });
};

export const getLevelData = () => {
  console.log("---");
  return (dispatch) => {
    dispatch(levelFetchDataRequest());
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    const headers: object = {
      "Access-Control-Allow-Orgin": "*",
      "Content-Type": "application/json; charset=utf-8",
    };
    // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    axios
      .get("http://localhost:3003/api/levels/", headers)
      .then((res) => {
        dispatch(levelFetchDataSuccess(res.data));
      })
      .catch((err) => {
        dispatch(levelFetchDataFailure(err));
      });
  };
};
