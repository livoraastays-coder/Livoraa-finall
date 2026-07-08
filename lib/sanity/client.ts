import { createClient } from "@sanity/client";

import {
  sanityProjectId,
  sanityDataset,
  sanityApiVersion,
  sanityReadToken,
  isSanityConfigured,
} from "./env";

export const sanityClient = createClient({
  projectId: sanityProjectId || "placeholder-project-id",
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,

  // Always fetch directly from Sanity API.
  // This avoids stale CMS content after publishing.
  useCdn: false,

  token: sanityReadToken || undefined,

  perspective: sanityReadToken
    ? "previewDrafts"
    : "published",
});

export { isSanityConfigured };

/**
 * Fetch fresh content from Sanity.
 *
 * - Returns null if Sanity is not configured
 * - Does not use cached Next.js fetch results
 * - Falls back safely if Sanity fetch fails
 */
export async function safeSanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    const result = await sanityClient.fetch<T>(
      query,
      params,
      {
        cache: "no-store",
      }
    );

    return result ?? null;
  } catch (error) {
    console.error(
      "[sanity] fetch failed, falling back to static data:",
      error
    );

    return null;
  }
}