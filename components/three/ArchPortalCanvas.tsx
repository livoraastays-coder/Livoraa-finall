"use client";

import { Canvas } from "@react-three/fiber";
import { ArchPortalScene } from "./ArchPortalScene";
import type { ArchPortalConfig } from "@/lib/three/archPortalConfig";

/**
 * frameloop="demand" is the key performance decision here: React Three
 * Fiber only renders a frame when something actually changes (a prop
 * feeding the scene, or an explicit invalidate() call), instead of
 * running a continuous 60fps render loop for the lifetime of the
 * canvas. Combined with ArchPortal.tsx unmounting this component
 * entirely when the section is far from the viewport, the GPU is only
 * ever doing work when the scene is both visible and actually moving.
 */
export default function ArchPortalCanvas({
  progress,
  config,
}: {
  progress: number;
  config: ArchPortalConfig;
}) {
  return (
    <Canvas
      frameloop="demand"
      dpr={config.dpr}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{
        position: config.camera[0].position,
        fov: config.camera[0].fov,
        near: 0.1,
        far: 40,
      }}
    >
      <ArchPortalScene progress={progress} config={config} />
    </Canvas>
  );
}
