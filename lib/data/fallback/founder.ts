// ============================================================================
// FOUNDER — STATIC FALLBACK DATA
// Offline fallback used when Sanity CMS isn't configured or a fetch
// fails. See lib/data/founder.ts for the actual async data-access
// function used by pages.
// ============================================================================

export type Founder = {
  name: string;
  title: string;
  story: string;
};

export const fallbackFounder: Founder = {
  name: "Parth Giri Goswami",
  title: "Founder, LIVORAA STAYS",
  // PLACEHOLDER — replace with real founder content in Sanity Studio
  // (or here) when ready. Keep it short and in LIVORAA's restrained
  // editorial voice. Do not add achievements, awards, founding year or
  // company history unless factually confirmed.
  story: "",
};
