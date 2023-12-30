import * as React from "react";
import { InputHTMLAttributes } from "react";
import { Mesh } from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MeshComponent from "./meshone";
import MeshComponent2 from "./meshtwo";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: "small" | "medium" | "large";
}

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
