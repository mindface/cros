"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.conceptReducer = exports.initalConceptState = void 0;
const concept_json_1 = __importDefault(require("./setState/concept.json"));
function initalConceptState() {
  return {
    concepts: concept_json_1.default,
    concept: {
      title: "",
      body: "",
      info: "",
    },
  };
}
exports.initalConceptState = initalConceptState;
function conceptReducer(state = initalConceptState(), action) {
  switch (action.type) {
    case "concept/get":
      return Object.assign(Object.assign({}, state), {
        modalView: true,
        concepts: action.concepts,
      });
    case "concept/set":
      return Object.assign(Object.assign({}, state), { modalView: false });
    case "concept/dataget":
      return Object.assign(Object.assign({}, state), {
        concepts: action.concepts,
      });
    case "concept/selectId":
      return Object.assign(Object.assign({}, state), {
        concept: action.concept,
      });
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
      return state;
  }
}
exports.conceptReducer = conceptReducer;
