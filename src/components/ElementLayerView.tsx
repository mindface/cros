import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { fabric } from "fabric";

type Props = {
  layerId: number;
  viewSwitch: boolean;
};

function ElementLayyer(props: Props) {
  let [canvas, canvasSet] = useState(fabric);
  const forhtml2canvas = useRef<HTMLDivElement>(null);
  const face = useRef<HTMLDivElement>(null);
  const textColor = useRef<string>("#0000ff");
  const [selectSvg, selectSvgSet] = useState<string>("");
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
    html2canvas(forhtml2canvas.current!).then((c) => {
      const alink = document.createElement("a");
      alink.href = c.toDataURL("image/png");
      alink.download = "d.png";
      alink.click();
    });
  }

  function setImageUrl(e: React.ChangeEvent<HTMLInputElement>, id: number) {
    const fileElement = e.target as any;
    const fileData = URL.createObjectURL(fileElement.files[0]);
    iamgeSrcObSet({ ...iamgeSrcOb, [`iamge0${id}Src`]: fileData });
  }

  function selectColorAction(e: React.ChangeEvent<HTMLInputElement>) {
    textColor.current = e.target.value;
  }

  function objDeleteAction() {
    let acitveObjcts = canvas.getActiveObjects();
    canvas.getActiveObjects([]);
    if (acitveObjcts !== null) {
      acitveObjcts.forEach((object: any) => {
        canvas.remove(object);
      });
    }
  }

  function selectAddAction() {
    switch (selectSvg) {
      case "text":
        canvas.add(
          new fabric.IText("テキスト", {
            left: 80,
            top: 80,
            fill: textColor.current,
            fontFamily: "Helvetica",
            lineHeight: 1.1,
            styles: {
              0: {
                0: { textDecoration: "underline", fontSize: 80 },
              },
              1: {
                // 4: { fontSize: 14 },
              },
            },
          })
        );
        break;
      case "rect":
        canvas.add(
          new fabric.Rect({
            left: 110,
            top: 110,
            fill: "#ccc",
            width: 50,
            height: 50,
          })
        );
        break;
      case "circle":
        canvas.add(
          new fabric.Circle({ radius: 30, fill: "#f55", top: 100, left: 100 })
        );
        break;
      case "path":
        canvas.add(
          new fabric.Path("M20,30 Q40,5 50,30 T90,30", {
            fill: false,
            stroke: "red",
            strokeWidth: 3,
          })
        );
        break;
      case "line":
        canvas.add(
          new fabric.line([250, 125, 250, 175], {
            fill: "red",
            stroke: "red",
            strokeWidth: 15,
          })
        );
        break;
    }
  }

  const changeFileData = (e: React.ChangeEvent) => {
    const fileElement = e.target as any;
    const fileData = URL.createObjectURL(fileElement.files[0]);
    new fabric.StaticCanvas(`for_canvas${props.layerId}`, {
      width: face.current?.clientWidth,
      height: face.current?.clientHeight,
    });
    fabric.Canvas.prototype.toCanvasElement = `for_canvas${props.layerId}`;
    new fabric.Image.fromURL(fileData, (img: any) => {
      img.set((e: any) => {
        console.log(e.canvas);
        return { left: 30, top: 10 };
      });
      console.log(fabric.Canvas.prototype);
      canvas.add(img);
      canvas.renderAll();
    });
  };

  useEffect(() => {
    fabric.Object.prototype.transparentCorners = false;

    fabric.Object.prototype.cornerColor = "rgb(0,0,0)";
    fabric.Object.prototype.cornerStrokeColor = "rgb(0,0,0)";
    console.log(props.layerId);
    canvasSet(
      new fabric.Canvas(`for_canvas${props.layerId}`, {
        width: face.current?.clientWidth,
        height: face.current?.clientHeight,
      })
    );
  }, [props.layerId]);

  return (
    <div
      className={props.viewSwitch ? "element-layer" : "element-layer noview"}
    >
      <div className="make-btns pb-10">
        <button
          className="close boxShadow btn radius"
          onClick={() => canvasAction()}
        >
          canvasAction
        </button>
        <div className="svg-box">
          <button
            className="btn"
            onClick={() => {
              selectSvgSet("text");
              selectAddAction();
            }}
          >
            テキスト追加
          </button>
          <input
            type="file"
            id="add_photo"
            className="d-n"
            onChange={(e) => changeFileData(e)}
          />
          <label className="btn">
            テキスト色を選択{" "}
            <input
              type="color"
              value="#0000ff"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                selectColorAction(e)
              }
            />
          </label>
          <label htmlFor="add_photo" className="label btn">
            photo add
          </label>
          <button className="btn" onClick={() => objDeleteAction()}>
            select delete
          </button>
        </div>
      </div>
      <div className="face" ref={face}>
        <canvas
          id={`for_canvas${props.layerId}`}
          className="for_canvas"
        ></canvas>
      </div>
    </div>
  );
}

export default ElementLayyer;
