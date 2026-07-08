// ============================================================================
// HOMEPAGE — DATA ACCESS LAYER
// Tries Sanity CMS first and merges CMS content with fallback content.
// This ensures partially completed Sanity documents do not break the page.
// ============================================================================

import { safeSanityFetch } from "@/lib/sanity/client";
import { homepageQuery } from "@/lib/sanity/queries";
import {
  fallbackHomepage,
  type HomepageData,
} from "./fallback/homepage";

type PartialHomepageData = {
  hero?: Partial<HomepageData["hero"]>;
  introduction?: Partial<HomepageData["introduction"]>;
  staysSection?: Partial<HomepageData["staysSection"]>;

  experienceSection?: Partial<
    Omit<HomepageData["experienceSection"], "pillars">
  > & {
    pillars?: HomepageData["experienceSection"]["pillars"];
  };

  destinationsSection?: Partial<
    HomepageData["destinationsSection"]
  >;

  conciergeSection?: Partial<
    HomepageData["conciergeSection"]
  >;

  instagramSection?: Partial<
    HomepageData["instagramSection"]
  >;

  bookingCta?: Partial<
    HomepageData["bookingCta"]
  >;
};

export async function getHomepage(): Promise<HomepageData> {
  const result =
    await safeSanityFetch<PartialHomepageData>(homepageQuery);

  if (!result) {
    return fallbackHomepage;
  }

  return {
    hero: {
      ...fallbackHomepage.hero,
      ...result.hero,
    },

    introduction: {
      ...fallbackHomepage.introduction,
      ...result.introduction,
    },

    staysSection: {
      ...fallbackHomepage.staysSection,
      ...result.staysSection,
    },

    experienceSection: {
      ...fallbackHomepage.experienceSection,
      ...result.experienceSection,

      pillars:
        result.experienceSection?.pillars &&
        result.experienceSection.pillars.length > 0
          ? result.experienceSection.pillars
          : fallbackHomepage.experienceSection.pillars,
    },

    destinationsSection: {
      ...fallbackHomepage.destinationsSection,
      ...result.destinationsSection,
    },

    conciergeSection: {
      ...fallbackHomepage.conciergeSection,
      ...result.conciergeSection,
    },

    instagramSection: {
      ...fallbackHomepage.instagramSection,
      ...result.instagramSection,

      images:
        result.instagramSection?.images &&
        result.instagramSection.images.length > 0
          ? result.instagramSection.images
          : fallbackHomepage.instagramSection.images,
    },

    bookingCta: {
      ...fallbackHomepage.bookingCta,
      ...result.bookingCta,
    },
  };
}