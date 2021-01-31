// <script type="module">
import * as THREE from "../../../../three/build/three.module.js";
import { GLTFLoader } from "../../../../three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "../../../../three/examples/jsm/controls/OrbitControls.js";
import Stats from "../../../../three/examples/jsm/libs/stats.module.js";
//   import { GUI } from "../three/examples/jsm/libs/dat.gui.module.js";

var container, stats, controls, mixer, clock, canvas;
var camera, scene, renderer, material;
//   var xyz = 0,
//     erstes;

init();
loadModel();
animate();
//   animSwitcher();

function init() {
  container = document.getElementById("anim-div");
  canvas = document.querySelector("#c");

  // canvas = document.querySelector('canvas');
  // document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    90,
    canvas.clientWidth / canvas.clientHeight,
    0.01,
    100
  );
  camera.position.set(0, 6, 10);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe0e0e0);
  scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);

  clock = new THREE.Clock();
  // material = new THREE.Material();
  // material.side = THREE.d

  // var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
  // scene.add(ambientLight);

  // var pointLight = new THREE.PointLight(0xffffff, 0.8);
  // camera.add(pointLight);
  // scene.add(camera);

  // lights
  const hemiLight = new THREE.HemisphereLight(0xd7d7d7, 0x444444, 1);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xd1d1d1, 0.5);
  dirLight.position.set(0, 10, 10);
  scene.add(dirLight);

  // ground
  const mesh = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2000, 2000),
    new THREE.MeshPhongMaterial({ color: 0x1d1d1d, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);

  const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add(grid);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  // canvas = document.querySelector('canvas');
  // renderer.setPixelRatio(canvas.clientWidth / canvas.clientHeight);
  renderer.setPixelRatio((canvas.clientWidth / canvas.clientHeight) * 3);

  // renderer.setSize(container.innerWidth, container.innerHeight);
  // renderer.setSize(document.getElementById("anim-div").style.innerWidth, document.getElementById("anim-div").style.innerHeight);
  renderer.gammaOutput = true;
  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 6, 0);
  controls.update();

  window.addEventListener("resize", onWindowResize, false);

  // stats
  // stats = new Stats();
  // container.appendChild(stats.dom);
}

function loadModel() {
  var loader = new GLTFLoader().setPath("../ani/");
  loader.load("Fitness7.glb", function (gltf) {
    // mixer = new THREE.AnimationMixer(gltf.scene);
    // scene.traverse(function (object) {
    //   object.frustumCulled = false;
    // });
    const model = gltf.scene;
    // model.scale.set( 1, 1, 1 );
    // model.frustumCulled = false;
    scene.add(model);
  });
}

function switchAnimation(x) {
  var loader = new GLTFLoader().setPath("../ani/");
  loader.load("Fitness7.glb", function (gltf) {
    mixer = new THREE.AnimationMixer(gltf.scene);
    var action = mixer.clipAction(gltf.animations[x]);
    action.play();
    scene.add(gltf.scene);
  });
}

function onWindowResize() {
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  // renderer.setSize(container.width, container.height);
}

const button = document.getElementsByTagName("button");

button[0].addEventListener("click", () => {
  scene.remove(scene.children[4]);
  switchAnimation(0);
  button[0].style.border = "solid thin black";
  button[1].style.border = "";
  button[2].style.border = "";
});

button[1].addEventListener("click", () => {
  scene.remove(scene.children[4]);
  switchAnimation(1);
  button[1].style.border = "solid thin black";
  button[0].style.border = "";
  button[2].style.border = "";
});

button[2].addEventListener("click", () => {
  scene.remove(scene.children[4]);
  switchAnimation(2);
  button[2].style.border = "solid thin black";
  button[0].style.border = "";
  button[1].style.border = "";
});

function animate() {
  requestAnimationFrame(animate);
  var delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  renderer.render(scene, camera);
  // stats.update();
}
// </script>
