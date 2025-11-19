import React, { Suspense, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float, Text3D, Center } from "@react-three/drei";

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

            vec2 m = (uMouse*0.5+0.5)*3.0;
            float ripple = 0.12 * sin(10.0*distance(uv,m)-uTime*2.0)/(1.0 + 6.0*distance(uv,m));

            float n = noise(uv + ripple + t);

            vec3 c1 = vec3(0.45, 0.12, 0.78);
            vec3 c2 = vec3(0.65, 0.25, 0.95);

            vec3 col = mix(c1, c2, smoothstep(0.2,0.8, vUv.x + 0.12*n));
            col += 0.20 * vec3(0.95,0.9,1.0) * pow(smoothstep(0.6,1.0,n), 3.0);

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
  
  const isDragging = useRef(false);
  const previousPosition = useRef({ x: 0, y: 0 });
  const velocity = useRef(0);
  const targetRotation = useRef(0);

  useEffect(() => {
    const handleStart = (clientX: number) => {
      isDragging.current = true;
      previousPosition.current = { x: clientX, y: 0 };
      velocity.current = 0;
    };

    const handleMove = (clientX: number) => {
      if (!isDragging.current || !group.current) return;
      const deltaX = clientX - previousPosition.current.x;
      targetRotation.current += deltaX * 0.01;
      velocity.current = deltaX * 0.01;
      previousPosition.current = { x: clientX, y: 0 };
    };

    const handleEnd = () => {
      isDragging.current = false;
    };

    const onMouseDown = (e: MouseEvent) => handleStart(e.clientX);
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onMouseUp = () => handleEnd();
    const onTouchStart = (e: TouchEvent) => handleStart(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onTouchEnd = () => handleEnd();

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    if (group.current) {
      if (isDragging.current) {
        group.current.rotation.y = targetRotation.current;
      } else {
        // Auto-spin with damping
        velocity.current *= 0.95;
        if (Math.abs(velocity.current) > 0.001) {
          targetRotation.current += velocity.current;
          group.current.rotation.y = targetRotation.current;
        } else {
          targetRotation.current += 0.005;
          group.current.rotation.y = targetRotation.current;
        }
      }
    }
    
    if (sweep.current) {
      sweep.current.position.x = Math.sin(t * 1.3) * 2.6;
      sweep.current.position.y = 0.6 + Math.sin(t * 0.9) * 0.5;
      sweep.current.intensity = 0.9 + Math.max(0, Math.sin(t * 2.1)) * 0.8;
    }
  });

  const isMobile = viewport.width < 6;
  const carScale = isMobile ? 5.5 : 7.0;
  const carY = isMobile ? 1.8 : 2.2;

  return (
    <group ref={group} position={[0, carY, 0]} scale={carScale}>
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
  const titleSize = isMobile ? 0.38 : 0.58;
  const subSize = isMobile ? 0.16 : 0.24;
  const scale = THREE.MathUtils.clamp(viewport.width / 10, 0.55, 1.0);
  const posY = isMobile ? -2.2 : -1.8;

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
          <meshStandardMaterial color="#f9fafb" metalness={1} roughness={0.08} />
        </Text3D>
      </Center>

      <Center position={[0, -(isMobile ? 0.42 : 0.58), 0]}>
        <Text3D font={FONT_PATH} size={subSize} height={0.03}>
          Auto Detailing Service
          <meshStandardMaterial color="#e9d5ff" metalness={0.9} roughness={0.18} />
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
      style={{ 
        touchAction: 'none',
        cursor: 'grab'
      }}
    >
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </Canvas>
  );
}
