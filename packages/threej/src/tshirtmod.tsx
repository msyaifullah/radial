import * as React from "react";
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
} from "@react-three/drei";

export const state = proxy({
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

export function Shirt(props: ShirtProps) {
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

export function Backdrop() {
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

export function CameraRig({ children }: CameraRigProps) {
  const group = React.useRef<THREE.Group | null>(null);
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, 2], 0.25, delta);
    easing.dampE(
      group.current!.rotation,
      [state.pointer.y / 10, -state.pointer.x / 0.1, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
}

export function Customizer() {
  const snap = useSnapshot(state);
  return (
    <div className="customizer">
      <div className="color-options">
        {snap.colors.map((color: string) => (
          <div
            key={color}
            className={`circle`}
            style={{ background: color }}
            onClick={() => (state.color = color)}
          >
            {color}
          </div>
        ))}
      </div>
      <div className="decals">
        <div className="decals--container">
          {snap.decals.map((decal: string) => (
            <div
              key={decal}
              className={`decal`}
              onClick={() => (state.decal = decal)}
            >
              <img src={"/3d/tshirt/" + decal + "_thumb.png"} alt="brand" />
            </div>
          ))}
        </div>
      </div>
      <button
        className="share"
        style={{ background: snap.color }}
        onClick={() => {
          const link = document.createElement("a");
          link.setAttribute("download", "canvas.png");
          link.setAttribute(
            "href",
            (document.querySelector("canvas") as HTMLCanvasElement)!
              .toDataURL("image/png")
              .replace("image/png", "image/octet-stream")
          );
          link.click();
        }}
      >
        DOWNLOAD
      </button>
      <button
        className="exit"
        style={{ background: snap.color }}
        onClick={() => (state.intro = true)}
      >
        GO BACK
      </button>
    </div>
  );
}
