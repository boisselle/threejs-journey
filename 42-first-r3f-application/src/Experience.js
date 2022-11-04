import { useThree, extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CustomObject from "./CustomObject.js";

extend({ OrbitControls });

export default function Experience() {
  const { camera, gl } = useThree();

  const cubeRef = useRef(() => {});
  const groupRef = useRef(() => {});

  // This function will be called on each frame before rendering the scene (51:00)
  useFrame((state, delta) => {
    // Use delta to standardize rotation

    // Camera animation
    // const angle = state.clock.elapsedTime;
    // state.camera.position.x = Math.sin(angle);
    // state.camera.position.z = Math.cos(angle);
    // state.camera.lookAt(0, 0, 0);

    cubeRef.current.rotation.y += delta;
    // groupRef.current.rotation.y += delta;
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <mesh
          ref={cubeRef}
          rotation-y={Math.PI * 0.35}
          position-x={2}
          scale={1.5}
        >
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="yellowgreen" />
      </mesh>

      <CustomObject />
    </>

    // <>
    //   <mesh position={[-2, 0, 0]} scale={1.1}>
    //     <sphereGeometry args={[0.6, 32, 32]} />
    //     <meshBasicMaterial color="orange" />
    //   </mesh>
    //   <mesh position={[2, 0, 0]} scale={1.1}>
    //     <boxGeometry />
    //     <meshBasicMaterial color="mediumpurple" />
    //   </mesh>
    //   <mesh position={[0, -1, -1]} rotation-x={Math.PI * 0.44} scale={1.1}>
    //     <planeBufferGeometry attach="geometry" args={[5, 5]} />
    //     <meshBasicMaterial color="green" />
    //   </mesh>
    // </>
  );
}

/*
General notes.

When you have state reactive data, the component re-renders. You don't want to do it
on each frame.

Animate with useFrame by changing the mesh directly, not directly within the component.

Use a reference to manipulate the mesh directly. 

Animating an element: useRef() -> useFrame() -> <mesh ref={ref} ... />

We first instantiate a reference object for our element using useRef.
Then, we pass in state and delta to useFrame, and manipulate the reference object within the function body.
Finally, we add the reference object as an attribute to the mesh. 

*/
