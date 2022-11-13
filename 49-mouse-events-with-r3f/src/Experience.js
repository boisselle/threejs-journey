import { useFrame } from "@react-three/fiber";
import { meshBounds, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Experience() {
  const cube = useRef();
  const hamburger = useLoader(GLTFLoader, "./hamburger.glb");

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const eventHandler = (event) => {
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
  };

  console.log(hamburger.scene);
  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Suspense fallback={null}>
        <primitive
          object={hamburger.scene}
          scale={0.1}
          onClick={(event) => {
            console.log(event.object.name);
            event.stopPropagation();
          }}
        />
      </Suspense>

      <mesh
        position-x={-2}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        ref={cube}
        raycast={meshBounds}
        position-x={2}
        scale={1.5}
        onClick={eventHandler}
        onPointerEvent={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
