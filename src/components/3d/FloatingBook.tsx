"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface FloatingBookProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export default function FloatingBook({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: FloatingBookProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 1.5, 0.2]} />
      <meshStandardMaterial color="#7c3aed" />
    </mesh>
  );
} 