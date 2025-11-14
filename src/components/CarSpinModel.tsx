import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function CarModel() {
  const { scene } = useGLTF("/2019_chevrolet_corvette_c8_stingray.glb");
  const groupRef = useRef<THREE.Group>(null);
  const velRef = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);

  useEffect(() => {
    if (groupRef.current) {
      // Center the model using Box3
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);

      // Scale the model
      groupRef.current.scale.set(3, 3, 3);
    }
  }, [scene]);

  // Mouse + touch drag rotation
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      dragging.current = true;
      lastX.current = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (dragging.current && groupRef.current) {
        const deltaX = e.clientX - lastX.current;
        velRef.current = deltaX * 0.01;
        lastX.current = e.clientX;
      }
    };

    const handleMouseUp = () => {
      dragging.current = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      dragging.current = true;
      lastX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (dragging.current && groupRef.current) {
        const deltaX = e.touches[0].clientX - lastX.current;
        velRef.current = deltaX * 0.01;
        lastX.current = e.touches[0].clientX;
      }
    };

    const handleTouchEnd = () => {
      dragging.current = false;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Rotation logic
  useFrame((state, delta) => {
    if (groupRef.current) {
      if (!dragging.current) {
        // Auto-spin speed
        velRef.current += (0.6 * delta - velRef.current) * 0.1;
      } else {
        velRef.current *= 0.95;
      }

      groupRef.current.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), velRef.current * delta * 60);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

export default function CarSpinModel() {
  return (
    <div className="w-full h-[300px] lg:h-[400px]">
      <Canvas camera={{ position: [0, 0, 8.5] }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <Suspense fallback={null}>
          <CarModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
