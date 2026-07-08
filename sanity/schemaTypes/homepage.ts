import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",

  fields: [
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "description", title: "Description", type: "text", rows: 3 },
        { name: "primaryButtonText", title: "Primary Button Text", type: "string" },
        { name: "secondaryButtonText", title: "Secondary Button Text", type: "string" },
      ],
    }),

    defineField({
      name: "introduction",
      title: "Introduction Section",
      type: "object",
      fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "text", title: "Text", type: "text", rows: 5 },
      ],
    }),

    defineField({
      name: "staysSection",
      title: "Stays Section",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "description", title: "Description", type: "text", rows: 3 },
        { name: "buttonText", title: "Button Text", type: "string" },
      ],
    }),

    defineField({
      name: "experienceSection",
      title: "Experience Section",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string" },

        {
          name: "pillars",
          title: "Experience Pillars",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "text",
                  title: "Text",
                  type: "text",
                  rows: 3,
                },
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "text",
                },
              },
            },
          ],
        },

        { name: "buttonText", title: "Button Text", type: "string" },
      ],
    }),

    defineField({
      name: "destinationsSection",
      title: "Destinations Section",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string" },
      ],
    }),

    defineField({
      name: "conciergeSection",
      title: "Digital Concierge Section",
      type: "object",
      fields: [
        {
          name: "enabled",
          title: "Show Section",
          type: "boolean",
          initialValue: true,
        },
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "text", title: "Text", type: "text", rows: 5 },
        {
          name: "image",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    defineField({
      name: "instagramSection",
      title: "Instagram Section",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "text", title: "Text", type: "text", rows: 3 },

        {
          name: "images",
          title: "Instagram Images",
          type: "array",
          validation: (Rule) => Rule.max(4),
          of: [
            {
              type: "image",
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    }),

    defineField({
      name: "bookingCta",
      title: "Direct Booking CTA",
      type: "object",
      fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "text", title: "Text", type: "text", rows: 4 },
        { name: "staysButtonText", title: "Stays Button Text", type: "string" },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Homepage",
        subtitle: "Homepage content and sections",
      };
    },
  },
});