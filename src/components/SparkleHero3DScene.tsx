import React, { Suspense, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Text3D, Center } from "@react-three/drei";

const MODEL_PATH = "/2019_chevrolet_corvette_c8_stingray.glb";
const FONT_PATH = "/fonts/helvetiker_regular.typeface.json";

/* ---------------------- LIQUID PURPLE BACKGROUND ---------------------- */
function LiquidBackground() {
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value = clock.getElapsedTime();
    mat.current.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
  });

  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
      <shaderMaterial
        ref={mat}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2() },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv; 
          uniform float uTime; 
          uniform vec2 uMouse;

          float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
          float noise(vec2 p){
            vec2 i = floor(p), f = fract(p);
            float a = hash(i), b = hash(i+vec2(1.,0.)), c = hash(i+vec2(0.,1.)), d = hash(i+vec2(1.,1.));
            vec2 u = f*f*(3.0-2.0*f);
            return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
          }

          void main(){
            vec2 uv = vUv*3.0; 
            float t = uTime*0.35;
            uv += 0.35*vec2(noise(uv+t), noise(uv+3.14+t));

            vec3 c1 = vec3(0.45, 0.12, 0.78);
            vec3 c2 = vec3(0.65, 0.25, 0.95);

            float n = noise(uv + t);
            vec3 col = mix(c1, c2, smoothstep(0.2,0.8, vUv.x + 0.12*n));

            gl_FragColor = vec4(col,1.0);
          }
        `}
      />
    </mesh>
  );
}

/* --------------------------- CAR MODEL --------------------------- */
function CarModel() {
  const { scene } = useGLTF(MODEL_PATH);
  const group = useRef<THREE.Group>(null!);
  const sweep = useRef<THREE.PointLight>(null!);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  const { viewport } = useThree();
  const isMobile = viewport.width < 6;

  // rotation states
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const dragRotation = useRef(0);
  const autoRotation = useRef(0);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    if (group.current) {
      if (!isDragging.current) {
        autoRotation.current += delta * 0.4;
      }
      group.current.rotation.y = autoRotation.current + dragRotation.current;
    }

    if (sweep.current) {
      sweep.current.position.x = Math.sin(t * 1.3) * 2.6;
      sweep.current.position.y = 0.6 + Math.sin(t * 0.9) * 0.5;
      sweep.current.intensity = 0.9 + Math.max(0, Math.sin(t * 2.1)) * 0.8;
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    isDragging.current = true;
    e.target.setPointerCapture(e.pointerId);
    lastX.current = e.clientX;
  };

  const handlePointerUp = (e: any) => {
    isDragging.current = false;
    e.target.releasePointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastX.current;
    lastX.current = e.clientX;
    dragRotation.current += deltaX * 0.01;
  };

  return (
    <group
      ref={group}
      position={[0, isMobile ? 0.9 : 0.8, 0]}   {/* UPDATED: better centered on mobile */}
      scale={isMobile ? 36.0 : 50.0}            {/* UPDATED: adjusted mobile scale for proper centering */}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <hemisphereLight intensity={0.6} color="#ffffff" groundColor="#222222" />
      <directionalLight position={[5, 6, 7]} intensity={1.2} />
      <directionalLight position={[-4, 3, 2]} intensity={0.6} />
      <pointLight ref={sweep} color="#b7a4ff" distance={9} decay={2} intensity={1.1} />
      <primitive object={cloned} />
    </group>
  );
}

/* --------------------------- FLOATING TEXT --------------------------- */
function FloatingText() {
  const group = useRef<THREE.Group>(null!);
  const { viewport } = useThree();
  const isMobile = viewport.width < 6;

  const titleSize = isMobile ? 0.32 : 0.4;
  const subSize = isMobile ? 0.16 : 0.22;
  const scale = THREE.MathUtils.clamp(viewport.width / 12, 0.55, 0.85);

  // UPDATED: keep text centered and slightly lower on mobile
  const posY = isMobile ? -0.85 : -0.55;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.x = Math.sin(t * 0.2) * 0.03;
    }
  });

  return (
    <group ref={group} position={[0, posY, 0]} scale={scale}>
      <Center>
        <Text3D font={FONT_PATH} size={titleSize} height={0.07} bevelEnabled bevelThickness={0.02} bevelSize={0.01}>
          SparkleAutoDetailingLLC.com
          <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.08} />
        </Text3D>
      </Center>

      <Center position={[0, -(isMobile ? 0.38 : 0.42), 0]}>
        <Text3D font={FONT_PATH} size={subSize} height={0.03}>
          Auto Detailing Service
          <meshStandardMaterial color="#f3e5ff" metalness={0.9} roughness={0.18} />
        </Text3D>
      </Center>
    </group>
  );
}

/* --------------------------- HERO SCENE --------------------------- */
function HeroScene() {
  return (
    <>
      <LiquidBackground />
      <CarModel />
      <FloatingText />
    </>
  );
}

useGLTF.preload(MODEL_PATH);

export function SparkleHero3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.5], fov: 45 }}
      gl={{ antialias: true, outputColorSpace: THREE.SRGBColorSpace }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </Canvas>
  );
}