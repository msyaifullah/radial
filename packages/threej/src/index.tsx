import * as React from "react";
import { InputHTMLAttributes } from "react";
import { Vector3 } from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";

import { proxy } from "valtio";

import {
  useGLTF,
  useTexture,
  AccumulativeShadows,
  RandomizedLight,
  Decal,
  Environment,
  Center,
} from "@react-three/drei";
import MeshComponent from "./meshone";
import MeshComponent2 from "./meshtwo";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: "small" | "medium" | "large";
}

const state = proxy({
  intro: true,
  colors: ["#ccc", "#EFBD4E", "#80C670", "#726DE8", "#EF674E", "#353934"],
  decals: ["react", "three2", "pmndrs"],
  color: "#EFBD4E",
  decal: "three2",
});

interface ShirtProps {
  decal?: string;
  color?: string;
}

function Shirt(props: ShirtProps) {
  const snap = useSnapshot(state);
  const texture = useTexture(`/3d/tshirt/${snap.decal}.png`);
  const { nodes, materials } = useGLTF("/3d/tshirt/shirt_baked_collapsed.glb");
  useFrame((state, delta) =>
    easing.dampC((materials.lambert1 as any).color, snap.color, 0.25, delta)
  );
  return (
    <mesh
      castShadow
      geometry={(nodes.T_Shirt_male as THREE.Mesh).geometry}
      material={materials.lambert1}
      material-roughness={1}
      {...props}
      dispose={null}
    >
      <Decal
        position={[0, 0.04, 0.15]}
        rotation={[0, 0, 0]}
        scale={0.15}
        map={texture}
      />
    </mesh>
  );
}

function Backdrop() {
  const shadows = React.useRef<any>();
  useFrame((state, delta) =>
    easing.dampC(
      shadows.current.getMesh().material.color,
      (state as any).color,
      0.25,
      delta
    )
  );
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
}

interface CameraRigProps {
  children: React.ReactNode;
}

function CameraRig({ children }: CameraRigProps) {
  const group = React.useRef<THREE.Group | null>(null);
  const snap = useSnapshot(state);
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [snap.intro ? -state.viewport.width / 4 : 0, 0, 2],
      0.25,
      delta
    );
    easing.dampE(
      group.current!.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
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
      </>
    );
  }
);

Threej.displayName = "Threej";

export { Threej };
