import * as React from "react";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";

const MeshComponent2 = () => {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#8352FD"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  );
};

export default MeshComponent2;