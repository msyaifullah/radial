import * as React from "react";
import { Mesh } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const MeshComponent = ({ fileUrl }: { fileUrl: string }) => {
    const mesh = React.useRef<Mesh>(null!);
    const gltf = useLoader(GLTFLoader, fileUrl);
  
    useFrame(() => {
      mesh.current.rotation.y += 0.01;
    });
  
    return (
      <mesh ref={mesh}>
        <primitive object={gltf.scene} />
      </mesh>
    );
  };

export default MeshComponent;