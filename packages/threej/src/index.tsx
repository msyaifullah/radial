import * as React from "react";
import { InputHTMLAttributes } from "react";
import { Mesh } from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: "small" | "medium" | "large";
}

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

const Threej = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <>
        <Canvas>
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          <React.Suspense fallback={null}>
            <MeshComponent fileUrl="/shiba/scene.gltf" />
          </React.Suspense>
        </Canvas>
        <Canvas>
          <React.Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[-2, 5, 2]} />
            <MeshComponent2 />
          </React.Suspense>
        </Canvas>
      </>
    );
  }
);
Threej.displayName = "Threej";

export { Threej };
