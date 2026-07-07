import * as THREE from "three";
import { useMemo } from "react";

/**
 * Builds a single "arch frame" as a real extruded 3D mesh: an outer
 * rounded-top doorway profile with a smaller matching profile cut out
 * as a hole, extruded along Z to give the frame physical depth. This is
 * genuine geometry (vertices/faces), not a flat image or CSS mask — the
 * camera dollies through the cut-out hole of each frame in sequence.
 *
 * `segments` controls the arc's curve resolution (lower = fewer
 * vertices = cheaper to render) — this is the "reduce geometry
 * complexity on mobile" lever referenced in the scene configs.
 */
function buildArchProfile(width: number, height: number, curveSegments: number) {
  const shape = new THREE.Shape();
  const radius = width / 2;
  const straightHeight = Math.max(0.01, height - radius);

  shape.moveTo(-radius, 0);
  shape.lineTo(radius, 0);
  shape.lineTo(radius, straightHeight);
  shape.absarc(0, straightHeight, radius, 0, Math.PI, false);
  shape.lineTo(-radius, 0);

  return shape;
}

function buildArchFrameGeometry(
  width: number,
  height: number,
  depth: number,
  segments: number
) {
  const outer = buildArchProfile(width, height, segments);

  const thickness = Math.min(width, height) * 0.16;
  const inner = buildArchProfile(
    Math.max(0.2, width - thickness * 2),
    Math.max(0.2, height - thickness),
    segments
  );
  outer.holes.push(inner);

  const geometry = new THREE.ExtrudeGeometry(outer, {
    depth,
    bevelEnabled: false,
    curveSegments: segments,
  });
  geometry.center();
  return geometry;
}

/**
 * A single arch frame mesh, positioned in the receding corridor. Camera
 * passes through its cut-out opening as scroll progress advances.
 * `opacity` drives the "architecture dissolving" fade as the journey
 * resolves into the brand mark.
 */
export function ArchFrame({
  position,
  width,
  height,
  depth,
  segments,
  color,
  opacity = 1,
}: {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
  segments: number;
  color: string;
  opacity?: number;
}) {
  const geometry = useMemo(
    () => buildArchFrameGeometry(width, height, depth, segments),
    [width, height, depth, segments]
  );

  if (opacity <= 0.01) return null;

  return (
    <mesh geometry={geometry} position={position} castShadow={false} receiveShadow={false}>
      <meshStandardMaterial
        color={color}
        roughness={0.85}
        metalness={0.05}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  );
}

/**
 * Builds a single thin arch OUTLINE (a ring, not a thick frame) — the
 * building block for the official mark's double-line arch icon.
 */
function buildArchOutlineGeometry(
  width: number,
  height: number,
  strokeWidth: number,
  depth: number,
  segments: number
) {
  const outer = buildArchProfile(width, height, segments);
  const inner = buildArchProfile(
    Math.max(0.02, width - strokeWidth * 2),
    Math.max(0.02, height - strokeWidth),
    segments
  );
  outer.holes.push(inner);

  const geometry = new THREE.ExtrudeGeometry(outer, {
    depth,
    bevelEnabled: false,
    curveSegments: segments,
  });
  geometry.center();
  return geometry;
}

/**
 * THE HERO ARCH ICON
 * ---------------------------------------------------------------------
 * The small double-line arch glyph from the official LIVORAA STAYS mark
 * — two concentric thin arch outlines with a short "ground line"
 * extending past the legs, matching the reference logo. This sits
 * above the wordmark (see LogoPlane) and fades/settles into place as
 * the corridor arches dissolve, forming the complete lockup at 100%
 * scroll progress.
 * ---------------------------------------------------------------------
 */
export function HeroArchIcon({
  position,
  width,
  color,
  opacity,
  segments,
}: {
  position: [number, number, number];
  width: number;
  color: string;
  opacity: number;
  segments: number;
}) {
  const height = width * 1.35;
  const strokeWidth = width * 0.05;
  const gap = width * 0.09;
  const depth = width * 0.02;

  const outerGeometry = useMemo(
    () => buildArchOutlineGeometry(width, height, strokeWidth, depth, segments),
    [width, height, strokeWidth, depth, segments]
  );
  const innerGeometry = useMemo(
    () =>
      buildArchOutlineGeometry(
        width - gap * 2,
        height - gap,
        strokeWidth,
        depth,
        segments
      ),
    [width, height, gap, strokeWidth, depth, segments]
  );

  if (opacity <= 0.01) return null;

  const groundLineWidth = width + gap * 1.4;

  return (
    <group position={position}>
      <mesh geometry={outerGeometry}>
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>
      <mesh geometry={innerGeometry}>
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>
      {/* Ground line beneath the arch, extending slightly past the legs */}
      <mesh position={[0, -height / 2 - strokeWidth * 0.6, 0]}>
        <boxGeometry args={[groundLineWidth, strokeWidth * 0.7, depth]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>
    </group>
  );
}
