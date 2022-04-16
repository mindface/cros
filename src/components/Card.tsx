import React, { useEffect, useState } from "react";
import { useSelector, useStore, useDispatch } from "react-redux";
import { Card } from "../models/card";

type Props = {
  card:Card
}

function Card(props:Props){
  const dispatch = useDispatch();
  const [card,setCard] = useState<Card>(() => props.card);
  const [moveTg,moveTgSet] = useState(false);
  const [infoView,infoViewSet] = useState(false);
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
      const element = e.target as any;
      const left = element.getBoundingClientRect().left;
      const top = element.getBoundingClientRect().top;
      const x = (e.clientX - 20) - 240;
      const y = (e.clientY - (20 + 30*(card.id-1))) - 45;
      console.log(left)
      console.log(e.clientX)
      _xSet(x)
      _ySet(y)
    }
  }

  function mouseOut() {
    moveTgSet(false);
    document.body.removeEventListener('mousedown',mouseDown)
    document.body.removeEventListener('mousemove',mouseMove)
    document.body.removeEventListener('mouseup',mouseOut)
  }

  function viewIng(e:MouseEvent){
    e.preventDefault();
    e.stopPropagation();
    dispatch({type:'modal/open',viewId:card.id});
    dispatch({type:'card/setId',setId:card.contentId});
    document.getElementsByTagName('body')[0].className += "open-modal";
  }

  return (
    <div
      className={`card p-10 boxShadow radius card${card.id}`}
      onMouseDown={(e) => mouseDown()}
      onMouseMove={(e:MouseEvent) => {mouseMove(e)}}
      onMouseUp={(e) => {mouseOut()}}      
      style={{left:`${_x}px`,top:`${_y}px`}}
    >
      <div className="btn btn--control boxShadow radius"
        onClick={(e:MouseEvent) => viewIng(e)}> + </div>
      <div className={infoView ? 'info-box boxShadow view':'info-box boxShadow'}>
        <h3 className="title" onClick={(e) => modalAction(card.id)} >{card.name}</h3>
        <div className="view-content">{card.content}</div>
      </div>
    </div>
  )
}

export default Card;
