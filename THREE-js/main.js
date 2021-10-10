import * as THREE from "https://cdn.skypack.dev/pin/three@v0.133.1-dCIBIz3pnzocx0lNrLHe/mode=imports/optimized/three.js";

const canvas = document.getElementById("myCanvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight,
    1, 1000);
camera.position.z = 5;

const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const renderer = new THREE.WebGLRenderer({canvas: canvas,alpha: true});
renderer.setSize(0.9 * window.innerWidth, 0.75 * window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

let mainLoop = function () {
    console.log("Hello");
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
};

mainLoop();