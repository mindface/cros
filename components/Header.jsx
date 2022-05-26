"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Nav_1 = __importDefault(require("./Nav"));
function Header() {
    return (<header className="header boxShadow">
    <div className="header__inner"><Nav_1.default /></div>
   </header>);
}
exports.default = Header;
