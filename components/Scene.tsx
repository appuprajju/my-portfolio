"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useRef, useState, useEffect, Suspense } from "react";
import * as THREE from "three";

function OrbMesh({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.14;
      ref.current.rotation.y = state.clock.elapsedTime * 0.18;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.0}>
      <mesh ref={ref} scale={isMobile ? 1.45 : 1.7}>
        <icosahedronGeometry args={[1, isMobile ? 2 : 3]} />
        <meshPhysicalMaterial
          color="#8ee7ff"
          roughness={0.06}
          metalness={0.12}
          transmission={0.92}
          ior={1.45}
          thickness={1.2}
          clearcoat={1}
          clearcoatRoughness={0.05}
          reflectivity={0.9}
          transparent
          opacity={0.95}
        />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={isMobile ? [1, 1.2] : [1, 1.5]}
      performance={{ min: 0.5 }}
      gl={{ powerPreference: "high-performance", antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[4, 4, 5]} intensity={2.8} />
      <pointLight position={[-4, -2, 2]} intensity={10} distance={10} color="#8ee7ff" />
      <pointLight position={[4, 2, -2]} intensity={8} distance={10} color="#a98cff" />
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      <Suspense fallback={null}>
        <OrbMesh isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}