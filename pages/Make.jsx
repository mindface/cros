"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ContentSets_1 = __importDefault(require("../components/ContentSets"));
const SideSelect_1 = __importDefault(require("../components/SideSelect"));
const ModalContentView_1 = __importDefault(require("../components/ModalContentView"));
function Make() {
    return (<div className="contents-wrapper">
    <SideSelect_1.default />
    <div className="content--make">
      <ContentSets_1.default />
    </div>
    <ModalContentView_1.default />
   </div>);
}
exports.default = Make;
