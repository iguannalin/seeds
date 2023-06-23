import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

var myrng = new Math.seedrandom('hello.');
console.log(myrng());                // Always 0.9282578795792454
console.log(myrng());                // Always 0.3752569768646784

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const ambientLight = new THREE.AmbientLight( 0xcc0099, 0.3 );
// scene.add( ambientLight );

// const pointLight = new THREE.PointLight( 0xff0000, 0.4 );
// camera.add( pointLight );
// scene.add( camera );

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x232323);
document.body.appendChild( renderer.domElement );

// ORBIT CONTROLS
// const controls = new OrbitControls(camera, renderer.domElement);

//controls.update() must be called after any manual changes to the camera's transform
// camera.position.set( 0, 20, 100 );
// controls.update();
function makePetal(x, y, z, r) {
  const pgeometry = new THREE.CircleGeometry( 5, 50, 0, 0.5 ); 
  const pmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } ); 
  const petal = new THREE.Mesh( pgeometry, pmaterial );
  petal.position.x = x;
  petal.rotateZ(r);
  petal.position.y = y;
  petal.position.z = z;
  scene.add( petal );
}

const geometry = new THREE.CircleGeometry( 5, 50 ); 
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const circle = new THREE.Mesh( geometry, material );
circle.position.z = -100;
scene.add( circle );

let petals = 10; 
let d = Math.floor(360 / petals);
for (let i = 0; i <= 360; i+=d) {
  let x = 5 * (Math.cos(i));
  let y = 5 * (Math.sin(i));
  makePetal(x, y, -100, i);
}


function animate() {
	requestAnimationFrame( animate );
  // controls.update();
	renderer.render( scene, camera );
}

animate();