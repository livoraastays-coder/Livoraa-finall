// ============================================================================
// SITE SETTINGS
// Single source of truth for brand-wide configuration.
// Edit values here to update them across the entire website.
// ============================================================================

export const siteSettings = {
  brandName: "LIVORAA STAYS",
  shortName: "LIVORAA",
  tagline: "Stay, thoughtfully.",
  description:
    "LIVORAA STAYS is a boutique hospitality brand curating thoughtfully designed short stays across Indian cities — shaped by quiet detail, comfort and experiences worth remembering.",

  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.livoraastays.com",

  // ---------------------------------------------------------------------
  // GUEST-FACING CONTACT DETAILS
  // These are the details shown across guest-facing areas of the site
  // (Contact page, footer, enquiry forms, WhatsApp buttons, legal pages).
  // Keep this under the LIVORAA STAYS brand — do not add personal names
  // here. Personal/founder details live in `lib/data/founder.ts` and are
  // only surfaced in business/partnership/legal contexts.
  // ---------------------------------------------------------------------
  email: "livoraastays@gmail.com",
  phoneDisplay: "+91 92850 47934", // shown to guests, used for tel: links
  whatsappNumber: "+919285047934", // E.164 format, used for wa.me links

  // Contextual pre-filled WhatsApp messages
  whatsappDefaultMessage:
    "Hello LIVORAA STAYS, I would like to know more about your stays.",
  whatsappPartnershipMessage:
    "Hello LIVORAA STAYS, I would like to discuss listing or managing a property with LIVORAA.",
  buildPropertyEnquiryMessage(propertyName: string) {
    return `Hello LIVORAA STAYS, I'm interested in ${propertyName}. Please share availability and booking details.`;
  },

  // Social
  instagramHandle: "@staywithlivoraa",
  instagramUrl: "https://instagram.com/staywithlivoraa",

  // Contact form submits to our own server-side API route (see
  // app/api/contact/route.ts) which validates input, applies basic spam
  // protection, and forwards it on — no third-party keys are ever
  // exposed in frontend code.
  formEndpoint: "/api/contact",

  // Founder section is enabled — see lib/data/founder.ts for the
  // editable content shown there. Keep this in business/legal contexts
  // only, not scattered across guest-facing pages.
  showFounderSection: true,

  // Digital concierge — public marketing copy only. No portal is linked
  // publicly.
  conciergeEnabled: true,

  seoDefaults: {
    titleSuffix: "LIVORAA STAYS",
    defaultTitle: "LIVORAA STAYS — Boutique Stays, Thoughtfully Curated",
    defaultDescription:
      "Boutique stays shaped by thoughtful spaces, quiet details and experiences worth remembering. Explore LIVORAA properties across Raipur, Ujjain and Indore.",
    ogImage: "/images/og-default.jpg",
    twitterHandle: "@staywithlivoraa",
  },
};

export function buildWhatsAppLink(message?: string) {
  const text = encodeURIComponent(message || siteSettings.whatsappDefaultMessage);
  const number = siteSettings.whatsappNumber.replace(/[^\d]/g, "");
  return `https://wa.me/${number}?text=${text}`;
}

// ---------------------------------------------------------------------
// Sanity override (optional)
// Brand-wide fields (email, phone, WhatsApp number, tagline, Instagram)
// can optionally be edited from the Site Settings singleton in Sanity
// Studio (/studio). Server components that render this content directly
// (e.g. legal pages, layout metadata) can call `getSiteSettings()` to get
// the Sanity value with the static object above as a guaranteed fallback.
// Client components (Navbar, Footer, ContactForm, WhatsAppButton, etc.)
// continue to import the static `siteSettings` object directly so they
// don't need an async data fetch — this keeps the guest-facing WhatsApp
// and contact flows working even before Sanity is configured.
// ---------------------------------------------------------------------
import { safeSanityFetch } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";

type SiteSettingsOverride = Partial<
  Pick<
    typeof siteSettings,
    | "brandName"
    | "tagline"
    | "email"
    | "phoneDisplay"
    | "whatsappNumber"
    | "instagramHandle"
    | "instagramUrl"
  >
>;

export async function getSiteSettings() {
  const override = await safeSanityFetch<SiteSettingsOverride>(siteSettingsQuery);
  return { ...siteSettings, ...override };
}
