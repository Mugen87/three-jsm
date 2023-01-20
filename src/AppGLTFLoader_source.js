import * as THREE from 'three';
// You may use these to make it smaller (Just remember to remove THREE from the respective calls inline)
// import {
// 	BoxGeometry,
// 	Mesh,
// 	MeshBasicMaterial,
// 	PerspectiveCamera,
// 	Scene,
// 	WebGLRenderer
// } from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class AppGLTFLoader {
    init() {
        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera.position.z = 400;
        this.camera.position.y = 400;

        // Directional Light
        let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this.scene.add(directionalLight);

        // Renderer
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        // Append renderer dom to body
        document.body.appendChild( this.renderer.domElement );

        // OrbitControls
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.update();

        // Load Gltf (content already prefetched)
        const loader = new GLTFLoader();
        let gltf_content = `gltf_content_handler`;
        loader.parse(gltf_content, '', (gltf)=>{
            this.scene.add(gltf.scene);
        });

        // Box with texture loaded (on the fly)
        let texture = new THREE.TextureLoader().load( '../models/1.jpg' );
        let geometry = new THREE.BoxBufferGeometry( 150, 150, 150 );
        let material = new THREE.MeshBasicMaterial( { map: texture } );
        this.mesh = new THREE.Mesh( geometry, material );
        this.scene.add( this.mesh );

        // Resize listener
        window.addEventListener( 'resize', ()=>
            {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize( window.innerWidth, window.innerHeight );
            },
            false );

        // Animation loop
        this.animate = () => {
            requestAnimationFrame( this.animate );
            this.mesh.rotation.x += 0.005;
            this.mesh.rotation.y += 0.01;
            this.renderer.render( this.scene, this.camera );
        }

        this.animate();
    }
}

export default {AppGLTFLoader};