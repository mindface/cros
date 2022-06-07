import React, { useRef, useState, useEffect } from "react";
import { useSelector, useStore, useDispatch } from "react-redux";
import { fabric } from "fabric";
import Canvas3d from "../module/three";
import ElementLayyer from "./ElementLayer";
import { BlobOptions } from "buffer";

let c3d = new Canvas3d();
type Item = {
  index: number;
  id: number;
};
type Layer = { id: number; view: boolean };
type List = Item[];

function MakeThreeContent() {
  const store = useStore();
  const dispatch = useDispatch();
  let [xl, xlSet] = useState(0);
  let [yl, ylSet] = useState(0);
  let [zl, zlSet] = useState(0);
  let [selectNumber, selectNumberSet] = useState(0);
  let [deleteSwitch, deleteSwitchSet] = useState(false);
  let [listThree, listThreeSet] = useState<List>([]);
  let [layerList, layerListet] = useState<Layer[]>([]);
  let [deleteListThree, deleteListThreeSet] = useState<number[]>([]);
  let [deleteThreeId, deleteThreeIdSet] = useState<number>(0);
  let threeCanvas = useRef<HTMLCanvasElement>(null);

  const addLayer = () => {
    layerListet([...layerList, { id: layerList.length + 1, view: true }]);
  };

  const switchLayer = (id: number) => {
    const list = layerList.map((item: Layer) => {
      if (item.id === id) {
        item.view = !item.view;
      }
      return item;
    });
    layerListet(list);
  };

  const setThreeMesh = () => {
    let list: List = [];
    c3d.stateList().forEach((mesh: THREE.Mesh, index: number) => {
      if (deleteListThree.indexOf(mesh.id) === -1) {
        list.push({ index: index, id: mesh.id });
      }
    });
    listThreeSet(list);
  };

  const threeData = () => {
    const alink = document.createElement("a");
    if (threeCanvas.current) {
      alink.href = threeCanvas.current.toDataURL("image/png");
      alink.download = "d.png";
      alink.click();
    }
    // c3d.addImage();
  };

  const listThreeBox = () => {};

  const addThree = () => {
    c3d.addBoxMesh(xl, yl, zl);
    setThreeMesh();
  };

  const setDeleteThreeBox = (id: number, index: number) => {
    selectNumberSet(index);
    deleteThreeIdSet(id);
  };

  const deleteThreeBox = () => {
    let list = deleteListThree;
    list.push(deleteThreeId);
    deleteListThreeSet(list);
    c3d.remove(deleteThreeId);
    setThreeMesh();
  };

  useEffect(() => {
    // c3d = new Canvas3d(threeCanvas.current!);
    c3d.Init(threeCanvas.current!);
    setThreeMesh();
  }, []);

  return (
    <div className="make-threeimage">
      <div className="make-threeimage--inner">
        <div className="three3d">
          <div className="add-mesh-box pr-5">
            <button
              className="close boxShadow btn radius"
              onClick={() => threeData()}
            >
              image down load
            </button>
            <p className="field p-5">
              <label className="label" htmlFor="xl">
                z 軸
              </label>
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
            </p>
            <p className="field d-f p-5">
              <label className="label" htmlFor="yl">
                y 軸
              </label>
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
            </p>
            <p className="field d-f p-5">
              <label className="label" htmlFor="zl">
                z 軸
              </label>
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
            </p>
            <p className="slider pr-5">
              <button
                className="close boxShadow btn radius"
                onClick={() => addThree()}
              >
                add box
              </button>
            </p>
            <div className="delete-select pt-5 pb-5">
              <div className="select">
                <p
                  className="select-number radius"
                  onClick={() => {
                    deleteSwitchSet(!deleteSwitch);
                  }}
                >
                  {selectNumber}
                </p>
                <ul
                  className={
                    deleteSwitch
                      ? "list p-10 radius active boxShadow"
                      : "list boxShadow"
                  }
                >
                  {listThree.length !== 0 ? (
                    listThree.map((item: Item) => {
                      return (
                        <li
                          className="item"
                          key={item.id}
                          onClick={() => {
                            setDeleteThreeBox(item.id, item.index);
                            deleteSwitchSet(!deleteSwitch);
                          }}
                        >
                          {item.index}
                        </li>
                      );
                    })
                  ) : (
                    <li className="item">追加してください。</li>
                  )}
                </ul>
              </div>
              <p className="pt-5 pb-5">
                <button
                  className="close boxShadow btn radius"
                  onClick={() => deleteThreeBox()}
                >
                  delete box
                </button>
              </p>
              <p className="pb-5">
                <button
                  className="close boxShadow btn radius"
                  onClick={() => addLayer()}
                >
                  addLayer
                </button>
              </p>
            </div>
            <div className="layerSettings">
              {layerList.map((item: Layer) => {
                return (
                  <div className="layerSetting p-5" key={item.id}>
                    <input
                      type="checkbox"
                      id={`settings${item.id}`}
                      className="input d-n"
                      name={`settings${item.id}`}
                      checked={item.view}
                      onChange={(e) => {
                        switchLayer(item.id);
                      }}
                    />
                    <label className="label" htmlFor={`settings${item.id}`}>
                      レイヤー{item.id}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div id="c-outer" className="c-outer threeCanvas-outer">
          <div className="layer-view">
            {layerList.map((item: Layer) => {
              return (
                <ElementLayyer
                  key={item.id}
                  layerId={item.id}
                  viewSwitch={item.view}
                />
              );
            })}
          </div>
          <canvas id="threeCanvas" ref={threeCanvas}></canvas>
        </div>
      </div>
    </div>
  );
}

export default MakeThreeContent;
