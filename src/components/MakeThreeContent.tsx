import React, { useRef, useState, useEffect } from "react";
import { useSelector, useStore, useDispatch } from "react-redux";
import { fabric } from "fabric";
import * as THREE from "three";
import * as dat from "dat.gui";
import Canvas3d from "../module/three";
let c3d = new Canvas3d();

function MakeThreeContent() {
  const store = useStore();
  const dispatch = useDispatch();
  let canvas = useRef(fabric);
  let [xl, xlSet] = useState(0);
  let [yl, ylSet] = useState(0);
  let [zl, zlSet] = useState(0);
  let [threeSwitch, threeSwitchSet] = useState(false);
  let threeCanvas = useRef<HTMLCanvasElement>(null);

  let div = document.createElement("div");
  let closebtn = document.createElement("div");
  let renderer = THREE.WebGLRenderer;
  let meshList = [];

  const config = {
    gridlineColor: "0xffffff",
    t: "n",
  };

  function setElement() {
    div = document.createElement("div");
    div.className = "three3d";
    closebtn = document.createElement("div");
    closebtn.className = "btn";
    closebtn.innerText = "close";
    closebtn.addEventListener("click", () => {
      div.remove();
    });
    div.appendChild(closebtn);
  }

  const threeData = () => {
    const alink = document.createElement("a");
    if (threeCanvas.current) {
      const canvas = document.getElementById(
        "threeCanvas"
      ) as HTMLCanvasElement;
      alink.href = threeCanvas.current.toDataURL("image/png");
      alink.download = "d.png";
      alink.click();
    }
    // c3d.addImage();
  };

  const addThree = () => {
    c3d.addBoxMesh(xl, yl, zl);
  };

  const viewThree = () => {
    threeSwitchSet(!threeSwitch);
  };

  useEffect(() => {
    // c3d = new Canvas3d(threeCanvas.current!);
    c3d.Init(threeCanvas.current!);
  }, []);

  return (
    <div className="make-threeimage">
      <div className="make-threeimage--inner">
        <div className="three3d">
          <div className="make-btns p-5">
            <button
              className="close boxShadow btn radius"
              onClick={() => threeData()}
            >
              image down load
            </button>
          </div>
          <div className="add-mesh-box d-f p-5">
            <p className="slider p-5">
              <input
                type="number"
                id="xl"
                className="number input"
                name="volume"
                min="-100"
                max="100"
                value={xl}
                onChange={(e) => {
                  xlSet(Number(e.target.value));
                }}
              />
              <label htmlFor="xl">z 軸</label>
            </p>
            <p className="slider p-5">
              <input
                type="number"
                id="yl"
                className="number input"
                name="volume"
                min="-100"
                max="100"
                value={yl}
                onChange={(e) => {
                  ylSet(Number(e.target.value));
                }}
              />
              <label htmlFor="yl">y 軸</label>
            </p>
            <p className="slider p-5">
              <input
                type="number"
                id="zl"
                className="number input"
                name="volume"
                min="-100"
                max="100"
                value={zl}
                onChange={(e) => {
                  zlSet(Number(e.target.value));
                }}
              />
              <label htmlFor="zl">z 軸</label>
            </p>
            <button
              className="close boxShadow btn radius"
              onClick={() => addThree()}
            >
              add box
            </button>
          </div>
        </div>
        <div id="c-outer" className="c-outer">
          <canvas id="threeCanvas" ref={threeCanvas}></canvas>
        </div>
      </div>
    </div>
  );
}

export default MakeThreeContent;
