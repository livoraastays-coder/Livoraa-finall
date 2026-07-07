"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

// Embeds the Sanity Studio directly inside the Next.js app at /studio,
// so content editors log in and edit content without a separate deploy.
// This route is intentionally excluded from the sitemap and disallowed
// in robots.txt (see app/robots.ts).
export default function StudioPage() {
  return <NextStudio config={config} />;
}
