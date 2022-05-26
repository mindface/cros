"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const FooterSelect_1 = __importDefault(require("./FooterSelect"));
function Footer() {
    return (<footer className="footer">
     <div className="footer__inner">
       <FooterSelect_1.default />
       <small className="copyright">&copy; setFlowr</small>
     </div>
   </footer>);
}
exports.default = Footer;
