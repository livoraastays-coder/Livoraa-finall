"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getCameraStateAtProgress, type ArchPortalConfig } from "@/lib/three/archPortalConfig";

/**
 * Applies the camera path defined in the active (desktop/mobile) scene
 * config. Runs on every `progress` change rather than every animation
 * frame — combined with the Canvas's frameloop="demand" mode, this means
 * the scene only renders when scroll actually moves it, not continuously.
 */
export function CameraRig({
  progress,
  config,
}: {
  progress: number;
  config: ArchPortalConfig;
}) {
  const { camera, invalidate } = useThree();

  useEffect(() => {
    const state = getCameraStateAtProgress(config, progress);
    camera.position.set(...state.position);
    camera.lookAt(new THREE.Vector3(...state.lookAt));
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = state.fov;
      camera.updateProjectionMatrix();
    }
    invalidate();
  }, [progress, config, camera, invalidate]);

  return null;
}
