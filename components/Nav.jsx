"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
function Nav() {
    return (<div className="nav-outer">
     <react_router_dom_1.Link className="link" to="/">home</react_router_dom_1.Link>
     <react_router_dom_1.Link className="link" to="/about">about</react_router_dom_1.Link>
     <react_router_dom_1.Link className="link" to="/make">make</react_router_dom_1.Link>
     <react_router_dom_1.Link className="link" to="/parts/contents01">contents01</react_router_dom_1.Link>
     <react_router_dom_1.Link className="link" to="/parts/contents02">contents02</react_router_dom_1.Link>
   </div>);
}
exports.default = Nav;
