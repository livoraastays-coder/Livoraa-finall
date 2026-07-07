// ============================================================================
// PROPERTIES — DATA ACCESS LAYER
// Tries Sanity CMS first; falls back automatically to the static data in
// lib/data/fallback/properties.ts if Sanity isn't configured or a fetch
// fails. This is the ONLY file pages/components should import property
// data from — never import lib/data/fallback/properties.ts directly.
//
// To add a new property without Sanity: edit fallbackProperties in
// lib/data/fallback/properties.ts.
// To add a new property with Sanity connected: create a Property document
// in Sanity Studio at /studio — it will appear here automatically.
// ============================================================================

import { safeSanityFetch } from "@/lib/sanity/client";
import { propertiesQuery, propertyBySlugQuery } from "@/lib/sanity/queries";
import { fallbackProperties } from "./fallback/properties";

export type { Property, StayType } from "./fallback/properties";
import type { Property } from "./fallback/properties";

export async function getProperties(): Promise<Property[]> {
  const result = await safeSanityFetch<Property[]>(propertiesQuery);
  return result && result.length > 0 ? result : fallbackProperties;
}

export async function getPropertyBySlug(
  citySlug: string,
  slug: string
): Promise<Property | undefined> {
  const result = await safeSanityFetch<Property>(propertyBySlugQuery, {
    citySlug,
    slug,
  });
  if (result) return result;
  return fallbackProperties.find(
    (p) => p.citySlug === citySlug && p.slug === slug
  );
}

export async function getPropertiesByCity(citySlug: string): Promise<Property[]> {
  const all = await getProperties();
  return all.filter((p) => p.citySlug === citySlug);
}

export async function getRelatedProperties(
  current: Property,
  limit = 2
): Promise<Property[]> {
  const all = await getProperties();
  return all
    .filter((p) => p.slug !== current.slug)
    .sort((a, b) => (a.citySlug === current.citySlug ? -1 : 1))
    .slice(0, limit);
}
