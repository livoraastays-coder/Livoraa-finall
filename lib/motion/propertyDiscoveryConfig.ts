// ============================================================================
// PROPERTY DISCOVERY — SCROLL CHOREOGRAPHY CONFIG
//
// Desktop and mobile use the same creative concept but are tuned separately.
//
// Desktop:
// - stronger perspective
// - wider horizontal movement
// - more dramatic 3D rotation
//
// Mobile:
// - shorter scroll sequence
// - smaller horizontal movement
// - softer scaling
// - almost-flat perspective
// - quicker, cleaner property handoff
// ============================================================================

export type PropertyDiscoveryConfig = {
  /**
   * Scroll distance per property,
   * measured in viewport heights.
   */
  vhPerProperty: number;

  /**
   * CSS perspective depth.
   * Larger values create a flatter,
   * gentler perspective effect.
   */
  perspectivePx: number;

  /**
   * Horizontal translation percentage
   * per unit of distance from active slide.
   */
  translateXPercent: number;

  /**
   * Scale reduction per unit of distance.
   */
  scaleFalloff: number;

  /**
   * Maximum allowed scale reduction.
   */
  maxScaleFalloff: number;

  /**
   * Y-axis rotation in degrees
   * per unit of distance.
   */
  rotateYDeg: number;

  /**
   * Slides beyond this distance
   * are not rendered.
   */
  maxRenderDistance: number;

  /**
   * Maximum clip-path inset percentage
   * for incoming image reveal.
   */
  clipInsetMax: number;

  /**
   * Tailwind aspect-ratio class
   * for property images.
   */
  imageAspect: string;
};


// ============================================================================
// DESKTOP
// Keep the original desktop choreography unchanged.
// ============================================================================

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


// ============================================================================
// MOBILE
//
// Designed for narrow touch screens:
//
// - shorter scroll distance
// - reduced horizontal travel
// - minimal 3D rotation
// - subtle scale changes
// - faster visual handoff
// - less aggressive image clipping
//
// Desktop behaviour is completely unaffected.
// ============================================================================

export const mobilePropertyDiscoveryConfig: PropertyDiscoveryConfig = {
  /**
   * Original: 118
   *
   * Reduced so users don't have to scroll
   * excessively between properties.
   */
  vhPerProperty: 82,

  /**
   * Higher perspective depth creates
   * a flatter and calmer mobile effect.
   */
  perspectivePx: 3000,

  /**
   * Original: 34
   *
   * Reduced horizontal movement prevents
   * cards from flying across narrow screens.
   */
  translateXPercent: 18,

  /**
   * Softer scale transition.
   */
  scaleFalloff: 0.08,

  /**
   * Prevent excessive shrinking.
   */
  maxScaleFalloff: 0.12,

  /**
   * Nearly flat rotation for mobile.
   */
  rotateYDeg: -2,

  /**
   * Only render the immediate neighbouring
   * property during transition.
   */
  maxRenderDistance: 1.05,

  /**
   * Gentle image mask transition.
   */
  clipInsetMax: 20,

  /**
   * Landscape image ratio works better
   * with image + content inside a phone viewport.
   */
  imageAspect: "aspect-[4/3]",
};