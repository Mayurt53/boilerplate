import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function ThreeCard({ glbPath, image, className = '', style = {}, ...props }) {
  const mountRef = useRef();
  const rendererRef = useRef();
  const controlsRef = useRef();

  useEffect(() => {
    if (!glbPath || image) return; // Don't init 3D if using image
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202020);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(2, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearAlpha(0);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 4);
    light.position.set(30, -10, 20);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;
    controls.enableDamping = true;
    controlsRef.current = controls;

    // Load Model
    const loader = new GLTFLoader();
    let model;
    loader.load(
      glbPath,
      (gltf) => {
        model = gltf.scene;
        scene.add(model);
      },
      undefined,
      (error) => {
        // eslint-disable-next-line no-console
        console.error('Error loading GLB model:', error);
      }
    );

    // Responsive
    function handleResize() {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    }
    window.addEventListener('resize', handleResize);

    // Animation loop
    let frameId;
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (model) scene.remove(model);
      mount.removeChild(renderer.domElement);
    };
  }, [glbPath, image]);

  return (
    <div
      ref={mountRef}
      className={`glass-effect rounded-2xl overflow-hidden relative ${className}`}
      style={{ width: '100%', height: 320, ...style }}
      {...props}
    >
      {image && (
        <>
          <img
            src={image}
            alt="Card visual"
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </>
      )}
    </div>
  );
}

export default ThreeCard; 