import React, { useEffect } from "react";
import { useSelector, useStore, useDispatch } from "react-redux";
import Card from "./Card";

function ContentSets(){
  const store = useStore();
  const dispatch = useDispatch();
  const l = useSelector((state) => {
    console.log(store.getState())
    return state
  })
  const list = [
    {id:1, name: "title", x: 20, y: 20, content: "tetetetet" },
    {id:2, name: "title", x: 40, y: 80, content: "tetetetet" },
  ]

  function modalAction(id:number){
    dispatch({type:'modal/open'});
    console.log(l.base)
  }

  function mouseDown(e:Event) {
  }

  function mouseMove(e:Event) {
    
  }

  function mouseOut(e:Event) {
    
  }

  return (
   <div className="content--select p-10">
     {list.map((item) => {
       return (
        <Card card={item} key={item.id} />
       )
     })}
   </div>
  )
}

export default ContentSets;
