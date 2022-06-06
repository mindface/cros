import React, { useRef, useState, useEffect } from "react";
import { useSelector, useStore, useDispatch } from "react-redux";
import { fabric } from "fabric";
import Canvas3d from "../module/three";
let c3d = new Canvas3d();

type Item = {
  index: number;
  id: number;
};
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
  let [deleteListThree, deleteListThreeSet] = useState<number[]>([]);
  let [deleteThreeId, deleteThreeIdSet] = useState<number>(0);
  let threeCanvas = useRef<HTMLCanvasElement>(null);

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
            <p className="slider p-5">
              <button
                className="close boxShadow btn radius"
                onClick={() => addThree()}
              >
                add box
              </button>
            </p>
            <div className="delete-select d-f">
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
              <p className="p-5">
                <button
                  className="close boxShadow btn radius"
                  onClick={() => deleteThreeBox()}
                >
                  delete box
                </button>
              </p>
            </div>
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
