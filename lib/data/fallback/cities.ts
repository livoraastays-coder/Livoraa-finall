// ============================================================================
// CITIES — STATIC FALLBACK DATA
// Offline fallback used when Sanity CMS isn't configured or a fetch
// fails. See lib/data/cities.ts for the actual async data-access
// functions used by pages/components.
// ============================================================================

export type City = {
  slug: string;
  name: string;
  state: string;
  description: string;
  image: string; // path under /public/images or remote URL
  featured: boolean;
};

export const fallbackCities: City[] = [
  {
    slug: "raipur",
    name: "Raipur",
    state: "Chhattisgarh",
    description:
      "A city finding its own rhythm — where LIVORAA's first signature stay sits quietly among tree-lined streets, built for guests who value comfort over noise.",
    image: "/images/cities/raipur.jpg",
    featured: true,
  },
  {
    slug: "ujjain",
    name: "Ujjain",
    state: "Madhya Pradesh",
    description:
      "Ancient and unhurried, Ujjain asks for a stay that respects its pace. LIVORAA Atelier is designed for travellers moving through the city with intention.",
    image: "/images/cities/ujjain.jpg",
    featured: true,
  },
  {
    slug: "indore",
    name: "Indore",
    state: "Madhya Pradesh",
    description:
      "India's food capital deserves a stay as considered as its streets are alive. LIVORAA Cove is arriving soon for guests exploring Indore properly.",
    image: "/images/cities/indore.jpg",
    featured: true,
  },
];
