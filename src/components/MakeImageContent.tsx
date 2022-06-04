import React, { useRef, useState } from "react";
import { useSelector, useStore, useDispatch } from "react-redux";
import html2canvas from "html2canvas";
import { RootStore } from "../store/modules/reducer";
import Contents01 from "../pages/parts/Contents01";

function MakeImageContent() {
  const store = useStore();
  const dispatch = useDispatch();
  const forhtml2canvas = useRef<HTMLDivElement>(null);
  const [iamgeSrcOb, iamgeSrcObSet] = useState<{
    iamge01Src: string;
    iamge02Src: string;
    iamge03Src: string;
  }>({
    iamge01Src: "",
    iamge02Src: "",
    iamge03Src: "",
  });

  function canvasAction() {
    html2canvas(forhtml2canvas.current!).then((canvas) => {
      const alink = document.createElement("a");
      alink.href = canvas.toDataURL("image/png");
      alink.download = "d.png";
      alink.click();
    });
  }

  function setImageUrl(e: React.ChangeEvent<HTMLInputElement>, id: number) {
    const fileElement = e.target as any;
    const fileData = URL.createObjectURL(fileElement.files[0]);
    iamgeSrcObSet({ ...iamgeSrcOb, [`iamge0${id}Src`]: fileData });
  }

  return (
    <div className="make-image">
      <div className="make-image--inner">
        <div className="make-btns pb-10">
          <button
            className="close boxShadow btn radius"
            onClick={() => canvasAction()}
          >
            canvasAction
          </button>
          <input
            type="file"
            name=""
            id="iamge01"
            className="d-n"
            onChange={(e) => {
              setImageUrl(e, 1);
            }}
          />
          <label htmlFor="iamge01" className="label btn radius">
            背景画像を選択する
          </label>
        </div>
        <div id="html2canvas" className="html2canvas" ref={forhtml2canvas}>
          {iamgeSrcOb.iamge01Src !== "" && (
            <img src={iamgeSrcOb.iamge01Src} className="bg-img" alt="" />
          )}
          <div className="face">
            <h3 className="title">MakeImageContent</h3>
            <div className="items d-f">
              <div className="item">
                <div
                  className="text"
                  contentEditable={true}
                  suppressContentEditableWarning
                >
                  調整への構成
                </div>
              </div>
              <input
                type="file"
                name=""
                id="iamge02"
                className="d-n"
                onChange={(e) => {
                  setImageUrl(e, 2);
                }}
              />
              <div className="item">
                <div className="img-box min-img">
                  {iamgeSrcOb.iamge02Src !== "" ? (
                    <img src={iamgeSrcOb.iamge02Src} className="img" alt="" />
                  ) : (
                    <label htmlFor="iamge02" className="label">
                      画像を選択
                    </label>
                  )}
                </div>
              </div>
            </div>
            <div className="items d-f reverce">
              <div className="item">
                <div
                  className="text"
                  contentEditable={true}
                  suppressContentEditableWarning
                >
                  画像とデザインの作成を
                </div>
              </div>
              <div className="item">
                <input
                  type="file"
                  name=""
                  id="iamge03"
                  className="d-n"
                  onChange={(e) => {
                    setImageUrl(e, 3);
                  }}
                />
                <div className="img-box base-img">
                  {iamgeSrcOb.iamge03Src !== "" ? (
                    <img src={iamgeSrcOb.iamge03Src} className="img" alt="" />
                  ) : (
                    <label htmlFor="iamge03" className="label">
                      画像を選択
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeImageContent;
