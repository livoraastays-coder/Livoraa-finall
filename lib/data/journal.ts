// ============================================================================
// JOURNAL / CITY GUIDES — DATA ACCESS LAYER
// Tries Sanity CMS first; falls back to lib/data/fallback/journal.ts.
// Import journal data from this file only, never from the fallback file
// directly.
// ============================================================================

import { safeSanityFetch } from "@/lib/sanity/client";
import { journalPostsQuery, journalPostBySlugQuery } from "@/lib/sanity/queries";
import { fallbackJournalPosts } from "./fallback/journal";

export type { JournalPost, JournalCategory } from "./fallback/journal";
import type { JournalPost } from "./fallback/journal";

export async function getJournalPosts(): Promise<JournalPost[]> {
  const result = await safeSanityFetch<JournalPost[]>(journalPostsQuery);
  return result && result.length > 0 ? result : fallbackJournalPosts;
}

export async function getPostBySlug(slug: string): Promise<JournalPost | undefined> {
  const result = await safeSanityFetch<JournalPost>(journalPostBySlugQuery, { slug });
  if (result) return result;
  return fallbackJournalPosts.find((p) => p.slug === slug);
}

export async function getPostsByCity(city: string): Promise<JournalPost[]> {
  const all = await getJournalPosts();
  return all.filter((p) => p.city === city);
}
