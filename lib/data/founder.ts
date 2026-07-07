// ============================================================================
// FOUNDER — DATA ACCESS LAYER
// Tries Sanity CMS first (singleton document, id "founder"); falls back
// to lib/data/fallback/founder.ts. Surfaced only in contextually
// appropriate places — the About page founder section, and
// business/partnership/legal contact contexts — never repeated across
// guest-facing pages.
// ============================================================================

import { safeSanityFetch } from "@/lib/sanity/client";
import { founderQuery } from "@/lib/sanity/queries";
import { fallbackFounder } from "./fallback/founder";

export type { Founder } from "./fallback/founder";
import type { Founder } from "./fallback/founder";

export async function getFounder(): Promise<Founder> {
  const result = await safeSanityFetch<Founder>(founderQuery);
  return result || fallbackFounder;
}
