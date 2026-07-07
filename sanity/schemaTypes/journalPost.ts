import { defineField, defineType } from "sanity";

export default defineType({
  name: "journalPost",
  title: "Journal Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      title: "City (optional)",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "City Guides",
          "Food & Coffee",
          "Things To Do",
          "Travel Notes",
          "LIVORAA Stories",
        ],
      },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      description: "One entry per paragraph.",
    }),
    defineField({
      name: "relatedProperty",
      title: "Related Property",
      type: "reference",
      to: [{ type: "property" }],
    }),
    defineField({
      name: "mapLink",
      title: "Map Link",
      type: "url",
    }),
    defineField({
      name: "publishedDate",
      title: "Published Date",
      type: "date",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isPlaceholder",
      title: "Marked as placeholder (unverified recommendations)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
