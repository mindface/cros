import React, { useRef,useState,useEffect } from 'react';
import { useSelector, useStore, useDispatch } from "react-redux";
import html2canvas from "html2canvas";
import { RootStore } from "../store/modules/reducer";
import { fabric,groupSVGElements } from "fabric";

function Explanation(){
  const store = useStore();
  const dispatch = useDispatch();
  let canvas = useRef(fabric);
  const forhtml2canvas = useRef<HTMLDivElement>(null);
  const face = useRef<HTMLDivElement>(null);
  const forSvg = useRef<SVGSVGElement>(null);
  const [selctSvg,selctSvgSet] = useState<string>("");
  const [iamgeSrcOb,iamgeSrcObSet] = useState<{
    iamge01Src:string,
    iamge02Src:string,
    iamge03Src:string,
  }>({
    iamge01Src: "",
    iamge02Src: "",
    iamge03Src: "",
  });

  function canvasAction(){
    html2canvas(forhtml2canvas.current!).then(c => {
      const alink = document.createElement('a');
      alink.href = c.toDataURL("image/png");
      alink.download = "d.png";
      alink.click();
    });
  }

  function setImageUrl(e: React.ChangeEvent<HTMLInputElement>,id:number){
    const fileElement = e.target as any;
    const fileData = URL.createObjectURL(fileElement.files[0]);
    iamgeSrcObSet({...iamgeSrcOb,[`iamge0${id}Src`]:fileData});
  }

  function selectAction(name:string) {
    selctSvgSet(name);
  }

  function selectAddAction() {
    switch (selctSvg) {
      case "text":
        canvas.current.add(new fabric.IText('@@@@',
        { left: 10, top: 10, fill: '#ccc', fontFamily: 'Helvetica', lineHeight: 1.1,
          styles: {
            0: {
              0:{ textDecoration: 'underline', fontSize: 80 },
            },
            1: {
              4:{ fontSize:14 }
            }
          } }));
        break;
      case "rect":
        canvas.current.add(new fabric.Rect({ left: 110, top: 110, fill: '#ccc', width: 50, height: 50 }));
        break;
      case "circle":
        canvas.current.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
        break;
      case "path":
        canvas.current.add(new fabric.Path('M20,30 Q40,5 50,30 T90,30', {
          fill: false,
          stroke: 'red',
          strokeWidth: 3,
        }));
        break;
      case "line":
        canvas.current.add(new fabric.line([ 250, 125, 250, 175 ], {
          fill: 'red',
          stroke: 'red',
          strokeWidth: 15,
        }));
        break;
    }
  }

  const changeFileData = (e:React.ChangeEvent) => {
    const fileElement = e.target as any;
    const fileData = URL.createObjectURL(fileElement.files[0]);
    fabric.Image.fromURL(fileData, (img:any) => {
      img.set({left:30,top:10});
      canvas.current.add(img)
    });
  }

  useEffect(() => {
    canvas.current = new fabric.Canvas("for_canvas",
      {
        borderColor: 'red',
        cornerColor: 'red',
        width: face.current?.clientWidth,
        height: face.current?.clientHeight
      });
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(forSvg.current!);

    var path = fabric.loadSVGFromString(svgStr,function(objects:any, options:any) {
      var obj = fabric.util.groupSVGElements(objects, options);
      obj.scaleToHeight(canvas.current.height-10)
        .set({ left: canvas.current.width/2, top: canvas.current.height/2 })
        .setCoords();

      canvas.current.add(obj).renderAll();
    });
  },[]);

  return (
   <div className="make-image-svg">
     <div className="make-image--inner">
       <div className="make-btns pb-10">
         <button className='close boxShadow btn radius' onClick={() => canvasAction()} >canvasAction</button>
         <input type="file" name="" id="iamge01" className="d-n" onChange={(e) => {setImageUrl(e,1)}} />
         <label htmlFor="iamge01" className="label btn radius">背景画像を選択する</label>
         <div className="svg-box">
          <svg id="rect" className={selctSvg === 'rect' ? 'active svg' : 'svg'} ref={forSvg} onClick={() => selectAction("rect")} width="50" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="30" height="30" stroke="black" fill="transparent" strokeWidth="5"/>
          </svg>
          <svg id="circle" className={selctSvg === 'circle' ? 'active svg' : 'svg'}  ref={forSvg} onClick={() => selectAction("circle")} width="50" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="20" stroke="red" fill="transparent" strokeWidth="5"/>
          </svg>
          <svg id="path" className={selctSvg === 'path' ? 'active svg' : 'svg'}  ref={forSvg} onClick={() => selectAction("path")} width="90" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M20,30 Q40,5 50,30 T90,30" fill="none" stroke="blue" strokeWidth="5"/>
          </svg>
          <button className='btn' onClick={() => { selctSvgSet('text'); selectAddAction() }} >テキスト追加</button>
          <input type="file" id="add_photo" className='d-n' onChange={(e) => changeFileData(e)} />
          <label htmlFor="add_photo" className="label btn">photo add</label>
          <button className='btn' onClick={() => selectAddAction()}>add</button>
         </div>
       </div>
       <div id="html2canvas" className='html2canvas' ref={forhtml2canvas}>
        <div className="face" ref={face} >
          <canvas id="for_canvas" className='for_canvas'></canvas>
        </div>
       </div>
     </div>
   </div>
  )
}

export default Explanation;
