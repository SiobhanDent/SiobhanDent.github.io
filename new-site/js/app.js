
import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { color } from 'three/tsl';

const scene = new THREE.Scene({alpha: true});
const camera = new THREE.PerspectiveCamera( 35, 1, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize( 150, 150 );

const domElement = renderer.domElement;
domElement.className = "gooby-view";
$("#sidenav").append(domElement);

const controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.enableZoom = false;
controls.enableDamping = true;
controls.autoRotate = true;
controls.maxDistance = 5;
controls.minDistance = 5;

const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

const texture = textureLoader.load("../public/Goob.png");
texture.colorSpace = THREE.SRGBColorSpace;
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.flipY = false;
texture.minFilter = THREE.LinearFilter;
texture.repeat.set( 1, 1 );

const material = new THREE.MeshBasicMaterial(
	{
		map : texture,
		side: THREE.DoubleSide
	}
);

gltfLoader.load("../public/Gooby.glb", function(gltf) {
	const content = gltf.scene;
	content.traverse( function ( child ) {
		// Only child is gooby :)
		if ( child.isMesh ) {
			child.material = material;			
			const po = child.position;
			controls.target.set(po.x,po.y, po.z);
		}
	});
	scene.add(content);
}, undefined, function(error) {
	console.error(error);
});

camera.position.z += 5;
controls.update();



function animate() {
	controls.update();
	renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );