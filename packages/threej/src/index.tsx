import * as React from "react";
import { InputHTMLAttributes } from "react";
import { Vector3 } from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Environment, Center } from "@react-three/drei";

import MeshComponent from "./meshone";
import MeshComponent2 from "./meshtwo";
import { Customizer, CameraRig, Backdrop, Shirt } from "./tshirtmod";

import "./styles.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: "small" | "medium" | "large";
}

const Threej = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <>
        {/* <Canvas>
          <pointLight position={new Vector3(10, 10, 10)} />
          <OrbitControls />
          <React.Suspense fallback={null}>
            <MeshComponent fileUrl="/3d/shiba/scene.gltf" />
          </React.Suspense>
        </Canvas>
        <Canvas>
          <React.Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={new Vector3(-2, 5, 2)} />
            <MeshComponent2 />
          </React.Suspense>
        </Canvas> */}

        <>
          <Canvas
            style={{ height: "50dvh", width: "100%" }}
            shadows
            camera={{ position: [0, 0, 2.5], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
            eventSource={document.getElementById("root") || undefined}
            eventPrefix="client"
          >
            <React.Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
              <CameraRig>
                <Backdrop />
                <Center>
                  <Shirt />
                </Center>
              </CameraRig>
            </React.Suspense>
          </Canvas>
          <Customizer />
        </>
      </>
    );
  }
);

Threej.displayName = "Threej";

export { Threej };
