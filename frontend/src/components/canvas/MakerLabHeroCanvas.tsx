import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const MakerLabHeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isLoadingModel, setIsLoadingModel] = useState<boolean>(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Test WebGL availability
    try {
      const canvasTest = document.createElement('canvas');
      const gl = canvasTest.getContext('webgl') || canvasTest.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    let isVisible = true;
    let animationFrameId: number;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0f14, 0.035);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 650;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 7.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Studio Lighting (Tailored for Graphite Enamel & Satin Gold Alloy)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    // Key Golden Warm Light
    const goldKeyLight = new THREE.DirectionalLight(0xf5b82e, 3.2);
    goldKeyLight.position.set(5, 7, 6);
    goldKeyLight.castShadow = true;
    scene.add(goldKeyLight);

    // Fill Cyan Tech Light
    const cyanFillLight = new THREE.PointLight(0x35d5ff, 2.8, 14);
    cyanFillLight.position.set(-5, -2, 4);
    scene.add(cyanFillLight);

    // Rim / Backlight for metallic contours
    const rimLight = new THREE.DirectionalLight(0xffffff, 2.0);
    rimLight.position.set(0, 6, -6);
    scene.add(rimLight);

    // Soft Bottom Bounce Light
    const bottomLight = new THREE.PointLight(0xd6a63b, 1.5, 8);
    bottomLight.position.set(0, -3, 2);
    scene.add(bottomLight);

    // 3. Model Parent Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // 4. Load GLB Model (PUMAKER Emblem)
    const loader = new GLTFLoader();
    const baseUrl = (import.meta as any).env?.BASE_URL || '/';
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const modelUrl = `${cleanBaseUrl}models/maker_hero_model.glb`;

    loader.load(
      modelUrl,
      (gltf) => {
        const root = gltf.scene;

        // Auto calculate bounding box, scale and center
        const bbox = new THREE.Box3().setFromObject(root);
        const center = new THREE.Vector3();
        bbox.getCenter(center);
        const size = new THREE.Vector3();
        bbox.getSize(size);
        const maxAxis = Math.max(size.x, size.y, size.z);
        const targetScale = 3.8 / (maxAxis || 1);

        root.scale.set(targetScale, targetScale, targetScale);
        root.position.x = -center.x * targetScale;
        root.position.y = -center.y * targetScale;
        root.position.z = -center.z * targetScale;

        // Enhance materials
        root.traverse((node) => {
          if ((node as THREE.Mesh).isMesh) {
            const mesh = node as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.max(0.2, mat.roughness ?? 0.3);
              mat.metalness = Math.min(0.9, mat.metalness ?? 0.7);
              mat.needsUpdate = true;
            }
          }
        });

        modelGroup.add(root);
        setIsLoadingModel(false);
      },
      undefined,
      (error) => {
        console.error('Error cargando modelo GLB en Hero:', error);
        setIsLoadingModel(false);
      }
    );

    // 5. Ambient Particles Field
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x929ead,
      size: 0.03,
      transparent: true,
      opacity: 0.5
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Floor Technical Grid
    const gridHelper = new THREE.GridHelper(16, 20, 0xf5b82e, 0x141b24);
    gridHelper.position.y = -2.4;
    scene.add(gridHelper);

    // 6. Interactive Mouse Damping
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetX = x * 0.45;
      targetY = y * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 7. Viewport Visibility Observer (pause when out of view)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const time = clock.getElapsedTime();

      // Smooth mouse easing
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Rotate model
      modelGroup.rotation.y = currentX + time * 0.22;
      modelGroup.rotation.x = currentY + Math.sin(time * 0.5) * 0.06;

      // Floating particles
      particleSystem.rotation.y = time * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      particleGeo.dispose();
      particleMat.dispose();
      gridHelper.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-lab-dark via-lab-charcoal to-lab-surface relative overflow-hidden">
        <div className="w-64 h-64 rounded-full border border-lab-amber/30 border-dashed animate-spin [animation-duration:25s] flex items-center justify-center">
          <span className="font-mono text-xs text-lab-amber tracking-widest uppercase font-bold">
            PUMAKER 3D LAB
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {isLoadingModel && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="flex flex-col items-center gap-2 bg-lab-charcoal/80 px-4 py-2.5 rounded-xl border border-lab-amber/30 backdrop-blur-sm">
            <div className="w-5 h-5 border-2 border-lab-amber border-t-transparent rounded-full animate-spin" />
            <span className="text-[11px] font-mono text-lab-amber uppercase tracking-wider">
              Cargando Modelo 3D...
            </span>
          </div>
        </div>
      )}
      <div
        ref={mountRef}
        className="w-full h-full min-h-[480px] lg:min-h-[640px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
        aria-label="Modelo 3D del emblema PUMAKER"
        role="img"
      />
    </div>
  );
};
