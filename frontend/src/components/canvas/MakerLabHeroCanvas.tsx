import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const MakerLabHeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

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
    scene.fog = new THREE.FogExp2(0x0b0f14, 0.045);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 650;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0x141b24, 2.5);
    scene.add(ambientLight);

    const amberLight = new THREE.PointLight(0xf5b82e, 4, 15);
    amberLight.position.set(3, 4, 3);
    scene.add(amberLight);

    const cyanLight = new THREE.PointLight(0x35d5ff, 3.5, 12);
    cyanLight.position.set(-4, -2, 2);
    scene.add(cyanLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(0, 8, -5);
    scene.add(rimLight);

    // 3. Maker Kinetic Sculpture (Artifact Assembly)
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Core 1: Glowing Icosahedron Core (PUMAKER Core)
    const coreGeo = new THREE.IcosahedronGeometry(1.0, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x141b24,
      emissive: 0xd6a63b,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.85,
      wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sculptureGroup.add(coreMesh);

    // Core Wireframe Cage
    const wireGeo = new THREE.IcosahedronGeometry(1.25, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xf5b82e,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    sculptureGroup.add(wireMesh);

    // Mechanical Ring 1 (Torus with teeth-like notches)
    const ringGeo1 = new THREE.TorusGeometry(1.8, 0.045, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x35d5ff,
      emissive: 0x35d5ff,
      emissiveIntensity: 0.25,
      roughness: 0.3,
      metalness: 0.9
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    sculptureGroup.add(ringMesh1);

    // Mechanical Ring 2 (Orthogonal counter-rotating ring)
    const ringGeo2 = new THREE.TorusGeometry(2.2, 0.04, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x929ead,
      roughness: 0.4,
      metalness: 0.8
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    sculptureGroup.add(ringMesh2);

    // Outer Geodesic Orbit
    const ringGeo3 = new THREE.TorusGeometry(2.7, 0.02, 12, 120);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0x57df9a,
      transparent: true,
      opacity: 0.3
    });
    const ringMesh3 = new THREE.Mesh(ringGeo3, ringMat3);
    ringMesh3.rotation.z = Math.PI / 6;
    sculptureGroup.add(ringMesh3);

    // Satellites: Orbiting Maker Tools & Nodes
    const satelliteCount = 8;
    const satellites: THREE.Mesh[] = [];
    const satGroup = new THREE.Group();
    sculptureGroup.add(satGroup);

    const satBoxGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    const satOctaGeo = new THREE.OctahedronGeometry(0.16);

    for (let i = 0; i < satelliteCount; i++) {
      const isBox = i % 2 === 0;
      const mat = new THREE.MeshStandardMaterial({
        color: isBox ? 0xf5b82e : 0x35d5ff,
        emissive: isBox ? 0xb8861e : 0x0891b2,
        emissiveIntensity: 0.4,
        metalness: 0.8,
        roughness: 0.2
      });
      const sat = new THREE.Mesh(isBox ? satBoxGeo : satOctaGeo, mat);
      const angle = (i / satelliteCount) * Math.PI * 2;
      const radius = 2.1 + (i % 3) * 0.35;
      sat.position.set(Math.cos(angle) * radius, (Math.sin(angle * 2) * 0.6), Math.sin(angle) * radius);
      satGroup.add(sat);
      satellites.push(sat);
    }

    // 4. Blueprint Coordinate Field & Floating Particles
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x929ead,
      size: 0.035,
      transparent: true,
      opacity: 0.45
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Floor Technical Grid
    const gridHelper = new THREE.GridHelper(16, 24, 0xf5b82e, 0x141b24);
    gridHelper.position.y = -2.6;
    scene.add(gridHelper);

    // 5. Mouse Damping Interaction
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Clamp mouse target to smooth angles (max 0.4 rad)
      targetX = x * 0.4;
      targetY = y * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 6. Viewport Visibility Observer (pause when out of view)
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    // 7. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse easing
      currentX += (targetX - currentX) * 0.045;
      currentY += (targetY - currentY) * 0.045;

      // Rotate sculpture
      sculptureGroup.rotation.y = currentX + time * 0.18;
      sculptureGroup.rotation.x = currentY + Math.sin(time * 0.35) * 0.08;

      // Internal rings counter-rotation
      coreMesh.rotation.y = time * 0.35;
      coreMesh.rotation.x = time * 0.25;
      wireMesh.rotation.y = -time * 0.25;
      wireMesh.rotation.z = time * 0.15;

      ringMesh1.rotation.z = time * 0.4;
      ringMesh2.rotation.x = -time * 0.3;
      ringMesh3.rotation.y = time * 0.25;

      // Orbit satellites
      satGroup.rotation.y = -time * 0.22;
      satellites.forEach((sat, idx) => {
        sat.rotation.x = time * (0.8 + idx * 0.1);
        sat.rotation.y = time * (0.5 + idx * 0.1);
      });

      // Subtle breath pulsing on core
      const scale = 1.0 + Math.sin(time * 1.8) * 0.04;
      coreMesh.scale.set(scale, scale, scale);

      // Subtle particle float
      particleSystem.rotation.y = time * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      // Dispose three.js resources
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      satBoxGeo.dispose();
      satOctaGeo.dispose();
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
    // Elegant SVG / CSS Fallback
    return (
      <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-lab-dark via-lab-charcoal to-lab-surface relative overflow-hidden">
        <div className="w-72 h-72 rounded-full border border-lab-amber/30 border-dashed animate-spin [animation-duration:25s] flex items-center justify-center">
          <div className="w-52 h-52 rounded-full border border-lab-cyan/40 flex items-center justify-center animate-pulse">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-lab-amber/20 to-lab-cyan/20 border border-lab-amber backdrop-blur-md flex items-center justify-center">
              <span className="font-mono text-xs text-lab-amber tracking-widest uppercase font-bold">
                PUMAKER LAB
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[500px] lg:min-h-[640px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-label="Escultura interactiva 3D del laboratorio PUMAKER"
      role="img"
    />
  );
};
