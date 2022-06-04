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
  scene: any;

  constructor(element?: HTMLCanvasElement) {
    this.div = document.createElement("div");
    this.closebtn = document.createElement("div");
    this.renderer = THREE.WebGLRenderer;
    this.meshList = [];
    this.group = new THREE.Group();
    this.scene = new THREE.Scene();

    this.config = {
      gridlineColor: "0xCCCCCC",
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

    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    camera.position.y = 5;
    camera.position.z = 10;
    this.scene.add(camera);

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

    // document.getElementById('threeCanvas')?.appendChild( this.renderer.domElement );

    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshPhongMaterial({
      color: 0xcccccc,
      flatShading: true,
    });

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
    guiCamera.add(camera.position, "x", 0, 100);
    guiCamera.add(camera.position, "y", 0, 100);
    guiCamera.add(camera.position, "z", 0, 100).onChange((item: number) => {});

    document.getElementById("c-outer")?.appendChild(gui.domElement);

    gui.close();

    const render = () => {
      this.renderer.render(this.scene, camera);
    };
    render();

    const animate = () => {
      requestAnimationFrame(animate);

      render();
    };

    animate();

    const controls = new OrbitControls(camera, this.renderer.domElement);
    controls.addEventListener("change", render);
    controls.update();
  }

  remove() {
    this.div.remove();
  }

  addMesh() {
    this.meshList.forEach((_mesh: any) => {
      this.group.add(_mesh);
    });
  }

  addBoxMesh(x: number, y: number, z: number) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    this.meshList.push(mesh);
    this.addMesh();
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
