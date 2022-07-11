import React, { useRef, useState, useEffect } from "react";
import Canvas3d from "../module/three";
import ElementLayyer from "./ElementLayer";

let c3d = new Canvas3d();
type Item = {
  index: number;
  id: number;
};
type Layer = { id: number; view: boolean };
type List = Item[];

function MakeThreeContent() {
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

  const setImageData = async () => {
    if (threeCanvas.current) {
      const _canvasElement = document.createElement("canvas");
      const _ctx = _canvasElement.getContext("2d");
      const element = threeCanvas.current;
      const ctx = element.getContext("2d");

      _canvasElement.width = element.clientWidth;
      _canvasElement.height = element.clientHeight;

      const setCanvasImage = (canvasElement: HTMLCanvasElement) => {
        return new Promise<any>((resole, reject) => {
          const newImage = new Image();
          const ctx2 = canvasElement.getContext("2d");
          newImage.onload = () => resole(newImage);
          newImage.onerror = (e) => reject(e);
          newImage.src = canvasElement.toDataURL()!;
        });
      };
      const setimage = await setCanvasImage(element);
      _ctx?.drawImage(
        setimage,
        0,
        0,
        element.clientWidth,
        element.clientHeight
      );

      layerList.map(async (item: Layer) => {
        const setCanvas = document.getElementById(
          `for_canvas${item.id}`
        ) as HTMLCanvasElement;
        const setimage = await setCanvasImage(setCanvas);
        _ctx?.drawImage(
          setimage,
          0,
          0,
          element.clientWidth,
          element.clientHeight
        );
      });

      setTimeout(() => {
        const alink = document.createElement("a");
        alink.href = _canvasElement.toDataURL();
        alink.download = "dd.png";
        alink.click();
      }, layerList.length * 600);
    }
  };

  // const threeImageData = () => {
  //   const alink = document.createElement("a");
  //   if (threeCanvas.current) {
  //     alink.href = setImageData() as string;
  //     alink.download = "d.png";
  //     alink.click();
  //   }
  //   c3d.addImage();
  // };

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
              onClick={() => setImageData()}
            >
              image down load
            </button>
            <button className="px-4 py-2 font-semibold text-sm bg-white text-slate-700 border border-slate-300 rounded-md shadow-sm outline outline-2 outline-offset-2 outline-indigo-500 dark:bg-slate-700 dark:text-slate-200 dark:border-transparent shadow-cyan-500/50">
              Subscribe
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
          {layerList.length !== 0 && (
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
          )}
          <canvas id="threeCanvas" ref={threeCanvas}></canvas>
        </div>
      </div>
    </div>
  );
}

export default MakeThreeContent;
