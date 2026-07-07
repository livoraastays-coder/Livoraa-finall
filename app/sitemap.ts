import type { MetadataRoute } from "next";
import { getProperties } from "@/lib/data/properties";
import { getJournalPosts } from "@/lib/data/journal";
import { siteSettings } from "@/lib/data/siteSettings";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteSettings.siteUrl;
  const [properties, journalPosts] = await Promise.all([
    getProperties(),
    getJournalPosts(),
  ]);

  const staticRoutes = [
    "",
    "/stays",
    "/experience",
    "/about",
    "/journal",
    "/contact",
    "/enquire",
    "/privacy-policy",
    "/terms-and-conditions",
    "/cancellation-refund-policy",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const propertyRoutes = properties.map((p) => ({
    url: `${base}/stays/${p.citySlug}/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const journalRoutes = journalPosts.map((post) => ({
    url: `${base}/journal/${post.slug}`,
    lastModified: new Date(post.publishedDate),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...propertyRoutes, ...journalRoutes];
}
