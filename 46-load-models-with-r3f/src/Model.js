import { Clone, useGLTF } from "@react-three/drei";

export default function Model() {
  //   const model = useLoader(GLTFLoader, "./hamburger.glb", (loader) => {
  //     const dracoLoader = new DRACOLoader();
  //     dracoLoader.setDecoderPath("./draco/");
  //     loader.setDRACOLoader(dracoLoader);
  //   });

  // Much quicker with drei.

  const model = useGLTF("./hamburger-draco.glb");

  return (
    <>
      <Clone object={model.scene} scale={0.35} position-x={-4} />
      <Clone object={model.scene} scale={0.35} position-x={0} />
      <Clone object={model.scene} scale={0.35} position-x={4} />
    </>
  );
}

useGLTF.preload("./hamburger-draco.glb");
