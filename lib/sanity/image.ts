import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityProjectId, sanityDataset } from "./env";

const builder = createImageUrlBuilder({
  projectId: sanityProjectId || "placeholder-project-id",
  dataset: sanityDataset,
});

/**
 * Builds a Sanity CDN image URL from a Sanity image reference.
 * Usage: urlFor(property.coverImage).width(1200).url()
 */
export function urlFor(source: SanityImageSource | undefined) {
  return builder.image(source || "");
}
