import './style.css';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Debugger
 */
const gui = new dat.GUI();

/**
 * Canvas
 */

const canvas = document.getElementById('main-scene') as HTMLElement;

/**
 * Material
 */
const parameters = {
  color: '#ff0000',
  camera: { z: 1 },
};

const material = new THREE.MeshBasicMaterial({
  color: parameters.color,
});

gui.addColor(parameters, 'color').onChange(() => material.color.set(parameters.color));

/**
 * Geometry
 */

const mesh = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.2, 16, 60), material);

/**
 * Lights
 */

const directionalLight = new THREE.DirectionalLight('#FFFFFF', 0.5);
directionalLight.position.set(1, 1, 0);

/**
 * Camera
 */

parameters.camera = {
  z: 6,
};

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = parameters.camera.z;
gui.add(parameters.camera, 'z').min(1).max(100).step(0.5)
  .name('Camera Z')
  .onChange(() => {
    camera.position.z = parameters.camera.z;
  });

/**
 * Scene
 */

const scene = new THREE.Scene();
scene.add(camera, directionalLight, mesh);

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas);

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
  canvas,
  // change to true for transparent canvas when working with HTML
  alpha: false,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Event Listeners
 */
window.addEventListener('resize', () => {
  // Update camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/**
 * Tick
 */

const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  mesh.rotation.x += deltaTime * 0.4;
  mesh.rotation.y += deltaTime * 0.3;

  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
