"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Header_1 = __importDefault(require("../components/Header"));
const Footer_1 = __importDefault(require("../components/Footer"));
const Layout = ({ children }) => {
    // if ("/think") {
    //   return (
    //     <>
    //       <Header />
    //       <div className="wrapper">{children}</div>
    //       <Footer />
    //     </>
    //   );
    // }
    return (<>
    <Header_1.default />
    <div className="wrapper">{children}</div>
    <Footer_1.default />
    </>);
};
exports.default = Layout;
