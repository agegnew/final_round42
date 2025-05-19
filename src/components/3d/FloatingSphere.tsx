"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

type Position = [number, number, number];

export function FloatingSphere({ 
  position = [0, 0, 0] as Position, 
  size = 1, 
  color = "#FFA500", 
  speed = 1, 
  distort = 0.4 
}) {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!sphereRef.current) return;
    
    // Floating movement
    sphereRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * speed) * 0.2;
    sphereRef.current.position.x = position[0] + Math.cos(state.clock.getElapsedTime() * speed * 0.8) * 0.1;
    
    // Slow rotation
    sphereRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    sphereRef.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 0.2) * 0.2;
  });

  return (
    <group>
      {/* Main distorted sphere */}
      <Sphere ref={sphereRef} args={[size, 32, 32]} position={position as [number, number, number]}>
        <MeshDistortMaterial
          color={color}
          speed={0.5}
          distort={distort}
          roughness={0.2}
          metalness={0.8}
          opacity={0.9}
          transparent
        />
      </Sphere>
      
      {/* Glow effect - larger transparent sphere */}
      <Sphere args={[size * 1.2, 16, 16]} position={position as [number, number, number]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
        />
      </Sphere>
    </group>
  );
} 