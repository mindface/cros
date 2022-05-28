import React, { useEffect } from 'react';
import { useSelector, useStore } from "react-redux";
import { RootStore } from "../../store/modules/reducer";

function Contents01(){
  const setCotentId = useSelector((state:{base: RootStore}) => {
    return state.base.card.setCotentId;
  })
  const cards = useSelector((state:{base: RootStore}) => {
    return state.base.card.cards;
  })
  const concepts = useSelector((state:{base: RootStore}) => {
    console.log(state.base.concept.concepts)
    return state.base.concept.concepts;
  })

    return (
    <div className="frame-content p-10">
      <div className="en">Information level {setCotentId}</div>
      <h3 className="title">- 情報レベル -</h3>
      <div className="en text">{cards[setCotentId-1].content}</div>
    </div>
  )
}

export default Contents01;