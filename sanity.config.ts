import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/studioStructure";
import { sanityProjectId, sanityDataset, sanityApiVersion } from "./lib/sanity/env";

export default defineConfig({
  name: "livoraa-stays",
  title: "LIVORAA STAYS",

  // Falls back to a placeholder ID so this file can be imported even
  // before a real Sanity project exists — the Studio route itself will
  // prompt for real configuration once NEXT_PUBLIC_SANITY_PROJECT_ID is set.
  projectId: sanityProjectId || "placeholder-project-id",
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,

  basePath: "/studio",

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
