import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function InnerCarModel() {
  const { scene } = useGLTF("/2019_chevrolet_corvette_c8_stingray.glb");

  const groupRef = useRef<THREE.Group>(null!);
  const velRef = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);

  // Normalize size & center the model so it always fits nicely
  const normalizedCar = useMemo(() => {
    const cloned = scene.clone(true);

    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;

    const targetSize = 3.5; // how “big” in world units we want it
    const scale = targetSize / maxDim;

    cloned.scale.setScalar(scale);

    const center = new THREE.Vector3();
    box.getCenter(center);
    cloned.position.sub(center);

    // Drop it slightly so it doesn’t float too high
    cloned.position.y -= 0.6;

    return cloned;
  }, [scene]);

  // Drag → spin speed (mouse + touch)
  useEffect(() => {
    const handleDown = (e: MouseEvent | TouchEvent) => {
      dragging.current = true;
      lastX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const deltaX = clientX - lastX.current;
      lastX.current = clientX;

      // Swipe sensitivity
      velRef.current += (deltaX / window.innerWidth) * Math.PI * 2;
    };

    const handleUp = () => {
      dragging.current = false;
    };

    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    window.addEventListener("touchstart", handleDown, { passive: true });
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);

      window.removeEventListener("touchstart", handleDown as any);
      window.removeEventListener("touchmove", handleMove as any);
      window.removeEventListener("touchend", handleUp);
    };
  }, []);

  // Animation loop
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Auto spin when not dragging
    if (!dragging.current) {
      const autoSpeed = 0.7; // rad/sec
      velRef.current += (autoSpeed * delta - velRef.current) * 0.08;
    } else {
      // Damping when user flings it
      velRef.current *= 0.95;
    }

    groupRef.current.rotation.y += velRef.current;
  });

  return (
    <group ref={groupRef}>
      {/* Simple lighting */}
      <hemisphereLight intensity={0.7} groundColor={"#222222"} />
      <directionalLight position={[5, 8, 8]} intensity={1.4} />
      <directionalLight position={[-4, 5, -3]} intensity={0.6} />

      <primitive object={normalizedCar} />
    </group>
  );
}

export default function CarSpinModel() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0.8, 7], fov: 35 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <InnerCarModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
