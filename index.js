import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

window.addEventListener("load", () => {
  const input = document.getElementById('prompt');
  input.oninput = onType;
  let seed;
  let petals, d;
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor(0x232323);
  document.body.appendChild( renderer.domElement );
  
    function onType(e) {
      let seedling;
      if (!e || !e.data) seedling = 0;
      else seedling = e.target.value;
      seed = new Math.seedrandom(seedling);
      petals = Math.floor(Math.min(seed() * 10, 100)); 
      d = Math.floor(360 / petals);
      scene.clear();
      // console.log(seedling, petals);
      makeFlower();
    }

  // ORBIT CONTROLS
  // const controls = new OrbitControls(camera, renderer.domElement);

  //controls.update() must be called after any manual changes to the camera's transform
  // camera.position.set( 0, 20, 100 );
  // controls.update();
  // let petals = [];
  const Group = new THREE.Group();
  let petalGroup = [];

  // function clearPetals() {
  //   petalGroup.forEach((p) => )
  // }

  function makePetal(x, y, z, r) {
    const pgeometry = new THREE.CircleGeometry( 5, 50, 0, 0.5 ); 
    const pmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } ); 
    const petal = new THREE.Mesh( pgeometry, pmaterial );
    petal.position.x = x;
    petal.rotateZ(r);
    petal.position.y = y;
    petal.position.z = z;
    petalGroup.push(petal);
    
    scene.add(petal);
  }
  
  function makeFlower() {
    const geometry = new THREE.CircleGeometry( 5, 50 ); 
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
    const circle = new THREE.Mesh( geometry, material );
    circle.position.z = -100;
    // Group.position.z = -100;
    scene.add(circle)
    
    if (!petals) return;
    for (let i = 0; i <= 360; i+=d) {
      let x = 5 * (Math.cos(i));
      let y = 5 * (Math.sin(i));
      makePetal(x, y, -100, i);
    }

    // scene.add( Group );
  }

  let angle = 0;

  function animate() {
    requestAnimationFrame( animate );
    // controls.update();
    // Group.rotateZ(angle);
    // if (angle >= 360) angle = 0;
    // else angle += d;
    petalGroup.forEach((p, a) => p.rotateZ(0.05));
    renderer.render( scene, camera );
  }

  animate();
});