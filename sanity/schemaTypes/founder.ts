import { defineField, defineType } from "sanity";

export default defineType({
  name: "founder",
  title: "Founder",
  type: "document",
  // Rendered as a singleton in the Studio structure (see sanity/structure.ts)
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      initialValue: "Parth Giri Goswami",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Founder, LIVORAA STAYS",
    }),
    defineField({
      name: "story",
      title: "Founder Story",
      type: "text",
      rows: 5,
      description:
        "Editorial, restrained tone. Do not invent achievements, awards, founding year or company history — leave blank until authentic content is confirmed.",
    }),
  ],
});
