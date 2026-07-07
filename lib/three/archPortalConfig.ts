// ============================================================================
// ARCH PORTAL — SCENE CONFIGURATION
// Desktop and mobile are art-directed as two genuinely separate scenes,
// not one scene scaled by CSS. Each has its own camera path (position +
// look-at + FOV per keyframe), archway geometry scale/spacing, logo
// placement, geometry complexity, and scroll distance/timing.
//
// Recomposing for a new breakpoint means editing the relevant config
// object below — no changes needed in ArchPortalScene.tsx itself.
// ============================================================================

export type CameraKeyframe = {
  t: number; // 0..1 progress at which this keyframe applies
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
};

export type ArchPortalConfig = {
  /** Height of the scroll-driving wrapper, in viewport heights. */
  scrollVh: number;
  camera: CameraKeyframe[];
  arch: {
    count: number;
    spacingZ: number;
    startZ: number;
    width: number;
    height: number;
    depth: number;
    /** Radial/curve segments — lower on mobile to reduce geometry complexity. */
    segments: number;
  };
  /** The complete LIVORAA STAYS lockup: hero arch icon + wordmark + STAYS + rules. */
  logo: {
    position: [number, number, number];
    /** World-unit width the wordmark texture plane is scaled to. */
    width: number;
    /** Progress (0..1) at which the wordmark/STAYS text starts fading/scaling in. */
    appearFrom: number;
    /** Hero arch icon width as a fraction of `width` — matches the official mark's proportions. */
    archIconWidthRatio: number;
    /** Vertical gap between the hero arch icon and the wordmark, as a fraction of `width`. */
    archIconGap: number;
  };
  /** Progress range over which the trailing corridor arches (everything
   * except the final hero arch) fade out, as the architecture "resolves"
   * into the brand mark. */
  resolve: {
    corridorFadeStart: number;
    corridorFadeEnd: number;
    /** Progress range over which background/fog/hero-arch color lerp
     * from the dark corridor palette to the brand's light, resolved state. */
    paletteStart: number;
    paletteEnd: number;
  };
  background: string;
  /** The brand's light backdrop, matched at 100% scroll to the official mark. */
  resolvedBackground: string;
  archColor: string;
  /** The official mark's ink/olive tone, used for the hero arch + wordmark at rest. */
  resolvedMarkColor: string;
  rimLightColor: string;
  dpr: [number, number];
};

// ---------------------------------------------------------------------
// DESKTOP — wide, cinematic dolly through a deep receding corridor of
// arches. Landscape framing gives room for a long, slow approach.
// ---------------------------------------------------------------------
export const desktopArchPortalConfig: ArchPortalConfig = {
  scrollVh: 340,
  camera: [
    { t: 0, position: [0, 0.4, 13], lookAt: [0, 0.2, 0], fov: 42 },
    { t: 0.35, position: [0, 0.3, 7.5], lookAt: [0, 0.15, -4], fov: 45 },
    { t: 0.7, position: [0, 0.15, 3], lookAt: [0, 0.1, -8], fov: 48 },
    { t: 1, position: [0, 0.05, 0.9], lookAt: [0, 0.15, -6], fov: 42 },
  ],
  arch: {
    count: 4,
    spacingZ: 6,
    startZ: -2,
    width: 4.6,
    height: 7.2,
    depth: 0.5,
    segments: 40,
  },
  logo: {
    position: [0, -0.55, -6],
    width: 4.2,
    appearFrom: 0.82,
    archIconWidthRatio: 0.24,
    archIconGap: 0.1,
  },
  resolve: {
    corridorFadeStart: 0.78,
    corridorFadeEnd: 0.94,
    paletteStart: 0.82,
    paletteEnd: 1,
  },
  background: "#1c1c18",
  resolvedBackground: "#F6F3ED",
  archColor: "#2f2e28",
  resolvedMarkColor: "#5b5f47",
  rimLightColor: "#c9a980",
  dpr: [1, 2],
};

// ---------------------------------------------------------------------
// MOBILE — recomposed for a tall, narrow portrait frame. Wider FOV and
// a closer starting camera keep the archway looking intentional rather
// than cropped; arches are proportioned taller-and-narrower to match a
// doorway silhouette in a portrait frame instead of a stretched desktop
// arch; spacing is tighter so there's no dead dark gap between them.
// ---------------------------------------------------------------------
export const mobileArchPortalConfig: ArchPortalConfig = {
  scrollVh: 280,
  camera: [
    { t: 0, position: [0, 0.5, 8.5], lookAt: [0, 0.35, 0], fov: 62 },
    { t: 0.35, position: [0, 0.4, 5], lookAt: [0, 0.3, -3], fov: 64 },
    { t: 0.7, position: [0, 0.2, 2.2], lookAt: [0, 0.2, -6], fov: 66 },
    { t: 1, position: [0, 0.1, 1.3], lookAt: [0, 0.25, -4.4], fov: 58 },
  ],
  arch: {
    count: 3,
    spacingZ: 4.4,
    startZ: -1.2,
    width: 2.9,
    height: 6.4,
    depth: 0.4,
    segments: 22,
  },
  logo: {
    position: [0, -0.35, -4.4],
    width: 2.5,
    appearFrom: 0.8,
    archIconWidthRatio: 0.26,
    archIconGap: 0.12,
  },
  resolve: {
    corridorFadeStart: 0.76,
    corridorFadeEnd: 0.93,
    paletteStart: 0.8,
    paletteEnd: 1,
  },
  background: "#1c1c18",
  resolvedBackground: "#F6F3ED",
  archColor: "#2f2e28",
  resolvedMarkColor: "#5b5f47",
  rimLightColor: "#c9a980",
  dpr: [1, 1.5],
};

/** Linearly interpolates between two numbers. */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpVec3(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

/** Linearly interpolates between two hex colour strings ("#rrggbb"). */
export function lerpColor(a: string, b: string, t: number): string {
  const ah = parseInt(a.slice(1), 16);
  const bh = parseInt(b.slice(1), 16);
  const ar = (ah >> 16) & 255,
    ag = (ah >> 8) & 255,
    ab = ah & 255;
  const br = (bh >> 16) & 255,
    bg = (bh >> 8) & 255,
    bb = bh & 255;
  const r = Math.round(lerp(ar, br, t));
  const g = Math.round(lerp(ag, bg, t));
  const bl = Math.round(lerp(ab, bb, t));
  return `#${((1 << 24) + (r << 16) + (g << 8) + bl).toString(16).slice(1)}`;
}

/**
 * Computes the "resolve" state at a given progress: how faded the
 * trailing corridor arches should be, and how far along the palette
 * transition (dark corridor -> light resolved brand backdrop) we are.
 * Both are independent 0..1 ranges defined per-config so desktop and
 * mobile can time the resolution differently.
 */
export function getResolveState(config: ArchPortalConfig, progress: number) {
  const { corridorFadeStart, corridorFadeEnd, paletteStart, paletteEnd } = config.resolve;

  const corridorFadeT = clamp01(
    (progress - corridorFadeStart) / (corridorFadeEnd - corridorFadeStart || 1)
  );
  const corridorOpacity = 1 - corridorFadeT;

  const paletteT = clamp01(
    (progress - paletteStart) / (paletteEnd - paletteStart || 1)
  );

  return {
    corridorOpacity,
    paletteT,
    backgroundColor: lerpColor(config.background, config.resolvedBackground, paletteT),
    markColor: lerpColor(config.archColor, config.resolvedMarkColor, paletteT),
  };
}

/**
 * Finds the two camera keyframes bounding `progress` and linearly
 * interpolates position, look-at target and FOV between them. Simple
 * segment-wise interpolation is enough for a short 4-keyframe path and
 * avoids pulling in a spline/animation library.
 */
export function getCameraStateAtProgress(config: ArchPortalConfig, progress: number) {
  const frames = config.camera;
  const p = Math.min(1, Math.max(0, progress));

  let start = frames[0];
  let end = frames[frames.length - 1];

  for (let i = 0; i < frames.length - 1; i++) {
    if (p >= frames[i].t && p <= frames[i + 1].t) {
      start = frames[i];
      end = frames[i + 1];
      break;
    }
  }

  const span = end.t - start.t || 1;
  const localT = (p - start.t) / span;

  return {
    position: lerpVec3(start.position, end.position, localT),
    lookAt: lerpVec3(start.lookAt, end.lookAt, localT),
    fov: lerp(start.fov, end.fov, localT),
  };
}
