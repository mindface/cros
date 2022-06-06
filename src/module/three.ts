import * as THREE from "three";
import { WebGLRenderer } from "three";
import * as dat from "dat.gui";
import { useSelector, useStore, useDispatch } from "react-redux";
import { fabric } from "fabric";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { KMZLoader } from "three/examples/jsm/loaders/KMZLoader.js";

type Conf = {
  gridlineColor: string;
  t: string;
};

class Canvas3d {
  div: HTMLDivElement;
  closebtn: HTMLDivElement;
  renderer: any;
  config: Conf;
  meshList: any;
  group: any;
  camera: any;
  scene: any;
  raycaster: any;
  mouse: any;

  constructor(element?: HTMLCanvasElement) {
    this.div = document.createElement("div");
    this.closebtn = document.createElement("div");
    this.renderer = THREE.WebGLRenderer;
    this.meshList = [];
    this.group = new THREE.Group();
    this.scene = new THREE.Scene();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.config = {
      gridlineColor: "#ffffff",
      t: "n",
    };

    if (element === null) return;
  }

  setElement() {
    this.div = document.createElement("div");
    this.div.className = "three3d";
    this.closebtn = document.createElement("div");
    this.closebtn.className = "btn";
    this.closebtn.innerText = "close";
    this.closebtn.addEventListener("click", () => {
      this.div.remove();
    });
    this.div.appendChild(this.closebtn);
  }

  Init(element?: HTMLCanvasElement) {
    this.scene.background = new THREE.Color(this.config.gridlineColor);

    const light = new THREE.DirectionalLight(0xcccccc);
    light.position.set(0.5, 1.0, 0.5).normalize();
    this.scene.add(light);

    this.camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    this.camera.position.y = 5;
    this.camera.position.z = 10;
    this.scene.add(this.camera);

    const grid = new THREE.GridHelper(50, 50, 0xffffff, 0x333333);
    this.scene.add(grid);

    this.renderer = new THREE.WebGLRenderer({
      canvas: element,
      preserveDrawingBuffer: true,
      antialias: true,
    });
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // マウスムーブ
    // const handleMouseMove = (e:MouseEvent) => {
    //    const dom = e.target as HTMLCanvasElement;
    //    const x = e.clientX - dom.offsetLeft;
    //    const y = e.clientX - dom.offsetTop;
    //    const w = dom?.offsetWidth;
    //    const h = dom.offsetHeight;
    //    this.mouse.x = (x/w) * 2 - 1;
    //    this.mouse.y = -(x/h) * 2 + 1;
    // }
    // element?.addEventListener('mousemove',(e:MouseEvent) => handleMouseMove(e));

    // document.getElementById('threeCanvas')?.appendChild( this.renderer.domElement );

    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshPhongMaterial({
      map: new THREE.CanvasTexture(this.makeCanvas("1")),
      color: 0xcccccc,
      flatShading: true,
    });

    // const material = new THREE.MeshBasicMaterial({map: new THREE.CanvasTexture(cvs),});

    const mesh = new THREE.Mesh(geometry, material);
    this.meshList.push(mesh);

    this.scene.add(this.group);
    this.addMesh();

    const gui = new dat.GUI();
    gui.add(mesh.scale, "x", 0, 100);
    gui.add(mesh.scale, "y", 0, 100);
    gui.add(mesh.scale, "z", 0, 100);
    gui.add(this.config, "gridlineColor");
    const guiCamera = gui.addFolder("camera");
    guiCamera.add(this.camera.position, "x", 0, 100);
    guiCamera.add(this.camera.position, "y", 0, 100);
    guiCamera
      .add(this.camera.position, "z", 0, 100)
      .onChange((item: number) => {});
    document.getElementById("c-outer")?.appendChild(gui.domElement);
    gui.close();

    const render = () => {
      this.renderer.render(this.scene, this.camera);
    };
    render();

    const animate = () => {
      requestAnimationFrame(animate);
      // this.raycaster.setFromCamera(this.mouse,camera);
      render();
    };

    animate();

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.addEventListener("change", render);
    controls.update();
  }

  stateList() {
    return this.meshList;
  }

  remove(id: number) {
    this.meshList = this.meshList.map((mesh: any) => {
      if (id === mesh.id) {
        console.log(mesh);
        mesh.scale.x = 0;
        mesh.scale.y = 0;
        mesh.scale.z = 0;
      }
      return mesh;
    });
  }

  addMesh() {
    this.meshList.forEach((_mesh: any) => {
      this.group.add(_mesh);
    });
  }

  addBoxMesh(x: number, y: number, z: number) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshPhongMaterial({
      map: new THREE.CanvasTexture(this.makeCanvas(this.meshList.length + 1)),
      color: 0xff0000,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    this.meshList.push(mesh);
    this.addMesh();
  }

  makeCanvas(number: string): HTMLCanvasElement {
    const cvs = document.createElement("canvas");
    const ctx = cvs.getContext("2d") as CanvasRenderingContext2D;
    cvs.width = 220;
    cvs.height = 120;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "#333";
    ctx.font = "28px serif";
    ctx.fillText(`No ${number}`, 10, 50);
    return cvs;
  }

  addImage() {
    const ca = document.getElementById("threeCanvas") as HTMLCanvasElement;
    ca.getContext("webgl2", { antialias: true, preserveDrawingBuffer: true });
    ca?.toBlob(async function (blob: any) {
      const newImg = document.createElement("img");
      newImg.onload = function () {
        URL.revokeObjectURL(url);
      };
      const url = URL.createObjectURL(blob);
      newImg.src = url;
      newImg.id = "new-img";
      document.body.appendChild(newImg);
      const alink = document.createElement("a");
      alink.href = url;
      alink.download = "dd.png";
      alink.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }
}

export default Canvas3d;
