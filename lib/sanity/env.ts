// ============================================================================
// SANITY ENV
// Central place for Sanity project configuration. Reads from environment
// variables so the same code works across local dev, preview and
// production deployments without changes.
//
// IMPORTANT: `isSanityConfigured` gates every Sanity fetch in this
// codebase. If a project ID isn't set, the site runs entirely on the
// static fallback data in lib/data/fallback/ — this is what lets
// `npm run build` succeed on a machine that has never created a Sanity
// project, and what lets this repo be handed over before a CMS exists.
// ============================================================================

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const sanityApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// A private, server-only token — used for the embedded Studio and for
// reading draft/unpublished content. Never prefixed with NEXT_PUBLIC_,
// so it is never bundled into client-side JavaScript.
export const sanityReadToken = process.env.SANITY_API_READ_TOKEN || "";

export const isSanityConfigured = Boolean(sanityProjectId);
