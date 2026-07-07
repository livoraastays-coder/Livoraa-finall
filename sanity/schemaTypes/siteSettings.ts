import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Rendered as a singleton in the Studio structure (see sanity/structure.ts)
  fields: [
    defineField({ name: "brandName", title: "Brand Name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "email", title: "Official Email", type: "string" }),
    defineField({
      name: "phoneDisplay",
      title: "Displayed Phone Number",
      type: "string",
      description: "e.g. +91 92850 47934",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number (E.164, no spaces)",
      type: "string",
      description: "e.g. +919285047934",
    }),
    defineField({ name: "instagramHandle", title: "Instagram Handle", type: "string" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
  ],
});
