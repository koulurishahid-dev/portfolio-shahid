import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// 1. Futuristic Cyber Grid Floor extending toward the horizon
const CyberGridFloor: React.FC = () => {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (gridRef.current) {
      // Subtle forward glide illusion
      gridRef.current.position.z = (state.clock.getElapsedTime() * 0.35) % 2;
    }
  });

  return (
    <group position={[0, -2.4, 0]}>
      <gridHelper
        ref={gridRef}
        args={[40, 40, '#2563EB', '#1E293B']}
        position={[0, 0, 0]}
      />
    </group>
  );
};

// 2. Central Polyhedral Core with Orbital Rings (Chapter 01 & Chapter 03)
const CentralTechCore: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const outerMesh = useRef<THREE.Mesh>(null);
  const innerMesh = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (outerMesh.current) {
      outerMesh.current.rotation.x = t * 0.18;
      outerMesh.current.rotation.y = t * 0.22;
    }

    if (innerMesh.current) {
      innerMesh.current.rotation.x = -t * 0.25;
      innerMesh.current.rotation.y = -t * 0.3;
    }

    if (ring1.current) {
      ring1.current.rotation.z = t * 0.4;
      ring1.current.rotation.x = Math.sin(t * 0.3) * 0.5;
    }

    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.35;
      ring2.current.rotation.y = Math.cos(t * 0.35) * 0.5;
    }

    if (ring3.current) {
      ring3.current.rotation.x = t * 0.25;
      ring3.current.rotation.y = t * 0.35;
    }
  });

  // Scale subtly based on scroll
  const scale = 1.1 + Math.sin(scrollProgress * Math.PI) * 0.3;

  return (
    <group position={[0, 0.2, 0]} scale={scale}>
      {/* Outer Wireframe Icosahedron */}
      <mesh ref={outerMesh}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial
          color="#38BDF8"
          wireframe
          transparent
          opacity={0.32}
        />
      </mesh>

      {/* Inner Translucent Octahedron Core */}
      <mesh ref={innerMesh}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#1D4ED8"
          emissive="#2563EB"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.85}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Pulsing Energy Sphere */}
      <mesh>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshBasicMaterial color="#60A5FA" />
      </mesh>

      {/* Orbital Ring 1 */}
      <mesh ref={ring1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.0, 0.015, 16, 80]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.65} />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh ref={ring2} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.35, 0.012, 16, 80]} />
        <meshBasicMaterial color="#60A5FA" transparent opacity={0.5} />
      </mesh>

      {/* Orbital Ring 3 (Equatorial) */}
      <mesh ref={ring3} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.7, 0.009, 16, 80]} />
        <meshBasicMaterial color="#1D4ED8" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

// 3. Floating Neural Network & Digital Constellation Nodes
const NeuralMatrixNodes: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const nodePositions = useMemo(() => {
    const coords: [number, number, number][] = [
      [-3.2, 1.4, -1],
      [-2.5, -0.8, -2],
      [-4.0, 0.0, -1.5],
      [3.0, 1.2, -1.2],
      [2.2, -1.4, -1.8],
      [3.8, -0.2, -2.2],
      [0, 2.5, -2],
      [-1.5, 2.8, -3],
      [1.8, 2.6, -2.5],
    ];
    return coords;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {nodePositions.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial
            color={idx % 2 === 0 ? '#38BDF8' : '#60A5FA'}
            emissive={idx % 2 === 0 ? '#1D4ED8' : '#2563EB'}
            emissiveIntensity={0.6}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
};

// 4. Ambient 3D Particle Constellation (200 particles)
const generateCosmicParticles = (count: number) => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const colorRoyal = new THREE.Color('#2563EB');
  const colorCyan = new THREE.Color('#38BDF8');
  const colorIndigo = new THREE.Color('#6366F1');

  for (let i = 0; i < count; i++) {
    // Spatial distribution in a spherical cloud around the camera pathway
    const radius = Math.random() * 9 + 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    const r = Math.random();
    const c = r < 0.45 ? colorCyan : r < 0.8 ? colorRoyal : colorIndigo;

    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  return [positions, colors] as const;
};

const COSMIC_PARTICLES = generateCosmicParticles(180);

const AmbientCosmicParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions, colors] = useMemo(() => COSMIC_PARTICLES, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
};

// 5. Cinematic Dynamic Camera Rig with Mouse Parallax & Scroll Interpolation
interface CameraRigProps {
  scrollProgress: number;
  mousePos: { x: number; y: number };
}

const CameraRig: React.FC<CameraRigProps> = ({ scrollProgress, mousePos }) => {
  useFrame((state) => {
    // Define 7 Cinematic Waypoints corresponding to the 7 Chapters
    // 0.00: Chapter 01 (Intro)
    // 0.16: Chapter 02 (My Story)
    // 0.33: Chapter 03 (SLRJ Digital)
    // 0.50: Chapter 04 (Projects)
    // 0.67: Chapter 05 (Technology)
    // 0.83: Chapter 06 (Vision)
    // 1.00: Chapter 07 (Horizon & Contact)

    const p = Math.max(0, Math.min(1, scrollProgress));

    // Dynamic Waypoint Interpolation
    let targetX = 0;
    let targetY = 0;
    let targetZ = 6.2;
    let lookAtX = 0;
    let lookAtY = 0;
    let lookAtZ = 0;

    if (p < 0.16) {
      // Chapter 01: Center Introduction
      const t = p / 0.16;
      targetX = THREE.MathUtils.lerp(0, -1.8, t);
      targetY = THREE.MathUtils.lerp(0, 0.4, t);
      targetZ = THREE.MathUtils.lerp(6.2, 5.5, t);
      lookAtX = THREE.MathUtils.lerp(0, -0.6, t);
    } else if (p < 0.33) {
      // Chapter 02: My Story (Side pan left)
      const t = (p - 0.16) / 0.17;
      targetX = THREE.MathUtils.lerp(-1.8, 2.2, t);
      targetY = THREE.MathUtils.lerp(0.4, -0.3, t);
      targetZ = THREE.MathUtils.lerp(5.5, 5.2, t);
      lookAtX = THREE.MathUtils.lerp(-0.6, 0.8, t);
    } else if (p < 0.50) {
      // Chapter 03: SLRJ Digital (Swoop right)
      const t = (p - 0.33) / 0.17;
      targetX = THREE.MathUtils.lerp(2.2, -0.4, t);
      targetY = THREE.MathUtils.lerp(-0.3, 1.2, t);
      targetZ = THREE.MathUtils.lerp(5.2, 6.0, t);
      lookAtX = THREE.MathUtils.lerp(0.8, 0, t);
    } else if (p < 0.67) {
      // Chapter 04: Projects (High perspective)
      const t = (p - 0.50) / 0.17;
      targetX = THREE.MathUtils.lerp(-0.4, -2.0, t);
      targetY = THREE.MathUtils.lerp(1.2, -0.8, t);
      targetZ = THREE.MathUtils.lerp(6.0, 5.0, t);
      lookAtX = THREE.MathUtils.lerp(0, -0.8, t);
    } else if (p < 0.83) {
      // Chapter 05: Technology (Deep neural dive)
      const t = (p - 0.67) / 0.16;
      targetX = THREE.MathUtils.lerp(-2.0, 1.4, t);
      targetY = THREE.MathUtils.lerp(-0.8, 0.5, t);
      targetZ = THREE.MathUtils.lerp(5.0, 4.4, t);
      lookAtX = THREE.MathUtils.lerp(-0.8, 0.4, t);
    } else {
      // Chapter 06 & 07: Vision into Infinite Horizon
      const t = (p - 0.83) / 0.17;
      targetX = THREE.MathUtils.lerp(1.4, 0, t);
      targetY = THREE.MathUtils.lerp(0.5, 0.1, t);
      targetZ = THREE.MathUtils.lerp(4.4, 3.2, t); // Zoom toward stargate
      lookAtX = 0;
    }

    // Add gentle Mouse Parallax (Dampened on scroll)
    const mouseParallaxX = (mousePos.x - 0.5) * 0.55;
    const mouseParallaxY = -(mousePos.y - 0.5) * 0.45;

    // Smooth dampening towards target coordinates
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      targetX + mouseParallaxX,
      0.05
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      targetY + mouseParallaxY,
      0.05
    );
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetZ,
      0.05
    );

    // Dynamic LookAt
    state.camera.lookAt(lookAtX, lookAtY, lookAtZ);
  });

  return null;
};

// 6. Root 3D World Canvas Component
export const Cinematic3DWorld: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isVisible, setIsVisible] = useState(true);

  // Track global scroll progression (0 to 1)
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const progress = window.scrollY / docHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track normalized mouse coordinates for 3D parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Visibility detection to pause render loop when tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
      {/* Cinematic Ambient Atmosphere Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#060B18]/40 to-[#040814]/90 pointer-events-none z-10" />

      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={isVisible ? 'always' : 'never'}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Cinematic Lighting System */}
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 8, 5]} intensity={1.4} color="#60A5FA" />
        <pointLight position={[-8, -5, 2]} intensity={1.8} color="#2563EB" />
        <pointLight position={[8, 5, -3]} intensity={1.5} color="#38BDF8" />

        {/* Volumetric Fog Effect */}
        <fogExp2 attach="fog" args={['#040814', 0.05]} />

        {/* Dynamic Camera Rig with Mouse Parallax & Scroll Interpolation */}
        <CameraRig scrollProgress={scrollProgress} mousePos={mousePos} />

        {/* Central Polyhedron Crystal with Float Motion */}
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
          <CentralTechCore scrollProgress={scrollProgress} />
        </Float>

        {/* Floating Neural Network Nodes */}
        <NeuralMatrixNodes />

        {/* Cosmic Ambient Particles */}
        <AmbientCosmicParticles />

        {/* Cyber Grid Floor extending toward the horizon */}
        <CyberGridFloor />
      </Canvas>
    </div>
  );
};
