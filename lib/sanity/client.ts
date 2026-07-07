import { createClient } from "@sanity/client";
import {
  sanityProjectId,
  sanityDataset,
  sanityApiVersion,
  sanityReadToken,
  isSanityConfigured,
} from "./env";

// The client is constructed even when Sanity isn't configured (createClient
// itself doesn't make a network call), but every data-access function in
// lib/data/*.ts checks `isSanityConfigured` before ever calling
// `sanityClient.fetch(...)`, so an unconfigured project never attempts a
// network request — this is what keeps local/dev builds working without a
// Sanity project.
export const sanityClient = createClient({
  projectId: sanityProjectId || "placeholder-project-id",
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: process.env.NODE_ENV === "production",
  token: sanityReadToken || undefined,
  perspective: sanityReadToken ? "previewDrafts" : "published",
});

export { isSanityConfigured };

/**
 * Safe fetch wrapper: runs a GROQ query against Sanity, but only if
 * Sanity is configured, and never throws — any error (missing project,
 * network issue, bad query) resolves to `null` so callers can fall back
 * to static data without a try/catch at every call site.
 */
export async function safeSanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    const result = await sanityClient.fetch<T>(query, params);
    return result ?? null;
  } catch (error) {
    console.error("[sanity] fetch failed, falling back to static data:", error);
    return null;
  }
}
