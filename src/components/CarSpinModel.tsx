import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function CarModel() {
  const { scene } = useGLTF("/2019_chevrolet_corvette_c8_stingray.glb");

  // FIX: Make car large and centered
  scene.scale.set(12, 12, 12); // ← Increase this if needed
  scene.position.set(0, -1.2, 0); // ← Moves car down
  scene.rotation.set(0, Math.PI, 0);

  return <primitive object={scene} />;
}

export default function CarSpinModel() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas camera={{ position: [0, 1.5, 6], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          <CarModel />

          {/* Slow rotation */}
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
        </Suspense>
      </Canvas>
    </div>
  );
}
