import React, { useState } from "react";
import { useSelector, useStore, useDispatch } from "react-redux";

function FooterSelect() {
  const dispatch = useDispatch();
  const list = [
    { id: 1, path: "images/item1.png", name: "titile01" },
    { id: 2, path: "images/item2.png", name: "titile02" },
    { id: 3, path: "images/item3.png", name: "titile03" },
    { id: 4, path: "images/item4.png", name: "titile03" },
  ];

  function selectBg(id: number) {
    dispatch({ type: "modal/selectId", selectId: id });
  }

  return (
    <div className="footer--select p-10 boxShadow">
      <ul className="list">
        {list.map((item) => {
          return (
            <li
              className="item"
              key={item.id}
              onClick={(e) => {
                selectBg(item.id);
              }}
            >
              <div className="img-box">
                <p className="caption">{item.name}</p>
                <img src={item.path} alt="" className="img" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FooterSelect;
