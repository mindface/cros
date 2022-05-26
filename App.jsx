"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Home_1 = __importDefault(require("./pages/Home"));
const About_1 = __importDefault(require("./pages/About"));
const Make_1 = __importDefault(require("./pages/Make"));
const Contents01_1 = __importDefault(require("./pages/parts/Contents01"));
const Contents02_1 = __importDefault(require("./pages/parts/Contents02"));
const Contents03_1 = __importDefault(require("./pages/parts/Contents03"));
const Contents04_1 = __importDefault(require("./pages/parts/Contents04"));
const Contents05_1 = __importDefault(require("./pages/parts/Contents05"));
const Contents06_1 = __importDefault(require("./pages/parts/Contents06"));
const layout_1 = __importDefault(require("./layout"));
const App = () => {
    return (<react_router_dom_1.BrowserRouter>
    <react_router_dom_1.Routes>
     <react_router_dom_1.Route path="/" element={<layout_1.default><Home_1.default /></layout_1.default>}/>
     <react_router_dom_1.Route path="about" element={<layout_1.default><About_1.default /></layout_1.default>}/>
     <react_router_dom_1.Route path="make" element={<layout_1.default><Make_1.default /></layout_1.default>}/>
     <react_router_dom_1.Route path="contents01" element={<Contents01_1.default />}/>
     <react_router_dom_1.Route path="contents02" element={<Contents02_1.default />}/>
     <react_router_dom_1.Route path="contents03" element={<Contents03_1.default />}/>
     <react_router_dom_1.Route path="contents04" element={<Contents04_1.default />}/>
     <react_router_dom_1.Route path="contents05" element={<Contents05_1.default />}/>
     <react_router_dom_1.Route path="contents06" element={<Contents06_1.default />}/>
     <react_router_dom_1.Route path='parts'>
      <react_router_dom_1.Route path="contents02" element={<Contents02_1.default />}/>
     </react_router_dom_1.Route>
   </react_router_dom_1.Routes>
  </react_router_dom_1.BrowserRouter>);
};
exports.App = App;
