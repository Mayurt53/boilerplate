import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Environment } from '@react-three/drei';

// Curated Unsplash images with blue/tech/abstract theme
const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80',
];

function FloatingImage({ url, position, rotation, floatSpeed = 1 }) {
  const mesh = useRef();
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * floatSpeed) * 0.1;
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * floatSpeed) * 0.2;
    }
  });
  return (
    <Float speed={floatSpeed} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={mesh} position={position} rotation={rotation} castShadow>
        <planeGeometry args={[2.2, 1.4]} />
        <meshStandardMaterial map={useLoader(THREE.TextureLoader, url)} toneMapped={false} />
      </mesh>
    </Float>
  );
}

// Main 3D Gallery Component
export default function ImageGallery3D() {
  // Arrange images in a circle
  const radius = 4;
  const angleStep = (2 * Math.PI) / images.length;
  return (
    <div className="w-full h-[70vh] bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} shadows style={{ background: 'radial-gradient(ellipse at center, #0a192f 0%, #000 100%)' }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7]} intensity={1.2} castShadow />
        <Environment preset="night" />
        {images.map((url, i) => {
          const angle = i * angleStep;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * 1.2;
          const z = Math.sin(angle) * radius;
          return (
            <FloatingImage
              key={url}
              url={url}
              position={[x, y, z]}
              rotation={[0, angle + Math.PI, 0]}
              floatSpeed={1 + (i % 3) * 0.3}
            />
          );
        })}
        <OrbitControls enablePan enableZoom enableRotate autoRotate autoRotateSpeed={0.7} />
      </Canvas>
    </div>
  );
} 