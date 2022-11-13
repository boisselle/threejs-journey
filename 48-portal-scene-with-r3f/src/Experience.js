import {
  shaderMaterial,
  Sparkles,
  Center,
  useTexture,
  useGLTF,
  OrbitControls,
} from "@react-three/drei";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import portalVertexShader from "./shaders/portal/vertex.js";
import portalFragmentShader from "./shaders/portal/fragment.js";
import { useRef } from "react";
import { ReactThreeFiber } from "@react-three/fiber";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000000"),
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial });

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");

  const bakedTexture = useTexture("./model/baked.jpg");
  bakedTexture.flipY = false;

  const portalMaterial = useRef();
  useFrame((state, delta) => {
    portalMaterial.current.uTime += delta;
  });

  console.log(nodes);
  return (
    <>
      <color args={["#201919"]} attach="background" />

      <OrbitControls makeDefault />

      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>
        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          <portalMaterial ref={portalMaterial} />
        </mesh>
        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1.1}
          speed={0.5}
          count={50}
          color="white"
        />
        {/* <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1.1}
          speed={5000}
          count={2000}
          color="limegreen"
        />
        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1.1}
          speed={5000}
          count={40}
          color="hotpink" */}
        {/* /> */}
      </Center>
    </>
  );
}