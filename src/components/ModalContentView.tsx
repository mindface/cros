import React from 'react';

function ContentSets(){
  const list = [
    {id:1, name: "title", x: 20, y: 20, content: "tetetetet" },
    {id:2, name: "title", x: 40, y: 80, content: "tetetetet" },
  ]
  return (
   <div className="content--select p-10">
     {list.map((item) => {
       return (
        <div className="card p-10 boxShadow radius" key={item.id}>
          <div className="btn btn--control boxShadow radius">+</div>
          <h3 className="title">{item.name}</h3>
          <div className="view-content">{item.content}</div>
        </div>
       )
     })}
   </div>
  )
}

export default ContentSets;
