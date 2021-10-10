import * as THREE from "https://cdn.skypack.dev/pin/three@v0.133.1-dCIBIz3pnzocx0lNrLHe/mode=imports/optimized/three.js";

const canvas = document.getElementById("myCanvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 5;

const clock = new THREE.Clock();

// cube
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshDepthMaterial();
const cube = new THREE.Mesh(geometry, material);
cube.position.x += -1.6;
cube.position.y += 0.8;
cube.castShadow = true;
scene.add(cube);

// cube wireframe
const wirecubematerial = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true});
const wirecube = new THREE.Mesh(geometry, wirecubematerial);
wirecube.position.x += -1.6;
wirecube.position.y += 0.8;
scene.add(wirecube);

// IcosahedronGeometry
const icosahedronGeometry = new THREE.IcosahedronGeometry( 0.5 );
const icosahedronMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const icosahedron = new THREE.Mesh( icosahedronGeometry, icosahedronMaterial );
icosahedron.position.y += -0.5;
scene.add( icosahedron );

// cone
const comeGeometry = new THREE.ConeGeometry(0.5, 0.5, 32 );
const coneMaterial = new THREE.MeshMatcapMaterial( {color: 0xffff00} );
const cone = new THREE.Mesh( comeGeometry, coneMaterial );
cone.position.x += -1.6;
cone.position.y += -0.5;
scene.add( cone );

// wirecone
const wireconeMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000, wireframe: true} );
const wirecone = new THREE.Mesh( comeGeometry, wireconeMaterial );
wirecone.position.x += -1.6;
wirecone.position.y += -0.5;
scene.add( wirecone );

//cylinder
const cylinderGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 0.5, 6 );
const cylinderMaterial = new THREE.MeshLambertMaterial( {color: 0xffff00} );
const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
cylinder.position.y += 0.8;
scene.add( cylinder );

//Dodecahedron
const dodecahedronGeometry = new THREE.DodecahedronGeometry(0.5);
const dodecahedronMaterial = new THREE.MeshNormalMaterial( {color: 0xffff00} );
const dodecahedron = new THREE.Mesh( dodecahedronGeometry, dodecahedronMaterial );
dodecahedron.position.x += 1.6;
dodecahedron.position.y += 0.8;
scene.add( dodecahedron );

// sphere
const sphereGeometry = new THREE.SphereGeometry( 0.5, 32, 16 );
const sphereMaterial = new THREE.MeshPhysicalMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.position.x += 1.6;
sphere.position.y -= 0.5;
scene.add( sphere );

//// spherewire
const spherewireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
const spherewire = new THREE.Mesh( sphereGeometry, spherewireMaterial );
spherewire.position.x += 1.6;
spherewire.position.y -= 0.5;
scene.add( spherewire );

//renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas,alpha: true});
renderer.setSize(0.9 * window.innerWidth, 0.75 * window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//light
const ambient = new THREE.AmbientLight( 0x404040 ); 
scene.add(ambient);

function rotate(obj,time,modifier){
    obj.rotation.x = modifier * time;
    obj.rotation.y = modifier * time;
    // obj.rotation.z = modifier * time;
}

let mainLoop = function () {
    rotate(cube,clock.getElapsedTime(),0.101);
    rotate(wirecube,clock.getElapsedTime(),0.101);
    rotate(icosahedron,clock.getElapsedTime(),1.01);
    rotate(cone,clock.getElapsedTime(),0.101*3);
    rotate(wirecone,clock.getElapsedTime(),0.101*3);
    rotate(cylinder,clock.getElapsedTime(),0.101*2);
    rotate(dodecahedron,clock.getElapsedTime(),0.101*4);
    rotate(sphere,clock.getElapsedTime(),0.101*5);
    rotate(spherewire,clock.getElapsedTime(),0.101*5);

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
};

mainLoop();