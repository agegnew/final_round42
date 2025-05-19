"use client";

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

interface TeamOrbProps {
  position: [number, number, number];
  color: string;
  name: string;
  onClick: () => void;
}

export default function TeamOrb({ position, color, name, onClick }: TeamOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Main Orb */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 2 : 1}
          toneMapped={false}
        />
      </mesh>

      {/* Glow Effect */}
      <Sphere args={[0.25, 32, 32]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
        />
      </Sphere>

      {/* Team Info Label */}
      <Html center position={[0, 0.4, 0]}>
        <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm whitespace-nowrap">
          {name}
        </div>
      </Html>
    </group>
  );
} 