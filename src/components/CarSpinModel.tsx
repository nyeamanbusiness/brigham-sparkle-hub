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
    if (!groupRef.current) return;

    // Auto-center the Corvette using bounding box
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);

    // Scale model based on its size so it always fits perfectly
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 4 / maxDim; // bigger number = bigger model

    groupRef.current.scale.set(scale, scale, scale);
  }, [scene]);

  // Drag → rotation velocity
  useEffect(() => {
    const down = (e: MouseEvent | TouchEvent) => {
      dragging.current = true;
      lastX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
    };

    const move = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;

      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const delta = x - lastX.current;
      velRef.current = delta * 0.015; // faster swipe spin
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

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (!dragging.current) {
      velRef.current += (0.6 * delta - velRef.current) * 0.1;
    } else {
      velRef.current *= 0.9;
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
    <div className="w-full h-[350px] md:h-[420px] flex justify-center items-center">
      <Canvas gl={{ antialias: true, alpha: true }} camera={{ position: [0, 1, 6], fov: 35 }}>
        <ambientLight intensity={1.0} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, 5, -5]} intensity={0.6} />

        <Suspense fallback={null}>
          <CarModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
