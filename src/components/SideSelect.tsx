import React, { useState } from 'react';

function SideSelect(){
  const list = [
    {id:0,path:"images/item-01.png", name: "titile01"},
    {id:1,path:"images/item-02.png", name: "titile02"},
    {id:2,path:"images/item-03.png", name: "titile03"}
  ]

  return (
   <div className="side p-10 boxShadow">
     <ul className="list">
       { list.map((item) => {
         return (
          <li className="item" key={item.id}>
            <div className="img-box">
              <p className="caption">{item.name}</p>
              <img src={item.path} alt="" className="img" />
            </div>
          </li>
         )
       }) }
     </ul>
   </div>
  )
}

export default SideSelect;
