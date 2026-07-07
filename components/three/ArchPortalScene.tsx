"use client";

import { useMemo } from "react";
import { ArchFrame, HeroArchIcon } from "./ArchGeometry";
import { LogoPlane } from "./LogoPlane";
import { CameraRig } from "./CameraRig";
import { getResolveState, type ArchPortalConfig } from "@/lib/three/archPortalConfig";

/**
 * Pure scene content for the arch portal — no scroll listeners, no DOM,
 * no viewport logic. Everything it needs (scroll progress, and which
 * art-directed config to use) arrives as props from ArchPortal.tsx.
 *
 * The "resolve" sequence: as progress approaches 1, the receding
 * corridor arches fade out, the background/fog lighten from the dark
 * corridor palette to the brand's resolved backdrop, and the hero arch
 * icon + wordmark + STAYS + rules fade/settle into the complete
 * official LIVORAA STAYS lockup.
 */
export function ArchPortalScene({
  progress,
  config,
}: {
  progress: number;
  config: ArchPortalConfig;
}) {
  const arches = useMemo(() => {
    return Array.from({ length: config.arch.count }, (_, i) => {
      const z = config.arch.startZ - i * config.arch.spacingZ;
      return { key: `arch-${i}`, position: [0, config.arch.height / 2 - 1.4, z] as [number, number, number] };
    });
  }, [config]);

  const resolveState = getResolveState(config, progress);

  const textRevealT = Math.min(
    1,
    Math.max(0, (progress - config.logo.appearFrom) / (1 - config.logo.appearFrom || 1))
  );
  // The arch icon gets a slight head start on the wordmark/STAYS text,
  // so the architecture visibly "arrives" a beat before the identity
  // text settles in — a more controlled, layered resolve.
  const iconRevealT = Math.min(1, textRevealT * 1.35);

  const logoHeight = config.logo.width * (420 / 1024);
  const iconWidth = config.logo.width * config.logo.archIconWidthRatio;
  const iconHeight = iconWidth * 1.35;
  const iconPosition: [number, number, number] = [
    config.logo.position[0],
    config.logo.position[1] + logoHeight / 2 + config.logo.width * config.logo.archIconGap + iconHeight / 2,
    config.logo.position[2],
  ];

  return (
    <>
      <CameraRig progress={progress} config={config} />

      <color attach="background" args={[resolveState.backgroundColor]} />
      <fog attach="fog" args={[resolveState.backgroundColor, 6, 26]} />

      <ambientLight intensity={0.35 + resolveState.paletteT * 0.4} />
      <directionalLight
        position={[2, 4, 6]}
        intensity={0.6}
        color={config.rimLightColor}
      />
      <pointLight
        position={[0, 1, config.logo.position[2] + 1.5]}
        intensity={0.8}
        color={config.rimLightColor}
        distance={10}
      />

      {arches.map((arch) => (
        <ArchFrame
          key={arch.key}
          position={arch.position}
          width={config.arch.width}
          height={config.arch.height}
          depth={config.arch.depth}
          segments={config.arch.segments}
          color={config.archColor}
          opacity={resolveState.corridorOpacity}
        />
      ))}

      <HeroArchIcon
        position={iconPosition}
        width={iconWidth}
        color={resolveState.markColor}
        opacity={iconRevealT}
        segments={config.arch.segments}
      />

      <LogoPlane
        position={config.logo.position}
        width={config.logo.width}
        opacity={textRevealT}
        scale={0.85 + textRevealT * 0.15}
        markColor={resolveState.markColor}
      />
    </>
  );
}
