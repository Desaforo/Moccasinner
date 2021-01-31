import * as THREE from "../../../three/build/three.module.js";
import { GLTFLoader } from "../../../three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "../../../three/examples/jsm/controls/OrbitControls.js";

var container, controls, mixer, clock, canvas;
var camera, scene, renderer, model;

setup();
loadModel();
letsGo();

function setup() {
  container = document.getElementById("anim-div");
  canvas = document.querySelector("#c");

  //Camera
  camera = new THREE.PerspectiveCamera(
    90,
    canvas.clientWidth / canvas.clientHeight,
    0.01,
    100
  );
  camera.position.set(-8, 6, 8);

  //Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcbe6de);

  //Clock
  clock = new THREE.Clock();

  // lights
  const hemiLight = new THREE.HemisphereLight(0xd7d7d7, 0x444444, 0.7);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(0, 10, 10);
  scene.add(dirLight);

  // ground
  const mesh = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2000, 2000),
    new THREE.MeshStandardMaterial({ color: 0x113d3c, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);

  //Grid
  const grid = new THREE.GridHelper(400, 150, 0x06171e, 0x06171e);
  grid.material.opacity = 0.35;
  grid.material.transparent = true;
  scene.add(grid);

  //Renderer
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio((canvas.clientWidth / canvas.clientHeight) * 3);
  renderer.gammaOutput = true;
  container.appendChild(canvas);

  //Controls
  controls = new OrbitControls(camera, canvas);
  controls.minPolarAngle = Math.PI * 0.25;
  controls.maxPolarAngle = Math.PI * 0.75;
  controls.target.set(0, 4, 0);
  controls.update();

  //Resize function
  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}

//Load 3D Model
function loadModel() {
  var loader = new GLTFLoader().setPath("../animation/");
  loader.load("Fitness.glb", function (gltf) {
    model = gltf.scene;
    scene.add(model);
    model.traverse(function(object){object.frustumCulled = false;});
  });
}

//Render Scene
function letsGo() {
  requestAnimationFrame(letsGo);
  var delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  renderer.render(scene, camera);
}

//Switch Animation function
function switchAnimation(x) {
  var loader = new GLTFLoader().setPath("../animation/");
  loader.load("Fitness.glb", function (gltf) {
    model = gltf.scene;
    scene.add(model);
    model.traverse(function(object){object.frustumCulled = false;});
    mixer = new THREE.AnimationMixer(model);
    var action = mixer.clipAction(gltf.animations[x]);
    action.play();
  });
}

//Stich Exercise function
function switchEx(anim, header, text) {
  scene.remove(scene.children[4]);
  switchAnimation(anim);
  document.getElementById("nameUe").innerHTML = header;
  document.getElementById("handlung").innerHTML = text;
}

//Get all Buttons
const button = document.getElementsByClassName("exer");

//Switch all
for (let i = 0; i < button.length; i++) {
  button[i].addEventListener("click", () => {
    if (button[i].innerHTML === "Bizeps-Curls") {
      switchEx(3, headerBizepsCurls, textBizepsCurls);
    }
    if (button[i].innerHTML === "Breiter Armstütz") {
      switchEx(4, headerBreiteArmstuetz, textBreiteArmstuetz);
    }
    if (button[i].innerHTML === "Käfer") {
      switchEx(5, headerKaefer, textKaefer);
    }
    if (button[i].innerHTML === "Klappmesser") {
      switchEx(7, headerKlappmesser, textKlappmesser);
    }
    if (button[i].innerHTML === "Situps") {
      switchEx(6, headerSitups, textSitups);
    }
    if (button[i].innerHTML === "Beckenheben") {
      switchEx(8, headerBeckenheben, textBeckenheben);
    }
    if (button[i].innerHTML === "Kniebeugen") {
      switchEx(1, headerKniebeuge, textKniebeuge);
    }
    if (button[i].innerHTML === "Liegestützen") {
      switchEx(2, headerLiegestuetze, textLiegestuetzen);
    }
    if (button[i].innerHTML === "Superman") {
      switchEx(9, headerSuperman, textSuperman);
    }
    if (button[i].innerHTML === "Abduktoren-Beinheben") {
      switchEx(10, headerAbduktoren, textAbduktoren);
    }
  });
}

//Texts for Exercise
var headerBizepsCurls = "Bizeps-Curls";
var textBizepsCurls =
  "<ol><li>Nehme die Kurzhanteln auf. Dabei hältst du in jeder Hand eine Hantel im Untergriff.</li><li>Stelle dich aufrecht in den hüftbreiten Stand.</li><li>Rolle deine Schultern nach hinten.</li><li>Fixiere deine Ellenbogen bei gestreckten Armen seitlich vorne am Körper.</li></ol>";

var headerBreiteArmstuetz = "Breiter Armstütz";
var textBreiteArmstuetz =
  "<ol><li>Lege dich mit der Vorderseite deines Körpers flach auch den Boden.</li><li>Breite die Arme zu den Seiten aus.</li><p>In den Armen hast du eine leichte Beugung, so dass die Oberarme in etwa parallel zum Boden sind. Füße sind auf die Zehen gestellt und zusammen.</p><li>Drücke dich nun mit den Armen vom Boden ab.</li><li>Halte die Position anschließend solange wie möglich.</li><li>Kehre zur Ausgangsposition zurück und mache eine kurze Pause.</li><p>Wiederhole die Schritte 1-4 erneut.</p></ol>";

var headerKaefer = "Käfer";
var textKaefer =
"<ol><li>Lege dich auf den Rücken und strecke die Beine gerade nach unten aus.</li><p>Die Arme werden angewinkelt und die Finger der Hände berühren die linke und rechte Seite deines Hinterkopfes.</p><p>Die Ellenbogen zeigen dabei nach rechts und links und zwar so, dass beide Oberarme eine gedachte Linie durch den Oberkörper bilden.</p><li>Jetzt hebst du die gestreckten Beine leicht vom Boden ab.</li><li>Hebe die Schulterblätter vom Boden ab und führe rechte (linke) Brustpartie in Richtung des linken (rechten) Knies, indem du den Oberkörper krümmst (engl. to crunch).</li><li>Zeitgleich winkelst du das linke (rechte) Bein an und führst das Knie in Richtung der rechten (linken) Brustpartie.</li><li>Im Anschluss atmest du ein und senkst gleichzeitig deinen Oberkörper wieder nach hinten ab und streckst dein angewinkeltes Bein wieder nach vorne aus.</li><li>Danach absolvierst du diese Ausführung mit dem jeweils anderen Bein und der jeweils anderen Brustpartie.</li></ol>";

var headerKlappmesser = "Klappmesser";
var textKlappmesser =
  "<ol><li>Setze dich auf deinen Hintern, winkle deine Beine an und hebe sie vom Boden ab.</li><li>Nun kannst du sie ausstrecken und in einem Winkel von etwa 45 Grad zum Boden halten.</li><p>Dein Oberkörper ist nach hinten geneigt und dein Rücken ist gerade.</p><p>Vermeide einen Rundrücken!</p><li>Strecke nun die Arme nach vorne aus.</li><li>Führe deine Hände und deine Knöchel zusammen, indem du die Beine anhebst und zeitgleich den Oberkörper aufrichtest.</li><p>Es ist nicht notwendig, die Knöchel tatsächlich zu berühren.</p><li>Anschließend kehrst du mit einer kontrollierten Bewegung wieder in die Ausgangsposition zurück.</li></ol>";

var headerSitups = "Situps";
var textSitups =
  "<ol><li>Lege dich mit dem Rücken auf den Boden und stelle die Beine etwa fußbreit voneinander entfernt und leicht angewinkelt vor dir auf.</li><p>Die Arme streckst du gerade am Körper nach unten.</p><p>Die Hände berühren die seitliche Gesäßmuskulatur oder den oberen Teil des seitlichen Oberschenkels.</p><li>Zuerst bewegst du die Brust in Richtung der Knie, dann drückst du den Bauch in Richtung der Oberschenkel, bis der Oberkörper senkrecht zum Boden steht.</li><p>Gleichzeitig atmest du aus.</p><li>Die Arme führst während der Aufwärtsbewegung an den Oberschenkeln nach oben.</li><li>Danach senkst du den geraden Oberkörper wieder langsam nach hinten und krümmst ihn wieder, um deinen Oberkörper sanft auf dem Boden zu bringen.</li><p>Zeitgleich solltest du einatmen.</p></ol>";

var headerBeckenheben = "Beckenheben";
var textBeckenheben =
  "<ol><li>Lege dich mit dem Rücken auf den Boden und winkle deine Beine an, sodass deine Füße mit den Fußsohlen auf dem Boden oder der Matte stehen.</li><p>Deine Arme legst du neben den Körper, dies garantiert dir mehr Stabilität des Oberkörpers während der Übung.</p><li>Jetzt atmest du aus und hebst gleichzeitig das Becken nach oben an, bis Oberschenkel und Oberkörper eine gerade Linie bilden.</li><p>Um mehr Intensität zu erzeugen, kannst du diese „Brücken“-Position für einige Sekunden halten.</p><li>Anschließend senkst du das Becken wieder langsam nach unten bis fast auf den Boden oder die Matte ab.</li><p>Während du dies tust, atmest du ein.</p></ol>";

var headerKniebeuge = "Kniebeugen";
var textKniebeuge =
  "<ol><li>Stellen Sie sich mit den Beinen etwa schulterbreit aufrecht hin.</li><li>Verschränken Sie die Hände hinter dem Kopf.</li><li>Schieben Sie Ihre Hüfte nach hinten und beugen Sie Ihre Knie.</li><li>Halten Sie den unteren Rücken gerade und senken Sie Ihren Körper so tief Sie können.</li><p>Die Füße halten stets Bodenkontakt!</p><li>Wieder hoch, wenn die Oberschenkel sich in der Waagerechten befinden.</li></ol>";

var headerLiegestuetze = "Liegestzützen";
var textLiegestuetzen =
  "<ol><li>Ausgangsposition des Liegestützes ist die Bauchlage, der Körper ist gestreckt.</li><p>Die Hände befinden sich etwas über schulterbreit voneinander entfernt am Boden.</p><p>Die Finger zeigen nach vorne, die Daumen nach innen.</p><li>Durch gleichzeitiges Anspannen der Arme werden diese gestreckt und der Oberkörper hebt vom Boden ab.</li><p>Das Gewicht wird gleichmäßig auf Zehenspitzen und Händen verteilt.</p><p>Kopf, Hals, Wirbelsäule, Gesäß und Knie bilden eine Linie und die Bauchmuskulatur ist angespannt.</p><li>Nun werden beide Arme gleichzeitig gebeugt und der Oberkörper somit abgesenkt, bis die Nasenspitze fast den Boden berührt.</li><p>Der Körper bleibt dabei gestreckt.</p></ol>";

var headerSuperman = "Superman";
var textSuperman =
  "<ol><li>Hebe deinen rechten Arm und dein linkes Bein ausgestreckt so weit wie möglich nach oben an.</li><p>Halte die Spannung am höchsten Punkt für einige Sekunden und senke Arm und Bein anschließend wieder nach unten ab.</p><li>Dann wiederholst du die Übung mit dem anderen Arm und Bein.</li><li>Hebe gleichzeitig beide ausgestreckte Arme so weit wie möglich nach oben an.</li><p>Am höchsten Punkt hältst du die Spannung für ein paar Sekunden.</p><li>Dann senkst du die Arme wieder langsam nach unten ab.</li><li>Jetzt hebst du nur beide Beine gleichzeitig vom Boden ab, während deine ausgestreckten Arme weiterhin Kontakt mit dem Boden haben.</li><p>Wenn die Beine den höchstmöglichen Punkt erreicht haben, hältst du die Spannung für einen kurzen Moment, ehe du beide Beine wieder nach unten absenkst.</p><li>Hebe zeitgleich beide Arme und beide Beine im ausgestreckten Zustand nach oben an.</li><p>Am höchsten Punkt hältst du die Spannung der Gliedmaße für einige Zeit.</p><li>Anschließend senkst du Arme und Beine wieder zum Boden ab.</li></ol>";

var headerAbduktoren = "Abduktoren-Beinheben";
var textAbduktoren =
  "<ol><li>Lege dich auf eine Seite deines Körpers und positioniere die Hand der oben liegenden Seite an deiner Hüfte.</li><p>Der untere Arm wird entweder angewinkelt und unter den Kopf gelegt (wie im Video), oder stützt mit dem Unterarm den Oberkörper ab.</p><li>Winkel das unten liegende Bein du zur Stabilität nun leicht an, um eine stabilere Position in der Seitlage einzunehmen.</li><li>Das oben liegende Bein streckst du komplett aus und ziehst die Fußspitzen an.</li><li>Jetzt atmest du aus und hebst gleichzeitig das ausgestreckte Bein langsam so weit wie möglich nach oben.</li><p>Halte die Spannung im höchsten Punkt für einen Moment.</p></ol>";
