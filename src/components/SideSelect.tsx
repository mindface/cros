import React, { useState } from 'react';
import { useSelector, useStore, useDispatch } from "react-redux";
import { SelectorRootStore } from "../store";

function SideSelect(){
  const dispatch = useDispatch();
  const [contentId,contentIdSet] = useState(-1);
  const list = [
    {id:1,path:"images/item1.png", name: "選択コンテンツ01"},
    {id:2,path:"images/item2.png", name: "選択コンテンツ02"},
    {id:3,path:"images/item3.png", name: "選択コンテンツ03"},
    {id:4,path:"images/item4.png", name: "選択コンテンツ04"}
  ]

  const cardsList = useSelector((state:SelectorRootStore) => {
  return state.base.card.cards;
})

  function addContent(){
    const cardData = {
      id:0, name: "title", x: 40, y: 100, content: "tetetetet", contentId : "2"
    }
    const list = cardsList;
    list.push(cardData);
    dispatch({type:'card/add',cards:[]});
    setTimeout(() => {
      dispatch({type:'card/add',cards:list});
    },600)
  }

  function selectContent(id:number){
    contentIdSet(id);
  }

  return (
   <div className="side p-10 boxShadow">
     { contentId !== -1 && <div className="add-box">
       <div 
         className="add-box__btn p-10"
         onClick={() => addContent()}
       >コンテンツ追加</div>
     </div>}
     <ul className="list">
       { list.map((item) => {
         return (
          <li
            key={item.id}
            className={item.id === contentId ?'item active': 'item'}
            onClick={(e) => {selectContent(item.id)}}
          >
            <div className="img-box">
              <p className="caption">{item.name}</p>
            </div>
          </li>
         )
       }) }
     </ul>
   </div>
  )
}

export default SideSelect;
