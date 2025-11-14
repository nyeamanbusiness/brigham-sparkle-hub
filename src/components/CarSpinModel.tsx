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
      // Center the model
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);

      // Scale model
      groupRef.current.scale.set(0.5, 0.5, 0.5);

      // ★ Lift car upward so it sits closer to navbar
      scene.position.y += 1.2;
    }
  }, [scene]);

  // Drag → spin speed
  useEffect(() => {
    const down = (e: MouseEvent | TouchEvent) => {
      dragging.current = true;
      lastX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
    };

    const move = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current || !groupRef.current) return;

      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const delta = x - lastX.current;
      velRef.current = delta * 0.01;
      lastX.current = x;
    };

    const up = () => (dragging.current = false);

    window.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);

    window.addEventListener("touchstart", down);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", up);

    return () => {
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);

      window.removeEventListener("touchstart", down);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, []);

  // Animation loop
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Auto-spin
    if (!dragging.current) {
      velRef.current += (0.6 * delta - velRef.current) * 0.1;
    } else {
      velRef.current *= 0.95;
    }

    groupRef.current.rotateY(velRef.current * delta * 60);
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

export default function CarSpinModel() {
  return (
    // ★ Reduced height so hero section isn't massive
    <div className="relative w-full h-[170px] md:h-[200px] lg:h-[220px]">
      <Canvas camera={{ position: [0, 0, 10] }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.3} />
        <directionalLight position={[-5, 5, -5]} intensity={0.6} />
        <Suspense fallback={null}>
          <CarModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
