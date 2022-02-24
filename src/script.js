import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Debug
const gui = new dat.GUI();

// Loading
const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load("/textures/NormalMap.png");

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(0.05, 64, 32);
const tableGeometry = new THREE.BoxGeometry(6, 2.4, .1);
const netGeometry = new THREE.PlaneGeometry(.52, .1, 30, 5)

// Materials

const material = new THREE.MeshStandardMaterial();
material.normalMap = normalTexture;
material.color = new THREE.Color(0xffffff);

const tableMaterial = new THREE.MeshMatcapMaterial({ color: 0x3a3a69 });
const netMaterial = new THREE.MeshNormalMaterial({wireframe: true})

// Mesh
const sphere = new THREE.Mesh(geometry, material);
sphere.position.x = -3;
sphere.position.y = .35;
const table = new THREE.Mesh(tableGeometry, tableMaterial);
table.position.y = -0.5;
table.rotation.x = -1;
const net = new THREE.Mesh(netGeometry, netMaterial)
net.rotation.y = 1.3;
net.rotation.z = 0.4;
net.rotation.x = .1;
net.position.z = 3.2;
net.position.y = -.05;
net.position.x = -0.05;
scene.add(sphere);
scene.add(table);
scene.add(net)

const tableEdgeX = table.geometry.parameters.width / 2;

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xff0000, 2);
pointLight2.position.set(0, -4, 0);
pointLight2.intensity = 1;
scene.add(pointLight2);

gui.add(pointLight2.position, "y").min(-3).max(3).step(0.01);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 4;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
}
animate();

// const clock = new THREE.Clock()

// const tick = () =>
// {

//     const elapsedTime = clock.getElapsedTime()

//     // Update objects
//     if (sphere.position.x < tableEdgeX) {
//         sphere.position.x = .3 * elapsedTime
//         sphere.position.y = -.1 * elapsedTime
//     }

//     // Update Orbital Controls
//     // controls.update()

//     // Render
//     renderer.render(scene, camera)
//     // renderer.render(tableScene, tableCamera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()
