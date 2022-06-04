import { fabric } from "fabric";

export function selectAddAction(
  selctSvg: string,
  textColor: string,
  canvas: any
) {
  switch (selctSvg) {
    case "text":
      canvas.add(
        new fabric.IText("@@@@", {
          left: 10,
          top: 10,
          fill: textColor,
          fontFamily: "Helvetica",
          lineHeight: 1.1,
          styles: {
            0: {
              0: { textDecoration: "underline", fontSize: 80 },
            },
            1: {
              4: { fontSize: 14 },
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
