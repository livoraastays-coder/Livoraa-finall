// ============================================================================
// JOURNAL / CITY GUIDES — STATIC FALLBACK DATA
// Offline fallback used when Sanity CMS isn't configured or a fetch
// fails. See lib/data/journal.ts for the actual async data-access
// functions used by pages/components.
//
// NOTE: Specific business names in "placeholder" articles are marked
// clearly and should be replaced by the LIVORAA team with verified,
// current recommendations before publishing.
// ============================================================================

export type JournalCategory =
  | "City Guides"
  | "Food & Coffee"
  | "Things To Do"
  | "Travel Notes"
  | "LIVORAA Stories";

export type JournalPost = {
  slug: string;
  title: string;
  city?: string;
  category: JournalCategory;
  coverImage: string;
  introduction: string;
  body: string[];
  relatedPropertySlug?: string;
  mapLink?: string;
  publishedDate: string; // ISO date
  featured: boolean;
  isPlaceholder?: boolean;
};

export const fallbackJournalPosts: JournalPost[] = [
  {
    slug: "raipur-a-slower-city-guide",
    title: "Raipur, at a slower pace",
    city: "Raipur",
    category: "City Guides",
    coverImage: "/images/journal/raipur-guide.jpg",
    introduction:
      "A short, honest introduction to Raipur for guests staying at The Signature Suite — the parts of the city worth your time.",
    body: [
      "Raipur doesn't announce itself the way larger cities do, and that's part of what makes it worth visiting properly. Mornings are best spent walking the quieter residential streets near the suite before the heat sets in.",
      "This guide is a placeholder — our team is compiling verified, current local recommendations for cafés, walks and things to do, and will update this article shortly.",
    ],
    relatedPropertySlug: "the-signature-suite",
    publishedDate: "2025-11-01",
    featured: true,
    isPlaceholder: true,
  },
  {
    slug: "ujjain-beyond-the-temples",
    title: "Ujjain, beyond the temples",
    city: "Ujjain",
    category: "Travel Notes",
    coverImage: "/images/journal/ujjain-guide.jpg",
    introduction:
      "Notes for guests at LIVORAA Atelier on moving through Ujjain without rushing.",
    body: [
      "Most visitors come to Ujjain with a fixed itinerary built around its temples — understandably so. But the city rewards guests who leave room for slower mornings and unplanned streets.",
      "This guide is a placeholder — our team is compiling verified, current local recommendations and will update this article shortly.",
    ],
    relatedPropertySlug: "livoraa-atelier",
    publishedDate: "2025-11-08",
    featured: true,
    isPlaceholder: true,
  },
  {
    slug: "indore-food-notes",
    title: "Indore, notes on food before we arrive",
    city: "Indore",
    category: "Food & Coffee",
    coverImage: "/images/journal/indore-guide.jpg",
    introduction:
      "As LIVORAA Cove takes shape, a first look at what makes Indore's food culture worth planning a trip around.",
    body: [
      "Indore's reputation as a food city precedes it, and rightly so. Ahead of LIVORAA Cove opening, we're putting together a proper, tested guide to the city's food streets and quieter cafés.",
      "This guide is a placeholder — specific recommendations will be added once verified by our team.",
    ],
    relatedPropertySlug: "livoraa-cove",
    publishedDate: "2025-11-15",
    featured: false,
    isPlaceholder: true,
  },
  {
    slug: "what-thoughtful-hospitality-means-to-us",
    title: "What \"thoughtful\" means to us",
    category: "LIVORAA Stories",
    coverImage: "/images/journal/thoughtful-hospitality.jpg",
    introduction:
      "A short note on the word we use most — and what it actually means in how we design and run a stay.",
    body: [
      "We use the word \"thoughtful\" often, and we're careful about it, because it's easy for a word like that to become decoration. For LIVORAA, it means specific things: linen that's actually comfortable, check-in instructions that are easy to follow, and a space that's been walked through by someone who imagined staying in it themselves.",
      "It also means restraint — not overpromising, not overdesigning, and not adding a feature or flourish just because it looks good in a photograph.",
    ],
    publishedDate: "2025-10-20",
    featured: true,
  },
];
