// Helpers
const radians = (degrees) => {
  return (degrees * Math.PI) / 90;
};

const distance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

const map = (value, start1, stop1, start2, stop2) => {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

// Box
class LilBox {
  constructor() {
    this.geom = new THREE.BoxBufferGeometry(0.4, 0.4, 0.4); //box size
    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = 0;
  }
}
class Box extends LilBox {
  constructor() {
    super(new LilBox());
    this.rotationX = radians(-45);
    this.rotationY = radians(45);
  }
}

// Setting up the 3D world
class App {
  setup() {
    // handles mouse coordinates mapping from 2D canvas to 3D world
    this.gutter = { size: 0.01 };
    this.meshes = [];
    this.grid = { cols: 60, rows: 20 };
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.mouse3D = new THREE.Vector2();
    this.geometries = [new Box()];

    this.raycaster = new THREE.Raycaster();

    // window.addEventListener('mousemove', this.onMouseMove.bind(this), { passive: true });

    // we call this to simulate the initial position of the mouse cursor
    // this.onMouseMove({ clientX: 0, clientY: 0 });
  }

  // Mouse Move handler
  // onMouseMove({ clientX, clientY }) {
  //   this.mouse3D.x = (clientX / this.width) * 2 - 1;
  //   this.mouse3D.y = -(clientY / this.height) * 2 + 1;
  // }

  // Creating our 3D scene
  createScene() {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.shadowMap.enabled = false; // true to add shadows
    // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(this.renderer.domElement);
  }

  // Camera
  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      13,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // set the distance our camera will have from the grid
    this.camera.position.set(0, 65, 0);

    // we rotate our camera so we can get a view from the top
    this.camera.rotation.x = -1.57;

    this.scene.add(this.camera);
  }

  // Random objects helper
  getRandomGeometry() {
    return this.geometries[
      Math.floor(Math.random() * Math.floor(this.geometries.length))
    ];
  }

  // Create Mesh helper
  getMesh(geometry, material) {
    const mesh = new THREE.Mesh(geometry, material);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    return mesh;
  }

  // Grid
  createGrid() {
    // create a basic 3D object to be used as a container for our grid elements so we can move all of them together
    this.groupMesh = new THREE.Object3D();

    const meshParams = {
      color: "#363636", // Cube color
      metalness: 0.58,
      emissive: "#363636",
      roughness: 0.28,
    };

    // we create our material outside the loop to keep it more performant
    const material = new THREE.MeshPhysicalMaterial(meshParams);

    for (let row = 0; row < this.grid.rows; row++) {
      this.meshes[row] = [];

      for (let col = 0; col < this.grid.cols; col++) {
        const geometry = this.getRandomGeometry();
        const mesh = this.getMesh(geometry.geom, material);

        mesh.position.set(
          col + col * this.gutter.size,
          0,
          row + row * this.gutter.size
        );
        mesh.rotation.x = geometry.rotationX;
        mesh.rotation.y = geometry.rotationY;
        mesh.rotation.z = geometry.rotationZ;

        // store the initial rotation values of each element so we can animate back
        mesh.initialRotation = {
          x: mesh.rotation.x,
          y: mesh.rotation.y,
          z: mesh.rotation.z,
        };

        this.groupMesh.add(mesh);

        // store the element inside our array so we can get back when need to animate
        this.meshes[row][col] = mesh;
      }
    }

    //center on the X and Z our group mesh containing all the grid elements
    const centerX =
      (this.grid.cols - 1 + (this.grid.cols - 1) * this.gutter.size) * 0.5;
    const centerZ =
      (this.grid.rows - 1 + (this.grid.rows - 1) * this.gutter.size) * 0.5;
    this.groupMesh.position.set(-centerX, 0, -centerZ);

    this.scene.add(this.groupMesh);
  }

  // Ambient Light
  addAmbientLight() {
    const light = new THREE.AmbientLight("#363636", 1);

    this.scene.add(light);
  }

  // Spot Light
  addSpotLight() {
    const ligh = new THREE.SpotLight("#fecc06", 1, 10);

    ligh.position.set(0, 27, 0);
    ligh.castShadow = true;

    this.scene.add(ligh);
  }

  // RectArea Light
  addRectLight() {
    const light = new THREE.RectAreaLight("#fecc06", 1, 2000, 2000);

    light.position.set(5, 50, 50);
    light.lookAt(0, 0, 0);

    this.scene.add(light);
  }

  // Point Lights
  addPointLight(color, position) {
    const light = new THREE.PointLight("#fecc06", 1, 1000, 1);

    light.position.set(position.x, position.y, position.z);

    this.scene.add(light);
  }

  //Shadow Floor
  addFloor() {
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.ShadowMaterial({ opacity: 0.3 });

    this.floor = new THREE.Mesh(geometry, material);
    this.floor.position.y = 0;
    this.floor.receiveShadow = false;
    this.floor.rotateX(-Math.PI / 2);

    this.scene.add(this.floor);
  }

  // Draw / Animate Elements
  draw() {
    // maps our mouse coordinates from the camera perspective
    this.raycaster.setFromCamera(this.mouse3D, this.camera);

    // checks if our mouse coordinates intersect with our floor shape
    const intersects = this.raycaster.intersectObjects([this.floor]);

    if (intersects.length) {
      // get the x and z positions of the intersection
      const { x, z } = intersects[0].point;

      for (let row = 0; row < this.grid.rows; row++) {
        for (let col = 0; col < this.grid.cols; col++) {
          // extract out mesh base on the grid location
          const mesh = this.meshes[row][col];

          // calculate the distance from the intersection down to the grid element
          const mouseDistance = distance(
            x,
            z,
            mesh.position.x + this.groupMesh.position.x,
            mesh.position.z + this.groupMesh.position.z
          );

          // based on the distance we map the value to our min max Y position
          // it works similar to a radius range

          const maxPositionY = 21;
          const minPositionY = 0;
          const startDistance = 6;
          const endDistance = 0;
          const y = map(
            mouseDistance,
            startDistance,
            endDistance,
            minPositionY,
            maxPositionY
          );

          // based on the y position we animate the mesh.position.y
          // we don??t go below position y of 1
          TweenMax.to(mesh.position, 0.4, { y: y < 1 ? 1 : y });

          // create a scale factor based on the mesh.position.y
          const scaleFactor = mesh.position.y / 8.5;

          // to keep our scale to a minimum size of 1 we check if the scaleFactor is below 1
          const scale = scaleFactor < 1 ? 1 : scaleFactor;

          // animates the mesh scale properties
          TweenMax.to(mesh.scale, 0.4, {
            ease: Back.easeOut.config(1.7),
            x: scale,
            y: scale,
            z: scale,
          });

          // rotate our element
          TweenMax.to(mesh.rotation, 0.7, {
            ease: Back.easeOut.config(1.7),
            x: map(mesh.position.y, -1, 1, radians(45), mesh.initialRotation.x),
            z: map(
              mesh.position.y,
              -1,
              1,
              radians(-90),
              mesh.initialRotation.z
            ),
            y: map(mesh.position.y, -1, 1, radians(90), mesh.initialRotation.y),
          });
        }
      }
    }
  }

  init() {
    this.setup();
    this.createScene();
    this.createCamera();
    this.createGrid();
    this.addFloor();
    this.addAmbientLight();
    this.addSpotLight();
    this.addPointLight(0x7f7f7f, {
      x: 0,
      y: 10,
      z: -100,
    });
    this.addPointLight(0x7f7f7f, {
      x: 100,
      y: 10,
      z: 0,
    });
    this.addPointLight(0x7f7f7f, {
      x: 20,
      y: 5,
      z: 20,
    });
    this.animate();

    window.addEventListener("resize", this.onResize.bind(this));

    window.addEventListener("mousemove", this.onMouseMove.bind(this), false);

    this.onMouseMove({
      clientX: 0,
      clientY: 0,
    });
  }

  onMouseMove({ clientX, clientY }) {
    this.mouse3D.x = (clientX / this.width) * 2 - 1;
    this.mouse3D.y = -(clientY / this.height) * 2 + 1;
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  animate() {
    this.draw();

    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.animate.bind(this));
  }
}
window.onload = () => {
  new App().init();
};

// Based on codrops tut: https://tympanus.net/codrops/2018/12/06/interactive-repulsion-effect-with-three-js/ and with a little help from https://codepen.io/xdesro/pen/daXQeP
