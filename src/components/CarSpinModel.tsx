import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function CarModel() {
  const { scene } = useGLTF("/chevrolet-corvette-c8.glb");
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    // Force center the model
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);

    // Force a strong scale DOWN (GLB is probably huge)
    groupRef.current.scale.set(0.02, 0.02, 0.02);
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* TEMPORARY: Adds a floor grid so we know the scene is rendering */}
      <gridHelper args={[10, 10]} />

      <primitive object={scene} />
    </group>
  );
}

export default function CarSpinModel() {
  return (
    <div className="w-full h-[400px] bg-white">
      <Canvas camera={{ position: [0, 3, 10], fov: 40 }}>
        {/* Strong lighting so model is always visible */}
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />

        <Suspense fallback={<span>Loading 3D model...</span>}>
          <CarModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
