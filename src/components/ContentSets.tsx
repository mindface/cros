import React, { useEffect,useMemo,useState, useRef } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import * as modalCard from "../models/card";
import { SelectorRootStore } from "../store";

function ContentSets(){
  const [list,listSet] = useState<modalCard.Card|any>([]);
  const [_setMap,_setMapSet] = useState(true);
  const selectId = useSelector((state:SelectorRootStore) => {
    return state.base.modal.selectId
  })
  const cardsList = useSelector((state:SelectorRootStore) => {
      console.log(state.base.card.cards)
    return state.base.card.cards;
  })

  function setMap(){
    _setMapSet(false);
    setTimeout(() => {
      _setMapSet(true);
    },400)
  }

  function modalAction(id:number){
  }

  function mouseDown(e:Event) {}

  function mouseMove(e:Event) {}

  function mouseOut(e:Event) {}

  const CardsList = useMemo(
    () => cardsList.map((item:any) => (
     <Card card={item} key={item.id} />
    )
  ),[cardsList])

  return (
   <div className="box--select p-10" style={{backgroundImage:`url(images/item${selectId}.png)`}} >
     { cardsList.map((item:any) => (
      <Card card={item} key={item.id} />
     ))}
   </div>
  )
}

export default ContentSets;
