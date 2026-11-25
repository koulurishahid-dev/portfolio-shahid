import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeAvatarProps {
  className?: string;
}

export const ThreeAvatar: React.FC<ThreeAvatarProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 580;
    let height = container.clientHeight || 640;

    // 1. Three.js Scene & Perspective Camera
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.3);

    // 2. High-Performance WebGL Renderer with Transparent Background
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL initialization failed, falling back to static avatar', e);
      setWebglError(true);
      return;
    }

    // 3. Dynamic Studio Lighting Environment
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.7);
    scene.add(ambientLight);

    // Cyan-Blue dynamic key light
    const keyLight = new THREE.PointLight(0x38bdf8, 3.6, 12);
    keyLight.position.set(2.0, 1.8, 3.0);
    scene.add(keyLight);

    // Deep Indigo/Purple rim light for cinematic edge contrast
    const rimLight = new THREE.PointLight(0x818cf8, 2.6, 10);
    rimLight.position.set(-2.2, -0.5, -2.5);
    scene.add(rimLight);

    // Front soft fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(0, 0, 5);
    scene.add(fillLight);

    // 4. Front-View 3D Character Avatar (Clean, no background elements)
    const characterRoot = new THREE.Group();
    characterRoot.position.set(0, 0, 0.05);
    scene.add(characterRoot);

    const textureLoader = new THREE.TextureLoader();
    const planeGeo = new THREE.PlaneGeometry(2.35, 2.35, 32, 32);

    // High-resolution avatar with transparent background
    textureLoader.load('/shahid-avatar-hq.png', (avatarTex) => {
      avatarTex.colorSpace = THREE.SRGBColorSpace;
      avatarTex.minFilter = THREE.LinearFilter;
      avatarTex.magFilter = THREE.LinearFilter;

      const avatarMat = new THREE.MeshStandardMaterial({
        map: avatarTex,
        transparent: true,
        roughness: 0.42,
        metalness: 0.15,
        side: THREE.FrontSide,
        depthWrite: true,
      });

      const avatarMesh = new THREE.Mesh(planeGeo, avatarMat);
      avatarMesh.position.set(0, 0, 0);
      characterRoot.add(avatarMesh);
      setIsLoaded(true);
    });

    // 5. Interactive Cursor Parallax Tracking (Front View Clamped Motion)
    const mousePos = { x: 0, y: 0 };
    const targetTilt = { x: 0, y: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.x = x;
      mousePos.y = y;

      // Clamped gentle 3D tilt (keeps avatar facing front at all times)
      targetTilt.x = -y * 0.14; // Pitch (max ~8 degrees)
      targetTilt.y = x * 0.18;  // Yaw (max ~10 degrees)
    };

    const handlePointerLeave = () => {
      targetTilt.x = 0;
      targetTilt.y = 0;
      mousePos.x = 0;
      mousePos.y = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave);

    // 6. Responsive Window Resize Listener
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 580;
      height = container.clientHeight || 640;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 7. Render & Animation Loop (Front View Breathing + Mouse Parallax)
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) / 1000;

      // Organic breathing undulation on the entire avatar bust
      const breathing = Math.sin(elapsedTime * 1.8) * 0.012;
      const floatBob = Math.sin(elapsedTime * 1.2) * 0.035;

      characterRoot.scale.set(1.0 + breathing * 0.5, 1.0 + breathing, 1.0);

      // Smooth front-view 3D tracking towards user cursor
      characterRoot.rotation.x += (targetTilt.x - characterRoot.rotation.x) * 0.055;
      characterRoot.rotation.y += (targetTilt.y - characterRoot.rotation.y) * 0.055;
      characterRoot.rotation.z = -characterRoot.rotation.y * 0.15;

      characterRoot.position.x += (mousePos.x * 0.06 - characterRoot.position.x) * 0.05;
      characterRoot.position.y = floatBob + (mousePos.y * -0.04);

      // Dynamic key light tracks mouse position
      keyLight.position.x = 2.0 + mousePos.x * 1.6;
      keyLight.position.y = 1.8 + mousePos.y * 1.6;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Clean Unmounting
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Static fallback if WebGL fails
  if (webglError) {
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        <img
          src="/shahid-avatar-hq.png"
          alt="Shahid Kouluri"
          className="w-full h-auto object-contain drop-shadow-2xl"
        />
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* 3D WebGL Canvas Container: Clean and completely transparent */}
      <div
        ref={mountRef}
        className="relative w-full h-[420px] sm:h-[500px] md:h-[560px] lg:h-[620px] xl:h-[680px] flex items-center justify-center cursor-default touch-none"
      >
        {/* Loading Spinner */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};
