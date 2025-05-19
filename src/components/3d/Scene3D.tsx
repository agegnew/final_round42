"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, Float } from "@react-three/drei";
import FloatingBook from "./FloatingBook";
import { FloatingSphere } from "./FloatingSphere";

export function Scene3D() {
  return (
    <div className="w-full h-[600px] relative">
      <Canvas shadows dpr={[1, 1.5]} className="rounded-2xl">
        <color attach="background" args={["#f8fafc"]} />
        
        <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={35} />
        
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          
          <Float
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
          >
            <FloatingBook position={[-2.5, 0, 0]} rotation={[0, Math.PI / 4, 0]} scale={0.8} />
          </Float>
          
          <Float
            speed={1.5}
            rotationIntensity={0.3}
            floatIntensity={0.3}
          >
            <FloatingBook position={[2.5, 0, -1]} rotation={[0, -Math.PI / 5, 0]} scale={0.7} />
          </Float>
          
          <FloatingSphere position={[0, 1, 0]} size={1.2} color="#FFA500" speed={0.8} distort={0.3} />
          <FloatingSphere position={[-3, -1, -2]} size={0.7} color="#2D9979" speed={1.2} distort={0.5} />
          <FloatingSphere position={[3, 2, -3]} size={0.5} color="#3b82f6" speed={1} distort={0.2} />
        </Suspense>
        
        {/* Optional controls - can be commented out for fixed view */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
} 