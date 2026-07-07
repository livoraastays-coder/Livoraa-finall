// ============================================================================
// PROPERTIES — STATIC FALLBACK DATA
// This is the offline fallback source used when Sanity CMS is not
// configured (no NEXT_PUBLIC_SANITY_PROJECT_ID set) or when a Sanity
// fetch fails at runtime. See lib/data/properties.ts for the actual
// data-access functions consumed by pages/components, which try Sanity
// first and fall back to this file automatically.
//
// Keep this file's shape in sync with sanity/schemaTypes/property.ts —
// it exists so the site always renders correctly even before a Sanity
// project has been created or populated.
// ============================================================================

export type StayType = "Couple Friendly" | "Work Stay" | "Family Stay" | "Group Stay";

export type Property = {
  slug: string;
  citySlug: string;
  city: string;
  name: string;
  tagline: string;
  status: "available" | "coming-soon";
  shortDescription: string;
  description: string[];
  coverImage: string;
  gallery: string[];
  guestCapacity: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  checkIn: string;
  checkOut: string;
  highlights: string[];
  neighbourhood: string;
  mapLink?: string;
  houseRules: string[];
  tags: StayType[];
  pricing?: {
    startingFrom: number;
    currency: "INR";
    note: string;
  };
};

export const fallbackProperties: Property[] = [
  {
    slug: "the-signature-suite",
    citySlug: "raipur",
    city: "Raipur",
    name: "The Signature Suite × LIVORAA",
    tagline: "Where the LIVORAA story began.",
    status: "available",
    shortDescription:
      "An intimate, design-led suite in a quiet Raipur neighbourhood — LIVORAA's first stay, and the blueprint for everything that follows.",
    description: [
      "The Signature Suite is where LIVORAA's approach to hospitality first took shape. Set in a calm residential pocket of Raipur, the space was designed to feel considered rather than staged — comfortable furniture, warm light, and details that hold up to a longer look.",
      "It suits guests who want a private, well-kept space to return to after a day of work or travel, without the friction of an unfamiliar hotel routine.",
    ],
    coverImage: "/images/properties/signature-suite-cover.jpg",
    gallery: [
      "/images/properties/signature-suite-1.jpg",
      "/images/properties/signature-suite-2.jpg",
      "/images/properties/signature-suite-3.jpg",
    ],
    guestCapacity: 3,
    bedrooms: 1,
    bathrooms: 1,
    amenities: [
      "High-speed Wi-Fi",
      "Air conditioning",
      "Fully equipped kitchenette",
      "Smart TV",
      "Premium linen and toiletries",
      "Dedicated workspace",
      "Power backup",
      "Digital guest assistance",
    ],
    checkIn: "1:00 PM",
    checkOut: "11:00 AM",
    highlights: [
      "LIVORAA's original signature stay",
      "Quiet residential setting, minutes from the city centre",
      "Thoughtfully furnished for both short and extended stays",
    ],
    neighbourhood:
      "Located in one of Raipur's calmer residential pockets, close to everyday conveniences while staying well away from main-road noise.",
    mapLink: "https://maps.google.com/?q=Raipur+Chhattisgarh",
    houseRules: [
      "No smoking indoors",
      "No parties or events",
      "Pets on request only, please check before booking",
      "Valid government ID required at check-in",
    ],
    tags: ["Couple Friendly", "Work Stay"],
  },
  {
    slug: "livoraa-atelier",
    citySlug: "ujjain",
    city: "Ujjain",
    name: "LIVORAA Atelier",
    tagline: "A considered stay in an unhurried city.",
    status: "available",
    shortDescription:
      "A calm, well-appointed stay in Ujjain, designed for guests who want a comfortable base without losing the character of the city.",
    description: [
      "LIVORAA Atelier brings the same design language as our first stay into Ujjain — a city that rewards guests who slow down. The space balances practical comfort with a warm, editorial aesthetic, built for travellers here for pilgrimage, work or simply a few unhurried days.",
      "Every detail, from the linen to the lighting, has been chosen to make the stay feel effortless.",
    ],
    coverImage: "/images/properties/atelier-cover.jpg",
    gallery: [
      "/images/properties/atelier-1.jpg",
      "/images/properties/atelier-2.jpg",
      "/images/properties/atelier-3.jpg",
    ],
    guestCapacity: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: [
      "High-speed Wi-Fi",
      "Air conditioning",
      "Fully equipped kitchen",
      "Smart TV",
      "Premium linen and toiletries",
      "Washing machine",
      "Power backup",
      "Digital guest assistance",
    ],
    checkIn: "1:00 PM",
    checkOut: "11:00 AM",
    highlights: [
      "Two-bedroom layout suited to families and small groups",
      "Short drive from the city's key temple routes",
      "Fully equipped for longer, self-sufficient stays",
    ],
    neighbourhood:
      "Positioned for easy access to Ujjain's central areas, with everyday essentials and local eateries close by.",
    mapLink: "https://maps.google.com/?q=Ujjain+Madhya+Pradesh",
    houseRules: [
      "No smoking indoors",
      "No parties or events",
      "Quiet hours after 10:00 PM",
      "Valid government ID required at check-in",
    ],
    tags: ["Family Stay", "Group Stay"],
  },
  {
    slug: "livoraa-cove",
    citySlug: "indore",
    city: "Indore",
    name: "LIVORAA Cove",
    tagline: "Arriving soon in Indore.",
    status: "coming-soon",
    shortDescription:
      "Our next stay is taking shape in Indore. Follow along on Instagram or join the waitlist to be notified first.",
    description: [
      "LIVORAA Cove is currently in development — our next thoughtfully designed stay, built for a city known for its food, energy and everyday warmth.",
      "Details on layout, amenities and availability will be shared as the property nears completion.",
    ],
    coverImage: "/images/properties/cove-cover.jpg",
    gallery: [],
    guestCapacity: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: [],
    checkIn: "TBA",
    checkOut: "TBA",
    highlights: [
      "LIVORAA's third property, opening in Indore",
      "Designed with the same attention to comfort and detail",
    ],
    neighbourhood:
      "Exact location will be shared closer to launch.",
    houseRules: [],
    tags: ["Couple Friendly", "Family Stay"],
  },
];
