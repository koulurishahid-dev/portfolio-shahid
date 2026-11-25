import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// 1. Futuristic Tech Crystal Core
const TechPolyhedron: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.25;
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -t * 0.15;
      wireframeRef.current.rotation.y = -t * 0.2;
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.z = t * 0.3;
      ringRef1.current.rotation.x = Math.sin(t * 0.4) * 0.4;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.z = -t * 0.25;
      ringRef2.current.rotation.y = Math.cos(t * 0.3) * 0.4;
    }
  });

  return (
    <group scale={1.15}>
      {/* Outer Wireframe Icosahedron */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial
          color="#DC2626"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Inner Translucent Core Polyhedron */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#EF4444"
          roughness={0.15}
          metalness={0.85}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Center glowing energy node */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* Orbital Ring 1 */}
      <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.0, 0.015, 16, 64]} />
        <meshBasicMaterial color="#DC2626" transparent opacity={0.7} />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh ref={ringRef2} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.3, 0.012, 16, 64]} />
        <meshBasicMaterial color="#EF4444" transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

// Deterministic pseudo-random generation outside render
const generateParticles = (count: number) => {
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const color1 = new THREE.Color('#DC2626');
  const color2 = new THREE.Color('#FFFFFF');

  for (let i = 0; i < count; i++) {
    const seedX = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const seedY = (Math.cos(i * 78.233) * 43758.5453) % 1;
    const seedZ = (Math.sin(i * 45.164) * 43758.5453) % 1;

    pos[i * 3] = seedX * 8;
    pos[i * 3 + 1] = seedY * 8;
    pos[i * 3 + 2] = seedZ * 6;

    const mixed = color1.clone().lerp(color2, Math.abs(seedX));
    col[i * 3] = mixed.r;
    col[i * 3 + 1] = mixed.g;
    col[i * 3 + 2] = mixed.b;
  }
  return [pos, col] as const;
};

const STATIC_PARTICLES = generateParticles(45);

// 2. Ambient Particle Constellation
const AmbientParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions, colors] = useMemo(() => STATIC_PARTICLES, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
};

export const HeroCanvas3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Performance Optimization: Pause 3D render loop when out of viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none select-none ${className}`}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={isVisible ? 'always' : 'never'}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={2.0} color="#EF4444" />
        <pointLight position={[-10, -10, -5]} intensity={1.5} color="#DC2626" />

        <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
          <TechPolyhedron />
        </Float>

        <AmbientParticles />
      </Canvas>
    </div>
  );
};
