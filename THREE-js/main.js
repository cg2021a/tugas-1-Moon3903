import * as THREE from "https://cdn.skypack.dev/pin/three@v0.133.1-dCIBIz3pnzocx0lNrLHe/mode=imports/optimized/three.js";

const canvas = document.getElementById("myCanvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 5;

const clock = new THREE.Clock();

// cube
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
cube.position.x += -1.6;
cube.position.y += 0.8;
scene.add(cube);

// cube wireframe
const wmaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true});
const wcube = new THREE.Mesh(geometry, wmaterial);
wcube.position.x += -1.6;
wcube.position.y += 0.8;
scene.add(wcube);

// circle
const cgeometry = new THREE.CircleGeometry( 0.5, 32 );
const cmaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const circle = new THREE.Mesh( cgeometry, cmaterial );
scene.add( circle );

const renderer = new THREE.WebGLRenderer({canvas: canvas,alpha: true});
renderer.setSize(0.9 * window.innerWidth, 0.75 * window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

function rotate(obj,time,modifier){
    obj.rotation.x = modifier * time;
    obj.rotation.y = modifier * time;
    obj.rotation.z = modifier * time;
}

let mainLoop = function () {
    rotate(cube,clock.getElapsedTime(),0.101);
    rotate(wcube,clock.getElapsedTime(),0.101);
    rotate(circle,clock.getElapsedTime(),1.01);

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
};

mainLoop();