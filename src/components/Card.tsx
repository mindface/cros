import React, { useEffect, useState } from "react";
import { useSelector, useStore, useDispatch } from "react-redux";
import { Card } from "../models/Card";

type Props = {
  card:Card
}

function Card(props:Props){
  const dispatch = useDispatch();
  const [card,setCard] = useState<Card>(() => props.card);
  const [moveTg,moveTgSet] = useState(false);
  const [_x,_xSet] = useState(0);
  const [_y,_ySet] = useState(0);

  function modalAction(id:number){
    dispatch({type:'modal/open'});
  }

  function mouseDown() {
    moveTgSet(true);
  }

  function mouseMove(e:MouseEvent) {
    if(moveTg){
      const element = e.target as HTMLDialogElement;
      const x = element.parentNode.getBoundingClientRect().left;
      const y = element.parentNode.getBoundingClientRect().top;
      console.log(x)
      console.log(e)
      _xSet(e.clientX - (x+30))
      _ySet(e.clientY - (y+50))
    }
  }

  function mouseOut() {
    moveTgSet(false);
  }

  useEffect(() => {

  })

  return (
    <div className="card p-10 boxShadow radius"
      style={{left:`${_x}px`,top:`${_y}px`}}
      onMouseDown={(e) => mouseDown()}
      onMouseMove={(e:MouseEvent) => {mouseMove(e)}}
      onMouseUp={(e) => {mouseOut()}}>
      <div className="btn btn--control boxShadow radius">+</div>
      <h3 className="title" onClick={(e) => modalAction(card.id)} >{card.name}</h3>
      <div className="view-content">{card.content}</div>
    </div>
  )
}

export default Card;
