"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
const App_1 = require("./App");
require("../sass/index.sass");
const react_redux_1 = require("react-redux");
const store_1 = require("./store");
const rootDom = document.getElementById('root');
if (rootDom) {
    const root = (0, client_1.createRoot)(rootDom);
    root.render(<react_redux_1.Provider store={store_1.setupStore}>
      <App_1.App />
    </react_redux_1.Provider>);
}
