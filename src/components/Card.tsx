import React, { useEffect, useRef, useState } from "react";
import { useSelector, useStore, useDispatch } from "react-redux";
import { Card } from "../models/card";

type Props = {
  card:Card
}

function Card(props:Props){
  const dispatch = useDispatch();
  const [card,setCard] = useState<Card>(() => props.card);
  const [moveTg,moveTgSet] = useState(false);
  const [editTitle,editTitleSet] = useState("");
  const [editBody,editBodySet] = useState("");
  const [infoView,infoViewSet] = useState(false);
  const [_x,_xSet] = useState(0);
  const [_y,_ySet] = useState(0);
  const dialog = useRef<any>(null);
  const boxwidth = 60;

  function modalAction(id:number){
    dispatch({type:'modal/open'});
  }

  function mouseDown() {
    moveTgSet(true);
  }

  function mouseMove(e:React.MouseEvent) {
    if(moveTg){
      const element = e.target as any;
      const left = element.getBoundingClientRect().left;
      const top = element.getBoundingClientRect().top;
      const x = (e.clientX - boxwidth/2) - 240;
      const y = (e.clientY - (20 + boxwidth*(card.id-1))) - 55;
      // console.log(y)
      // console.log(e)
      _xSet(x)
      _ySet(y)
    }
  }

  function mouseOut() {
    moveTgSet(false);
    document.body.removeEventListener('mousedown',mouseDown)
    document.body.removeEventListener('mousemove',() => {})
    document.body.removeEventListener('mouseup',mouseOut)
  }

  function viewIng(e:React.MouseEvent){
    e.preventDefault();
    e.stopPropagation();
    console.log(card.id)
    dispatch({type:'modal/open',viewId:card.id});
    dispatch({type:'card/setId',setId:card.contentId});
    dispatch({type:'card/setCotentId',setCotentId:card.id});
    document.getElementsByTagName('body')[0].className += "open-modal";
  }

  function saveDialog(){
    dispatch({type:'card/update',card:{id:card.id, name: editTitle, x: _x, y: _y, content: editBody, contentId : `${card.id}`}});
  }

  function openDialog(){
    editTitleSet(props.card.name);
    editBodySet(props.card.content);
    dialog.current.showModal();
  }
  function closeDialog(){ dialog.current.close(); }

  useEffect(() => {
    editTitleSet(props.card.name)
    editBodySet(props.card.content)
    // _xSet(props.card.x)
    // _ySet(props.card.y)
  },[props.card])

  return (
    <div
      className={`card p-10 boxShadow radius card${card.id}`}
      onMouseDown={(e) => mouseDown()}
      onMouseMove={(e:React.MouseEvent) => {mouseMove(e)}}
      onMouseUp={(e) => {mouseOut()}}      
      style={{left:`${_x}px`,top:`${_y}px`}}
    >
      <div className="btn-box">
        <div className="btn boxShadow radius p-5"
          onClick={(e:React.MouseEvent) => viewIng(e)}>view</div>
        <div className="btn boxShadow radius p-5"
          onClick={() => openDialog()}>Edit</div>
      </div>
      <div className='info-box'>
        <h3 className="title">{card.name}</h3>
      </div>
      <div className="dialog-box">
        <dialog className="dialog" ref={dialog}>
          <div className="dialog-inner p-10">
            <div className="dialog-content">
              <div className="field p-5">
                <input type="text" className="input" value={editTitle} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {editTitleSet(e.target.value)} }  />
              </div>
              <div className="field p-5">
                <textarea className="textarea" value={editBody} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => {editBodySet(e.target.value)} } />
              </div>
            </div>
            <div className="dialog-btns">
              <div className="btn boxShadow radius p-5"
                onClick={() => saveDialog()}>save</div>
              <div className="btn boxShadow radius p-5"
                onClick={() => closeDialog()}>close</div>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  )
}

export default Card;
