"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Crystal() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.y * 0.3,
      0.05,
    );
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      -pointer.x * 0.2,
      0.05,
    );
  });

  const scale = Math.min(viewport.width, viewport.height) * 0.11;

  return (
    <mesh ref={meshRef} scale={scale} position={[0, -0.9, -0.6]}>
      <icosahedronGeometry args={[1, 1]} />
      <MeshDistortMaterial
        color="#c9a45c"
        roughness={0.25}
        metalness={0.4}
        distort={0.28}
        speed={1.4}
        emissive="#8a7139"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={60} color="#f5f3ee" />
      <pointLight position={[-5, -3, -5]} intensity={30} color="#c9a45c" />
    </>
  );
}

export function CrystalScene() {
  return (
    <Canvas
      dpr={[1, Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 2)]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Lights />
      <Crystal />
    </Canvas>
  );
}
