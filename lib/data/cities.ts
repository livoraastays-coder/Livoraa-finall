// ============================================================================
// CITIES — DATA ACCESS LAYER
// Tries Sanity CMS first; falls back to lib/data/fallback/cities.ts.
// Import city data from this file only, never from the fallback file
// directly.
// ============================================================================

import { safeSanityFetch } from "@/lib/sanity/client";
import { citiesQuery } from "@/lib/sanity/queries";
import { fallbackCities } from "./fallback/cities";

export type { City } from "./fallback/cities";
import type { City } from "./fallback/cities";

export async function getCities(): Promise<City[]> {
  const result = await safeSanityFetch<City[]>(citiesQuery);
  return result && result.length > 0 ? result : fallbackCities;
}

export async function getCityBySlug(slug: string): Promise<City | undefined> {
  const all = await getCities();
  return all.find((c) => c.slug === slug);
}
