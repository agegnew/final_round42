"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Globe from './Globe';

export default function LeaderboardGlobe() {
  return (
    <div className="relative w-full h-[600px]">
      <Canvas camera={{ position: [0, 5, 8], fov: 45 }}>
        <color attach="background" args={['#000814']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* Main Content */}
        <Globe />
        
        {/* Environment */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate
          autoRotateSpeed={0.5}
        />

        {/* Post-processing */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={300}
            intensity={1.5}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
} 