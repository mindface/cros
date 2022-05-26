"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLevelData = exports.postLevelData = exports.levelFetchDataFailure = exports.levelFetchDataSuccess = exports.levelFetchDataRequest = exports.postReducer = exports.initalLevelState = exports.FETCH_LEVEL_DATA_FAILURE = exports.FETCH_LEVEL_DATA_SUCCESS = exports.FETCH_LEVEL_DATA_REQUEST = void 0;
const axios_1 = __importDefault(require("axios"));
exports.FETCH_LEVEL_DATA_REQUEST = 'FETCH_LEVEL_DATA_REQUEST';
exports.FETCH_LEVEL_DATA_SUCCESS = 'FETCH_LEVEL_DATA_SUCCESS';
exports.FETCH_LEVEL_DATA_FAILURE = 'FETCH_LEVEL_DATA_FAILURE';
function initalLevelState() {
    return {
        levelDataItem: [],
        modalView: false,
    };
}
exports.initalLevelState = initalLevelState;
function postReducer(state = initalLevelState(), action) {
    switch (action.type) {
        case exports.FETCH_LEVEL_DATA_REQUEST:
            return Object.assign(Object.assign({}, state), { isFetching: true, levelDataItem: [] });
        case exports.FETCH_LEVEL_DATA_SUCCESS:
            console.log(action);
            return Object.assign(Object.assign({}, state), { isFetching: false, levelDataItem: action['items'] });
        case exports.FETCH_LEVEL_DATA_FAILURE:
            return Object.assign(Object.assign({}, state), { isFetching: false, levelDataItem: [] });
        default:
            return state;
    }
}
exports.postReducer = postReducer;
const levelFetchDataRequest = () => {
    return {
        type: exports.FETCH_LEVEL_DATA_REQUEST,
        items: []
    };
};
exports.levelFetchDataRequest = levelFetchDataRequest;
const levelFetchDataSuccess = (data) => {
    console.log('00000');
    return {
        type: exports.FETCH_LEVEL_DATA_SUCCESS,
        items: data
    };
};
exports.levelFetchDataSuccess = levelFetchDataSuccess;
const levelFetchDataFailure = (err) => {
    console.log('00000');
    return {
        type: exports.FETCH_LEVEL_DATA_FAILURE,
        err: err
    };
};
exports.levelFetchDataFailure = levelFetchDataFailure;
// export const AddLvelData = (sendData:any) => {
//   const postSendData = sendData
//   // const host = 'http://interp.php.xdomain.jp/api';
//   const host = 'http://0.0.0.0:8003';
//     const headers:object = {
//       "Access-Control-Allow-Orgin":"*",
//       "Content-Type": "application/json",
//       "Authorization":"Basic YWRtaW46YlI4WiA0N3o0IG5iSTUgMU1zbCBJZXhhIDhwRUo="
//     }
//     try {
//       //  const res = axios.post(`${host}/wp-json/jwt-auth/v1/token`, sendData, headers)
//       //  const res = axios.post(`${host}/wp-json/wp/v2/posts`, JSON.stringify(sendData), headers)
//        const res = axios.post(`${host}/sned.php`, sendData, headers)
//       //  console.log(wrese)
//        const getdata:any = res
//        console.log(getdata)
//     }
//     catch (err) {
//       console.log(err)
//     }
//   return async (dispatch,getState,data) => {
//     dispatch(levelFetchDataRequest())
//     axios.defaults.xsrfCookieName = 'csrftoken'
//     axios.defaults.xsrfHeaderName = "X-CSRFToken"
//     const headers:object = {
//       "Access-Control-Allow-Orgin":"*",
//       "Content-Type": "application/json; charset=utf-8",
//     }
//     // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//     console.log(sendData)
//     try {
//        const res = await axios.post('http://interp.php.xdomain.jp/api/jwt-auth/v1/token', sendData, headers)
//        const getdata:any = res.data
//        console.log(getdata)
//        return dispatch(levelFetchDataSuccess(getdata))
//     }
//     catch (err) {
//        return dispatch(levelFetchDataFailure(err))
//     }
//   }
// }
const postLevelData = (sendData) => {
    const postSendData = { level: sendData };
    console.log(postSendData);
    axios_1.default.defaults.xsrfCookieName = 'csrftoken';
    // axios.defaults.baseURL = 'http://localhost:3000';
    // axios.defaults.xsrfHeaderName = "X-CSRFToken"
    axios_1.default.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    const headers = {
        "Access-Control-Allow-Orgin": "*",
        "Content-Type": "application/json; charset=utf-8",
    };
    (0, exports.levelFetchDataRequest)();
    const res = axios_1.default.post('http://localhost:3003/api/levels/', postSendData)
        .then((res) => {
        const getdata = res.data;
        return ((0, exports.levelFetchDataSuccess)(getdata));
    })
        .catch((err) => {
        console.log(err);
        return ((0, exports.levelFetchDataFailure)(err));
    });
};
exports.postLevelData = postLevelData;
const getLevelData = () => {
    console.log('---');
    return (dispatch) => {
        dispatch((0, exports.levelFetchDataRequest)());
        axios_1.default.defaults.xsrfCookieName = 'csrftoken';
        axios_1.default.defaults.xsrfHeaderName = "X-CSRFToken";
        const headers = {
            "Access-Control-Allow-Orgin": "*",
            "Content-Type": "application/json; charset=utf-8"
        };
        // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        axios_1.default.get('http://localhost:3003/api/levels/', headers)
            .then((res) => {
            dispatch((0, exports.levelFetchDataSuccess)(res.data));
        })
            .catch((err) => {
            dispatch((0, exports.levelFetchDataFailure)(err));
        });
    };
};
exports.getLevelData = getLevelData;
