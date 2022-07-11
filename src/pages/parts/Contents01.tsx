import React, { useEffect } from "react";
import { useSelector, useStore } from "react-redux";
import { RootStore } from "../../store/modules/reducer";

function Contents01() {
  const setCotentId = useSelector((state: RootStore) => {
    return state.card.setCotentId;
  });
  const cards = useSelector((state: RootStore) => {
    return state.card.cards;
  });
  const concepts = useSelector((state: RootStore) => {
    return state.concept.concepts;
  });

  return (
    <div className="frame-content p-10">
      <div className="en">Information level {setCotentId}</div>
      <h3 className="title">- 情報レベル -</h3>
      <div className="en text">{cards[setCotentId - 1].content}</div>
    </div>
  );
}

export default Contents01;
