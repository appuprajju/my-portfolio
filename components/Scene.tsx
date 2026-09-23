"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function Orb({ isMobile }: { isMobile: boolean }) {
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
        {isMobile ? (
          <meshPhysicalMaterial
            color="#8ee7ff"
            roughness={0.12}
            metalness={0.15}
            transmission={0.85}
            ior={1.4}
            thickness={0.8}
            clearcoat={1}
            clearcoatRoughness={0.08}
            reflectivity={0.9}
            transparent
            opacity={0.92}
          />
        ) : (
          <MeshTransmissionMaterial
            backside={false}
            samples={2}
            resolution={384}
            thickness={1.0}
            chromaticAberration={0.02}
            anisotropy={0.15}
            distortion={0.08}
            distortionScale={0.2}
            temporalDistortion={0.02}
            roughness={0.1}
            transmission={0.95}
            ior={1.4}
          />
        )}
      </mesh>
    </Float>
  );
}

export default function Scene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={isMobile ? [1, 1.2] : [1, 1.5]}
      performance={{ min: 0.5 }}
      gl={{ powerPreference: "high-performance", antialias: true, alpha: true }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[4, 4, 5]} intensity={2.8} />
      <pointLight position={[-4, -2, 2]} intensity={10} distance={10} />
      <Environment preset="city" />
      <Orb isMobile={isMobile} />
    </Canvas>
  );
}