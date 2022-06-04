import React from "react";

import ContentSets from "../components/ContentSets";
import SideSelect from "../components/SideSelect";
import ModalContentView from "../components/ModalContentView";

function Make() {
  return (
    <div className="contents-wrapper">
      <SideSelect />
      <div className="content--make">
        <ContentSets />
      </div>
      <ModalContentView />
    </div>
  );
}

export default Make;
