"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Grid } from '@react-three/drei';
import * as THREE from 'three';

export default function Globe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const gridRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
    if (gridRef.current) {
      gridRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group>
      {/* Base Globe */}
      <Sphere ref={globeRef} args={[2, 64, 64]}>
        <meshPhongMaterial
          color="#1a1a2e"
          emissive="#000000"
          specular="#ffffff"
          shininess={50}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Grid Overlay */}
      <Sphere ref={gridRef} args={[2.01, 64, 64]}>
        <meshPhongMaterial
          color="#4a00ff"
          wireframe
          transparent
          opacity={0.1}
        />
      </Sphere>

      {/* Atmosphere Glow */}
      <Sphere args={[2.1, 64, 64]}>
        <meshPhongMaterial
          color="#4a00ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Base Grid */}
      <Grid
        position={[0, -2.5, 0]}
        args={[10, 10]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#4a00ff"
        sectionSize={2}
        fadeDistance={30}
        fadeStrength={1}
      />
    </group>
  );
} 