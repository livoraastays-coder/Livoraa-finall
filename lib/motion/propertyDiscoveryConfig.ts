// ============================================================================
// PROPERTY DISCOVERY — SCROLL CHOREOGRAPHY CONFIG
// Desktop and mobile are art-directed separately here, mirroring the
// approach in lib/three/archPortalConfig.ts: same creative concept
// (panels advancing through depth/perspective as you scroll), different
// numbers tuned for the viewport. Mobile is NOT a fallback grid — it's
// a gentler, portrait-appropriate version of the same choreography.
// ============================================================================

export type PropertyDiscoveryConfig = {
  /** Scroll distance per property, in viewport heights. */
  vhPerProperty: number;
  /** CSS perspective depth — larger = flatter/gentler tilt, smaller = more dramatic. */
  perspectivePx: number;
  /** % translateX applied per unit of distance-from-active. */
  translateXPercent: number;
  /** Scale reduction applied per unit of distance-from-active (capped). */
  scaleFalloff: number;
  maxScaleFalloff: number;
  /** rotateY degrees applied per unit of distance-from-active. */
  rotateYDeg: number;
  /** Panels beyond this |distance| are not rendered at all. */
  maxRenderDistance: number;
  /** Max clip-path inset percentage used for the incoming-panel image mask reveal. */
  clipInsetMax: number;
  /** Image aspect ratio class (Tailwind) for the property photo. */
  imageAspect: string;
};

export const desktopPropertyDiscoveryConfig: PropertyDiscoveryConfig = {
  vhPerProperty: 100,
  perspectivePx: 1400,
  translateXPercent: 55,
  scaleFalloff: 0.22,
  maxScaleFalloff: 0.3,
  rotateYDeg: -14,
  maxRenderDistance: 1.4,
  clipInsetMax: 100,
  imageAspect: "aspect-[4/5]",
};

// Mobile: gentler tilt and translate swing (so panels don't fly
// off-frame or distort at portrait widths), slightly more scroll room
// per property (pacing feels intentional rather than rushed on a
// smaller screen), a shorter/wider image so image + text both comfortably
// fit within one viewport height without overlapping or being cropped.
export const mobilePropertyDiscoveryConfig: PropertyDiscoveryConfig = {
  vhPerProperty: 118,
  perspectivePx: 2200,
  translateXPercent: 34,
  scaleFalloff: 0.16,
  maxScaleFalloff: 0.22,
  rotateYDeg: -6,
  maxRenderDistance: 1.2,
  clipInsetMax: 60,
  imageAspect: "aspect-[4/3]",
};
