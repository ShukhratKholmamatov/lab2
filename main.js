// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.JS Scene
const scene = new THREE.Scene();
// Create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);

// Keep track of the mouse position, so we can make the car move
let mouseX = 0;
let mouseY = 0;
let isMouseInside = false; // Flag to track mouse presence inside the canvas

// Keep the 3D object in a global variable so we can access it later
let object;

// OrbitControls allow the camera to move around the scene
let controls;

// Set which object to render
let objToRender = "car";

// Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

// Load the file
loader.load(
  `./models/${objToRender}/scene.gltf`,
  function (gltf) {
    // If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    // Log the progress
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    // Log any errors
    console.error(error);
  }
);

// Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true allows for a transparent background
renderer.setSize(600, 400);

// Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

// Set how far the camera will be from the 3D model
camera.position.z = objToRender === "car" ? 25 : 500;

// Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 500, 500); // Top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "car" ? 5 : 1);
scene.add(ambientLight);

// Add camera controls for orbiting, if the object is a car
if (objToRender === "car") {
  controls = new OrbitControls(camera, renderer.domElement);
}

// Update mouse position relative to the canvas
renderer.domElement.addEventListener("mousemove", (e) => {
  isMouseInside = true; // Mouse is inside the canvas
  const rect = renderer.domElement.getBoundingClientRect();
  mouseX = e.clientX - rect.left; // Mouse X relative to canvas
  mouseY = e.clientY - rect.top;  // Mouse Y relative to canvas
});

// Detect when the mouse leaves the canvas
renderer.domElement.addEventListener("mouseleave", () => {
  isMouseInside = false; // Mouse has left the canvas
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  if (object && objToRender === "car" && isMouseInside) {
    const canvasWidth = renderer.domElement.clientWidth;
    const canvasHeight = renderer.domElement.clientHeight;

    // Update the object's rotation based on mouse position
    object.rotation.y = -3 + (mouseX / canvasWidth) * 3;
    object.rotation.x = -1.2 + (mouseY / canvasHeight) * 2.5;
  }

  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener("resize", function () {
  camera.aspect = 600 / 400;
  camera.updateProjectionMatrix();
  renderer.setSize(600, 400);
});

// Start the animation
animate();
