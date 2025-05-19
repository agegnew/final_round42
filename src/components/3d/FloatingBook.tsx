"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type Position = [number, number, number];
type Rotation = [number, number, number];

export function FloatingBook({ 
  position = [0, 0, 0] as Position, 
  rotation = [0, 0, 0] as Rotation, 
  scale = 1 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  
  // Create a simulated book using simple geometry
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.1;
    
    // Slow rotation
    meshRef.current.rotation.y = rotation[1] + state.clock.getElapsedTime() * 0.2;
    
    // Scale effect on hover
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(
        meshRef.current.scale.x,
        hovered ? scale * 1.1 : scale,
        0.1
      )
    );
  });

  return (
    <group position={position as Position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.5, 0.2, 2]} />
        <meshStandardMaterial 
          color={hovered ? "#FFA500" : "#2D9979"} 
          roughness={0.5}
          metalness={0.2}
        />
        
        {/* Book pages */}
        <mesh position={[0, 0.11, 0] as Position}>
          <boxGeometry args={[1.3, 0.05, 1.8]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
        
        {/* Book binding */}
        <mesh position={[-0.7, 0, 0] as Position} rotation={[0, 0, 0] as Rotation}>
          <boxGeometry args={[0.1, 0.22, 2]} />
          <meshStandardMaterial 
            color={hovered ? "#ff8a00" : "#238b6d"} 
            roughness={0.5} 
            metalness={0.3}
          />
        </mesh>
      </mesh>
    </group>
  );
} 